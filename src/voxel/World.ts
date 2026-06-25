/**
 * World — chunk manager (Section 4.1 / Phase 2).
 *
 * Owns the voxel chunks for the currently loaded level, the shared voxel
 * materials, and the mesher worker. Because the game streams ONE bounded level
 * at a time (Section 11.2 "one level streamed at a time"), chunks are created up
 * front by the EnvironmentBuilder and (re)meshed asynchronously when dirty —
 * there is no infinite terrain streaming to manage.
 *
 * Exposes world-space block reads/writes, solid tests for collision, and a
 * coherence setter that drives the voxel shader.
 */
import * as THREE from 'three';
import {
  VoxelChunk,
  CHUNK_SX,
  CHUNK_SY,
  CHUNK_SZ,
  chunkKey,
} from './VoxelChunk';
import { buildPalette, isSolid, AIR } from './BlockRegistry';
import type { ChunkMeshResult } from './GreedyMesher';
import { createVoxelMaterial } from './VoxelMaterial';
import MesherWorker from './mesher.worker?worker';

interface ChunkMeshes {
  opaque?: THREE.Mesh;
  transparent?: THREE.Mesh;
}

export class World {
  readonly group = new THREE.Group();
  private chunks = new Map<string, VoxelChunk>();
  private meshes = new Map<string, ChunkMeshes>();
  private worker: Worker;
  private palette = buildPalette();
  private opaqueMaterial = createVoxelMaterial(false);
  private transparentMaterial = createVoxelMaterial(true);
  private pendingKeys = new Set<string>();

  constructor() {
    this.group.name = 'VoxelWorld';
    this.worker = new MesherWorker();
    this.worker.onmessage = (e: MessageEvent) => this.onMeshed(e.data);
  }

  // ── Chunk access ──

  private getChunk(cx: number, cz: number): VoxelChunk | undefined {
    return this.chunks.get(chunkKey(cx, cz));
  }

  ensureChunk(cx: number, cz: number): VoxelChunk {
    const key = chunkKey(cx, cz);
    let c = this.chunks.get(key);
    if (!c) {
      c = new VoxelChunk(cx, cz);
      this.chunks.set(key, c);
    }
    return c;
  }

  // ── World-space block I/O ──

  private static toChunkCoord(w: number): { c: number; l: number } {
    const c = Math.floor(w / CHUNK_SX);
    const l = w - c * CHUNK_SX;
    return { c, l };
  }

  getBlock(wx: number, wy: number, wz: number): number {
    if (wy < 0 || wy >= CHUNK_SY) return AIR;
    const { c: cx, l: lx } = World.toChunkCoord(wx);
    const { c: cz, l: lz } = World.toChunkCoord(wz);
    const chunk = this.getChunk(cx, cz);
    return chunk ? chunk.get(lx, wy, lz) : AIR;
  }

  setBlock(wx: number, wy: number, wz: number, id: number): void {
    if (wy < 0 || wy >= CHUNK_SY) return;
    const { c: cx, l: lx } = World.toChunkCoord(wx);
    const { c: cz, l: lz } = World.toChunkCoord(wz);
    const chunk = this.ensureChunk(cx, cz);
    chunk.set(lx, wy, lz, id);
  }

  isSolidAt(wx: number, wy: number, wz: number): boolean {
    return isSolid(this.getBlock(wx, wy, wz));
  }

  // ── Meshing ──

  /** Queue every dirty chunk for (re)meshing on the worker. */
  remeshDirty(): void {
    for (const [key, chunk] of this.chunks) {
      if (!chunk.dirty || this.pendingKeys.has(key)) continue;
      if (!chunk.hasContent) {
        chunk.dirty = false;
        continue;
      }
      chunk.dirty = false;
      this.pendingKeys.add(key);
      // Copy the block array so the worker can take ownership without
      // disturbing the live chunk.
      const voxels = chunk.blocks.slice();
      this.worker.postMessage(
        {
          key,
          cx: chunk.cx,
          cz: chunk.cz,
          dims: [CHUNK_SX, CHUNK_SY, CHUNK_SZ],
          voxels,
          palette: this.palette,
        },
        [voxels.buffer],
      );
    }
  }

  private onMeshed(data: {
    key: string;
    cx: number;
    cz: number;
    result: ChunkMeshResult;
  }): void {
    this.pendingKeys.delete(data.key);
    const { cx, cz, result } = data;

    let entry = this.meshes.get(data.key);
    if (!entry) {
      entry = {};
      this.meshes.set(data.key, entry);
    }

    this.applyMesh(entry, 'opaque', result.opaque, cx, cz, this.opaqueMaterial);
    this.applyMesh(
      entry,
      'transparent',
      result.transparent,
      cx,
      cz,
      this.transparentMaterial,
    );

    // If the chunk was edited again while meshing, it will be re-queued by
    // the next remeshDirty() pass.
  }

  private applyMesh(
    entry: ChunkMeshes,
    kind: 'opaque' | 'transparent',
    mesh: ChunkMeshResult['opaque'],
    cx: number,
    cz: number,
    material: THREE.Material,
  ): void {
    const existing = entry[kind];
    if (mesh.vertexCount === 0) {
      if (existing) {
        this.group.remove(existing);
        existing.geometry.dispose();
        entry[kind] = undefined;
      }
      return;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(mesh.position, 3));
    geom.setAttribute('normal', new THREE.BufferAttribute(mesh.normal, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(mesh.color, 3));
    geom.setAttribute('emissive', new THREE.BufferAttribute(mesh.emissive, 1));
    geom.computeBoundingSphere();

    if (existing) {
      existing.geometry.dispose();
      existing.geometry = geom;
    } else {
      const m = new THREE.Mesh(geom, material);
      m.position.set(cx * CHUNK_SX, 0, cz * CHUNK_SZ);
      m.frustumCulled = true;
      m.renderOrder = kind === 'transparent' ? 1 : 0;
      this.group.add(m);
      entry[kind] = m;
    }
  }

  // ── Environment driving ──

  setCoherence(c: number): void {
    this.opaqueMaterial.uniforms.uCoherence.value = c;
    this.transparentMaterial.uniforms.uCoherence.value = c;
  }

  applyAtmosphere(opts: {
    fogColor: THREE.ColorRepresentation;
    fogDensity: number;
    skyColor: THREE.ColorRepresentation;
    groundColor: THREE.ColorRepresentation;
    sunColor: THREE.ColorRepresentation;
    emissiveBoost?: number;
  }): void {
    for (const mat of [this.opaqueMaterial, this.transparentMaterial]) {
      mat.uniforms.uFogColor.value.set(opts.fogColor);
      mat.uniforms.uFogDensity.value = opts.fogDensity;
      mat.uniforms.uSkyColor.value.set(opts.skyColor);
      mat.uniforms.uGroundColor.value.set(opts.groundColor);
      mat.uniforms.uSunColor.value.set(opts.sunColor);
      mat.uniforms.uEmissiveBoost.value = opts.emissiveBoost ?? 1.0;
    }
  }

  /** Tear down all chunks/meshes when switching levels. */
  clear(): void {
    for (const entry of this.meshes.values()) {
      if (entry.opaque) {
        this.group.remove(entry.opaque);
        entry.opaque.geometry.dispose();
      }
      if (entry.transparent) {
        this.group.remove(entry.transparent);
        entry.transparent.geometry.dispose();
      }
    }
    this.meshes.clear();
    this.chunks.clear();
    this.pendingKeys.clear();
  }

  dispose(): void {
    this.clear();
    this.worker.terminate();
    this.opaqueMaterial.dispose();
    this.transparentMaterial.dispose();
  }
}
