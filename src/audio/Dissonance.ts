/**
 * Dissonance.ts — sensory (acoustic) dissonance / roughness, the Sethares
 * implementation of the Plomp–Levelt critical-band model. This answers Selah's
 * Task 3 caution 3: packing ~27 notes into ~2 octaves can cause beating/mud when
 * tones sound together. This is a published, validated model (Sethares,
 * "Tuning, Timbre, Spectrum, Scale") — reused, not invented.
 *
 * Use it two ways:
 *   - build-time: scripts/chord-check.mjs runs it over the playback frequencies.
 *   - runtime: any future chord/drone feature should gate voicings through
 *     chordDissonance() before sounding them (single fundamental + harmonics,
 *     which the engine plays today, is consonant by construction).
 */

export interface Partial {
  f: number; // Hz
  a: number; // amplitude (linear)
}

// Sethares dissonance-curve constants.
const DSTAR = 0.24;
const S1 = 0.0207;
const S2 = 18.96;
const B1 = 3.51;
const B2 = 5.75;

/** Dissonance contributed by a single pair of partials. */
export function pairDissonance(f1: number, a1: number, f2: number, a2: number): number {
  const fmin = Math.min(f1, f2);
  const fmax = Math.max(f1, f2);
  const s = DSTAR / (S1 * fmin + S2);
  const df = fmax - fmin;
  const amp = Math.min(a1, a2); // loudness of the quieter partial gates roughness
  return amp * (Math.exp(-B1 * s * df) - Math.exp(-B2 * s * df));
}

/** Total sensory dissonance of a set of partials sounded together. */
export function chordDissonance(partials: Partial[]): number {
  let d = 0;
  for (let i = 0; i < partials.length; i++) {
    for (let j = i + 1; j < partials.length; j++) {
      d += pairDissonance(partials[i].f, partials[i].a, partials[j].f, partials[j].a);
    }
  }
  return d;
}

/**
 * Build the partials the audio engine actually emits for one tone: the
 * fundamental plus the 2×/3×/5× harmonics, with the engine's amplitude weights.
 * (Mirrors AudioStack: base ~0.27, harmonics 0.12/0.07/0.04.)
 */
export function tonePartials(fundamental: number, baseAmp = 0.27): Partial[] {
  return [
    { f: fundamental, a: baseAmp },
    { f: fundamental * 2, a: 0.12 },
    { f: fundamental * 3, a: 0.07 },
    { f: fundamental * 5, a: 0.04 },
  ];
}

/** Beat frequency between two fundamentals (Hz) — slow <1 Hz = phasing, ~2–30 Hz = rough. */
export function beatHz(f1: number, f2: number): number {
  return Math.abs(f1 - f2);
}
