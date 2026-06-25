/**
 * EnvironmentBuilder — generates the voxel environment for a level from its
 * regime palette + seed (Section 4.1 / Phase 6). For Phase 5 this implements the
 * GUT "Volcanic Core" template in full; other regimes/levels extend the same
 * pattern (a bounded cavern/space + a meditation chamber + puzzle anchors).
 *
 * It writes blocks into the World and returns an EnvironmentLayout describing
 * where the level should place its reactive props.
 */
import * as THREE from 'three';
import type { World } from '../voxel/World';
import { blockId } from '../voxel/BlockRegistry';
import { RNG } from '../core/rng';
import type { LevelFrequencyConfig } from './LevelFrequencyConfig';

export interface EnvironmentLayout {
  spawn: THREE.Vector3; // player feet spawn
  meditationCenter: THREE.Vector3; // center of the meditation space (floor)
  meditationRadius: number;
  puzzleAnchors: THREE.Vector3[]; // resonance-crystal sites
  cymaticsCenter: THREE.Vector3; // cymatics pool center (floor)
  bridge: { start: THREE.Vector3; length: number }; // harmonic bridge across the chasm
  gate: THREE.Vector3; // coherence gate position (floor)
  floraSites: THREE.Vector3[]; // frequency flora
  geometryCenter: THREE.Vector3; // sacred-geometry emitter (above meditation)
  bounds: { sx: number; sz: number };
}

const SX = 48;
const SZ = 48;
const FLOOR_TOP = 8; // top solid block; player stands at FLOOR_TOP+1
const CHASM_X0 = 21;
const CHASM_X1 = 26;

export class EnvironmentBuilder {
  constructor(private world: World) {}

  build(config: LevelFrequencyConfig): EnvironmentLayout {
    switch (config.regime) {
      case 'GUT':
      default:
        return this.buildVolcanicCore(config);
    }
  }

  // ── Helpers ──

  private fillBox(
    x0: number, y0: number, z0: number,
    x1: number, y1: number, z1: number,
    id: number,
  ): void {
    for (let y = y0; y <= y1; y++)
      for (let z = z0; z <= z1; z++)
        for (let x = x0; x <= x1; x++) this.world.setBlock(x, y, z, id);
  }

  // ── GUT-1: Volcanic Core ──

  private buildVolcanicCore(config: LevelFrequencyConfig): EnvironmentLayout {
    const rng = new RNG(config.worldSeed);
    const basalt = blockId('basalt');
    const obsidian = blockId('obsidian');
    const magma = blockId('magma');
    const ember = blockId('ember_rock');
    const lichen = blockId('glow_lichen');
    const quartz = blockId('quartz');
    const medFloor = blockId('meditation_floor');

    // Solid ground (basalt) up to FLOOR_TOP across the whole footprint.
    this.fillBox(0, 0, 0, SX - 1, FLOOR_TOP, SZ - 1, basalt);

    // Carve the lava chasm: remove the floor in the chasm band, drop in magma.
    this.fillBox(CHASM_X0, 2, 0, CHASM_X1, FLOOR_TOP, SZ - 1, 0);
    this.fillBox(CHASM_X0, 1, 0, CHASM_X1, 3, SZ - 1, magma);

    // Perimeter walls (basalt with obsidian veins) and a ceiling.
    const WALL_TOP = 27;
    for (let y = FLOOR_TOP + 1; y <= WALL_TOP; y++) {
      for (let x = 0; x < SX; x++) {
        this.world.setBlock(x, y, 0, basalt);
        this.world.setBlock(x, y, SZ - 1, basalt);
      }
      for (let z = 0; z < SZ; z++) {
        this.world.setBlock(0, y, z, basalt);
        this.world.setBlock(SX - 1, y, z, basalt);
      }
    }
    // Ceiling (low-key, with magma glow pockets and lichen — GUT has no sky).
    for (let z = 0; z < SZ; z++) {
      for (let x = 0; x < SX; x++) {
        const r = rng.next();
        const id = r < 0.04 ? magma : r < 0.1 ? lichen : basalt;
        this.world.setBlock(x, WALL_TOP, z, id);
      }
    }

    // Scatter ember rock, obsidian, and glowing lichen veins on the floor &
    // lower walls so the cavern reads as molten and alive.
    for (let i = 0; i < 220; i++) {
      const x = rng.int(1, SX - 2);
      const z = rng.int(1, SZ - 2);
      if (x >= CHASM_X0 && x <= CHASM_X1) continue;
      const kind = rng.next();
      if (kind < 0.4) this.world.setBlock(x, FLOOR_TOP, z, ember);
      else if (kind < 0.55) this.world.setBlock(x, FLOOR_TOP, z, obsidian);
      else if (kind < 0.7) {
        // Lichen clump rising up a wall-ish little mound.
        const h = rng.int(1, 2);
        for (let dy = 1; dy <= h; dy++) this.world.setBlock(x, FLOOR_TOP + dy, z, lichen);
      }
    }

    // Far-side meditation platform (across the chasm): raised quartz dais with a
    // luminous meditation floor at its center.
    const medCX = 38;
    const medCZ = 24;
    const medR = 5;
    for (let z = medCZ - medR; z <= medCZ + medR; z++) {
      for (let x = medCX - medR; x <= medCX + medR; x++) {
        const d = Math.hypot(x - medCX, z - medCZ);
        if (d <= medR) {
          this.world.setBlock(x, FLOOR_TOP + 1, z, d <= 2 ? medFloor : quartz);
        }
      }
    }
    // A low quartz ring marking the sacred space.
    for (let a = 0; a < 32; a++) {
      const ang = (a / 32) * Math.PI * 2;
      const x = Math.round(medCX + Math.cos(ang) * (medR - 0.5));
      const z = Math.round(medCZ + Math.sin(ang) * (medR - 0.5));
      this.world.setBlock(x, FLOOR_TOP + 2, z, quartz);
    }

    // Puzzle anchor sites on the near side (resonance crystals).
    const puzzleAnchors = [
      new THREE.Vector3(6, FLOOR_TOP + 1, 8),
      new THREE.Vector3(8, FLOOR_TOP + 1, 40),
      new THREE.Vector3(17, FLOOR_TOP + 1, 14),
      new THREE.Vector3(16, FLOOR_TOP + 1, 34),
    ];

    // Flora scattered on the near side.
    const floraSites: THREE.Vector3[] = [];
    for (let i = 0; i < 14; i++) {
      const x = rng.int(2, CHASM_X0 - 2);
      const z = rng.int(2, SZ - 3);
      floraSites.push(new THREE.Vector3(x, FLOOR_TOP + 1, z));
    }

    const spawn = new THREE.Vector3(8, FLOOR_TOP + 1, 24);
    const meditationCenter = new THREE.Vector3(medCX, FLOOR_TOP + 1, medCZ);

    return {
      spawn,
      meditationCenter,
      meditationRadius: medR,
      puzzleAnchors,
      cymaticsCenter: new THREE.Vector3(11, FLOOR_TOP + 1, 24),
      bridge: { start: new THREE.Vector3(CHASM_X0 - 1, FLOOR_TOP + 1, 24), length: 9 },
      gate: new THREE.Vector3(CHASM_X1 + 4, FLOOR_TOP + 1, 24),
      floraSites,
      geometryCenter: new THREE.Vector3(medCX, FLOOR_TOP + 4, medCZ),
      bounds: { sx: SX, sz: SZ },
    };
  }
}
