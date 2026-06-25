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

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export class FrequencyPrescriber {
  private lastIndex = -1;
  private stableSince = 0; // hysteresis to avoid index flicker

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
  }
}
