# Aetheria: Resonance of the Spheres — Voxel Edition

A browser-native, EEG-reactive contemplative voxel game. 27 frequency realms in
3 regimes (GUT / HEART / HEAD), each tuned to a frequency from the Aetheria
system. The world — light, color, audio, puzzles — responds to your measured
neural coherence from a Muse EEG headband, or to behaviour in **Manual Mode**.

Built per `../Aetheria_Game_Design_Document_v2_Voxel.md`. Three.js + TypeScript
+ Vite. No native code, no server, local-first.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static bundle → dist/  (deploy to GitHub Pages)
npm run preview  # serve the production build
```

Use **Chrome or Edge** for the Muse (Web Bluetooth) path; any modern browser
runs Manual Mode.

## Controls

- **WASD / arrows** — walk (deliberate, no sprint)
- **Mouse** — look (click to capture the pointer)
- **Space / Shift** — rise / descend (fly mode), or Space to float-jump
- **G** — toggle fly mode
- **F** — Focus on a reactive block
- **M** — enter/leave Meditation stance
- **1–9** — (Manual Mode) select a frequency within the regime
- **C** — open the Lo Shu cube (hero view); click an unlocked node to travel
- **V** — session metrics (measured Athena/Polar signals · sparklines · export)
- **`** (backtick) — toggle the EEG debug overlay
- **Esc** — pause (session metrics · settings · return to title)

## Architecture (maps to GDD Section 4.1)

```
src/
  core/      Game loop + state machine, PlayerController, FrequencyTable, rng
  voxel/     VoxelChunk, World, BlockRegistry, GreedyMesher, mesher.worker, VoxelMaterial
  eeg/       MuseClient (wraps athena-core.js), PolarClient (wraps polar-h10.js,
             HRV/heart coherence), ManualMode, BandPowerAnalyzer,
             CoherenceCalculator, FrequencyPrescriber, dsp, EventBus, EEGDebugOverlay
  audio/     Oscillator, BinauralBeat, AudioStack (coherence-driven, A=432Hz)
  levels/    LevelBase, TemplateLevel, EnvironmentBuilder, LevelFrequencyConfig, definitions/
  props/     FrequencyReactiveBlock + ResonanceCrystal, CymaticsPool, HarmonicBridge,
             CoherenceGate, SacredGeometryEmitter, FrequencyFlora
  ui/        HUD, CoherenceMandala, FrequencyArc, ConnectionStatus
public/data/ aetheria-frequency-table.json   ← single source of truth
```

### Status

**All 7 GDD phases + Selah's Phase B are complete.** Project foundation, voxel
engine, EEG pipeline, audio, level framework, **all 27 levels** (GUT magma
caverns, HEART river gardens, HEAD floating cosmic platforms), the **Lo Shu cube**
map (27 frequencies as a 3×3×3 magic cube — GUT bottom, HEART middle, HEAD crown,
2178 Hz at the centre), and the **shell**: main menu, settings (audio · render
scale · subtitles · reduce-motion · reduce-flashes · settling-depth difficulty),
pause, credits, and **IndexedDB save** (per-level stats + research export, with
one-time migration from the localStorage prototype). Levels unlock in order
within a regime, regimes in any order. A GitHub Pages deploy workflow is included
(`.github/workflows/deploy.yml`).

### Deploy

The build is fully static (`vite build` → `dist/`); GitHub Pages serves it
directly. `vite.config.ts` uses a relative `base`, so it works under a project
subpath (`user.github.io/<repo>/`) or a custom domain.

**Automatic (push to `main`):** the workflow (`.github/workflows/deploy.yml`)
builds and force-pushes `dist/` to the **`gh-pages`** branch. One-time setup:
**Settings → Pages → Build and deployment → Source → "Deploy from a branch" →
`gh-pages` / `(root)`**.

**Manual (one command):** `npm run deploy` builds and publishes `dist/` to
`gh-pages` from your machine (uses `npx gh-pages`; `-t` keeps the `.nojekyll`).

A `.nojekyll` file ships in the build so Pages serves the bundle verbatim
(no Jekyll processing).

**Installable / offline-first.** Production builds register a service worker
(`public/sw.js`) that precaches the whole app from a build-time manifest, so
after a single online visit the game runs fully offline (over HTTPS or
`localhost` — a browser requirement for service workers). The title screen shows
the build version; bump `version` in `package.json` to roll a fresh cache.

