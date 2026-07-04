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
 * Two randomness sources so the world feels alive without losing its identity:
 *   - worldSeed (stable per level) drives STRUCTURE — walls, ceiling height,
 *     feature pillars, the dais — so each of the 27 levels has its own silhouette.
 *   - visitSeed (fresh each visit) drives DRESSING + CRYSTALS — scatter detail,
 *     flora, and where the resonance crystals sit — so the layout is different
 *     every time you arrive (replayability), with some crystals raised on
 *     climbable platforms (gentle platforming; falling just respawns you).
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
  portal: THREE.Vector3; // where the portal appears (between gate and dais)
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
  pillarBlock: string; // climbable platform column (platforming)
  stepBlock: string; // the little staircase up to a raised crystal
  featureBlock: string; // tall decorative columns that give each level its shape
}

export class EnvironmentBuilder {
  constructor(private world: World) {}

  build(config: LevelFrequencyConfig, visitSeed: number): EnvironmentLayout {
    switch (config.regime) {
      case 'HEART':
        return this.buildHealingGarden(config, visitSeed);
      case 'HEAD':
        return this.buildCelestial(config, visitSeed);
      case 'GUT':
      default:
        return this.buildVolcanicCore(config, visitSeed);
    }
  }

  private fillBox(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, id: number): void {
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++)
        for (let x = x0; x <= x1; x++) this.world.setBlock(x, y, z, id);
  }

  private inChasm(x: number): boolean {
    return x >= CHASM_X0 - 1 && x <= CHASM_X1 + 1;
  }

  private standardLayout(): EnvironmentLayout {
    return {
      spawn: new THREE.Vector3(8, FLOOR_TOP + 1, 24),
      meditationCenter: new THREE.Vector3(38, FLOOR_TOP + 1, 24),
      meditationRadius: 5,
      puzzleAnchors: [], // filled per-visit by scatterCrystalAnchors / floating variant
      cymaticsCenter: new THREE.Vector3(11, FLOOR_TOP + 1, 24),
      bridge: { start: new THREE.Vector3(CHASM_X0 - 1, FLOOR_TOP + 1, 24), length: 9 },
      gate: new THREE.Vector3(CHASM_X1 + 4, FLOOR_TOP + 1, 24),
      portal: new THREE.Vector3(36, FLOOR_TOP + 1, 24),
      floraSites: [],
      geometryCenter: new THREE.Vector3(38, FLOOR_TOP + 4, 24),
      bounds: { sx: SX, sz: SZ },
    };
  }

  // ── Far-side placement: RNG dais + gate + portal + platforming ──

  /** Pick a far-side dais centre a good walk from the bridge landing (per visit). */
  private pickDaisCenter(visit: RNG, x0: number, x1: number, z0: number, z1: number): { x: number; z: number } {
    const blx = CHASM_X1 + 1, blz = 24; // bridge landing
    let best = { x: Math.round((x0 + x1) / 2), z: Math.round((z0 + z1) / 2) };
    for (let a = 0; a < 60; a++) {
      const x = visit.int(x0, x1);
      const z = visit.int(z0, z1);
      if (Math.hypot(x - blx, z - blz) >= 9) return { x, z };
    }
    return best;
  }

  /** Gate + portal along the bridge-landing → dais line (gate guards, portal frames). */
  private gateAndPortal(daisX: number, daisZ: number): { gate: THREE.Vector3; portal: THREE.Vector3 } {
    const blx = CHASM_X1 + 1, blz = 24;
    const dx = daisX - blx, dz = daisZ - blz;
    const len = Math.hypot(dx, dz) || 1;
    const ux = dx / len, uz = dz / len;
    const clampX = (x: number) => Math.max(CHASM_X1 + 2, Math.min(SX - 2, x));
    const clampZ = (z: number) => Math.max(2, Math.min(SZ - 2, z));
    const gate = new THREE.Vector3(clampX(Math.round(daisX - ux * 6)), FLOOR_TOP + 1, clampZ(Math.round(daisZ - uz * 6)));
    const portal = new THREE.Vector3(clampX(Math.round(daisX - ux * 2.5)), FLOOR_TOP + 1, clampZ(Math.round(daisZ - uz * 2.5)));
    return { gate, portal };
  }

  /** Scatter a few climb-platforms on the far-side approach (same style as the
   *  near-side crystals), kept clear of the dais + the gate corridor so the path
   *  through the gate to the dais is never blocked. */
  private buildFarPlatforms(visit: RNG, dais: { x: number; z: number }, gate: THREE.Vector3, opts: ChamberOpts): void {
    const count = visit.int(2, 4);
    let placed = 0, attempts = 0;
    while (placed < count && attempts < count * 40) {
      attempts++;
      const x = visit.int(CHASM_X1 + 3, SX - 3);
      const z = visit.int(3, SZ - 4);
      if (Math.hypot(x - dais.x, z - dais.z) < 6) continue; // clear the dais
      if (Math.hypot(x - gate.x, z - gate.z) < 3) continue; // clear the gate mouth
      const h = visit.int(2, 4);
      this.buildClimbPlatform(visit, x, z, h, opts.pillarBlock, opts.stepBlock);
      placed++;
    }
  }

  // ── Crystal scatter + platforming (ground regimes) ──

  /**
   * Scatter `count` crystal anchors across the near-side play space (the pre-
   * bridge exploration area), spaced apart, avoiding spawn and the chasm. A
   * fraction sit atop a short climbable pillar with a staircase — gentle
   * platforming to reach them. Driven by the VISIT rng, so the layout is fresh
   * each arrival. Returns the anchor point (the standing surface) for each crystal.
   */
  private scatterCrystalAnchors(visit: RNG, count: number, opts: ChamberOpts): THREE.Vector3[] {
    const anchors: THREE.Vector3[] = [];
    const x0 = 3, x1 = CHASM_X0 - 3, z0 = 3, z1 = SZ - 4; // near side only
    const minDist = 5;
    let attempts = 0;
    while (anchors.length < count && attempts < count * 60) {
      attempts++;
      const x = visit.int(x0, x1);
      const z = visit.int(z0, z1);
      if (this.inChasm(x)) continue;
      if (Math.hypot(x - 8, z - 24) < 4.5) continue; // clear the spawn
      if (anchors.some((a) => Math.hypot(a.x - x, a.z - z) < minDist)) continue;
      let y = FLOOR_TOP + 1;
      // ~45% of crystals sit up on a platform you climb to.
      if (visit.next() < 0.45) {
        const h = visit.int(2, 4);
        this.buildClimbPlatform(visit, x, z, h, opts.pillarBlock, opts.stepBlock);
        y = FLOOR_TOP + 1 + h;
      }
      anchors.push(new THREE.Vector3(x, y, z));
    }
    return anchors;
  }

  /** A short column with a 1-block staircase leading up to it (climbable, gentle). */
  private buildClimbPlatform(
    visit: RNG,
    x: number,
    z: number,
    h: number,
    pillarBlock: string,
    stepBlock: string,
  ): void {
    const pillar = blockId(pillarBlock);
    const step = blockId(stepBlock);
    // The column the crystal stands on.
    for (let dy = 1; dy <= h; dy++) this.world.setBlock(x, FLOOR_TOP + dy, z, pillar);
    // A descending staircase away from the column so it can be walked up. Prefer a
    // direction that stays on the near side (away from the chasm) and in bounds.
    const dirs: [number, number][] = [[-1, 0], [0, 1], [0, -1], [1, 0]];
    let dir = dirs[visit.int(0, dirs.length - 1)];
    if (x + dir[0] * h > CHASM_X0 - 2) dir = [-1, 0]; // don't step into the crossing
    for (let s = 1; s <= h; s++) {
      const sx = x + dir[0] * s;
      const sz = z + dir[1] * s;
      if (sx < 1 || sx >= SX - 1 || sz < 1 || sz >= SZ - 1 || this.inChasm(sx)) continue;
      const stepH = h - s + 1; // h, h-1, … 1
      for (let dy = 1; dy <= stepH; dy++) this.world.setBlock(sx, FLOOR_TOP + dy, sz, step);
    }
  }

  // ── Shared chamber generator (GUT lava cavern / HEART river garden) ──

  private buildChamber(config: LevelFrequencyConfig, opts: ChamberOpts, visitSeed: number): EnvironmentLayout {
    const rng = new RNG(config.worldSeed); // stable structure (level identity)
    const visit = new RNG(visitSeed >>> 0 || (config.worldSeed + 7)); // fresh dressing
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
      this.fillBox(CHASM_X0, 1, 0, CHASM_X1, 3, SZ - 1, blockId('water'));
    }

    // Perimeter: full walls + ceiling (GUT) or a low rim under open sky (HEART).
    // The ceiling height varies per level (worldSeed) so caverns feel different.
    const ceilH = opts.ceiling ? rng.int(23, 30) : 0;
    const wallTop = opts.ceiling ? ceilH : FLOOR_TOP + opts.rimHeight;
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
          this.world.setBlock(x, ceilH, z, id);
        }
      }
    }

    // Feature columns (worldSeed): a few tall rock pillars that give each level a
    // distinct silhouette. Kept clear of spawn, dais and the crossing.
    const feature = blockId(opts.featureBlock);
    const featureCount = rng.int(3, 8);
    const maxFeatureH = Math.max(3, (opts.ceiling ? ceilH : FLOOR_TOP + 8) - FLOOR_TOP - 2);
    for (let i = 0; i < featureCount; i++) {
      const fx = rng.int(2, SX - 3);
      const fz = rng.int(2, SZ - 3);
      if (this.inChasm(fx)) continue;
      if (Math.hypot(fx - 8, fz - 24) < 5) continue;
      if (Math.hypot(fx - 38, fz - 24) < 7) continue;
      const fh = rng.int(2, maxFeatureH);
      for (let dy = 1; dy <= fh; dy++) this.world.setBlock(fx, FLOOR_TOP + dy, fz, feature);
    }

    // Scatter detail on the near + far ground (VISIT rng → fresh each arrival).
    const scatterCount = visit.int(180, 300);
    for (let i = 0; i < scatterCount; i++) {
      const x = visit.int(1, SX - 2);
      const z = visit.int(1, SZ - 2);
      if (this.inChasm(x)) continue;
      let acc = visit.next();
      for (const s of opts.scatter) {
        if (acc < s.weight) {
          const id = blockId(s.block);
          if (s.moundChance && visit.next() < s.moundChance) {
            const hh = visit.int(1, 2);
            for (let dy = 1; dy <= hh; dy++) this.world.setBlock(x, FLOOR_TOP + dy, z, id);
          } else {
            this.world.setBlock(x, FLOOR_TOP, z, id);
          }
          break;
        }
        acc -= s.weight;
      }
    }

    // Far-side meditation dais — RNG location each visit (like the crystals).
    const dais = this.pickDaisCenter(visit, CHASM_X1 + 4, SX - 5, 5, SZ - 6);
    const medR = 5;
    const medFloor = blockId(opts.medFloor);
    const medRing = blockId(opts.medRing);
    for (let z = dais.z - medR; z <= dais.z + medR; z++) {
      for (let x = dais.x - medR; x <= dais.x + medR; x++) {
        if (x < 1 || x >= SX - 1 || z < 1 || z >= SZ - 1) continue;
        const d = Math.hypot(x - dais.x, z - dais.z);
        if (d <= medR) this.world.setBlock(x, FLOOR_TOP + 1, z, d <= 2 ? medFloor : medRing);
      }
    }
    for (let a = 0; a < 32; a++) {
      const ang = (a / 32) * Math.PI * 2;
      const x = Math.round(dais.x + Math.cos(ang) * (medR - 0.5));
      const z = Math.round(dais.z + Math.sin(ang) * (medR - 0.5));
      if (x >= 0 && x < SX && z >= 0 && z < SZ) this.world.setBlock(x, FLOOR_TOP + 2, z, medRing);
    }

    // Gate on the approach (guards + faces the dais); portal frames the dais;
    // platforming scattered on the far side (kept clear of the gate→dais path).
    const { gate, portal } = this.gateAndPortal(dais.x, dais.z);
    this.buildFarPlatforms(visit, dais, gate, opts);

    const layout = this.standardLayout();
    layout.meditationCenter.set(dais.x, FLOOR_TOP + 1, dais.z);
    layout.geometryCenter.set(dais.x, FLOOR_TOP + 4, dais.z);
    layout.gate.copy(gate);
    layout.portal.copy(portal);
    // Crystals: scattered across the near side, some raised on climbable platforms.
    layout.puzzleAnchors = this.scatterCrystalAnchors(visit, config.numFrequencyPuzzles, opts);
    // Flora dressing (VISIT rng → fresh each arrival).
    for (let i = 0; i < 14; i++) {
      layout.floraSites.push(
        new THREE.Vector3(visit.int(2, CHASM_X0 - 2), FLOOR_TOP + 1, visit.int(2, SZ - 3)),
      );
    }
    return layout;
  }

  private buildVolcanicCore(config: LevelFrequencyConfig, visitSeed: number): EnvironmentLayout {
    return this.buildChamber(config, {
      groundTop: 'basalt', groundSub: 'basalt', wall: 'basalt',
      crossing: 'lava', ceiling: true, rimHeight: 0,
      medFloor: 'meditation_floor', medRing: 'quartz',
      ceilingAccents: ['magma', 'glow_lichen'],
      pillarBlock: 'obsidian', stepBlock: 'ember_rock', featureBlock: 'obsidian',
      scatter: [
        { block: 'ember_rock', weight: 0.4 },
        { block: 'obsidian', weight: 0.15 },
        { block: 'glow_lichen', weight: 0.15, moundChance: 1 },
      ],
    }, visitSeed);
  }

  private buildHealingGarden(config: LevelFrequencyConfig, visitSeed: number): EnvironmentLayout {
    return this.buildChamber(config, {
      groundTop: 'moss', groundSub: 'living_wood', wall: 'living_wood',
      crossing: 'water', ceiling: false, rimHeight: 3,
      medFloor: 'cloud_marble', medRing: 'gold_stone',
      pillarBlock: 'living_wood', stepBlock: 'gold_stone', featureBlock: 'living_wood',
      scatter: [
        { block: 'leaf', weight: 0.3, moundChance: 0.5 },
        { block: 'petal', weight: 0.2 },
        { block: 'gold_stone', weight: 0.08 },
        { block: 'moss', weight: 0.2 },
      ],
    }, visitSeed);
  }

  // ── HEAD: floating platforms in a starfield void ──

  private buildCelestial(config: LevelFrequencyConfig, visitSeed: number): EnvironmentLayout {
    const rng = new RNG(config.worldSeed);
    const visit = new RNG(visitSeed >>> 0 || (config.worldSeed + 7));
    const platform = blockId('fractal_stone');
    const crystalBlk = blockId('crystal');
    const light = blockId('light_construct');

    // A platform helper (thin floating slab with a crystal rim).
    const slab = (x0: number, z0: number, x1: number, z1: number) => {
      this.fillBox(x0, FLOOR_TOP - 1, z0, x1, FLOOR_TOP, z1, platform);
      for (let x = x0; x <= x1; x++) {
        this.world.setBlock(x, FLOOR_TOP, z0, crystalBlk);
        this.world.setBlock(x, FLOOR_TOP, z1, crystalBlk);
      }
      for (let z = z0; z <= z1; z++) {
        this.world.setBlock(x0, FLOOR_TOP, z, crystalBlk);
        this.world.setBlock(x1, FLOOR_TOP, z, crystalBlk);
      }
    };

    // Near platform (spawn) and far platform (meditation), with a void gap between
    // them spanned by the harmonic bridge.
    slab(2, 6, CHASM_X0 - 1, 42);
    slab(CHASM_X1 + 1, 14, 46, 34);

    // Floating decorative light constructs above the void (worldSeed → identity).
    for (let i = 0; i < 24; i++) {
      const x = rng.int(2, SX - 3);
      const z = rng.int(2, SZ - 3);
      const y = FLOOR_TOP + rng.int(4, 16);
      this.world.setBlock(x, y, z, rng.next() < 0.5 ? light : crystalBlk);
    }

    // Meditation dais on the far platform — RNG location each visit (kept within
    // the floating slab so it stays reachable).
    const dais = this.pickDaisCenter(visit, CHASM_X1 + 4, 43, 17, 31);
    const medR = 5;
    for (let z = dais.z - medR; z <= dais.z + medR; z++) {
      for (let x = dais.x - medR; x <= dais.x + medR; x++) {
        const d = Math.hypot(x - dais.x, z - dais.z);
        if (d <= medR && x >= CHASM_X1 + 1 && x <= 46 && z >= 14 && z <= 34) {
          this.world.setBlock(x, FLOOR_TOP + 1, z, d <= 2 ? light : crystalBlk);
        }
      }
    }
    const { gate, portal } = this.gateAndPortal(dais.x, dais.z);

    const layout = this.standardLayout();
    layout.meditationCenter.set(dais.x, FLOOR_TOP + 1, dais.z);
    layout.geometryCenter.set(dais.x, FLOOR_TOP + 4, dais.z);
    layout.gate.copy(gate);
    layout.portal.copy(portal);
    // Crystals: on small floating stepping-stone platforms out over the void, at
    // varied heights — real (gentle) platforming; a miss just respawns you. Fresh
    // each visit (VISIT rng).
    layout.puzzleAnchors = this.scatterFloatingAnchors(visit, config.numFrequencyPuzzles, platform, crystalBlk);
    // Flora on the near platform (floating crystal-flowers), fresh each visit.
    for (let i = 0; i < 10; i++) {
      layout.floraSites.push(
        new THREE.Vector3(visit.int(3, CHASM_X0 - 3), FLOOR_TOP + 1, visit.int(8, 40)),
      );
    }
    return layout;
  }

  /**
   * Floating stepping-stone platforms across the near void (HEAD). Each crystal
   * sits on its own small slab at a slightly varied height, separated by gaps so
   * reaching it is a short hop — gentle platforming. Fresh each visit.
   */
  private scatterFloatingAnchors(
    visit: RNG,
    count: number,
    platform: number,
    rim: number,
  ): THREE.Vector3[] {
    const anchors: THREE.Vector3[] = [];
    const x0 = 4, x1 = CHASM_X0 - 3, z0 = 8, z1 = 40;
    const minDist = 6;
    let attempts = 0;
    while (anchors.length < count && attempts < count * 60) {
      attempts++;
      const x = visit.int(x0, x1);
      const z = visit.int(z0, z1);
      if (Math.hypot(x - 8, z - 24) < 5) continue; // clear the spawn
      if (anchors.some((a) => Math.hypot(a.x - x, a.z - z) < minDist)) continue;
      // A small 3×3 slab at a varied height above the base platform.
      const lift = visit.int(0, 3);
      const py = FLOOR_TOP + lift;
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          this.world.setBlock(x + dx, py, z + dz, platform);
        }
      }
      // A crystal rim ring for readability.
      this.world.setBlock(x, py, z - 1, rim);
      this.world.setBlock(x, py, z + 1, rim);
      anchors.push(new THREE.Vector3(x, py + 1, z));
    }
    return anchors;
  }
}
