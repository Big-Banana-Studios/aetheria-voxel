/**
 * Walks — the Lo Shu walk orders that drive progression through the 27 nodes
 * (from the Aetheria Harmonic Player's walk canon: LOSHU_WALKS + the Ouroboros/
 * CABI handoff, brought into the voxel game).
 *
 * A "walk" is simply an ORDER through the cube's cells. The game keeps its 27
 * levels; the walk decides which node comes next as you auto-advance. The player
 * progresses through four walks in sequence:
 *
 *   1. Vortex   — Flying Star 5→6→7→8→9→1→2→3→4 per layer (emanate from centre)
 *   2. Ascent   — Layer 1→9 per layer (ground before you rise)
 *   3. Pillar   — each position GUT→HEART→HEAD (integrate each quality fully)
 *   4. Ouroboros— 29-step closed figure-8, crossing SOURCE (2178 Hz) three times
 *
 * Finishing all four unlocks the ADAPTIVE CABI: the full 110-step circuit
 * (CAB = Vortex+Ascent+Pillar = 81, then Ouroboros = 29), paced by your settling.
 *
 * Steps are expressed as {regime, pos} (Lo Shu position 1..9 within a layer) and
 * resolved to level indices against the frequency table — never hardcoded to an
 * index, so a re-ordered table can't silently break a walk.
 */
import type { FrequencyTable } from './FrequencyTable';

export type Regime = 'GUT' | 'HEART' | 'HEAD';

export interface WalkStep {
  regime: Regime;
  pos: number; // 1..9 Lo Shu position within the layer
  phase?: string; // optional phase token for the HUD indicator (V/A/B/♾️/✕)
}

export interface WalkDef {
  id: string;
  name: string; // short display name, e.g. "Vortex"
  label: string; // longer label, e.g. "Flying Star Vortex"
  description: string;
  steps: WalkStep[]; // may contain repeats (Ouroboros re-crosses SOURCE)
  adaptive: boolean; // CABI: dwell/dose pacing follows the player's settling
}

const LAYERS: Regime[] = ['GUT', 'HEART', 'HEAD'];

/** Ground-up per-layer walk: apply one position order to GUT, then HEART, then HEAD. */
function layerWalk(order: number[], phase: string): WalkStep[] {
  const steps: WalkStep[] = [];
  for (const regime of LAYERS) for (const pos of order) steps.push({ regime, pos, phase });
  return steps;
}

// Walk A — Layer Ascent: 1→9 through GUT, HEART, HEAD.
export const ASCENT: WalkStep[] = layerWalk([1, 2, 3, 4, 5, 6, 7, 8, 9], 'A');

// Walk C — Flying Star Vortex: 5→6→7→8→9→1→2→3→4 per layer (centre-outward).
export const VORTEX: WalkStep[] = layerWalk([5, 6, 7, 8, 9, 1, 2, 3, 4], 'V');

// Walk B — Pillar: for each position 1→9, play GUT→HEART→HEAD (nine vertical pillars).
export const PILLAR: WalkStep[] = (() => {
  const steps: WalkStep[] = [];
  for (let pos = 1; pos <= 9; pos++) for (const regime of LAYERS) steps.push({ regime, pos, phase: 'B' });
  return steps;
})();

// Ouroboros — 29-step closed figure-8 (Selah/Joseph handoff). SOURCE (HEART pos 5)
// is visited three times: start, centre crossing, and return.
export const OUROBOROS: WalkStep[] = [
  { regime: 'HEART', pos: 5, phase: '♾️' }, //  1  SOURCE start
  // ── Lobe 1 (left half) ──
  { regime: 'GUT', pos: 5 }, //  2
  { regime: 'GUT', pos: 3 }, //  3
  { regime: 'GUT', pos: 8 }, //  4
  { regime: 'GUT', pos: 1 }, //  5
  { regime: 'HEART', pos: 8 }, //  6
  { regime: 'HEAD', pos: 8 }, //  7
  { regime: 'HEAD', pos: 3 }, //  8
  { regime: 'HEAD', pos: 4 }, //  9
  { regime: 'HEART', pos: 4 }, // 10
  { regime: 'GUT', pos: 4 }, // 11
  { regime: 'GUT', pos: 9 }, // 12
  { regime: 'HEART', pos: 3 }, // 13
  { regime: 'HEART', pos: 1 }, // 14
  // ── Crossing ──
  { regime: 'HEART', pos: 5, phase: '✕' }, // 15  SOURCE crossing
  // ── Lobe 2 (right half) ──
  { regime: 'HEAD', pos: 5 }, // 16
  { regime: 'HEAD', pos: 7 }, // 17
  { regime: 'HEAD', pos: 2 }, // 18
  { regime: 'HEAD', pos: 9 }, // 19
  { regime: 'HEART', pos: 2 }, // 20
  { regime: 'GUT', pos: 2 }, // 21
  { regime: 'HEART', pos: 9 }, // 22
  { regime: 'GUT', pos: 7 }, // 23
  { regime: 'GUT', pos: 6 }, // 24
  { regime: 'HEART', pos: 6 }, // 25
  { regime: 'HEAD', pos: 6 }, // 26
  { regime: 'HEAD', pos: 1 }, // 27
  { regime: 'HEART', pos: 7 }, // 28
  // ── Return ──
  { regime: 'HEART', pos: 5, phase: '♾️' }, // 29  SOURCE return
];

