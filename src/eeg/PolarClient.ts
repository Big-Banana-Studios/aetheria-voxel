/**
 * PolarClient — wraps the ported polar-h10.js driver and turns its R-R interval
 * stream into a live HRV (heart) coherence score, 0..1.
 *
 * Method: build the R-R tachogram, resample to an even 4 Hz series, and measure
 * the fraction of spectral power concentrated in a single dominant peak within
 * the 0.04–0.26 Hz HRV band (the HeartMath-style "coherence ratio"). Slow,
 * rhythmic, resonant-frequency breathing (~0.1 Hz) produces a tall narrow peak →
 * high coherence. Reuses the FFT ported in dsp.ts (reuse, don't re-derive).
 *
 * This is a real biosignal that enhances BOTH the EEG and Manual paths and is
 * especially meaningful in the HEART regime. It is fused with the EEG/behaviour
 * coherence by the Game (it does not replace frequency prescription).
 */
import { EventBus } from './EventBus';
import type { PolarH10 as PolarH10Type, AetheriaRRPayload } from './polar-h10';
import { PolarH10 } from './polar-h10.js';
import { computePowerSpectrum } from './dsp';

const WINDOW_SEC = 32; // analysis window
const RESAMPLE_HZ = 4;
const MIN_BEATS = 12;
const COH_LO = 0.04;
const COH_HI = 0.26;
const PEAK_HALF_WIDTH = 0.03; // Hz window around the dominant peak

type Listener = () => void;

export class PolarClient {
  private bus = new EventBus();
  private device: PolarH10Type;
  private times: number[] = []; // cumulative beat times (s)
  private rr: number[] = []; // R-R intervals (ms)
  private tAccum = 0;
  private bpm = 0;
  private coherence = 0.12;
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
  getHeartCoherence(): number {
    return this.coherence;
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

  /** Recompute coherence roughly once per second. */
  update(dt: number): void {
    this.recomputeAccum += dt;
    if (this.recomputeAccum < 1) return;
    this.recomputeAccum = 0;
    const target = this.computeCoherence();
    // Smooth toward the new value for a calm meter.
    this.coherence += (target - this.coherence) * 0.4;
  }

  private computeCoherence(): number {
    if (this.rr.length < MIN_BEATS) {
      // Gently rise toward a neutral baseline until enough beats accrue.
      return 0.25;
    }
    const t0 = this.times[0];
    const tEnd = this.times[this.times.length - 1];
    const span = tEnd - t0;
    if (span < 12) return 0.25;

    // Resample the tachogram to an even RESAMPLE_HZ series via linear interp.
    const n = Math.floor(span * RESAMPLE_HZ);
    if (n < 32) return this.coherence;
    const series = new Float64Array(n);
    let j = 0;
    for (let i = 0; i < n; i++) {
      const t = t0 + i / RESAMPLE_HZ;
      while (j < this.times.length - 1 && this.times[j + 1] < t) j++;
      const t1 = this.times[j];
      const t2 = this.times[Math.min(j + 1, this.times.length - 1)];
      const v1 = this.rr[j];
      const v2 = this.rr[Math.min(j + 1, this.rr.length - 1)];
      series[i] = t2 > t1 ? v1 + ((v2 - v1) * (t - t1)) / (t2 - t1) : v1;
    }

    // Detrend (remove mean).
    let mean = 0;
    for (let i = 0; i < n; i++) mean += series[i];
    mean /= n;
    for (let i = 0; i < n; i++) series[i] -= mean;

    const { psd, freqs } = computePowerSpectrum(series, RESAMPLE_HZ);

    // Find the dominant peak inside the HRV coherence band.
    let peakIdx = -1;
    let peakVal = 0;
    let totalPower = 0;
    for (let i = 0; i < freqs.length; i++) {
      const f = freqs[i];
      if (f < COH_LO || f > 0.4) continue;
      totalPower += psd[i];
      if (f >= COH_LO && f <= COH_HI && psd[i] > peakVal) {
        peakVal = psd[i];
        peakIdx = i;
      }
    }
    if (peakIdx < 0 || totalPower <= 1e-12) return 0.15;

    const peakF = freqs[peakIdx];
    let peakBand = 0;
    for (let i = 0; i < freqs.length; i++) {
      if (Math.abs(freqs[i] - peakF) <= PEAK_HALF_WIDTH) peakBand += psd[i];
    }

    // Coherence = fraction of band power concentrated in the dominant peak.
    const score = peakBand / totalPower;
    return Math.max(0, Math.min(1, score));
  }
}
