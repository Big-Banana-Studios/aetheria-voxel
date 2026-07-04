/**
 * MuseClient — browser-native equivalent of UMuseSubsystem (Section 4.2).
 *
 * Wraps the ported athena-core.js driver (your real Muse S Athena BLE library,
 * used instead of muse-js since it's the validated driver for the target
 * hardware). Buffers the 4-channel stream into 1s ring buffers, runs the ported
 * BandPower → Coherence → Prescriber pipeline at 4 Hz, estimates per-electrode
 * signal quality, and broadcasts events.
 */
import './athena-core.js'; // side-effect: attaches window.AthenaDevice
import './aetheria-signal.js'; // side-effect: attaches window.AetheriaSignal
import type { AthenaDevice, AthenaEEGData, AthenaAccGyroData } from './athena-core';
import type { SignalProcessor, ProvenanceResult } from './aetheria-signal';
import { BandPowerAnalyzer } from './BandPowerAnalyzer';
import { CoherenceCalculator } from './CoherenceCalculator';
import { FrequencyPrescriber, type ResonanceReadout } from './FrequencyPrescriber';
import { StillnessIndex } from './StillnessIndex';
import {
  type BandPowerResult,
  type CoherenceSource,
  type EEGEvent,
  type EEGSample,
  type ChannelQuality,
  type MuseMetrics,
  emptyBandPower,
} from './types';
import type { FrequencyTable } from '../core/FrequencyTable';

const FS = 256;
const WINDOW = 256; // 1s
const UPDATE_HZ = 4;
const ARTIFACT_UV = 1000;

// Presets that stream optics (PPG + fNIRS both ride the optics stream). p1041 is
// the default (EEG8 + Optics16, LED bright). If a given firmware won't emit
// optics under p1041, the setup screen lets you cycle these and reconnect.
// (p1046 is deliberately excluded — LED off, so no PPG/fNIRS possible.)
const OPTICS_PRESETS = ['p1041', 'p1042', 'p1044', 'p1035', 'p1043'];
const PRESET_KEY = 'aetheria-muse-preset';

/** What the setup screen needs to diagnose the optical stream honestly. */
export interface MuseDiagnostics {
  preset: string;
  opticsMode: string | null; // e.g. 'OPTICS16' once an optics packet is decoded
  opticsPackets: number; // 0 ⇒ no optics arriving at all (LED/preset/firmware)
  ppgStreaming: boolean;
  fnirsStreaming: boolean;
  lastLog: string;
  // Device identity + EEG stream integrity (channel-map / detection surface —
  // Selah's calibration guide, TASK 1). We read scalp channels BY LABEL, so we
  // can't silently read AUX as scalp; these make any real problem visible.
  deviceName: string | null; // BLE name (e.g. 'MuseS-1234')
  firmware: string; // firmware string once known
  eegMode: string | null; // 'EEG8' (8-ch Athena) | 'EEG4' | null (no EEG stream)
  eegPackets: number; // EEG packets decoded so far; 0 ⇒ no scalp stream arriving
  scalpMapped: boolean; // all four scalp labels (TP9/AF7/AF8/TP10) present in the stream
}

type Listener = (payload?: unknown) => void;

export class MuseClient implements CoherenceSource {
  private device: AthenaDevice | null = null;
  private buffers: number[][] = [[], [], [], []]; // TP9, AF7, AF8, TP10
  private latest: EEGSample | null = null;
  private quality: ChannelQuality = { tp9: 0, af7: 0, af8: 0, tp10: 0 };

  private analyzer = new BandPowerAnalyzer(FS);
  private coherence = new CoherenceCalculator(FS);
  private prescriber = new FrequencyPrescriber();
  private stillness = new StillnessIndex();
  private stillnessValue = 0;

  private bands: BandPowerResult = emptyBandPower();
  private coherenceScore = 0;
  private prescribedIndex = 0;
  private regime: 0 | 1 | 2 = 0;

  private connected = false;
  private timer: number | null = null;
  private listeners = new Map<EEGEvent, Listener[]>();

  // Optical-stream diagnostics (the fNIRS/PPG troubleshooting surface).
  private opticsPackets = 0;
  private lastLog = '';

