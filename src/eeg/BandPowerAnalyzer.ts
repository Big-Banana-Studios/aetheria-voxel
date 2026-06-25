/**
 * BandPowerAnalyzer — Welch-style band power (Section 5.2), ported from
 * athena-core.js computeBandPowers. 1s windows at 256 Hz, Hanning window,
 * 5 standard bands, run 4×/second by the caller.
 *
 * Produces absolute (proportional μV²/Hz) and relative band powers plus the
 * relaxation (θ/α) and focus (β/γ) ratios used by the prescriber.
 */
import { computePowerSpectrum } from './dsp';
import type { BandPowerResult } from './types';

const BANDS: Record<string, [number, number]> = {
  delta: [1, 4],
  theta: [4, 8],
  alpha: [8, 13],
  beta: [13, 30],
  gamma: [30, 50],
};

export class BandPowerAnalyzer {
  constructor(private fs = 256) {}

  /** Analyze one channel window → absolute band powers. */
  analyzeChannel(window: ArrayLike<number>): Record<string, number> | null {
    if (window.length < 64) return null;
    // Detrend (remove the mean) so DC offset / electrode drift doesn't swamp the
    // delta band and flatten the others.
    const n = window.length;
    let mean = 0;
    for (let i = 0; i < n; i++) mean += window[i];
    mean /= n;
    const detrended = new Float64Array(n);
    for (let i = 0; i < n; i++) detrended[i] = window[i] - mean;
    const { psd, freqs } = computePowerSpectrum(detrended, this.fs);
    const out: Record<string, number> = {};
    const binHz = freqs.length > 1 ? freqs[1] - freqs[0] : 1;
    for (const [name, [lo, hi]] of Object.entries(BANDS)) {
      let power = 0;
      for (let i = 0; i < freqs.length; i++) {
        if (freqs[i] >= lo && freqs[i] < hi) power += psd[i];
      }
      // Scale toward μV²/Hz (proportional; absolute calibration not required
      // for the gameplay metrics, only the ratios and relatives).
      out[name] = (power * binHz) / window.length;
    }
    return out;
  }

  /**
   * Combine per-channel absolute band powers (already averaged across the
   * frontal channels by the caller) into the full BandPowerResult.
   */
  static toBandPowerResult(abs: Record<string, number>): BandPowerResult {
    const delta = abs.delta ?? 0;
    const theta = abs.theta ?? 0;
    const alpha = abs.alpha ?? 0;
    const beta = abs.beta ?? 0;
    const gamma = abs.gamma ?? 0;
    const total = delta + theta + alpha + beta + gamma || 1e-9;

    const thetaAlphaRatio = alpha > 1e-9 ? theta / alpha : 0;
    const betaGammaRatio = gamma > 1e-9 ? beta / gamma : 0;

    return {
      delta, theta, alpha, beta, gamma,
      deltaRel: delta / total,
      thetaRel: theta / total,
      alphaRel: alpha / total,
      betaRel: beta / total,
      gammaRel: gamma / total,
      thetaAlphaRatio,
      betaGammaRatio,
      overallCoherence: 0, // filled by CoherenceCalculator
    };
  }

  /** Average a set of per-channel band-power maps. */
  static average(maps: (Record<string, number> | null)[]): Record<string, number> | null {
    const valid = maps.filter((m): m is Record<string, number> => m !== null);
    if (valid.length === 0) return null;
    const out: Record<string, number> = {};
    for (const key of Object.keys(BANDS)) {
      let sum = 0;
      for (const m of valid) sum += m[key] ?? 0;
      out[key] = sum / valid.length;
    }
    return out;
  }
}
