/**
 * AudioStack — the layered Web Audio graph (Section 7.2), mixed by coherence
 * (Section 7.3). All tones are generated natively at the 432-based table values,
 * so nothing needs 440→432 correction.
 *
 * Layers implemented:
 *   L1 Base Oscillator   — pure sine at the prescribed frequency
 *   L2 Binaural Beat     — fixed offset entrainment
 *   L3 Harmonic Series   — 2×, 3×, 5× overtones, amplitude scales with coherence
 *   L4 Ambient Bed       — filtered noise room tone
 *   L7 UI/Feedback       — short synth chimes for puzzle events
 *
 * Coherence-reactive mixing follows the 0.0–1.0 brackets in Section 7.3: thin &
 * slightly dissonant when low, full and harmonious when high.
 */
import { Oscillator } from './Oscillator';
import { BinauralBeat } from './BinauralBeat';

export class AudioStack {
  readonly ctx: AudioContext;
  private master: GainNode;

  private base: Oscillator;
  private binaural: BinauralBeat;
  private harmonics: Oscillator[] = [];
  private ambientGain: GainNode;
  private ambientSource: AudioBufferSourceNode | null = null;

  private currentHz = 0;
  private coherence = 0;
  private masterVolume = 0.6;
  private running = false;

  constructor() {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();

    this.master = this.ctx.createGain();
    this.master.gain.value = this.masterVolume;
    this.master.connect(this.ctx.destination);

    // L1 base.
    this.base = new Oscillator(this.ctx, this.master, 0, 'sine');
    // L2 binaural.
    this.binaural = new BinauralBeat(this.ctx, this.master);
    // L3 harmonics (2×, 3×, 5×).
    for (let i = 0; i < 3; i++) {
      this.harmonics.push(new Oscillator(this.ctx, this.master, 0, 'sine'));
    }
    // L4 ambient bed.
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 0;
    this.ambientGain.connect(this.master);
  }

  /** Must be called from a user gesture (resume the context). */
  async start(): Promise<void> {
    if (this.running) return;
    await this.ctx.resume();
    this.base.start();
    this.binaural.start();
    for (const h of this.harmonics) h.start();
    this.startAmbientBed();
    this.running = true;
    this.applyMix();
  }

  setMasterVolume(v: number): void {
    this.masterVolume = Math.max(0, Math.min(1, v));
    this.master.gain.setTargetAtTime(this.masterVolume, this.ctx.currentTime, 0.1);
  }

  setBinauralOffset(hz: number): void {
    this.binaural.setOffset(hz);
  }

  /** Wire the prescribed frequency → all pitched layers (Section 5.1). */
  setFrequency(hz: number): void {
    this.currentHz = hz;
    this.base.setFrequency(hz);
    this.binaural.setCarrier(hz);
    const mults = [2, 3, 5];
    this.harmonics.forEach((h, i) => h.setFrequency(hz > 0 ? hz * mults[i] : 0));
    this.applyMix();
  }

  setCoherence(c: number): void {
    this.coherence = Math.max(0, Math.min(1, c));
    this.applyMix();
  }

  /**
   * Coherence-reactive layer mixing (Section 7.3). Amplitudes are deliberately
   * gentle — this is a therapeutic soundscape, never loud (Section 14.4).
   */
  private applyMix(): void {
    if (!this.running) return;
    const c = this.coherence;
    const silent = this.currentHz <= 0;

    // L1 base swells from quiet to present.
    this.base.setAmplitude(silent ? 0 : 0.05 + 0.22 * c);

    // L2 binaural fades in after ~0.2.
    const binAmt = silent ? 0 : Math.max(0, (c - 0.2) / 0.8) * 0.18;
    this.binaural.setAmplitude(binAmt);

    // L3 harmonics emerge after ~0.4 (2× strongest, then 3×, 5×).
    // The 2× harmonic keeps a small always-on floor so the felt sub-bass carrier
    // (~27–110 Hz) is still audible on laptop/phone speakers, which can't
    // reproduce it (Selah Task 3, caution 1). Headphones/sub render the carrier.
    const harmBase = silent ? 0 : Math.max(0, (c - 0.4) / 0.6);
    const weights = [0.12, 0.07, 0.04];
    this.harmonics.forEach((h, i) => {
      const floor = i === 0 && !silent ? 0.05 : 0;
      h.setAmplitude(Math.max(floor, harmBase * weights[i]));
    });

    // L4 ambient bed clears as coherence rises (louder/murkier when low).
    this.ambientGain.gain.setTargetAtTime(
      0.06 + 0.05 * (1 - c),
      this.ctx.currentTime,
      0.3,
    );
  }

  // ── L4 ambient bed: looping filtered noise ──
  private startAmbientBed(): void {
    if (this.ambientSource) return;
    const seconds = 4;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * seconds, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Brown-ish noise for a soft room tone (no startle content, Section 14.4).
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    src.connect(lp).connect(this.ambientGain);
    src.start();
    this.ambientSource = src;
  }

  /** L7: a short, soft chime for puzzle/feedback events (432-tuned). */
  chime(hz = 432, duration = 0.6): void {
    if (!this.running || hz <= 0) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  dispose(): void {
    this.base.stop();
    this.binaural.stop();
    for (const h of this.harmonics) h.stop();
    if (this.ambientSource) {
      try { this.ambientSource.stop(); } catch { /* noop */ }
    }
    this.ctx.close().catch(() => {});
  }
}