  // Signal provenance (aetheria-signal.js): every raw sample is streamed through
  // an extract-and-disclose processor so the session export can honestly report
  // how much was clean vs recovered. Never alters the gate/metrics stream.
  private processor: SignalProcessor | null = null;
  private lastAcc: number[] | null = null;
  // Whether the four scalp labels resolved in the live EEG stream. Starts true
  // (nothing wrong yet); flips false only if a real stream is missing a scalp
  // label — the honest "possible channel-map problem" signal (never silent).
  private scalpMapped = true;

  // Calibration (Section 12.2 — avoid recalibrating each session).
  private calibrating = false;
  private calibProgress = 0;
  private calibUntil = 0;
  private calibDurationMs = 54000;

  constructor(private freqTable: FrequencyTable) {}

  static get isSupported(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.bluetooth;
  }

  setRegime(regime: 0 | 1 | 2): void {
    this.regime = regime;
    this.prescriber.reset();
  }

  // ── Connection ──

  /** Selected optics preset (persisted; defaults to p1041). */
  get preset(): string {
    try {
      const p = localStorage.getItem(PRESET_KEY);
      if (p && OPTICS_PRESETS.includes(p)) return p;
    } catch {
      /* localStorage may be unavailable */
    }
    return OPTICS_PRESETS[0];
  }

  /** Cycle to the next optics-capable preset (for the setup screen's toggle).
   *  Returns the newly-selected preset; reconnect to apply it. */
  cyclePreset(): string {
    const i = OPTICS_PRESETS.indexOf(this.preset);
    const next = OPTICS_PRESETS[(i + 1) % OPTICS_PRESETS.length];
    try {
      localStorage.setItem(PRESET_KEY, next);
    } catch {
      /* ignore */
    }
    return next;
  }

  async connect(): Promise<boolean> {
    if (!MuseClient.isSupported || !window.AthenaDevice) {
      console.warn('[Aetheria] Web Bluetooth unavailable — use Manual Mode.');
      return false;
    }
    // Tear down any prior device first so reconnecting with a new preset is clean.
    if (this.device) this.disconnect();
    this.opticsPackets = 0;
    this.lastLog = '';
    try {
      this.device = new window.AthenaDevice({
        preset: this.preset,
        dcOffset: true, // subtract DC at decode so band powers aren't delta-swamped
        processInterval: 1000,
        onEEG: (d) => this.onEEG(d),
        onAccGyro: (d) => this.onAccGyro(d),
        onOptics: (d) => { this.opticsPackets = d.count; },
        onStatus: (s) => this.onStatus(s),
        onLog: (type, msg) => { if (type !== 'rx' && type !== 'tx') this.lastLog = msg; },
      });
      await this.device.connect();
      await this.device.startStream();
      this.connected = true;
      // Fresh provenance processor per connection (if the module is present).
      this.processor = window.AetheriaSignal ? window.AetheriaSignal.makeProcessor('muse', { fs: FS }) : null;
      this.startPipeline();
      this.emit('connected');
      return true;
    } catch (err) {
      console.error('[Aetheria] Muse connect failed:', err);
      this.connected = false;
      return false;
    }
  }

  /** Optical-stream diagnostics for the setup screen (is fNIRS/PPG flowing?). */
  getDiagnostics(): MuseDiagnostics {
    return {
      preset: this.device?.preset ?? this.preset,
      opticsMode: this.device?.opticsMode ?? null,
      opticsPackets: this.device?.counts.optics ?? this.opticsPackets,
      ppgStreaming: this.device?.ppg != null,
      fnirsStreaming: this.device?.fnirs != null,
      lastLog: this.lastLog,
      deviceName: this.device?.deviceName ?? null,
      firmware: this.device?.firmware ?? '',
      eegMode: this.device?.eegMode ?? null,
      eegPackets: this.device?.counts.eeg ?? 0,
      scalpMapped: this.scalpMapped,
    };
  }

  disconnect(): void {
    this.stopPipeline();
    if (this.device) {
      this.device.disconnect().catch(() => {});
      this.device = null;
    }
    this.processor = null;
    this.lastAcc = null;
    this.connected = false;
    this.emit('disconnected');
  }

  get isConnected(): boolean {
    return this.connected;
  }

  get connectionQuality(): number {
    const q = this.quality;
    return (q.tp9 + q.af7 + q.af8 + q.tp10) / 4;
  }

  /** Per-electrode signal quality (0..1) for the setup screen's 4 bars. */
  getChannelQuality(): ChannelQuality {
    return { ...this.quality };
  }

  // ── Calibration ──

