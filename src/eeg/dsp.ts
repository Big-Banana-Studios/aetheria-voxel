/**
 * dsp.ts — FFT + spectral helpers, ported from athena-core.js (the validated
 * Coherence Lab driver). Per the Hard Rules we reuse this rather than
 * re-deriving PSD math. Pure and dependency-free.
 */

export function nextPow2(n: number): number {
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}

/** In-place iterative radix-2 Cooley–Tukey FFT (athena-core fftInPlace). */
export function fftInPlace(re: Float64Array, im: Float64Array): void {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
    if (i < j) {
      let t = re[i]; re[i] = re[j]; re[j] = t;
      t = im[i]; im[i] = im[j]; im[j] = t;
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wR = Math.cos(ang), wI = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cR = 1, cI = 0;
      const half = len >> 1;
      for (let j = 0; j < half; j++) {
        const k = i + j + half;
        const tR = re[k] * cR - im[k] * cI;
        const tI = re[k] * cI + im[k] * cR;
        re[k] = re[i + j] - tR;
        im[k] = im[i + j] - tI;
        re[i + j] += tR;
        im[i + j] += tI;
        const nR = cR * wR - cI * wI;
        cI = cR * wI + cI * wR;
        cR = nR;
      }
    }
  }
}

export interface PowerSpectrum {
  psd: Float64Array;
  freqs: Float64Array;
  N: number;
}

/** Hanning-windowed power spectrum (athena-core computePowerSpectrum). */
export function computePowerSpectrum(data: ArrayLike<number>, fs: number): PowerSpectrum {
  const n = data.length;
  const N = nextPow2(n);
  const re = new Float64Array(N);
  const im = new Float64Array(N);
  for (let i = 0; i < n; i++) {
    re[i] = data[i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1)));
  }
  fftInPlace(re, im);
  const nBins = (N >> 1) + 1;
  const psd = new Float64Array(nBins);
  const freqs = new Float64Array(nBins);
  for (let i = 0; i < nBins; i++) {
    psd[i] = re[i] * re[i] + im[i] * im[i];
    freqs[i] = (i * fs) / N;
  }
  return { psd, freqs, N };
}

/**
 * Band-limited analytic signal in the frequency domain (the spiral-wave.js
 * trick): FFT → keep only the band's positive-frequency bins (doubled) → IFFT.
 * Folds band-pass + Hilbert into one phase-accurate step. Returns instantaneous
 * phase per sample (radians).
 */
export function analyticPhase(
  data: ArrayLike<number>,
  fs: number,
  fLow: number,
  fHigh: number,
): Float64Array {
  const n = data.length;
  const N = nextPow2(n);
  const re = new Float64Array(N);
  const im = new Float64Array(N);
  for (let i = 0; i < n; i++) re[i] = data[i];
  fftInPlace(re, im);

  const loBin = Math.max(1, Math.floor((fLow * N) / fs));
  const hiBin = Math.min(N >> 1, Math.ceil((fHigh * N) / fs));

  const re2 = new Float64Array(N);
  const im2 = new Float64Array(N);
  // Keep band bins, double them (analytic signal), zero negatives & DC.
  for (let k = loBin; k <= hiBin; k++) {
    re2[k] = 2 * re[k];
    im2[k] = 2 * im[k];
  }
  // Inverse FFT: conjugate, forward, conjugate, scale.
  for (let k = 0; k < N; k++) im2[k] = -im2[k];
  fftInPlace(re2, im2);
  const phase = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    // After IFFT: real part / N, imag part / N (sign flipped back).
    const r = re2[i] / N;
    const ig = -im2[i] / N;
    phase[i] = Math.atan2(ig, r);
  }
  return phase;
}
