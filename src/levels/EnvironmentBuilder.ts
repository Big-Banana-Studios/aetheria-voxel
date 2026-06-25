/**
 * EnvironmentBuilder — generates the voxel environment for a level from its
 * regime palette + seed (Section 4.1 / Phase 6).
 *
 * Three regimes, one layout contract (spawn · meditation space · puzzle anchors ·
 * a crossing spanned by a harmonic bridge · a gate · flora · sacred geometry):
 *   - GUT   "Primal Earth": enclosed magma cavern, a lava chasm to cross.
 *   - HEART "Living World": open garden under sky, a river to cross.
 *   - HEAD  "Cosmic": floating platforms in a starfield void, a gap to cross.
 *
 * The shared chamber generator handles GUT/HEART (full ground + a crossing); HEAD
 * is floating platforms. Per-regime feel comes from the block palette + colors.
 */
import * as THREE from 'three';
import type { World } from '../voxel/World';
import { blockId } from '../voxel/BlockRegistry';
import { RNG } from '../core/rng';
import type { LevelFrequencyConfig } from './LevelFrequencyConfig';

export interface EnvironmentLayout {
  spawn: THREE.Vector3;
  meditationCenter: THREE.Vector3;
  meditationRadius: number;
  puzzleAnchors: THREE.Vector3[];
  cymaticsCenter: THREE.Vector3;
  bridge: { start: THREE.Vector3; length: number };
  gate: THREE.Vector3;
  floraSites: THREE.Vector3[];
  geometryCenter: THREE.Vector3;
  bounds: { sx: number; sz: number };
}

const SX = 48;
const SZ = 48;
const FLOOR_TOP = 8;
const CHASM_X0 = 21;
const CHASM_X1 = 26;

interface ChamberOpts {
  groundTop: string;
  groundSub: string;
  scatter: { block: string; weight: number; moundChance?: number }[];
  crossing: 'lava' | 'water';
  ceiling: boolean;
  wall: string;
  rimHeight: number; // perimeter rim when there is no full wall/ceiling
  medFloor: string;
  medRing: string;
  ceilingAccents?: string[];
}

export class EnvironmentBuilder {
  constructor(private world: World) {}

  build(config: LevelFrequencyConfig): EnvironmentLayout {
    switch (config.regime) {
      case 'HEART':
        return this.buildHealingGarden(config);
      case 'HEAD':
        return this.buildCelestial(config);
      case 'GUT':
      default:
        return this.buildVolcanicCore(config);
    }
  }

