/**
 * Oscillator — a pure Web Audio sine at any frequency (Section 7.2, L1).
 *
 * Frequencies come from the 432-based table; nothing is hard-tuned to 440.
 * Amplitude and frequency changes use short ramps to avoid clicks (< 20 ms
 * audio latency target, Section 11.2).
 */
export class Oscillator {
  private osc: OscillatorNode;
  private gain: GainNode;
  private started = false;

  constructor(
    private ctx: AudioContext,
    destination: AudioNode,
    freq = 0,
    type: OscillatorType = 'sine',
  ) {
    this.osc = ctx.createOscillator();
    this.osc.type = type;
    this.osc.frequency.value = freq;
    this.gain = ctx.createGain();
    this.gain.gain.value = 0;
    this.osc.connect(this.gain);
    this.gain.connect(destination);
  }

  start(): void {
    if (this.started) return;
    this.osc.start();
    this.started = true;
  }

  setFrequency(hz: number, ramp = 0.08): void {
    if (hz <= 0) {
      // No valid frequency (placeholder table) — silence rather than emit 0 Hz.
      this.setAmplitude(0, ramp);
      return;
    }
    const t = this.ctx.currentTime;
    this.osc.frequency.cancelScheduledValues(t);
    this.osc.frequency.setTargetAtTime(hz, t, ramp);
  }

  setAmplitude(a: number, ramp = 0.1): void {
    const t = this.ctx.currentTime;
    this.gain.gain.cancelScheduledValues(t);
    this.gain.gain.setTargetAtTime(Math.max(0, a), t, ramp);
  }

  get node(): GainNode {
    return this.gain;
  }

  stop(): void {
    if (!this.started) return;
    try {
      this.osc.stop();
    } catch {
      /* already stopped */
    }
    this.started = false;
  }
}
