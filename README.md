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

Phases 1–5 of the GDD build order are complete: project foundation, voxel
engine, EEG pipeline (ported from the validated Coherence Lab driver), audio,
and one fully playable template level — **GUT-1, Volcanic Core** — with every
system working end to end. Phases 6 (the remaining 26 levels) and 7 (shell,
IndexedDB save, settings, deploy) are next.

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
  ships with `0.0` placeholders; drop in the owner's real Aetheria values and
  the audio comes alive. The game runs structurally without them.
- **No fail states, no countdown timers, no startle effects.** Therapeutic tool
  for veterans / TBI survivors.
- **Manual Mode is first-class** — a complete path for players without a headset.
- **Coherence Lab code is reused**, not re-derived (FFT/PSD/coherence ported
  from `athena-core.js` / `spiral-wave.js`).

## Honest signals (Selah's guide)

- **Relative, never absolute.** The settle signal is measured against the
  player's *own* baseline, not a fixed threshold.
- **Honest claims only.** The sensor measures *bodily settling* (HRV / RMSSD,
  breath-driven). UI says "settled / present / grounded / steady" and shows
  heart rate (a real measurement) — it never shows a coherence %, an attainment
  level, or any brain-state score. (Anti-fake-neurofeedback.)
- **Guaranteed progress.** Every level has a max-dwell ceiling and the gate can
  force-open — no level is ever a wall.
- **Graceful degradation.** HRV (Polar) → behaviour/EEG → timer ceiling. The
  game is whole with no sensor connected.
- **Log everything.** All signals are recorded each tick in parallel
  (`aetheria.downloadSignalLog()` in the console) — a third witness for later
  fusion decisions, never shown to the player as a score.

## EEG

`MuseClient` wraps the project's own `athena-core.js` — the validated browser BLE
driver for the Muse S Athena — rather than `muse-js`, since it is the real driver
for the target hardware. Connect from a user gesture over Web Bluetooth; the
4-channel stream (TP9, AF7, AF8, TP10) feeds the band-power → coherence →
prescriber pipeline at 4 Hz.