  private fillBox(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, id: number): void {
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++)
        for (let x = x0; x <= x1; x++) this.world.setBlock(x, y, z, id);
  }

  private standardLayout(): EnvironmentLayout {
    return {
      spawn: new THREE.Vector3(8, FLOOR_TOP + 1, 24),
      meditationCenter: new THREE.Vector3(38, FLOOR_TOP + 1, 24),
      meditationRadius: 5,
      puzzleAnchors: [
        new THREE.Vector3(6, FLOOR_TOP + 1, 8),
        new THREE.Vector3(8, FLOOR_TOP + 1, 40),
        new THREE.Vector3(17, FLOOR_TOP + 1, 14),
        new THREE.Vector3(16, FLOOR_TOP + 1, 34),
      ],
      cymaticsCenter: new THREE.Vector3(11, FLOOR_TOP + 1, 24),
      bridge: { start: new THREE.Vector3(CHASM_X0 - 1, FLOOR_TOP + 1, 24), length: 9 },
      gate: new THREE.Vector3(CHASM_X1 + 4, FLOOR_TOP + 1, 24),
      floraSites: [],
      geometryCenter: new THREE.Vector3(38, FLOOR_TOP + 4, 24),
      bounds: { sx: SX, sz: SZ },
    };
  }

  // ── Shared chamber generator (GUT lava cavern / HEART river garden) ──

  private buildChamber(config: LevelFrequencyConfig, opts: ChamberOpts): EnvironmentLayout {
    const rng = new RNG(config.worldSeed);
    const top = blockId(opts.groundTop);
    const sub = blockId(opts.groundSub);
    const wall = blockId(opts.wall);

    // Solid ground.
    this.fillBox(0, 0, 0, SX - 1, FLOOR_TOP - 1, SZ - 1, sub);
    this.fillBox(0, FLOOR_TOP, 0, SX - 1, FLOOR_TOP, SZ - 1, top);

    // The crossing — carve away all footing down to y3 so it cannot be walked
    // across without the harmonic bridge; falling in triggers a gentle recovery
    // respawn (handled by the level), never a death (no fail states).
    this.fillBox(CHASM_X0, 3, 0, CHASM_X1, FLOOR_TOP, SZ - 1, 0);
    if (opts.crossing === 'lava') {
      this.fillBox(CHASM_X0, 0, 0, CHASM_X1, 2, SZ - 1, blockId('magma'));
    } else {
      // Deep, non-solid water glinting at the bottom of the river.
      this.fillBox(CHASM_X0, 1, 0, CHASM_X1, 3, SZ - 1, blockId('water'));
    }

    // Perimeter: full walls + ceiling (GUT) or a low rim under open sky (HEART).
    const wallTop = opts.ceiling ? 27 : FLOOR_TOP + opts.rimHeight;
    for (let y = FLOOR_TOP + 1; y <= wallTop; y++) {
      for (let x = 0; x < SX; x++) {
        this.world.setBlock(x, y, 0, wall);
        this.world.setBlock(x, y, SZ - 1, wall);
      }
      for (let z = 0; z < SZ; z++) {
        this.world.setBlock(0, y, z, wall);
        this.world.setBlock(SX - 1, y, z, wall);
      }
    }
    if (opts.ceiling) {
      const accents = (opts.ceilingAccents ?? []).map((n) => blockId(n));
      for (let z = 0; z < SZ; z++) {
        for (let x = 0; x < SX; x++) {
          const r = rng.next();
          const id = accents.length && r < 0.1 ? accents[Math.floor(r * 10) % accents.length] : wall;
          this.world.setBlock(x, 27, z, id);
        }
      }
    }

    // Scatter detail on the near + far ground.
    for (let i = 0; i < 240; i++) {
      const x = rng.int(1, SX - 2);
      const z = rng.int(1, SZ - 2);
      if (x >= CHASM_X0 && x <= CHASM_X1) continue;
      let acc = rng.next();
      for (const s of opts.scatter) {
        if (acc < s.weight) {
          const id = blockId(s.block);
          if (s.moundChance && rng.next() < s.moundChance) {
            const h = rng.int(1, 2);
            for (let dy = 1; dy <= h; dy++) this.world.setBlock(x, FLOOR_TOP + dy, z, id);
          } else {
            this.world.setBlock(x, FLOOR_TOP, z, id);
          }
          break;
        }
        acc -= s.weight;
      }
    }

    // Far-side meditation dais.
    const medCX = 38, medCZ = 24, medR = 5;
    const medFloor = blockId(opts.medFloor);
    const medRing = blockId(opts.medRing);
    for (let z = medCZ - medR; z <= medCZ + medR; z++) {
      for (let x = medCX - medR; x <= medCX + medR; x++) {
        if (Math.hypot(x - medCX, z - medCZ) <= medR) {
          this.world.setBlock(x, FLOOR_TOP + 1, z, Math.hypot(x - medCX, z - medCZ) <= 2 ? medFloor : medRing);
        }
      }
    }
    for (let a = 0; a < 32; a++) {
      const ang = (a / 32) * Math.PI * 2;
      const x = Math.round(medCX + Math.cos(ang) * (medR - 0.5));
      const z = Math.round(medCZ + Math.sin(ang) * (medR - 0.5));
      this.world.setBlock(x, FLOOR_TOP + 2, z, medRing);
    }

    const layout = this.standardLayout();
    for (let i = 0; i < 14; i++) {
      layout.floraSites.push(
        new THREE.Vector3(rng.int(2, CHASM_X0 - 2), FLOOR_TOP + 1, rng.int(2, SZ - 3)),
      );
    }
    return layout;
  }

  private buildVolcanicCore(config: LevelFrequencyConfig): EnvironmentLayout {
    return this.buildChamber(config, {
      groundTop: 'basalt', groundSub: 'basalt', wall: 'basalt',
      crossing: 'lava', ceiling: true, rimHeight: 0,
      medFloor: 'meditation_floor', medRing: 'quartz',
      ceilingAccents: ['magma', 'glow_lichen'],
      scatter: [
        { block: 'ember_rock', weight: 0.4 },
        { block: 'obsidian', weight: 0.15 },
        { block: 'glow_lichen', weight: 0.15, moundChance: 1 },
      ],
    });
  }

  private buildHealingGarden(config: LevelFrequencyConfig): EnvironmentLayout {
    return this.buildChamber(config, {
      groundTop: 'moss', groundSub: 'living_wood', wall: 'living_wood',
      crossing: 'water', ceiling: false, rimHeight: 3,
      medFloor: 'cloud_marble', medRing: 'gold_stone',
      scatter: [
        { block: 'leaf', weight: 0.3, moundChance: 0.5 },
        { block: 'petal', weight: 0.2 },
        { block: 'gold_stone', weight: 0.08 },
        { block: 'moss', weight: 0.2 },
      ],
    });
  }

  // ── HEAD: floating platforms in a starfield void ──

  private buildCelestial(config: LevelFrequencyConfig): EnvironmentLayout {
    const rng = new RNG(config.worldSeed);
    const platform = blockId('fractal_stone');
    const crystal = blockId('crystal');
    const light = blockId('light_construct');

    // A platform helper (thin floating slab with a crystal rim).
    const slab = (x0: number, z0: number, x1: number, z1: number) => {
      this.fillBox(x0, FLOOR_TOP - 1, z0, x1, FLOOR_TOP, z1, platform);
      for (let x = x0; x <= x1; x++) {
        this.world.setBlock(x, FLOOR_TOP, z0, crystal);
        this.world.setBlock(x, FLOOR_TOP, z1, crystal);
      }
      for (let z = z0; z <= z1; z++) {
        this.world.setBlock(x0, FLOOR_TOP, z, crystal);
        this.world.setBlock(x1, FLOOR_TOP, z, crystal);
      }
    };

    // Near platform (spawn + puzzles) and far platform (meditation), with a void
    // gap between them spanned by the harmonic bridge.
    slab(2, 6, CHASM_X0 - 1, 42);
    slab(CHASM_X1 + 1, 14, 46, 34);

    // Floating decorative light constructs above the void.
    for (let i = 0; i < 24; i++) {
      const x = rng.int(2, SX - 3);
      const z = rng.int(2, SZ - 3);
      const y = FLOOR_TOP + rng.int(4, 16);
      this.world.setBlock(x, y, z, rng.next() < 0.5 ? light : crystal);
    }

    // Meditation dais on the far platform.
    const medCX = 38, medCZ = 24, medR = 5;
    for (let z = medCZ - medR; z <= medCZ + medR; z++) {
      for (let x = medCX - medR; x <= medCX + medR; x++) {
        const d = Math.hypot(x - medCX, z - medCZ);
        if (d <= medR) this.world.setBlock(x, FLOOR_TOP + 1, z, d <= 2 ? light : crystal);
      }
    }

    const layout = this.standardLayout();
    // Flora on the near platform only (floating crystal-flowers).
    for (let i = 0; i < 10; i++) {
      layout.floraSites.push(
        new THREE.Vector3(rng.int(3, CHASM_X0 - 3), FLOOR_TOP + 1, rng.int(8, 40)),
      );
    }
    return layout;
  }
}
