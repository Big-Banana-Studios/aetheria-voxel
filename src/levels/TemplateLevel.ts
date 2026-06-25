/**
 * TemplateLevel — the complete, end-to-end level (Section 8.1 Phase 5 target).
 *
 * Builds the environment from the EnvironmentBuilder, places the full set of
 * reactive props (resonance locks, a cymatics pool, a harmonic bridge across the
 * lava chasm, a coherence gate, a sacred-geometry emitter, and frequency flora),
 * and wires every system together: coherence drives the world shader, the audio
 * stack, and each prop; the prescribed frequency drives audio + crystal tuning.
 *
 * Every regime uses this same structure; per-regime feel comes from the palette,
 * colors, and frequency config. GUT-1 (Volcanic Core) is the reference build.
 */
import * as THREE from 'three';
import { LevelBase, type LevelContext } from './LevelBase';
import type { LevelFrequencyConfig } from './LevelFrequencyConfig';
import { EnvironmentBuilder, type EnvironmentLayout } from './EnvironmentBuilder';
import { FrequencyReactiveBlock } from '../props/FrequencyReactiveBlock';
import { ResonanceCrystal } from '../props/ResonanceCrystal';
import { CymaticsPool } from '../props/CymaticsPool';
import { HarmonicBridge } from '../props/HarmonicBridge';
import { CoherenceGate } from '../props/CoherenceGate';
import { SacredGeometryEmitter } from '../props/SacredGeometryEmitter';
import { FrequencyFlora } from '../props/FrequencyFlora';

const REGIME_INDEX: Record<string, 0 | 1 | 2> = { GUT: 0, HEART: 1, HEAD: 2 };

export class TemplateLevel extends LevelBase {
  private layout!: EnvironmentLayout;
  private props: FrequencyReactiveBlock[] = [];
  private crystals: ResonanceCrystal[] = [];
  private gate!: CoherenceGate;
  private builder: EnvironmentBuilder;
  private gateAnnounced = false;
  private postPuzzleClock = 0; // time since all locks solved (gate-ceiling timer)
  private readonly gateCeilingSeconds = 75; // gate yields by here regardless
  private focusHintShown = false;

  constructor(config: LevelFrequencyConfig, ctx: LevelContext) {
    super(config, ctx);
    this.builder = new EnvironmentBuilder(ctx.world);
  }

  build(): void {
    const cfg = this.config;

    // 1. Voxel environment.
    this.layout = this.builder.build(cfg);

    // 2. Atmosphere (fog/sky/sun from the level config colors).
    this.ctx.world.applyAtmosphere({
      fogColor: cfg.ambientColor,
      fogDensity: cfg.fogDensity,
      skyColor: cfg.secondaryColor,
      groundColor: cfg.ambientColor,
      sunColor: cfg.primaryColor,
      emissiveBoost: 1.0,
    });

    // 3. Player spawn + regime movement.
    this.ctx.player.setRegime(cfg.regime);
    this.ctx.player.spawnAt(this.layout.spawn.x + 0.5, this.layout.spawn.y, this.layout.spawn.z + 0.5);

    // 4. Reactive props.
    const regime = REGIME_INDEX[cfg.regime] ?? 0;
    const base = regime * 9;
    const primary = cfg.primaryColor;
    const secondary = cfg.secondaryColor;

    // Resonance locks (3–5). Tune each to a different slot in this regime so the
    // player explores frequencies; the first is tuned to this level's own slot.
    this.layout.puzzleAnchors.slice(0, cfg.numFrequencyPuzzles).forEach((p, i) => {
      const tuned = base + (i % 9);
      const crystal = new ResonanceCrystal(
        p.clone().add(new THREE.Vector3(0.5, 0, 0.5)),
        tuned,
        i % 2 === 0 ? primary : secondary,
        cfg.worldSeed + i * 17,
      );
      crystal.onSolved = () => {
        this.ctx.audio.chime(432 * Math.pow(2, (i % 5) / 12));
        this.ctx.speak(this.crystalLine());
      };
      this.crystals.push(crystal);
      this.addProp(crystal);
    });

    // Cymatics pool.
    const pool = new CymaticsPool(
      this.layout.cymaticsCenter.clone().add(new THREE.Vector3(0.5, 0, 0.5)),
      cfg.levelIndex,
      secondary,
      8,
    );
    this.addProp(pool);

    // Harmonic bridge across the lava chasm.
    const bridge = new HarmonicBridge(
      this.ctx.world,
      this.layout.bridge.start.clone().add(new THREE.Vector3(0.5, 0, 0.5)),
      this.layout.bridge.length,
      primary,
      Math.max(0.4, cfg.coherenceThreshold - 0.1),
    );
    this.addProp(bridge);

    // Coherence gate guarding the meditation platform.
    this.gate = new CoherenceGate(
      this.layout.gate.clone().add(new THREE.Vector3(0.5, 0, 0.5)),
      primary,
      cfg.coherenceThreshold,
      3,
    );
    this.gate.onOpened = () => {
      this.ctx.audio.chime(432);
      this.ctx.speak('The gate yields as you settle. The node remembers you.');
    };
    this.addProp(this.gate);

    // Sacred geometry above the meditation platform.
    const geo = new SacredGeometryEmitter(this.layout.geometryCenter.clone(), secondary, 1.8);
    this.addProp(geo);

    // Frequency flora.
    this.layout.floraSites.forEach((p, i) => {
      const flora = new FrequencyFlora(
        p.clone().add(new THREE.Vector3(0.5, 0, 0.5)),
        i % 3 === 0 ? primary : '#5dd66a',
        cfg.worldSeed + 1000 + i,
      );
      this.addProp(flora);
    });

    // 5. Audio config. The felt carrier is the octave-folded frequency; the
    // canonical TRUE Hz drives the sub-bass grounding tone (5–12 Hz).
    this.ctx.audio.setBinauralOffset(cfg.binauralBeatOffset);
    this.ctx.audio.setFrequency(cfg.frequencyHz, cfg.playbackHz);

    // Opening narrative beat.
    this.ctx.speak(this.openingLine());
  }

