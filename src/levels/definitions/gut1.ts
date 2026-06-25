/**
 * GUT-1 — Volcanic Core (level index 0).
 *
 * Per-level build parameters only. Frequency Hz, colors, thresholds, and
 * binaural offset all come from the frequency table (single source of truth);
 * this module just supplies the voxel-build seed/sky/soundscape and puzzle
 * counts. Other levels are authored the same way (Phase 6).
 */
export const GUT1_BUILD = {
  levelIndex: 0,
  worldSeed: 1303,
  skyPreset: 'subterranean',
  fogDensity: 0.03, // lighter so the cavern stays legible — never lost (Selah)
  baseOscillatorAmplitude: 0.25,
  ambientSoundscape: 'cave',
  numFrequencyPuzzles: 4,
  numCoherenceChallenges: 1,
} as const;
