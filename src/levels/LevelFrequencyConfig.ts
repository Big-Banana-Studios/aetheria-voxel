/**
 * LevelFrequencyConfig — per-level data (Section 4.2).
 *
 * Most fields are sourced from the frequency table (single source of truth);
 * the level definition module adds the voxel-build parameters (seed, palette
 * hints, puzzle layout). frequencyHz is NEVER hardcoded here — it is resolved
 * from the table at load time.
 */
import type { FrequencyEntry } from '../core/FrequencyTable';

export interface LevelFrequencyConfig {
  levelIndex: number; // 0..26
  levelName: string;
  regime: 'GUT' | 'HEART' | 'HEAD';
  frequencyHz: number; // from data file — resolved at load, never hardcoded
  digitalRoot: 3 | 6 | 9;
  therapeuticTarget: string;
  solfeggioNote?: string;

  // Environment
  primaryColor: string;
  secondaryColor: string;
  ambientColor: string;
  fogDensity: number;
  worldSeed: number;
  skyPreset: string;

  // Audio
  baseOscillatorAmplitude: number;
  binauralBeatOffset: number; // Hz
  ambientSoundscape: string;

  // Gameplay
  coherenceThreshold: number; // 0..1
  sustainedSeconds: number;
  numFrequencyPuzzles: number; // 3..5
  numCoherenceChallenges: number; // 1
}

/** Merge a frequency-table entry with level-build params into a full config. */
export function buildConfig(
  entry: FrequencyEntry,
  build: {
    worldSeed: number;
    skyPreset: string;
    fogDensity?: number;
    baseOscillatorAmplitude?: number;
    ambientSoundscape?: string;
    numFrequencyPuzzles?: number;
    numCoherenceChallenges?: number;
  },
): LevelFrequencyConfig {
  return {
    levelIndex: entry.index,
    levelName: entry.level_name,
    regime: entry.regime,
    frequencyHz: entry.frequency_hz, // resolved from the table
    digitalRoot: entry.digital_root,
    therapeuticTarget: entry.therapeutic_target,
    solfeggioNote: entry.solfeggio_note,
    primaryColor: entry.primary_color,
    secondaryColor: entry.secondary_color,
    ambientColor: entry.ambient_color,
    fogDensity: build.fogDensity ?? 0.03,
    worldSeed: build.worldSeed,
    skyPreset: build.skyPreset,
    baseOscillatorAmplitude: build.baseOscillatorAmplitude ?? 0.25,
    binauralBeatOffset: entry.binaural_offset_hz,
    ambientSoundscape: build.ambientSoundscape ?? 'cave',
    coherenceThreshold: entry.coherence_threshold,
    sustainedSeconds: entry.sustained_seconds,
    numFrequencyPuzzles: build.numFrequencyPuzzles ?? 4,
    numCoherenceChallenges: build.numCoherenceChallenges ?? 1,
  };
}
