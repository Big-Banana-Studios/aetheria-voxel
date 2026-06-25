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
import type { AthenaDevice, AthenaEEGData, AthenaAccGyroData } from './athena-core';
import { BandPowerAnalyzer } from './BandPowerAnalyzer';
import { CoherenceCalculator } from './CoherenceCalculator';
import { FrequencyPrescriber } from './FrequencyPrescriber';
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

  // Calibration (Section 12.2 — avoid recalibrating each session).
  private calibrating = false;
  private calibProgress = 0;
  private calibUntil = 0;

  constructor(private freqTable: FrequencyTable) {}

  static get isSupported(): boolean {
    return typeof navigator !== 'undefined' && !!navigator.bluetooth;
  }

  setRegime(regime: 0 | 1 | 2): void {
    this.regime = regime;
    this.prescriber.reset();
  }

  // ── Connection ──

  async connect(): Promise<boolean> {
    if (!MuseClient.isSupported || !window.AthenaDevice) {
      console.warn('[Aetheria] Web Bluetooth unavailable — use Manual Mode.');
      return false;
    }
    try {
      this.device = new window.AthenaDevice({
        preset: 'p1041',
        dcOffset: true, // subtract DC at decode so band powers aren't delta-swamped
        processInterval: 1000,
        onEEG: (d) => this.onEEG(d),
        onAccGyro: (d) => this.onAccGyro(d),
        onStatus: (s) => this.onStatus(s),
        onLog: () => {},
      });
      await this.device.connect();
      await this.device.startStream();
      this.connected = true;
      this.startPipeline();
      this.emit('connected');
      return true;
    } catch (err) {
      console.error('[Aetheria] Muse connect failed:', err);
      this.connected = false;
      return false;
    }
  }

  disconnect(): void {
    this.stopPipeline();
    if (this.device) {
      this.device.disconnect().catch(() => {});
      this.device = null;
    }
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

  startCalibration(seconds = 30): void {
    this.calibrating = true;
    this.calibProgress = 0;
    this.calibUntil = performance.now() + seconds * 1000;
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
    for (const row of d.samples) {
      for (let c = 0; c < 4; c++) {
        const v = idx[c] >= 0 ? row[idx[c]] : 0;
        // Reject gross artifacts (Section 12.2).
        const clean = Math.abs(v) > ARTIFACT_UV ? 0 : v;
        this.buffers[c].push(clean);
        if (this.buffers[c].length > WINDOW) this.buffers[c].shift();
      }
    }
  }

  private onAccGyro(d: AthenaAccGyroData): void {
    // Feed accel magnitude into the relative stillness index (Selah fallback).
    for (const row of d.samples) {
      this.stillness.push(row[0] ?? 0, row[1] ?? 0, row[2] ?? 0);
    }
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
      this.calibProgress = Math.min(1, 1 - remain / 30000);
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
