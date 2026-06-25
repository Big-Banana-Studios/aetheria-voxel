/**
 * VoxelChunk — block store for one chunk (Section 4.2 / Phase 2).
 *
 * 16 × 64 × 16 blocks in a flat Uint8Array (block ids). Index layout is
 * x + z*SX + y*(SX*SZ) so that horizontal slices (a y-layer) are contiguous,
 * which the greedy mesher and environment builder both exploit.
 */
import { AIR } from './BlockRegistry';

export const CHUNK_SX = 16;
export const CHUNK_SY = 64;
export const CHUNK_SZ = 16;
export const CHUNK_VOLUME = CHUNK_SX * CHUNK_SY * CHUNK_SZ;

export function chunkKey(cx: number, cz: number): string {
  return `${cx},${cz}`;
}

export class VoxelChunk {
  readonly cx: number;
  readonly cz: number;
  readonly blocks: Uint8Array;
  /** Bumped whenever blocks change, so the World knows to (re)mesh. */
  dirty = true;
  /** True once any non-air block has been written (skip meshing empty chunks). */
  hasContent = false;

  constructor(cx: number, cz: number, blocks?: Uint8Array) {
    this.cx = cx;
    this.cz = cz;
    this.blocks = blocks ?? new Uint8Array(CHUNK_VOLUME);
    if (blocks) {
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] !== AIR) {
          this.hasContent = true;
          break;
        }
      }
    }
  }

  static index(x: number, y: number, z: number): number {
    return x + z * CHUNK_SX + y * (CHUNK_SX * CHUNK_SZ);
  }

  static inBounds(x: number, y: number, z: number): boolean {
    return (
      x >= 0 && x < CHUNK_SX && y >= 0 && y < CHUNK_SY && z >= 0 && z < CHUNK_SZ
    );
  }

  get(x: number, y: number, z: number): number {
    if (!VoxelChunk.inBounds(x, y, z)) return AIR;
    return this.blocks[VoxelChunk.index(x, y, z)];
  }

  set(x: number, y: number, z: number, id: number): void {
    if (!VoxelChunk.inBounds(x, y, z)) return;
    this.blocks[VoxelChunk.index(x, y, z)] = id;
    if (id !== AIR) this.hasContent = true;
    this.dirty = true;
  }
}
