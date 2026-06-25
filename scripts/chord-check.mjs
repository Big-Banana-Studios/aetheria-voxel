/**
 * chord-check.mjs — Selah Task 3, caution 3: verify the octave-folded playback
 * frequencies don't beat/mud when sounded together.
 *
 * Runs the Sethares sensory-dissonance model (mirrors src/audio/Dissonance.ts —
 * canonical version lives there) over:
 *   1. each single tone as the engine plays it (fundamental + 2×/3×/5×),
 *   2. every pair of the 27 playback fundamentals (future drones/chords),
 *   3. each regime's 9-note cluster sounded as one drone.
 *
 * Writes docs/chord-check-report.md and prints a summary.
 *
 * Run: node scripts/chord-check.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Sethares dissonance (Plomp–Levelt) ──
const DSTAR = 0.24, S1 = 0.0207, S2 = 18.96, B1 = 3.51, B2 = 5.75;
function pairDiss(f1, a1, f2, a2) {
  const fmin = Math.min(f1, f2), fmax = Math.max(f1, f2);
  const s = DSTAR / (S1 * fmin + S2);
  const df = fmax - fmin;
  const amp = Math.min(a1, a2);
  return amp * (Math.exp(-B1 * s * df) - Math.exp(-B2 * s * df));
}
function chordDiss(partials) {
  let d = 0;
  for (let i = 0; i < partials.length; i++)
    for (let j = i + 1; j < partials.length; j++)
      d += pairDiss(partials[i].f, partials[i].a, partials[j].f, partials[j].a);
  return d;
}
const tonePartials = (f, base = 0.27) => [
  { f, a: base }, { f: f * 2, a: 0.12 }, { f: f * 3, a: 0.07 }, { f: f * 5, a: 0.04 },
];

// ── Load the table ──
const table = JSON.parse(readFileSync(join(root, 'public/data/aetheria-frequency-table.json'), 'utf8'));
const F = table.frequencies;

// 1. Single tones (what the engine actually plays today).
const singles = F.map((e) => ({
  name: `${e.regime}-${e.regime_position} ${e.level_name}`,
  trueHz: e.frequency_hz,
  pb: e.playback_hz,
  d: chordDiss(tonePartials(e.playback_hz)),
}));
const maxSingle = Math.max(...singles.map((s) => s.d));

// 2. All pairs of fundamentals (future drones/chords). Interaction dissonance =
// combined − each tone's intrinsic, isolating the clash between the two tones.
const pairs = [];
for (let i = 0; i < F.length; i++) {
  for (let j = i + 1; j < F.length; j++) {
    const pi = tonePartials(F[i].playback_hz), pj = tonePartials(F[j].playback_hz);
    const combined = chordDiss([...pi, ...pj]);
    const interaction = combined - chordDiss(pi) - chordDiss(pj);
    pairs.push({
      a: `${F[i].regime}-${F[i].regime_position}`,
      b: `${F[j].regime}-${F[j].regime_position}`,
      aTrue: F[i].frequency_hz, bTrue: F[j].frequency_hz,
      aPb: F[i].playback_hz, bPb: F[j].playback_hz,
      beat: +Math.abs(F[i].playback_hz - F[j].playback_hz).toFixed(2),
      interaction,
    });
  }
}
pairs.sort((x, y) => y.interaction - x.interaction);
const maxPair = pairs[0].interaction;
// Normalize interaction to 0..1 for readability.
const norm = (v) => (maxPair > 0 ? v / maxPair : 0);

// 3. Each regime sounded as a 9-note drone.
const regimes = ['GUT', 'HEART', 'HEAD'];
const regimeDrones = regimes.map((r) => {
  const partials = F.filter((e) => e.regime === r).flatMap((e) => tonePartials(e.playback_hz));
  return { regime: r, d: chordDiss(partials) };
});

// Rough-zone flag: fundamentals 2–30 Hz apart beat audibly in the bass.
const roughZone = pairs.filter((p) => p.beat >= 2 && p.beat <= 30);
roughZone.sort((x, y) => y.interaction - x.interaction);

// ── Report ──
const lines = [];
lines.push('# Aetheria — Chord / Mud Check (Selah Task 3, caution 3)', '');
lines.push('Sensory-dissonance (Sethares/Plomp–Levelt) over the octave-folded `playback_hz`.', '');
lines.push('## 1. Single tones (what the engine plays today)', '');
lines.push('The engine sounds one fundamental + its 2×/3×/5× harmonics — the harmonic');
lines.push('series, consonant by construction. Intrinsic dissonance should be low.', '');
lines.push(`Max single-tone dissonance: **${maxSingle.toFixed(4)}** (low = clean).`, '');

lines.push('## 2. Muddiest pairs (only relevant if two tones ever sound together)', '');
lines.push('| pair | true Hz | playback Hz | beat (Hz) | roughness (0..1) |');
lines.push('|---|---|---|---|---|');
for (const p of pairs.slice(0, 12)) {
  lines.push(`| ${p.a} + ${p.b} | ${p.aTrue} + ${p.bTrue} | ${p.aPb} + ${p.bPb} | ${p.beat} | ${norm(p.interaction).toFixed(2)} |`);
}
lines.push('');
lines.push(`Pairs whose fundamentals fall in the rough beating zone (2–30 Hz apart): **${roughZone.length}** of ${pairs.length}.`, '');

lines.push('## 3. Whole-regime drones (all 9 notes of a regime at once)', '');
lines.push('| regime | drone dissonance |');
lines.push('|---|---|');
for (const r of regimeDrones) lines.push(`| ${r.regime} | ${r.d.toFixed(3)} |`);
lines.push('');

lines.push('## Verdict', '');
lines.push('- **Single-tone playback (current engine): clean** — harmonics of one fundamental do not beat.');
lines.push('- **Chords/drones: gate them.** Any future feature that sounds two+ of the 27 folded');
lines.push('  tones together should call `chordDissonance()` (src/audio/Dissonance.ts) and avoid the');
lines.push('  rough-zone pairs above, or space them by octaves / pick a consonant subset.');
lines.push('- Whole-regime 9-note drones are the muddiest case and should be voiced sparsely.');

const outDir = join(root, 'docs');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'chord-check-report.md'), lines.join('\n'));

// ── Console summary ──
console.log('CHORD / MUD CHECK');
console.log(`  single tones      : max dissonance ${maxSingle.toFixed(4)} (clean if small)`);
console.log(`  pairs in rough zone: ${roughZone.length}/${pairs.length} (2–30 Hz beat)`);
console.log('  muddiest pairs:');
for (const p of roughZone.slice(0, 6)) {
  console.log(`    ${p.a}+${p.b}  ${p.aPb}+${p.bPb} Hz  beat ${p.beat}Hz  rough ${norm(p.interaction).toFixed(2)}`);
}
console.log('  regime drones     :', regimeDrones.map((r) => `${r.regime} ${r.d.toFixed(2)}`).join('  '));
console.log('  report -> docs/chord-check-report.md');