  startCalibration(seconds = 54): void {
    this.calibrating = true;
    this.calibProgress = 0;
    this.calibDurationMs = seconds * 1000;
    this.calibUntil = performance.now() + this.calibDurationMs;
  }
  get isCalibrating(): boolean {
    return this.calibrating;
  }
  get calibrationProgress(): number {
    return this.calibProgress;
  }

  // ── Data getters ──

  getLatestSample(): EEGSample | null {
    return this.latest;
  }
  getBandPowers(): BandPowerResult {
    return this.bands;
  }
  getCoherenceScore(): number {
    return this.coherenceScore;
  }
  /** Relative bodily-stillness from the accelerometer (0..1) — the honest settle
   *  signal for the Muse path (Selah Task 2 fallback). */
  getStillness(): number {
    return this.stillnessValue;
  }
  get hasStillness(): boolean {
    return this.stillness.hasBaseline;
  }

  /** Full Athena metrics snapshot for the session metrics panel (raw signals). */
  getMetrics(): MuseMetrics {
    const ppg = this.device?.ppg ?? null;
    const fnirs = this.device?.fnirs ?? null;
    return {
      connected: this.connected,
      quality: this.quality,
      deltaRel: this.bands.deltaRel,
      thetaRel: this.bands.thetaRel,
      alphaRel: this.bands.alphaRel,
      betaRel: this.bands.betaRel,
      gammaRel: this.bands.gammaRel,
      thetaAlphaRatio: this.bands.thetaAlphaRatio,
      betaGammaRatio: this.bands.betaGammaRatio,
      plvCoherence: this.coherenceScore,
      stillness: this.stillnessValue,
      heartRate: ppg?.heartRate ?? null,
      hbo: fnirs?.lastHbO ?? null,
      hbr: fnirs?.lastHbR ?? null,
      battery: this.device?.battery ?? null,
    };
  }
  getPrescribedFrequencyIndex(): number {
    return this.prescribedIndex;
  }

  /** The continuous placement signal (pre-rescale resonance score + components +
   *  the discrete state/offset it resolved to). Null with no live EEG. Logged in
   *  parallel so the placement range can be calibrated from data. */
  getResonance(): ResonanceReadout | null {
    return this.connected ? this.prescriber.getLastReadout() : null;
  }

  /** A window of raw scalp samples [[TP9,AF7,AF8,TP10], ...] for the calibration
   *  gate (aetheria-signal.js). Null until a full 1s window has buffered. */
  getRawWindow(): number[][] | null {
    if (this.buffers.some((b) => b.length < WINDOW)) return null;
    const out: number[][] = new Array(WINDOW);
    for (let i = 0; i < WINDOW; i++) out[i] = [this.buffers[0][i], this.buffers[1][i], this.buffers[2][i], this.buffers[3][i]];
    return out;
  }

  /** Provenance snapshot for the session export (clean-vs-recovered disclosure). */
  getProvenance(): ProvenanceResult | null {
    return this.processor ? this.processor.finalize() : null;
  }
  getPrescribedFrequencyHz(): number {
    return this.freqTable.hz(this.prescribedIndex);
  }

  // ── Events ──

  on(event: EEGEvent, cb: Listener): void {
    const arr = this.listeners.get(event) ?? [];
    arr.push(cb);
    this.listeners.set(event, arr);
  }
  private emit(event: EEGEvent, payload?: unknown): void {
    for (const cb of this.listeners.get(event) ?? []) cb(payload);
  }

  // ── Internal: streaming ──

  private onStatus(s: string): void {
    if (s === 'disconnected' && this.connected) {
      this.connected = false;
      this.stopPipeline();
      this.emit('disconnected');
    }
  }

  private onEEG(d: AthenaEEGData): void {
    // Map incoming rows (label order) into our fixed [TP9,AF7,AF8,TP10] buffers.
    const idx = [
      d.labels.indexOf('TP9'),
      d.labels.indexOf('AF7'),
      d.labels.indexOf('AF8'),
      d.labels.indexOf('TP10'),
    ];
    // If any scalp label is missing from the stream, our label-based read would
    // fall back to 0 for it — flag it so setup can warn (never mismap silently).
    this.scalpMapped = idx.every((i) => i >= 0);
    for (const row of d.samples) {
      const ch = [0, 0, 0, 0];
      for (let c = 0; c < 4; c++) {
        const v = idx[c] >= 0 ? row[idx[c]] : 0;
        // Reject gross artifacts (Section 12.2).
        const clean = Math.abs(v) > ARTIFACT_UV ? 0 : v;
        this.buffers[c].push(clean);
        if (this.buffers[c].length > WINDOW) this.buffers[c].shift();
        ch[c] = idx[c] >= 0 ? row[idx[c]] : 0; // provenance sees the untouched raw
      }
      // Stream the raw scalp sample through the provenance processor (RAW is
      // sacred there; it discloses clean-vs-recovered, never alters our stream).
      this.processor?.push({ ch, acc: this.lastAcc ?? undefined });
    }
  }

