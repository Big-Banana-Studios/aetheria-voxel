/**
 * SubBass — canonical Aetheria grounding tone (SUB_BASS_IMPLEMENTATION.md).
 *
 * The sub-bass is NOT the audible carrier. It is an octave-derived sub-harmonic
 * of the true frequency, divided by powers of 2 until it lands in the theta-alpha
 * regulation zone (5–12 Hz, default 7–10) — the neurological sweet spot for
 * emotional regulation, felt rather than heard. Octave division preserves the
 * pitch-class, so it is harmonically locked to the carrier (one unified stack).
 *
 * A slow LFO amplitude-modulates it (the canonical `subBassDrone` AM tremolo) for
 * a living, breathing grounding presence. Transitions exponentially ramp (no clicks).
 */

export type SubBassMode = 'ambient' | 'sleep' | 'schumann';

export interface SubBassState {
  subHz: number;
  octavesDown: number;
  band: string;
  mode: SubBassMode;
}

function targetRange(mode: SubBassMode): { min: number; max: number } {
  switch (mode) {
    case 'sleep': return { min: 0.5, max: 4 }; // delta (deep-sleep override)
    case 'ambient':
    default: return { min: 7, max: 10 }; // theta-alpha crossover (default)
  }
}

function classifyBrainwave(hz: number): string {
  if (hz < 0.5) return 'infra';
  if (hz <= 4) return 'delta';
  if (hz <= 8) return 'theta';
  if (hz <= 12) return 'alpha';
  if (hz <= 30) return 'beta';
  return 'gamma';
}

/** Compute the sub-harmonic of a true frequency within the brainwave range. */
export function computeSubBass(hz: number, mode: SubBassMode = 'ambient'): SubBassState {
  if (mode === 'schumann') {
    return { subHz: 7.83, octavesDown: 0, band: 'theta', mode };
  }
  if (hz <= 0) return { subHz: 0, octavesDown: 0, band: 'infra', mode };
  const range = targetRange(mode);
  let sub = hz;
  let octaves = 0;
  while (sub > range.max) { sub /= 2; octaves++; }
  if (sub < range.min && octaves > 0) { sub *= 2; octaves--; }
  return { subHz: sub, octavesDown: octaves, band: classifyBrainwave(sub), mode };
}

const SUB_BASS_GAIN: Record<SubBassMode, number> = { ambient: 0.1, sleep: 0.08, schumann: 0.1 };

export class SubBass {
  private osc: OscillatorNode;
  private gain: GainNode;
  private amGain: GainNode;
  private lfo: OscillatorNode;
  private lfoGain: GainNode;
  private started = false;
  private mode: SubBassMode = 'ambient';
  private state: SubBassState = { subHz: 0, octavesDown: 0, band: 'infra', mode: 'ambient' };

  constructor(private ctx: AudioContext, destination: AudioNode) {
    this.osc = ctx.createOscillator();
    this.osc.type = 'sine'; // pure sine — no interfering harmonics
    this.osc.frequency.value = 8;

    // amGain is modulated by the LFO for a slow breathing tremolo.
    this.amGain = ctx.createGain();
    this.amGain.gain.value = 1;
    this.lfo = ctx.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.value = 0.12; // ~8s breath cycle
    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.value = 0.25; // modulation depth
    this.lfo.connect(this.lfoGain).connect(this.amGain.gain);

    this.gain = ctx.createGain();
    this.gain.gain.value = 0; // faded in on start

    this.osc.connect(this.amGain).connect(this.gain).connect(destination);
  }

  start(): void {
    if (this.started) return;
    this.osc.start();
    this.lfo.start();
    this.started = true;
    this.gain.gain.setTargetAtTime(SUB_BASS_GAIN[this.mode], this.ctx.currentTime, 1.5);
  }

  setMode(mode: SubBassMode): void {
    this.mode = mode;
    this.gain.gain.setTargetAtTime(SUB_BASS_GAIN[mode], this.ctx.currentTime, 0.5);
  }

  /** Update from the active TRUE frequency; smooth exponential ramp (canonical). */
  setFrequency(trueHz: number, durationSec = 8): void {
    this.state = computeSubBass(trueHz, this.mode);
    if (this.state.subHz <= 0) {
      this.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      return;
    }
    const t = this.ctx.currentTime;
    this.osc.frequency.cancelScheduledValues(t);
    this.osc.frequency.setValueAtTime(Math.max(0.5, this.osc.frequency.value), t);
    this.osc.frequency.exponentialRampToValueAtTime(this.state.subHz, t + durationSec);
    if (this.started) this.gain.gain.setTargetAtTime(SUB_BASS_GAIN[this.mode], t, 0.5);
  }

  getState(): SubBassState {
    return this.state;
  }

  stop(): void {
    if (!this.started) return;
    try { this.osc.stop(); this.lfo.stop(); } catch { /* already stopped */ }
    this.started = false;
  }
}
