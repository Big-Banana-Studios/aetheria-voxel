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
- **`** (backtick) — toggle the EEG debug overlay
- **Esc** — release the cursor

## Architecture (maps to GDD Section 4.1)

```
src/
  core/      Game loop + state machine, PlayerController, FrequencyTable, rng
  voxel/     VoxelChunk, World, BlockRegistry, GreedyMesher, mesher.worker, VoxelMaterial
  eeg/       MuseClient (wraps the ported athena-core.js driver), ManualMode,
             BandPowerAnalyzer, CoherenceCalculator, FrequencyPrescriber, dsp, EEGDebugOverlay
  audio/     Oscillator, BinauralBeat, AudioStack (coherence-driven, A=432Hz)
  levels/    LevelBase, TemplateLevel, EnvironmentBuilder, LevelFrequencyConfig, definitions/
  props/     FrequencyReactiveBlock + ResonanceCrystal, CymaticsPool, HarmonicBridge,
             CoherenceGate, SacredGeometryEmitter, FrequencyFlora
  ui/        HUD, CoherenceMandala, FrequencyArc, ConnectionStatus
public/data/ aetheria-frequency-table.json   ← single source of truth
```

### Status

Phases 1–5 of the GDD build order are complete: project foundation, voxel
engine, EEG pipeline (ported from the validated Coherence Lab driver), audio,
and one fully playable template level — **GUT-1, Volcanic Core** — with every
system working end to end. Phases 6 (the remaining 26 levels) and 7 (shell,
IndexedDB save, settings, deploy) are next.

## Hard rules honored

- **A = 432 Hz**, never 440. All tones generated natively at 432-based values.
- **Frequency Hz values are never fabricated.** `aetheria-frequency-table.json`
  ships with `0.0` placeholders; drop in the owner's real Aetheria values and
  the audio comes alive. The game runs structurally without them.
- **No fail states, no countdown timers, no startle effects.** Therapeutic tool
  for veterans / TBI survivors.
- **Manual Mode is first-class** — a complete path for players without a headset.
- **Coherence Lab code is reused**, not re-derived (FFT/PSD/coherence ported
  from `athena-core.js` / `spiral-wave.js`).

## EEG

`MuseClient` wraps the project's own `athena-core.js` — the validated browser BLE
driver for the Muse S Athena — rather than `muse-js`, since it is the real driver
for the target hardware. Connect from a user gesture over Web Bluetooth; the
4-channel stream (TP9, AF7, AF8, TP10) feeds the band-power → coherence →
prescriber pipeline at 4 Hz.
