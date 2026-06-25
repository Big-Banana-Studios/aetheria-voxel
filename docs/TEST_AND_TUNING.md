# Aetheria Voxel — Real-Device Test & Tuning Guide

For tuning with the **Muse S Athena** + **Polar H10** before deploying.

## Run it (local is enough for Web Bluetooth)

```bash
npm run dev          # http://localhost:5173
```

- **`http://localhost` is a secure context** for Web Bluetooth — no HTTPS needed locally.
- Use **Chrome or Edge** (Web Bluetooth). Firefox/Safari → Manual Mode only.
- Pre-flight: Muse charged, electrodes lightly dampened; Polar strap electrodes wet, snug.
- Title → **Enter the Field** → **Connect Muse** → signal bars → **Begin Calibration**
  (30 s) → enter. Add **+ Polar H10** on the first step too.

## Live tuning HUD

Press **`** (backtick) in the Field for the **TUNING HUD** — the actual gate
components live: fused settle + which source produced it, level threshold/timers,
Polar HR/RMSSD/baseline, Muse PLV/stillness/bands/quality, and the resolved
true/felt/sub-bass frequencies. This is the instrument for tuning.

Also: **V** = session metrics (sparklines + JSON export); console
`aetheria.downloadSignalLog()` = full per-tick log; **C** = cube map.

## Test checklist

### Connection & signal
- [ ] Muse pairs from the setup screen; the 4 electrode bars go green when seated still.
- [ ] Polar pairs; HUD shows a plausible **HR (50–90 bpm)** within ~10 s.
- [ ] Calibration counts 30 s; afterward `rmssd baseline` and a stillness baseline are set
      (visible in the tuning HUD as `base` values).
- [ ] Optical metrics **warm up over ~10–30 s** (PPG needs ~4 s, fNIRS ~10 s of optics).
      HbO/HbR and HR should populate; if they stay `—`, see "preset" below.

### The settle gate (the core loop)
- [ ] Sitting still / slow breathing **raises the fused settle** (`GATE` bar). With Polar,
      `via hrv`; Muse-only, `via stillness`; neither, `via behaviour`.
- [ ] Moving the head / fidgeting **lowers** it (stillness/HRV both drop).
- [ ] In the meditation dais, sustained settle ≥ threshold fills `sustain x/Ns`; the level
      completes `settled` (check `completedBy` in the metrics export).
- [ ] A level you *don't* settle in still completes by the **ceiling** (`dwell` reaches max)
      — never a wall.
- [ ] Resonance crystals solve when you select/hold the matching frequency.
- [ ] Harmonic bridge solidifies as settle rises; you can cross; falling in respawns gently.
- [ ] Coherence gate opens with sustained settle, or force-opens by the 75 s ceiling.

### Fallback chain & fusion
- [ ] Unplug Polar mid-session → gate falls back to Muse stillness, then behaviour. No crash.
- [ ] Both connected → HRV leads (tuning HUD shows `via hrv`).

### Audio (felt, not heard)
- [ ] On headphones/sub you feel the **sub-bass** (5–12 Hz) grounding tone; HUD shows
      `sub 8.25Hz alpha` etc. On laptop speakers, the 2× harmonic keeps it audible.
- [ ] Binaural is subtle (~3–5%); no harshness, no startle.
- [ ] Frequency changes crossfade smoothly (no clicks).

### Shell / accessibility / save
- [ ] Esc pauses; Settings sliders apply live (volume, render scale, subtitles,
      reduce-motion, reduce-flashes, settling-depth).
- [ ] Completing a level persists (reload → Continue resumes; cube shows it lit).
- [ ] Export/Import save round-trips.

## Tuning constants (symptom → file)

| What | File | Current | Effect / when to change |
|---|---|---|---|
| HRV settle sensitivity | `src/eeg/PolarClient.ts` `SETTLE_RATIO` | 1.5 | RMSSD this far above baseline = fully settled. **Settle maxes too easily → raise (1.8–2.0); never reaches 1.0 → lower (1.3).** |
| HRV window | `src/eeg/PolarClient.ts` `WINDOW_SEC` | 45 | Longer = smoother/slower; shorter = jumpier/faster. |
| R-R artifact bounds | `src/eeg/PolarClient.ts` `RR_MIN/MAX_MS` | 300–2000 | Widen only if valid beats are being rejected. |
| Stillness sensitivity | `src/eeg/StillnessIndex.ts` `STILL_RATIO` | 3 | How much stiller than baseline = settled. **Too easy → raise; too hard → lower.** |
| Manual settle targets | `src/eeg/ManualMode.ts` | 0.92 / 0.6 / 0.42 | meditating / still / moving. Tune the no-headset feel. |
| Settle threshold (per level) | `public/data/aetheria-frequency-table.json` `coherence_threshold` | 0.45–0.65 | The bar to clear. Lower = easier completion. |
| Difficulty scale | `src/core/Settings.ts` `DIFFICULTY_SCALE` | 0.8 / 1.0 / 1.15 | Global multiplier on threshold + sustain. |
| Sustain seconds | frequency-table `sustained_seconds` | 30–45 | Hold time for the **settled** completion path. |
| Dwell ceiling | `src/levels/LevelFrequencyConfig.ts` `maxDwellSeconds` | ≥90 | Guaranteed-progress ceiling (never a wall). |
| Gate hold / ceiling | `src/props/CoherenceGate.ts` (3 s) · `src/levels/TemplateLevel.ts` `gateCeilingSeconds` (75) | | Gate open time / force-open backstop. |
| Crystal solve | `src/props/ResonanceCrystal.ts` | settle>0.35, 2 s | Resonance-lock difficulty. |
| Bridge threshold/fade | `src/props/HarmonicBridge.ts` | thr-0.1, slow fade | Bridge solidify point + fade speed. |
| Sub-bass band/gain/mode | `src/audio/SubBass.ts` (`targetRange`, `SUB_BASS_GAIN`) | 7–10 Hz, 0.10 | Grounding tone zone/level; `ambient`/`sleep`/`schumann` via `audio.setSubBassMode`. |
| Binaural level | `src/audio/AudioStack.ts` `applyMix` | 0.05 | Beat loudness (subtle). |
| Prescriber state mapping | `src/eeg/FrequencyPrescriber.ts` | ratios → offset | How brain state picks the in-regime frequency. |
| Bloom / lights / fog | `src/core/Game.ts`, `EnvironmentBuilder`, `buildParams` | | Look tuning. |

## "Looks healthy" sanity ranges (tuning HUD)
- **EEG quality** > 0.6 on all 4 when seated still (else reseat the band / dampen).
- **HR** 50–90 bpm resting; **RMSSD** ~20–80 ms (rises with slow breathing).
- **Alpha** power rises with eyes-closed relaxed awareness; **beta** with active thinking.
- **Stillness** → ~1.0 when you hold still, drops with movement.
- **fNIRS HbO/HbR** drift slowly (seconds), anti-correlated — that's expected.

## If optical metrics stay blank
Preset is `p1041` (EEG8 + Optics16 + IMU — all sensors) in `src/eeg/MuseClient.ts`.
If your firmware prefers another, `p1042` is equivalent; `p1035` is EEG4+Optics4.
Change the `preset:` in `MuseClient.connect()`.

---
*Tell me what you observe on the HUD and I'll adjust the constants above. We push after this passes.*
