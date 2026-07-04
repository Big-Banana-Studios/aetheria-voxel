/**
 * FrequencyPrescriber — neural state → 1 of 27 frequencies (Section 5.3).
 *
 * Ports the v1.0 pseudocode: classify the player's arousal/relaxation state
 * from the band ratios, map it to an offset within the current regime, and
 * ground the player (clamp toward the regime's lowest frequencies) when
 * coherence is low. The actual Hz values are looked up from the frequency table
 * by the caller — this only resolves the index 0..26.
 */
import type { BandPowerResult } from './types';

export enum NeuralState {
  HYPERAROUSED = 0,
  AROUSED = 1,
  ALERT = 2,
  NEUTRAL = 3,
  RELAXED = 4,
  DEEP_RELAXED = 5,
}

/**
 * Canonical resonance-score weights (Joseph's Aetheria RCT / Selah's calibration
 * guide). A named, documented constant — NEVER a magic number and NEVER
 * blind-edited. The score itself is logged in parallel (see resonanceScore); it
 * does not drive the game's discrete placement, so exposing it lets the placement
 * range be evaluated from real data before anyone touches a threshold. Weights
 * sum to 1.0, so the score sits in [0, 1] for relative band powers + coherence.
 */
export const RESONANCE_WEIGHTS = { alpha: 0.3, theta: 0.25, gamma: 0.1, coherence: 0.35 } as const;

/** A per-tick snapshot of the continuous placement signal (for the export). */
export interface ResonanceReadout {
  score: number; // pre-rescale weighted sum (RESONANCE_WEIGHTS)
  alpha: number; // relative alpha power (component)
  theta: number; // relative theta power
  gamma: number; // relative gamma power
  coherence: number; // EEG coherence (PLV) component
  state: string; // classified NeuralState name
  offset: number; // intra-regime offset 0..8 actually used (post grounding-clamp)
  rawIndex: number; // instantaneous placement 0..26 (pre-hysteresis)
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export class FrequencyPrescriber {
  private lastIndex = -1;
  private stableSince = 0; // hysteresis to avoid index flicker
  private lastReadout: ResonanceReadout | null = null; // continuous placement signal

  /**
   * The pre-rescale resonance score — the RCT's weighted sum of relative band
   * powers + EEG coherence (RESONANCE_WEIGHTS). Logged in parallel; exposing it
   * lets the placement range be calibrated from data (never blind-edited).
   */
  resonanceScore(bands: BandPowerResult, coherence: number): { score: number; alpha: number; theta: number; gamma: number; coherence: number } {
    const w = RESONANCE_WEIGHTS;
    const alpha = bands.alphaRel, theta = bands.thetaRel, gamma = bands.gammaRel;
    const score = w.alpha * alpha + w.theta * theta + w.gamma * gamma + w.coherence * coherence;
    return { score, alpha, theta, gamma, coherence };
  }

  /** The most recent continuous placement snapshot (or null before first prescribe). */
  getLastReadout(): ResonanceReadout | null {
    return this.lastReadout;
  }

  /** Classify arousal/relaxation from the relaxation (θ/α) + focus (β/γ) indices. */
  classifyState(bands: BandPowerResult): NeuralState {
    const relax = bands.thetaAlphaRatio; // higher → more relaxed/drowsy
    const beta = bands.betaRel;
    const gamma = bands.gammaRel;

    // High beta/gamma → aroused; high theta/alpha & low beta → deep relaxation.
    if (beta + gamma > 0.55) return NeuralState.HYPERAROUSED;
    if (beta + gamma > 0.42) return NeuralState.AROUSED;
    if (relax < 0.6) return NeuralState.ALERT;
    if (relax < 1.0) return NeuralState.NEUTRAL;
    if (relax < 1.6) return NeuralState.RELAXED;
    return NeuralState.DEEP_RELAXED;
  }

  /** Map state → an offset 0..8 within the regime (relaxed → higher slot). */
  private mapStateToOffset(state: NeuralState): number {
    switch (state) {
      case NeuralState.HYPERAROUSED: return 0;
      case NeuralState.AROUSED: return 1;
      case NeuralState.ALERT: return 3;
      case NeuralState.NEUTRAL: return 4;
      case NeuralState.RELAXED: return 6;
      case NeuralState.DEEP_RELAXED: return 8;
    }
  }

  /**
   * @param regime 0 = GUT, 1 = HEART, 2 = HEAD.
   * @returns frequency index 0..26.
   */
  prescribe(bands: BandPowerResult, regime: 0 | 1 | 2, coherence: number): number {
    const state = this.classifyState(bands);
    const regimeBase = regime * 9;
    let offset = this.mapStateToOffset(state);

    // Ground the player toward the regime's lowest frequencies when scattered.
    if (coherence < 0.3) offset = clamp(offset, 0, 2);

    const index = clamp(regimeBase + offset, 0, 26);

    // Cache the continuous placement signal for parallel logging (the pre-rescale
    // resonance score + the components + the discrete state/offset it resolved to).
    const rs = this.resonanceScore(bands, coherence);
    this.lastReadout = { ...rs, state: NeuralState[state], offset, rawIndex: index };

    // Hysteresis: only change the reported index after it has been stable for a
    // few calls, so the prescribed frequency doesn't jitter every tick.
    if (index === this.lastIndex) {
      this.stableSince = 0;
      return index;
    }
    this.stableSince++;
    if (this.stableSince >= 2 || this.lastIndex < 0) {
      this.lastIndex = index;
      this.stableSince = 0;
    }
    return this.lastIndex;
  }

  reset(): void {
    this.lastIndex = -1;
    this.stableSince = 0;
    this.lastReadout = null;
  }
}