  private addProp(p: FrequencyReactiveBlock): void {
    this.props.push(p);
    this.ctx.propGroup.add(p.object);
  }

  // ── Reactive hooks ──

  onCoherenceChanged(c: number): void {
    this.ctx.world.setCoherence(c);
    this.ctx.audio.setCoherence(c);
  }

  onFrequencyPrescribed(freqIndex: number): void {
    const carrier = this.ctx.freqTable.playbackHz(freqIndex);
    const trueHz = this.ctx.freqTable.hz(freqIndex);
    if (carrier > 0) this.ctx.audio.setFrequency(trueHz, carrier);
  }

  onMeditationSpaceEntered(): void {
    this.ctx.speak('You have entered the still center. Rest your attention here.');
  }

  onLevelComplete(): void {
    this.ctx.speak(this.completionLine());
    this.ctx.audio.chime(432 * 1.5, 1.4);
    // Gentle hint that the honest session metrics are available.
    setTimeout(() => this.ctx.speak('Press V to see your session metrics, or choose your next node on the cube.'), 5000);
  }

  get allPuzzlesSolved(): boolean {
    return this.crystals.length > 0 && this.crystals.every((c) => c.solved);
  }

  get gateOpened(): boolean {
    return this.gate?.opened ?? false;
  }

  protected playerInMeditationSpace(): boolean {
    const p = this.ctx.player.feet;
    const c = this.layout.meditationCenter;
    const d = Math.hypot(p.x - (c.x + 0.5), p.z - (c.z + 0.5));
    return d <= this.layout.meditationRadius;
  }

  // ── Per-frame ──

  override update(dt: number, freqIndex: number, coherence: number, bands: import('../eeg/types').BandPowerResult): void {
    // Gentle recovery: if the player fell into a crossing/void, return them to
    // spawn (no death, no penalty — Section 14.2 / Selah "never a wall").
    if (this.ctx.player.feet.y < 6) {
      const s = this.layout.spawn;
      this.ctx.player.spawnAt(s.x + 0.5, s.y, s.z + 0.5);
    }

    super.update(dt, freqIndex, coherence, bands);

    // Resonance locks open by Focus: look at a lock (be near it) and hold F.
    const pf = this.ctx.player.feet;
    const focusing = this.ctx.player.isFocusing;
    let nearUnsolved = false;
    for (const c of this.crystals) {
      const cp = c.object.position;
      const near = Math.hypot(pf.x - cp.x, pf.z - cp.z) < 3.5;
      c.setAttended(focusing && near);
      if (near && !c.solved) nearUnsolved = true;
    }
    if (nearUnsolved && !focusing && !this.focusHintShown) {
      this.focusHintShown = true;
      this.ctx.speak('A resonance lock. Look at it and hold F to focus it open.');
    }

    // Feed every reactive prop the current state and animate it.
    for (const prop of this.props) {
      prop.onFrequencyUpdate(freqIndex, coherence);
      prop.update(dt, this.timeInLevel);
    }

    if (this.allPuzzlesSolved) {
      if (!this.gateAnnounced) {
        this.gateAnnounced = true;
        this.ctx.speak('The locks are open. Cross the bridge with a steady mind and face the gate.');
      }
      // Gate-ceiling: guaranteed progress — the gate yields after a generous
      // dwell even if settling never reaches threshold (never a wall).
      this.postPuzzleClock += dt;
      if (!this.gate.opened && this.postPuzzleClock >= this.gateCeilingSeconds) {
        this.gate.forceOpen();
      }
    }
  }

  // ── Narrative (the Resonance, Section 2.1) ──

  private openingLine(): string {
    return `${this.config.levelName}. ${this.config.therapeuticTarget}. Breathe. Let the field meet you where you are.`;
  }
  private crystalLine(): string {
    const remaining = this.crystals.filter((c) => !c.solved).length;
    if (remaining === 0) return 'Every lock resonates. The way forward is lit.';
    return `A lock answers your attention. ${remaining} remain.`;
  }
  private completionLine(): string {
    // Honest framing: the claim is about the Field/node settling into harmony,
    // not an attainment or brain-state in the player.
    return 'The node is restored. A fragment of the Field settles into harmony. Rest here a moment.';
  }

  dispose(): void {
    for (const prop of this.props) {
      this.ctx.propGroup.remove(prop.object);
      prop.dispose();
    }
    this.props = [];
    this.crystals = [];
  }

  // Expose for HUD.
  get gateProgress(): number {
    return this.gate?.openProgress ?? 0;
  }
  get puzzlesSolvedCount(): number {
    return this.crystals.filter((c) => c.solved).length;
  }
  get puzzleTotal(): number {
    return this.crystals.length;
  }
}
