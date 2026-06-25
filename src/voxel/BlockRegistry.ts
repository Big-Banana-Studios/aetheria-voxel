/**
 * BlockRegistry — the voxel palette (Section 4.3).
 *
 * Each block type is a small record; the mesher reads color/emissive/opacity to
 * build geometry, and the player controller reads `solid` for collision. No
 * textures: flat-shaded colored cubes with per-block emissive carry the look.
 *
 * IMPORTANT: this module is imported by BOTH the main thread and the mesher
 * Web Worker, so it must stay free of DOM/Three.js dependencies. It exports
 * plain data + a serializable palette the worker can use.
 *
 * Static environment terrain lives in chunks (these block ids). Animated,
 * frequency-reactive elements are separate Three.js meshes placed by the level
 * (see src/props/), so they can pulse and bloom independently of the voxel grid.
 */

export interface BlockType {
  id: number;
  name: string;
  color: string; // base hex, e.g. "#8B0000"
  emissive: number; // 0..1 glow strength
  opacity: number; // 1 = solid, <1 = translucent
  solid: boolean; // collision
  reactive?: boolean; // responds to frequency/coherence (used as a build-time hint)
}

// Block id 0 is always AIR.
export const AIR = 0;

export const BLOCK_TYPES: BlockType[] = [
  { id: 0, name: 'air', color: '#000000', emissive: 0, opacity: 0, solid: false },

  // ── Shared structural ──
  { id: 1, name: 'stone', color: '#5b5560', emissive: 0, opacity: 1, solid: true },
  { id: 2, name: 'obsidian', color: '#15101f', emissive: 0, opacity: 1, solid: true },

  // ── GUT regime — Primal Earth ──
  { id: 3, name: 'basalt', color: '#2e2630', emissive: 0, opacity: 1, solid: true },
  { id: 4, name: 'magma', color: '#ff5410', emissive: 0.9, opacity: 1, solid: true },
  { id: 5, name: 'quartz', color: '#d8c8e0', emissive: 0.08, opacity: 1, solid: true },
  { id: 6, name: 'glow_lichen', color: '#5dd66a', emissive: 0.7, opacity: 1, solid: true, reactive: true },
  { id: 7, name: 'wet_stone', color: '#3a3640', emissive: 0, opacity: 1, solid: true },
  { id: 8, name: 'ember_rock', color: '#7a2b1a', emissive: 0.25, opacity: 1, solid: true },

  // ── HEART regime — Living World ──
  { id: 9, name: 'living_wood', color: '#6b4a2f', emissive: 0, opacity: 1, solid: true },
  { id: 10, name: 'leaf', color: '#3f9a52', emissive: 0.05, opacity: 1, solid: true },
  { id: 11, name: 'water', color: '#3a7bd5', emissive: 0.05, opacity: 0.55, solid: false },
  { id: 12, name: 'moss', color: '#4f7a3a', emissive: 0.03, opacity: 1, solid: true },
  { id: 13, name: 'petal', color: '#e89ac4', emissive: 0.2, opacity: 1, solid: true },
  { id: 14, name: 'gold_stone', color: '#e8b94a', emissive: 0.4, opacity: 1, solid: true },
  { id: 15, name: 'cloud_marble', color: '#e6e8f0', emissive: 0.15, opacity: 1, solid: true },

  // ── HEAD regime — Cosmic Transcendence ──
  { id: 16, name: 'crystal', color: '#b48ee8', emissive: 0.45, opacity: 1, solid: true, reactive: true },
  { id: 17, name: 'light_construct', color: '#f4f0ff', emissive: 0.95, opacity: 1, solid: true },
  { id: 18, name: 'void', color: '#080510', emissive: 0, opacity: 1, solid: true },
  { id: 19, name: 'nebula_gas', color: '#7b4ad5', emissive: 0.3, opacity: 0.4, solid: false },
  { id: 20, name: 'fractal_stone', color: '#5a4a8a', emissive: 0.12, opacity: 1, solid: true },

  // ── Meditation / pathway markers ──
  { id: 21, name: 'meditation_floor', color: '#cfc2e8', emissive: 0.3, opacity: 1, solid: true, reactive: true },
  { id: 22, name: 'path_glow', color: '#9ad6c8', emissive: 0.55, opacity: 1, solid: true, reactive: true },
];

const byId = new Map<number, BlockType>();
const byName = new Map<string, BlockType>();
for (const b of BLOCK_TYPES) {
  byId.set(b.id, b);
  byName.set(b.name, b);
}

export function getBlock(id: number): BlockType {
  return byId.get(id) ?? BLOCK_TYPES[0];
}

export function blockId(name: string): number {
  const b = byName.get(name);
  if (!b) throw new Error(`Unknown block name: ${name}`);
  return b.id;
}

export function isSolid(id: number): boolean {
  return getBlock(id).solid;
}

/** Fully opaque, view-occluding block (used for opaque-pass face culling). */
export function isOpaque(id: number): boolean {
  const b = getBlock(id);
  return id !== AIR && b.opacity >= 1;
}

/** Translucent block (water, nebula gas) — meshed in the transparent pass. */
export function isTranslucent(id: number): boolean {
  const b = getBlock(id);
  return id !== AIR && b.opacity < 1;
}

/** Parse "#rrggbb" → [r,g,b] in 0..1 linear-ish sRGB component floats. */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/**
 * A flat, transferable palette for the mesher worker: for each block id,
 * r,g,b in 0..1, emissive, opacity, and flags packed into typed arrays.
 */
export interface BlockPalette {
  maxId: number;
  r: Float32Array;
  g: Float32Array;
  b: Float32Array;
  emissive: Float32Array;
  opacity: Float32Array;
  opaque: Uint8Array; // 1 if isOpaque
  translucent: Uint8Array; // 1 if isTranslucent
}

export function buildPalette(): BlockPalette {
  const maxId = BLOCK_TYPES.reduce((m, b) => Math.max(m, b.id), 0);
  const size = maxId + 1;
  const pal: BlockPalette = {
    maxId,
    r: new Float32Array(size),
    g: new Float32Array(size),
    b: new Float32Array(size),
    emissive: new Float32Array(size),
    opacity: new Float32Array(size),
    opaque: new Uint8Array(size),
    translucent: new Uint8Array(size),
  };
  for (const blk of BLOCK_TYPES) {
    const [r, g, b] = hexToRgb(blk.color);
    pal.r[blk.id] = r;
    pal.g[blk.id] = g;
    pal.b[blk.id] = b;
    pal.emissive[blk.id] = blk.emissive;
    pal.opacity[blk.id] = blk.opacity;
    pal.opaque[blk.id] = blk.id !== AIR && blk.opacity >= 1 ? 1 : 0;
    pal.translucent[blk.id] = blk.id !== AIR && blk.opacity < 1 ? 1 : 0;
  }
  return pal;
}
