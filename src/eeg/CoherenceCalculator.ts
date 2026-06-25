/**
 * CoherenceCalculator — cross-channel coherence → 0..1 (Section 5.1).
 *
 * Ported in spirit from spiral-wave.js: build band-limited analytic signals in
 * the frequency domain and measure phase-locking value (PLV) across the 6
 * channel pairs. We average PLV over the theta + alpha bands (the rhythms most
 * associated with meditative coherence) to produce a single 0..1 score, then
 * lightly smooth it for a calm meter.
 */
import { analyticPhase } from './dsp';

const PAIRS: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 2], [1, 3],
  [2, 3],
];

const COH_BANDS: [number, number][] = [
  [4, 8], // theta
  [8, 13], // alpha
];

export class CoherenceCalculator {
  private smoothed = 0;
  constructor(private fs = 256, private smoothing = 0.25) {}

  /**
   * channels: 4 windows in order [TP9, AF7, AF8, TP10], each ≥1s at fs.
   * Returns a smoothed coherence in 0..1.
   */
  compute(channels: ArrayLike<number>[]): number {
    if (channels.length < 4 || channels.some((c) => c.length < 64)) {
      return this.smoothed;
    }

    let plvSum = 0;
    let plvCount = 0;

    for (const [lo, hi] of COH_BANDS) {
      const phases = channels.map((c) => analyticPhase(c, this.fs, lo, hi));
      const n = Math.min(...phases.map((p) => p.length));
      for (const [a, b] of PAIRS) {
        let sumRe = 0;
        let sumIm = 0;
        for (let i = 0; i < n; i++) {
          const d = phases[a][i] - phases[b][i];
          sumRe += Math.cos(d);
          sumIm += Math.sin(d);
        }
        const plv = Math.sqrt(sumRe * sumRe + sumIm * sumIm) / n;
        plvSum += plv;
        plvCount++;
      }
    }

    const raw = plvCount > 0 ? plvSum / plvCount : 0;
    // PLV across noisy 4-channel montages rarely hits the extremes; gently
    // expand the usable mid-range so the meter feels responsive.
    const expanded = Math.min(1, Math.max(0, (raw - 0.1) / 0.75));

    this.smoothed += (expanded - this.smoothed) * this.smoothing;
    return this.smoothed;
  }

  reset(): void {
    this.smoothed = 0;
  }
}
