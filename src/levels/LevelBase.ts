/**
 * LevelBase — base class for all 27 levels (Section 4.2, replaces
 * AAetheriaLevelBase). Loads a LevelFrequencyConfig, builds the environment,
 * hooks the coherence source, and tracks completion: puzzles solved + coherence
 * gate opened + coherence sustained in the meditation space (Section 10.2).
 *
 * No fail states, no timers counting down — only thresholds that must be
 * gently sustained (Section 14.2).
 */
import * as THREE from 'three';
import type { World } from '../voxel/World';
import type { AudioStack } from '../audio/AudioStack';
import type { CoherenceSource, BandPowerResult } from '../eeg/types';
import type { PlayerController } from '../core/PlayerController';
import type { LevelFrequencyConfig } from './LevelFrequencyConfig';
import type { FrequencyTable } from '../core/FrequencyTable';

export interface LevelContext {
  world: World;
  scene: THREE.Scene;
  propGroup: THREE.Group;
  audio: AudioStack;
  player: PlayerController;
  freqTable: FrequencyTable;
  getSource: () => CoherenceSource;
  /** Narrative beats from the Resonance (Section 6.3). */
  speak: (line: string) => void;
}

export abstract class LevelBase {
  levelIndex: number;
  config: LevelFrequencyConfig;
  currentCoherence = 0;
  coherenceThreshold: number;
  timeInLevel = 0;
  isComplete = false;

  protected ctx: LevelContext;
  protected sustainedCoherenceTimer = 0; // seconds above threshold in meditation
  protected requiredSustainedSeconds: number;
  protected inMeditationSpace = false;
  private completionReported = false;

  // Guaranteed-progress bounds (Selah Task 2): a minimum dwell floor so the
  // player actually experiences the space, and a maximum dwell ceiling so the
  // level is NEVER a wall — it completes eventually no matter the signal.
  protected meditationDwell = 0; // seconds spent in the meditation space
  protected minDwellSeconds: number;
  protected maxDwellSeconds: number;
  /** How the level completed, for honest logging: 'settled' | 'ceiling'. */
  completedBy: 'settled' | 'ceiling' | null = null;

  onComplete?: (level: LevelBase) => void;

  constructor(config: LevelFrequencyConfig, ctx: LevelContext) {
    this.config = config;
    this.levelIndex = config.levelIndex;
    this.ctx = ctx;
    this.coherenceThreshold = config.coherenceThreshold;
    this.requiredSustainedSeconds = config.sustainedSeconds;
    this.minDwellSeconds = config.minDwellSeconds;
    this.maxDwellSeconds = config.maxDwellSeconds;
  }

  /** Build the voxel environment + reactive props. */
  abstract build(): void;

  // Reactive hooks (Section 4.2).
  abstract onCoherenceChanged(c: number): void;
  abstract onFrequencyPrescribed(freqIndex: number): void;
  abstract onLevelComplete(): void;
  abstract onMeditationSpaceEntered(): void;

  /** Whether every frequency puzzle has been solved. */
  abstract get allPuzzlesSolved(): boolean;
  /** Whether the coherence gate has opened. */
  abstract get gateOpened(): boolean;
  /** Distance test: is the player standing in the meditation space? */
  protected abstract playerInMeditationSpace(): boolean;

  /** Per-frame update; pulls live values from the active coherence source. */
  update(dt: number, _freqIndex: number, coherence: number, bands: BandPowerResult): void {
    this.timeInLevel += dt;
    this.processEEGState(bands, coherence);

    // Meditation-space tracking → completion.
    const inside = this.playerInMeditationSpace();
    if (inside && !this.inMeditationSpace) {
      this.inMeditationSpace = true;
      this.onMeditationSpaceEntered();
    } else if (!inside) {
      this.inMeditationSpace = false;
    }

    if (this.inMeditationSpace) {
      this.meditationDwell += dt; // total dwell drives the ceiling
      if (coherence >= this.coherenceThreshold) {
        this.sustainedCoherenceTimer += dt;
      } else {
        // Decay gently — never a hard reset (Section 14.2).
        this.sustainedCoherenceTimer = Math.max(0, this.sustainedCoherenceTimer - dt * 0.5);
      }
    }

    if (!this.isComplete && this.checkCompletion()) {
      this.isComplete = true;
      if (!this.completionReported) {
        this.completionReported = true;
        this.onLevelComplete();
        this.onComplete?.(this);
      }
    }
  }

  protected processEEGState(bands: BandPowerResult, coherence: number): void {
    this.currentCoherence = coherence;
    this.onCoherenceChanged(coherence);
    void bands;
  }

  protected checkCompletion(): boolean {
    if (!this.allPuzzlesSolved || !this.gateOpened) return false;
    // Must dwell at least the floor so the space is actually experienced.
    if (this.meditationDwell < this.minDwellSeconds) return false;
    // Settled path: sustained settling in the space.
    if (this.sustainedCoherenceTimer >= this.requiredSustainedSeconds) {
      this.completedBy = 'settled';
      return true;
    }
    // Ceiling path: guaranteed progress — the level is never a wall.
    if (this.meditationDwell >= this.maxDwellSeconds) {
      this.completedBy = 'ceiling';
      return true;
    }
    return false;
  }

  /** 0..1 progress toward sustained-meditation completion. */
  get meditationProgress(): number {
    return Math.min(1, this.sustainedCoherenceTimer / this.requiredSustainedSeconds);
  }

  /** Is the player currently standing in the meditation space? (HUD prompt) */
  get isInMeditationSpace(): boolean {
    return this.inMeditationSpace;
  }

  /** Seconds dwelt in the meditation space so far (for logging). */
  get meditationDwellSeconds(): number {
    return this.meditationDwell;
  }

  abstract dispose(): void;
}
