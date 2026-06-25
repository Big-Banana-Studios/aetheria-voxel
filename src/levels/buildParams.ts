/**
 * buildParams — per-level voxel-build parameters for all 27 levels (Phase 6).
 *
 * Frequency Hz, colors, thresholds, dwell bounds and binaural offset all come
 * from the frequency table (single source of truth); this only supplies the
 * deterministic build seed, sky preset, fog, soundscape, and puzzle counts,
 * derived per regime. The GUT-1 definition (definitions/gut1.ts) is kept as a
 * worked example; this generalizes it to every level.
 */
export type SkyPreset = 'subterranean' | 'golden' | 'starfield';

export interface LevelBuildParams {
  levelIndex: number;
  worldSeed: number;
  skyPreset: SkyPreset;
  fogDensity: number;
  baseOscillatorAmplitude: number;
  ambientSoundscape: string;
  numFrequencyPuzzles: number;
  numCoherenceChallenges: number;
}

export function buildParamsForLevel(index: number): LevelBuildParams {
  const regime = index < 9 ? 'GUT' : index < 18 ? 'HEART' : 'HEAD';
  const fogDensity = regime === 'GUT' ? 0.03 : regime === 'HEART' ? 0.018 : 0.012;
  const skyPreset: SkyPreset = regime === 'GUT' ? 'subterranean' : regime === 'HEART' ? 'golden' : 'starfield';
  const ambientSoundscape = regime === 'GUT' ? 'cave' : regime === 'HEART' ? 'garden' : 'void';
  return {
    levelIndex: index,
    // Deterministic, distinct per level.
    worldSeed: 1300 + index * 37,
    skyPreset,
    fogDensity,
    baseOscillatorAmplitude: 0.25,
    ambientSoundscape,
    // 3–5 resonance locks, varying gently across the regime.
    numFrequencyPuzzles: 3 + (index % 3),
    numCoherenceChallenges: 1,
  };
}
