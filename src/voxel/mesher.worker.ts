/**
 * mesher.worker.ts — runs greedy meshing off the main thread (Section 11.2).
 *
 * The main thread sends a chunk's block array + the block palette; the worker
 * returns transferable typed-array geometry for the opaque and transparent
 * passes. Keeping this off the main thread protects the 60fps frame budget.
 */
import { meshChunk } from './GreedyMesher';
import type { BlockPalette } from './BlockRegistry';

export interface MeshRequest {
  key: string;
  cx: number;
  cz: number;
  dims: [number, number, number];
  voxels: Uint8Array;
  palette: BlockPalette;
}

self.onmessage = (e: MessageEvent<MeshRequest>) => {
  const { key, cx, cz, dims, voxels, palette } = e.data;
  const result = meshChunk(voxels, dims, palette);

  const transfer: Transferable[] = [
    result.opaque.position.buffer,
    result.opaque.normal.buffer,
    result.opaque.color.buffer,
    result.opaque.emissive.buffer,
    result.transparent.position.buffer,
    result.transparent.normal.buffer,
    result.transparent.color.buffer,
    result.transparent.emissive.buffer,
  ];

  (self as unknown as Worker).postMessage({ key, cx, cz, result }, transfer);
};