The **27 real Aetheria Guidebook frequencies** (174 Hz → 6336 Hz, SOURCE = 2178 Hz)
are loaded as the canonical `frequency_hz`. Because the audio is meant to be
*felt, not heard*, the engine sounds a `playback_hz` that octave-folds each true
frequency into ~27–110 Hz (pure octaves preserve each note's identity). Digital
roots are computed from the true values (GUT/HEAD: 3-6-9; HEART: all 9, the +243
order).

**Sensors:** a Muse EEG headband (cortical coherence + frequency prescription)
and/or a **Polar H10** chest strap (HRV / heart coherence). Either can be paired
from the setup bar; when the Polar is connected its heart-coherence is fused with
the EEG/behaviour coherence (heart leads in Manual Mode, EEG leads with a Muse).

## Hard rules honored

- **A = 432 Hz**, never 440. All tones generated natively at 432-based values.
- **Frequency Hz values are never fabricated.** `aetheria-frequency-table.json`
  holds the owner's real Aetheria Guidebook values (174 → 6336 Hz), published here
  by the Foundation's choice. The engine also runs structurally without them
  (placeholder `0.0` values degrade gracefully to the felt-audio fallback).
- **No fail states, no countdown timers, no startle effects.** Therapeutic tool
  for veterans / TBI survivors.
- **Manual Mode is first-class** — a complete path for players without a headset.
- **Coherence Lab code is reused**, not re-derived (FFT/PSD/coherence ported
  from `athena-core.js` / `spiral-wave.js`).

## Sound design (canonical)

Per `../SUB_BASS_IMPLEMENTATION.md`, audio is a unified stack: the felt carrier
(octave-folded into ~27–110 Hz), the binaural beat (~3–5%, golden offset), the
harmonic series, and a **canonical sub-bass grounding tone** — the true frequency
octave-divided into the **theta–alpha regulation zone (5–12 Hz)**, harmonically
locked (same pitch-class), with a slow LFO amplitude-modulation breath. e.g.
528 → 8.25 Hz (α), 2178 → 8.51 Hz. A = 432 Hz throughout.

## Session metrics (honest Data mode)

Press **V** (or pause → Session Metrics, or on level complete) for every relevant
Muse S Athena + Polar signal — EEG band powers, θ/α and β/γ ratios, inter-channel
PLV, accelerometer stillness, HR, HRV (RMSSD), fNIRS HbO/HbR, battery — each as
last/mean/min/max with a sparkline, exportable as JSON. These are **measured
signals, never a score**; the panel says so.

## Honest signals (Selah's guide)

- **Relative, never absolute.** The settle signal is measured against the
  player's *own* baseline, not a fixed threshold.
- **Honest claims only.** The sensor measures *bodily settling* (HRV / RMSSD,
  breath-driven). UI says "settled / present / grounded / steady" and shows
  heart rate (a real measurement) — it never shows a coherence %, an attainment
  level, or any brain-state score. (Anti-fake-neurofeedback.)
- **Guaranteed progress.** Every level has a max-dwell ceiling and the gate can
  force-open — no level is ever a wall.
- **Brain chooses, body gates.** EEG band-power *prescribes the frequency*; the
  *settle gate* is driven by the body — HRV (Polar) → relative stillness (Muse
  accelerometer) → behaviour → the level's max-dwell ceiling. EEG "coherence" is
  logged but never gates (honest-claims rule).
- **Graceful degradation.** Every link in that chain falls through to the next;
  the game is whole with no sensor connected.
- **Chord/mud check.** `node scripts/chord-check.mjs` runs the Sethares
  sensory-dissonance model (`src/audio/Dissonance.ts`) over the folded playback
  frequencies → `docs/chord-check-report.md`. Verdict: single tones (current
  engine) are clean; any future chord/drone must be gated through it.
- **Log everything.** All signals are recorded each tick in parallel
  (`aetheria.downloadSignalLog()` in the console) — a third witness for later
  fusion decisions, never shown to the player as a score.

## EEG

`MuseClient` wraps the project's own `athena-core.js` — the validated browser BLE
driver for the Muse S Athena — rather than `muse-js`, since it is the real driver
for the target hardware. Connect from a user gesture over Web Bluetooth; the
4-channel stream (TP9, AF7, AF8, TP10) feeds the band-power → coherence →
prescriber pipeline at 4 Hz.

## License

The **source code** is released under the [MIT License](LICENSE) © 2026 Aetheria
Foundation. "Aetheria", the Aetheria Guidebook frequency system, and the
narrative/visual content are creative works of the Aetheria Foundation; the MIT
grant covers the software, and the Foundation reserves its name and Guidebook IP.
Made for veterans and anyone who needs a calm place.
