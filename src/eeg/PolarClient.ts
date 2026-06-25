/**
 * PolarClient — wraps the ported polar-h10.js driver and turns its R-R interval
 * stream into a live HRV "settledness" signal, 0..1.
 *
 * Per Selah's signal guide, the honest, validated metric is short-term **RMSSD**
 * (the standard parasympathetic / bodily-settling index), expressed **relative
 * to the player's own baseline** — never an absolute threshold. Slow rhythmic
 * breathing raises RMSSD above baseline → "settled." The honest claim is that
 * the body has settled, NOT a brain-state or attainment.
 *
 * This is a real biosignal that enhances BOTH the EEG and Manual paths and is
 * especially meaningful in the HEART regime. It is fused with the EEG/behaviour
 * settling signal by the Game (it does not drive frequency prescription).
 */
import { EventBus } from './EventBus';
import type { PolarH10 as PolarH10Type, AetheriaRRPayload } from './polar-h10';
import { PolarH10 } from './polar-h10.js';

const WINDOW_SEC = 45; // RMSSD needs ~30-45s of beats to be stable
const MIN_BEATS = 8;
const SETTLE_RATIO = 1.5; // RMSSD this far above baseline → fully "settled"
const RR_MIN_MS = 300;
const RR_MAX_MS = 2000;

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

type Listener = () => void;

export class PolarClient {
  private bus = new EventBus();
  private device: PolarH10Type;
  private times: number[] = []; // cumulative beat times (s)
  private rr: number[] = []; // R-R intervals (ms)
  private tAccum = 0;
  private bpm = 0;
  private settledness = 0.0; // 0..1 relative to baseline
  private baseline: number | null = null; // baseline RMSSD (ms)
  private connected = false;
  private recomputeAccum = 0;
  private listeners = new Map<string, Listener[]>();

  constructor() {
    this.device = new PolarH10(this.bus) as unknown as PolarH10Type;
    this.bus.subscribe('Aetheria_RR', (p) => this.onRR(p as AetheriaRRPayload));
    this.bus.subscribe('Aetheria_State', (p) => this.onState(p));
  }

  static get isSupported(): boolean {
    return typeof navigator !== 'undefined' && !!(navigator as { bluetooth?: unknown }).bluetooth;
  }

  async connect(): Promise<boolean> {
    if (!PolarClient.isSupported) return false;
    try {
      await this.device.connect();
      this.connected = this.device.isConnected;
      if (this.connected) this.emit('connected');
      return this.connected;
    } catch (err) {
      console.error('[Aetheria] Polar H10 connect failed:', err);
      return false;
    }
  }

  disconnect(): void {
    this.device.disconnect().catch(() => {});
    this.connected = false;
    this.emit('disconnected');
  }

  get isConnected(): boolean {
    return this.connected && this.device.isConnected;
  }
  get contactQuality(): number {
    return this.device.contactQuality;
  }
  get heartRate(): number {
    return this.bpm;
  }
  /** 0..1 bodily-settling signal (RMSSD relative to the player's baseline). */
  getSettledness(): number {
    return this.settledness;
  }
  /** Current short-term RMSSD in ms (for logging), or null if insufficient data. */
  getRmssd(): number | null {
    return this.computeRmssd();
  }
  get baselineRmssd(): number | null {
    return this.baseline;
  }
  get hasBaseline(): boolean {
    return this.baseline != null;
  }
  /** Capture the player's settle baseline (call after a short settle at entry). */
  captureBaseline(): void {
    const v = this.computeRmssd();
    if (v != null) this.baseline = v;
  }

  on(event: 'connected' | 'disconnected', cb: Listener): void {
    const arr = this.listeners.get(event) ?? [];
    arr.push(cb);
    this.listeners.set(event, arr);
  }
  private emit(event: string): void {
    for (const cb of this.listeners.get(event) ?? []) cb();
  }

  private onState(p: unknown): void {
    const s = p as { type?: string; status?: string };
    if (s?.type === 'sensor_status' && s.status === 'disconnected' && this.connected) {
      this.connected = false;
      this.emit('disconnected');
    }
  }

  private onRR(p: AetheriaRRPayload): void {
    if (typeof p.hr_bpm === 'number' && p.hr_bpm > 0) this.bpm = p.hr_bpm;
    if (p.rr_ms == null) return;
    // Reject artifacts (ectopic beats / motion) before they poison RMSSD.
    if (p.rr_ms < RR_MIN_MS || p.rr_ms > RR_MAX_MS) return;
    this.tAccum += p.rr_ms / 1000;
    this.times.push(this.tAccum);
    this.rr.push(p.rr_ms);
    // Trim to the analysis window.
    const cutoff = this.tAccum - WINDOW_SEC;
    while (this.times.length && this.times[0] < cutoff) {
      this.times.shift();
      this.rr.shift();
    }
  }

  /** Recompute settledness roughly once per second. */
  update(dt: number): void {
    this.recomputeAccum += dt;
    if (this.recomputeAccum < 1) return;
    this.recomputeAccum = 0;

    // Auto-capture a baseline once enough beats have accrued (relative, never
    // absolute — the gate compares you to your own start, not a fixed number).
    if (this.baseline == null) this.captureBaseline();

    const target = this.computeSettledness();
    // Smooth toward the new value for a calm meter.
    this.settledness += (target - this.settledness) * 0.4;
  }

  /** Short-term RMSSD over the rolling window (ms), or null if insufficient. */
  private computeRmssd(): number | null {
    if (this.rr.length < MIN_BEATS) return null;
    let sum = 0;
    let n = 0;
    for (let k = 1; k < this.rr.length; k++) {
      const d = this.rr[k] - this.rr[k - 1];
      sum += d * d;
      n++;
    }
    return n ? Math.sqrt(sum / n) : null;
  }

  /** Settledness 0..1 = how far RMSSD has risen above the player's baseline. */
  private computeSettledness(): number {
    const v = this.computeRmssd();
    if (v == null || !this.baseline) return this.settledness;
    return clamp((v / this.baseline - 1) / (SETTLE_RATIO - 1), 0, 1);
  }
}