  private onAccGyro(d: AthenaAccGyroData): void {
    // Feed accel magnitude into the relative stillness index (Selah fallback).
    for (const row of d.samples) {
      this.stillness.push(row[0] ?? 0, row[1] ?? 0, row[2] ?? 0);
    }
    const last = d.samples[d.samples.length - 1];
    if (last) this.lastAcc = [last[0] ?? 0, last[1] ?? 0, last[2] ?? 0];
  }

  private startPipeline(): void {
    if (this.timer !== null) return;
    this.timer = window.setInterval(() => this.process(), 1000 / UPDATE_HZ);
  }
  private stopPipeline(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private process(): void {
    if (this.buffers.some((b) => b.length < WINDOW)) return;

    // Per-channel quality from amplitude statistics.
    this.updateQuality();

    // Band powers averaged across the frontal pair (AF7, AF8), as athena does.
    const af7 = this.analyzer.analyzeChannel(this.buffers[1]);
    const af8 = this.analyzer.analyzeChannel(this.buffers[2]);
    const abs = BandPowerAnalyzer.average([af7, af8]);
    if (abs) this.bands = BandPowerAnalyzer.toBandPowerResult(abs);

    // Relative stillness from the accelerometer (the honest Muse settle signal).
    if (!this.stillness.hasBaseline) this.stillness.captureBaseline();
    const st = this.stillness.settledness();
    if (st != null) this.stillnessValue += (st - this.stillnessValue) * 0.4;

    // EEG coherence (PLV) across all 4 channels — retained for logging/context;
    // per the honest-claims rule it does NOT drive the gate (stillness does).
    const newCoh = this.coherence.compute(this.buffers);
    this.bands.overallCoherence = newCoh;

    const cohChanged = Math.abs(newCoh - this.coherenceScore) > 0.001;
    this.coherenceScore = newCoh;

    // Prescription.
    const newIdx = this.prescriber.prescribe(this.bands, this.regime, newCoh);
    const idxChanged = newIdx !== this.prescribedIndex;
    this.prescribedIndex = newIdx;

    // Build a representative latest sample for debug overlays.
    const b = this.buffers;
    this.latest = {
      tp9: b[0][b[0].length - 1],
      af7: b[1][b[1].length - 1],
      af8: b[2][b[2].length - 1],
      tp10: b[3][b[3].length - 1],
      timestamp: performance.now(),
      quality: this.quality,
    };

    // Calibration progress.
    if (this.calibrating) {
      const remain = this.calibUntil - performance.now();
      this.calibProgress = Math.min(1, 1 - remain / this.calibDurationMs);
      if (remain <= 0) {
        this.calibrating = false;
        this.calibProgress = 1;
      }
    }

    this.emit('eegData', this.bands);
    if (cohChanged) this.emit('coherenceChanged', newCoh);
    if (idxChanged) this.emit('frequencyChanged', newIdx);
  }

  private updateQuality(): void {
    const labels: (keyof ChannelQuality)[] = ['tp9', 'af7', 'af8', 'tp10'];
    for (let c = 0; c < 4; c++) {
      const buf = this.buffers[c];
      let mean = 0;
      for (const v of buf) mean += v;
      mean /= buf.length;
      let varSum = 0;
      let saturated = 0;
      for (const v of buf) {
        varSum += (v - mean) * (v - mean);
        if (Math.abs(v) >= ARTIFACT_UV || v === 0) saturated++;
      }
      const std = Math.sqrt(varSum / buf.length);
      // Healthy scalp EEG sits roughly 5–80 µV std. Map into 0..1, penalize
      // flat (electrode off) and saturated signals.
      let q = 0;
      if (std > 2 && std < 200) q = Math.min(1, (std - 2) / 30);
      q *= 1 - Math.min(1, saturated / buf.length);
      this.quality[labels[c]] = q;
    }
  }
}