// CAB — the three-phase complete sweep of the cube (81 steps).
export const CAB: WalkStep[] = [...VORTEX, ...ASCENT, ...PILLAR];

// CABI — CAB then Ouroboros (110 steps). The full circuit: open every angle, then
// close the loop into infinity. SOURCE lands at steps 10, 41, 68, 82, 96, 110.
export const CABI: WalkStep[] = [...CAB, ...OUROBOROS];

/** The four sequential progression walks. */
export const PROGRESSION_WALKS: WalkDef[] = [
  {
    id: 'vortex',
    name: 'Vortex',
    label: 'Flying Star Vortex',
    description: 'Emanate from the heart. Each layer begins at its centre and spirals outward.',
    steps: VORTEX,
    adaptive: false,
  },
  {
    id: 'ascent',
    name: 'Ascent',
    label: 'Layer Ascent',
    description: 'Ground before you rise. Position one to nine, layer by layer.',
    steps: ASCENT,
    adaptive: false,
  },
  {
    id: 'pillar',
    name: 'Pillar',
    label: 'Pillar Walk',
    description: 'Integrate each quality fully — gut, heart, head — before the next.',
    steps: PILLAR,
    adaptive: false,
  },
  {
    id: 'ouroboros',
    name: 'Ouroboros',
    label: 'Ouroboros ♾️',
    description: 'The closed figure-8 through all twenty-seven, crossing source three times. The dragon eats its tail.',
    steps: OUROBOROS,
    adaptive: false,
  },
];

/** The adaptive final walk, unlocked once the four are complete. */
export const CABI_WALK: WalkDef = {
  id: 'cabi',
  name: 'CABI',
  label: 'CABI · the full circuit',
  description: 'One hundred and ten steps — eighty-one to get every angle flowing, then twenty-nine to close the loop. Paced by your own settling.',
  steps: CABI,
  adaptive: true,
};

/** All walks in progression order (the four, then adaptive CABI). */
export const ALL_WALKS: WalkDef[] = [...PROGRESSION_WALKS, CABI_WALK];

/** Number of walks to complete before the adaptive CABI unlocks. */
export const PROGRESSION_WALK_COUNT = PROGRESSION_WALKS.length; // 4

/** Build a `${regime}-${pos}` → level-index lookup from the frequency table. */
export function buildPosIndex(freqTable: FrequencyTable): Map<string, number> {
  const m = new Map<string, number>();
  for (let i = 0; i < 27; i++) {
    const e = freqTable.get(i);
    m.set(`${e.regime}-${e.regime_position}`, i);
  }
  return m;
}

/** Resolve a walk's {regime,pos} steps to the ordered list of level indices. */
export function resolveWalkIndices(freqTable: FrequencyTable, walk: WalkDef): number[] {
  const m = buildPosIndex(freqTable);
  return walk.steps.map((s) => m.get(`${s.regime}-${s.pos}`) ?? 0);
}

/** Get a walk definition by its progression index (0..3 = walks, 4 = CABI). */
export function walkByIndex(i: number): WalkDef {
  return ALL_WALKS[Math.max(0, Math.min(ALL_WALKS.length - 1, i))];
}

/** The phase token for a step (for the HUD indicator), if any. */
export function stepPhase(walk: WalkDef, step: number): string | undefined {
  return walk.steps[step]?.phase;
}
