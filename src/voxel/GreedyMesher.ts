/**
 * GreedyMesher — chunk block array → BufferGeometry attributes (Section 4.1).
 *
 * Classic Lysenko-style greedy meshing: adjacent coplanar faces of the same
 * block id are merged into a single quad, keeping triangle counts low. Two
 * passes are run:
 *   - opaque: solid blocks, culled against other opaque blocks.
 *   - transparent: translucent blocks (water, nebula gas), culled against the
 *     same block id and against opaque blocks (which already hide them).
 *
 * Pure and DOM/Three-free so it runs inside mesher.worker.ts. Out-of-chunk
 * neighbours are treated as air (border faces are emitted); with one level
 * streamed at a time this is correct on screen and only mildly over-draws.
 */
import type { BlockPalette } from './BlockRegistry';

export interface MeshData {
  position: Float32Array;
  normal: Float32Array;
  color: Float32Array; // rgb per vertex
  emissive: Float32Array; // 1 per vertex
  vertexCount: number;
}

export interface ChunkMeshResult {
  opaque: MeshData;
  transparent: MeshData;
}

// Scratch growable buffers reused across quads, flushed into typed arrays.
class Builder {
  pos: number[] = [];
  nrm: number[] = [];
  col: number[] = [];
  emi: number[] = [];

  /** Emit one quad as two triangles. (x,y,z) is the base corner; du,dv span it. */
  quad(
    x: number,
    y: number,
    z: number,
    du: [number, number, number],
    dv: [number, number, number],
    nx: number,
    ny: number,
    nz: number,
    r: number,
    g: number,
    b: number,
    em: number,
  ): void {
    // Four corners.
    const p0 = [x, y, z];
    const p1 = [x + du[0], y + du[1], z + du[2]];
    const p2 = [x + du[0] + dv[0], y + du[1] + dv[1], z + du[2] + dv[2]];
    const p3 = [x + dv[0], y + dv[1], z + dv[2]];

    // Wind so the triangle normal matches (nx,ny,nz). For a positive-facing
    // face we go p0,p1,p2,p0,p2,p3; for negative-facing we reverse.
    const positiveFace = nx + ny + nz > 0;
    const order = positiveFace
      ? [p0, p1, p2, p0, p2, p3]
      : [p0, p2, p1, p0, p3, p2];

    for (const p of order) {
      this.pos.push(p[0], p[1], p[2]);
      this.nrm.push(nx, ny, nz);
      this.col.push(r, g, b);
      this.emi.push(em);
    }
  }

  toMeshData(): MeshData {
    return {
      position: new Float32Array(this.pos),
      normal: new Float32Array(this.nrm),
      color: new Float32Array(this.col),
      emissive: new Float32Array(this.emi),
      vertexCount: this.pos.length / 3,
    };
  }
}

type OccludeFn = (id: number) => boolean;
type ConsiderFn = (id: number) => boolean;

export function meshChunk(
  voxels: Uint8Array,
  dims: [number, number, number],
  palette: BlockPalette,
): ChunkMeshResult {
  const opaque = new Builder();
  const transparent = new Builder();

  // Opaque pass: consider opaque blocks, cull when neighbour is opaque.
  greedy(
    voxels,
    dims,
    palette,
    opaque,
    (id) => palette.opaque[id] === 1, // consider
    (id) => palette.opaque[id] === 1, // occludes (hides our face)
    false,
  );

  // Transparent pass: consider translucent blocks; a face is hidden by the
  // same translucent id (merged) or by any opaque block in front of it.
  greedy(
    voxels,
    dims,
    palette,
    transparent,
    (id) => palette.translucent[id] === 1, // consider
    (id) => palette.opaque[id] === 1, // opaque hides; same-id handled in mask
    true,
  );

  return { opaque: opaque.toMeshData(), transparent: transparent.toMeshData() };
}

function greedy(
  voxels: Uint8Array,
  dims: [number, number, number],
  palette: BlockPalette,
  out: Builder,
  consider: ConsiderFn,
  occludes: OccludeFn,
  mergeSameOnly: boolean,
): void {
  const [SX, SY, SZ] = dims;
  const sizes = [SX, SY, SZ];

  const voxel = (x: number, y: number, z: number): number => {
    if (x < 0 || x >= SX || y < 0 || y >= SY || z < 0 || z >= SZ) return 0;
    return voxels[x + z * SX + y * (SX * SZ)];
  };

  for (let d = 0; d < 3; d++) {
    const u = (d + 1) % 3;
    const v = (d + 2) % 3;
    const x = [0, 0, 0];
    const q = [0, 0, 0];
    q[d] = 1;

    const maskW = sizes[u];
    const maskH = sizes[v];
    // mask holds a signed block id: +id => face on +d side of block a,
    // -id => face on -d side of block b. 0 => no face.
    const mask = new Int32Array(maskW * maskH);

    for (x[d] = -1; x[d] < sizes[d]; ) {
      // Build the mask for the slice between x[d] and x[d]+1.
      let n = 0;
      for (x[v] = 0; x[v] < sizes[v]; x[v]++) {
        for (x[u] = 0; x[u] < sizes[u]; x[u]++, n++) {
          const a = x[d] >= 0 ? voxel(x[0], x[1], x[2]) : 0;
          const bx = x[0] + q[0];
          const by = x[1] + q[1];
          const bz = x[2] + q[2];
          const b = x[d] < sizes[d] - 1 ? voxel(bx, by, bz) : 0;

          const aConsider = consider(a);
          const bConsider = consider(b);

          let cell = 0;
          if (mergeSameOnly) {
            // Transparent: draw a's +face if a is translucent, b isn't the same
            // block, and b doesn't fully occlude it.
            if (aConsider && b !== a && !occludes(b)) cell = a;
            else if (bConsider && a !== b && !occludes(a)) cell = -b;
          } else {
            // Opaque: standard exposed-face test.
            if (aConsider && !occludes(b)) cell = a;
            else if (bConsider && !occludes(a)) cell = -b;
          }
          mask[n] = cell;
        }
      }

      x[d]++;

      // Greedily emit quads from the mask.
      n = 0;
      for (let j = 0; j < maskH; j++) {
        for (let i = 0; i < maskW; ) {
          const c = mask[n];
          if (c === 0) {
            i++;
            n++;
            continue;
          }
          // Width: extend along u while the cell matches.
          let w = 1;
          while (i + w < maskW && mask[n + w] === c) w++;
          // Height: extend along v while the whole row matches.
          let h = 1;
          let stop = false;
          while (j + h < maskH) {
            for (let k = 0; k < w; k++) {
              if (mask[n + k + h * maskW] !== c) {
                stop = true;
                break;
              }
            }
            if (stop) break;
            h++;
          }

          // Place the quad.
          x[u] = i;
          x[v] = j;
          const du: [number, number, number] = [0, 0, 0];
          const dv: [number, number, number] = [0, 0, 0];
          du[u] = w;
          dv[v] = h;

          const id = Math.abs(c);
          const sign = c > 0 ? 1 : -1;
          const nrm: [number, number, number] = [0, 0, 0];
          nrm[d] = sign;

          out.quad(
            x[0],
            x[1],
            x[2],
            du,
            dv,
            nrm[0],
            nrm[1],
            nrm[2],
            palette.r[id],
            palette.g[id],
            palette.b[id],
            palette.emissive[id],
          );

          // Zero out the consumed cells.
          for (let l = 0; l < h; l++) {
            for (let k = 0; k < w; k++) {
              mask[n + k + l * maskW] = 0;
            }
          }

          i += w;
          n += w;
        }
      }
    }
  }
}
