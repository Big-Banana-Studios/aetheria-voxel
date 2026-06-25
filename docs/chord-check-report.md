# Aetheria — Chord / Mud Check (Selah Task 3, caution 3)

Sensory-dissonance (Sethares/Plomp–Levelt) over the octave-folded `playback_hz`.

## 1. Single tones (what the engine plays today)

The engine sounds one fundamental + its 2×/3×/5× harmonics — the harmonic
series, consonant by construction. Intrinsic dissonance should be low.

Max single-tone dissonance: **0.0138** (low = clean).

## 2. Muddiest pairs (only relevant if two tones ever sound together)

| pair | true Hz | playback Hz | beat (Hz) | roughness (0..1) |
|---|---|---|---|---|
| GUT-9 + HEART-1 | 963 + 1206 | 60.19 + 75.38 | 15.19 | 1.00 |
| HEART-1 + HEAD-2 | 1206 + 3858 | 75.38 + 60.28 | 15.1 | 1.00 |
| GUT-9 + HEART-6 | 963 + 2421 | 60.19 + 75.66 | 15.47 | 1.00 |
| HEART-1 + HEART-4 | 1206 + 1935 | 75.38 + 60.47 | 14.91 | 1.00 |
| HEART-6 + HEAD-2 | 2421 + 3858 | 75.66 + 60.28 | 15.38 | 1.00 |
| HEART-4 + HEART-6 | 1935 + 2421 | 60.47 + 75.66 | 15.19 | 1.00 |
| GUT-9 + HEAD-4 | 963 + 4566 | 60.19 + 71.34 | 11.15 | 1.00 |
| GUT-2 + GUT-9 | 285 + 963 | 71.25 + 60.19 | 11.06 | 1.00 |
| HEAD-2 + HEAD-4 | 3858 + 4566 | 60.28 + 71.34 | 11.06 | 0.99 |
| GUT-2 + HEAD-2 | 285 + 3858 | 71.25 + 60.28 | 10.97 | 0.99 |
| GUT-9 + HEAD-5 | 963 + 4920 | 60.19 + 76.88 | 16.69 | 0.99 |
| HEAD-2 + HEAD-5 | 3858 + 4920 | 60.28 + 76.88 | 16.6 | 0.99 |

Pairs whose fundamentals fall in the rough beating zone (2–30 Hz apart): **264** of 351.

## 3. Whole-regime drones (all 9 notes of a regime at once)

| regime | drone dissonance |
|---|---|
| GUT | 3.226 |
| HEART | 3.249 |
| HEAD | 3.324 |

## Verdict

- **Single-tone playback (current engine): clean** — harmonics of one fundamental do not beat.
- **Chords/drones: gate them.** Any future feature that sounds two+ of the 27 folded
  tones together should call `chordDissonance()` (src/audio/Dissonance.ts) and avoid the
  rough-zone pairs above, or space them by octaves / pick a consonant subset.
- Whole-regime 9-note drones are the muddiest case and should be voiced sparsely.