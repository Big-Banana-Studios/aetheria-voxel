/**
 * Game — top-level loop, scene, and state machine (Section 4.1).
 *
 * Boots the renderer + bloom post-process, loads the frequency table, builds the
 * GUT-1 template level, and runs the render loop that drives the player, the
 * voxel world, the active coherence source (Muse or Manual Mode), the audio
 * stack, the reactive props, and the HUD.
 *
 * State machine: LOADING → READY (setup bar) → PLAYING. Meditation is a sub-mode
 * of PLAYING handled by the PlayerController + LevelBase.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { World } from '../voxel/World';
import { PlayerController } from './PlayerController';
import { FrequencyTable } from './FrequencyTable';
import { AudioStack } from '../audio/AudioStack';
import { MuseClient } from '../eeg/MuseClient';
import { ManualMode } from '../eeg/ManualMode';
import { PolarClient } from '../eeg/PolarClient';
import { NeuroAdaptivePacer } from '../eeg/NeuroAdaptivePacer';
import { EEGDebugOverlay } from '../eeg/EEGDebugOverlay';
import type { CoherenceSource } from '../eeg/types';
import { HUD } from '../ui/HUD';
import { buildConfig } from '../levels/LevelFrequencyConfig';
import { TemplateLevel } from '../levels/TemplateLevel';
import { buildParamsForLevel } from '../levels/buildParams';
import { LevelBase } from '../levels/LevelBase';
import {
  ALL_WALKS,
  PROGRESSION_WALK_COUNT,
  resolveWalkIndices,
  walkByIndex,
  stepPhase,
  type WalkDef,
} from './Walks';
import { SignalLog, type SignalRecord } from './SignalLog';
import { RESONANCE_WEIGHTS } from '../eeg/FrequencyPrescriber';
import { SaveSystem } from './SaveSystem';
import { Settings, DIFFICULTY_SCALE } from './Settings';
import { MenuSystem } from '../ui/Menus';
import { MetricsTracker } from './MetricsTracker';
import { MetricsPanel } from '../ui/MetricsPanel';
import { SetupScreen, type SignalGateSummary } from '../ui/SetupScreen';
import type { CalibrationResult } from '../eeg/aetheria-signal';
import { TouchControls, hasTouch, hasFinePointer } from '../ui/TouchControls';
import { Onboarding } from '../ui/Onboarding';
import { Disclaimer } from '../ui/Disclaimer';
import { RotatePrompt } from '../ui/RotatePrompt';
import { TiltControls } from './TiltControls';

export interface GameOptions {
  canvas: HTMLCanvasElement;
  hud: HTMLElement;
}

const REGIME_INDEX: Record<string, 0 | 1 | 2> = { GUT: 0, HEART: 1, HEAD: 2 };

// Tone-free baseline window at the start of the adaptive CABI walk (Selah's
// calibration guide, TASK 2): rest with the tone silent while we capture the
// player's resting baseline, THEN begin adaptive pacing and resume the tone.
const NEURO_BASELINE_SEC = 12;

/** Reject if a promise doesn't settle in `ms` — used to keep boot from hanging
 *  on a blocked IndexedDB or a stalled fetch. */
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms),
    ),
  ]);
}

export class Game {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private composer!: EffectComposer;
  private clock = new THREE.Clock();

  private world = new World();
  private player!: PlayerController;
  private audio = new AudioStack();
  private hud!: HUD;
  private debug!: EEGDebugOverlay;

  private completedLevels = new Set<number>();
  private unlockedLevels = new Set<number>();

  // Lo Shu walk progression (Walks.ts). The current walk's order decides which
  // node comes next; auto-advance follows it so no one gets stuck choosing.
  private walkCurrent = 0; // 0..3 = the four walks, 4 = adaptive CABI
  private walkStep = 0; // index into the current walk's step order
  private walkOrder: number[] = []; // resolved level indices for the current walk
  private autoAdvanceTimer: number | null = null; // pending gentle auto-advance

  // Neuro-adaptive pacing for the adaptive CABI walk: fuses whatever sensors the
  // player brings (Muse EEG/stillness + Polar HRV, individually or in tandem).
  private neuroPacer = new NeuroAdaptivePacer();
  private enteredAdaptive = false; // baseline is captured once on entering CABI
  private neuroBaselineUntil = 0; // performance.now() end of the tone-free baseline
  private neuroBaselinePrompted = false; // spoke the baseline prompt once
  private lastNeuroReadiness = 0; // last fused readiness (for logging/debug)
  private lastNeuroSources = ''; // which sensors contributed last tick

  private freqTable!: FrequencyTable;
  private muse!: MuseClient;
  private manual = new ManualMode();
  private polar = new PolarClient();
  private usingMuse = false;

  private level: LevelBase | null = null;
  private lastFreqIndex = -1;
  private lastFeet = new THREE.Vector3();

  private playing = false;
  private playStateListeners: ((p: boolean) => void)[] = [];

  private propGroup = new THREE.Group();
  private starfield!: THREE.Points;
  private bloom!: UnrealBloomPass;

  private signalLog = new SignalLog();
  private logAccum = 0;

  private settings = new Settings();
  private save = new SaveSystem();
  private menus!: MenuSystem;
  private metrics = new MetricsTracker();
  private metricsPanel!: MetricsPanel;
  private setup!: SetupScreen;
  // Last advisory calibration result per sensor (stamped into the session export).
  private lastCalibrationFull: { muse: CalibrationResult | null; polar: CalibrationResult | null } = { muse: null, polar: null };
  private onboarding!: Onboarding; // first-launch welcome (auto, skippable)
  private disclaimer!: Disclaimer; // first-launch safety/honesty gate (must acknowledge)
  private rotatePrompt!: RotatePrompt; // mobile landscape guidance
  private tilt = new TiltControls(); // optional tilt-to-look (mobile)
  private touch?: TouchControls; // on-screen controls (created on touch-capable hw)
  private touchCapable = false; // device has a touchscreen
  private usingTouch = false; // resolved active input mode (touch vs mouse/keyboard)
  private lastInputTouch = false; // last input seen was a touch (for 'auto')
  private lastTouchUiState = ''; // throttle touch-overlay DOM writes
  private suppressUnlockPause = false; // ignore the next pointer-unlock (mode switch)
  // Shell state machine.
  private state: 'menu' | 'setup' | 'playing' | 'paused' | 'map' | 'complete' | 'metrics' = 'menu';

  constructor(private opts: GameOptions) {
    this.renderer = new THREE.WebGLRenderer({ canvas: opts.canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  async init(): Promise<void> {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Scene scaffolding.
    this.scene.add(this.world.group);
    this.scene.add(this.propGroup);
    this.scene.add(this.camera);

    // Lights for the standard-material props (the voxel world is self-lit).
    // Brighter than before so crystals/flora read as colored, not grey, even at
    // low settling (the "grey props" polish from the screenshot pass).
    const hemi = new THREE.HemisphereLight(0x8a72c0, 0x241830, 1.15);
    const dir = new THREE.DirectionalLight(0xd8c8ff, 0.9);
    dir.position.set(0.5, 1, 0.3);
    this.scene.add(hemi, dir);

    // Starfield for the HEAD regime (hidden otherwise).
    this.starfield = this.makeStarfield();
    this.scene.add(this.starfield);

    // Post-process: bloom carries the "earned with the mind" luminosity.
    const renderPass = new RenderPass(this.scene, this.camera);
    this.bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, // strength — gentler so bright emissive surfaces don't blow out
      0.5, // radius
      0.82, // threshold — only genuinely luminous things bloom
    );
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(this.bloom);

    // Data + EEG.
    this.freqTable = await FrequencyTable.load();
    this.hud = new HUD(this.opts.hud, this.freqTable);
    this.hud.onSelectNode = (index) => this.travelToNode(index);
    this.hud.onToggleMap = () => this.toggleCube();
    this.muse = new MuseClient(this.freqTable);
    this.debug = new EEGDebugOverlay(this.opts.hud);

    // Persistent save (IndexedDB) → completed set. Time-bounded and non-fatal:
    // if IndexedDB is blocked (e.g. a stale/frozen tab holds it) or unavailable,
    // continue without persistence rather than hang boot on a black screen.
    try {
      await withTimeout(this.save.init(), 6000, 'save.init');
      this.completedLevels = this.save.completedSet;
    } catch (e) {
      console.warn('[Aetheria] Continuing without saved progress:', e);
      this.completedLevels = new Set();
    }
    // Restore walk progression (Vortex → Ascent → Pillar → Ouroboros → CABI).
    const wp = this.save.walkProgress;
    this.walkCurrent = wp.current;
    this.walkStep = wp.step;
    this.resolveCurrentWalk();
    this.recomputeUnlocked();

    // Menus + settings + metrics panel.
    this.menus = new MenuSystem(this.opts.hud, this.settings, this.save, {
      onEnter: () => this.enterFromMenu(),
      onResume: () => this.resume(),
      onMainMenu: () => this.showMainMenu(),
      onMetrics: () => this.metricsPanel.show(this.metrics),
      onWelcome: () => this.onboarding.show(),
      onDisclaimer: () => this.disclaimer.show(),
    }, {
      museConnected: () => this.muse.isConnected,
      polarConnected: () => this.polar.isConnected,
      connectMuse: async () => { this.usingMuse = await this.muse.connect(); return this.usingMuse; },
      connectPolar: () => this.polar.connect(),
      disconnectMuse: () => { this.muse.disconnect(); this.usingMuse = false; },
      disconnectPolar: () => this.polar.disconnect(),
    }, {
      // Tilt-to-look (mobile, optional). enable() runs from the Settings toggle
      // tap so iOS can grant motion permission from a user gesture.
      supported: () => TiltControls.isSupported(),
      isOn: () => this.tilt.enabled,
      setOn: (on) => {
        if (on) return this.tilt.enable();
        this.tilt.disable();
        return Promise.resolve(true);
      },
      recenter: () => this.tilt.recenter(),
    });
    this.metricsPanel = new MetricsPanel(this.opts.hud);
    this.metricsPanel.onExport = () => this.downloadSignalLog();
    this.setup = new SetupScreen(this.opts.hud);
    this.onboarding = new Onboarding(this.opts.hud);
    this.disclaimer = new Disclaimer(this.opts.hud);
    // Mobile landscape guidance: prompt in portrait + keep the renderer correct on
    // every rotate/resize (the canvas, breath ring, map, and pause all reflow).
    this.rotatePrompt = new RotatePrompt(this.opts.hud, () => this.resize());
    this.metricsPanel.onClose = () => {
      // Returning from metrics while in the Field re-locks the cursor.
      if (this.state === 'metrics') { this.state = 'playing'; this.requestPlay(); }
    };
    this.settings.onChange((s) => this.applySettings(s));

    // Player.
    this.player = new PlayerController(this.camera, this.renderer.domElement, this.world);
    this.player.controls.addEventListener('unlock', () => this.onPointerUnlock());
    this.player.controls.addEventListener('lock', () => this.setPlaying(true));

    // On-screen controls exist on any touchscreen device (phone OR touchscreen
    // laptop/2-in-1). Whether they're ACTIVE is resolved by `usingTouch` from the
    // Controls setting + smart detection — so a touchscreen PC with a mouse keeps
    // mouse-look (pointer lock) and only shows touch controls when you actually
    // touch (in Auto) or force it in Settings.
    this.touchCapable = hasTouch();
    if (this.touchCapable) {
      this.touch = new TouchControls(this.opts.hud, {
        move: (x, z) => this.player.setMoveVector(x, z),
        look: (dx, dy) => this.player.applyLook(dx, dy),
        setFocus: (on) => this.player.setFocusing(on),
        setJump: (on) => this.player.setJump(on),
        meditate: () => this.player.meditateToggle(),
        pause: () => this.touchPause(),
      });
      // Smart switching in Auto: follow the last-used input device.
      window.addEventListener('touchstart', () => this.noteInput(true), { passive: true });
      window.addEventListener('mousemove', () => this.noteInput(false), { passive: true });
      window.addEventListener('keydown', () => this.noteInput(false));
      // In mouse mode, a click in the Field (re)acquires pointer-lock for look.
      this.renderer.domElement.addEventListener('click', () => {
        if (!this.usingTouch && this.state === 'playing' && !this.player.isLocked) this.player.lock();
      });
    }
    this.applyControls(); // resolve the initial mode now that touchCapable is known

    // HUD setup-bar wiring (hidden until the player chooses to enter).
    this.hud.onConnectMuse = () => this.connectMuse();
    this.hud.onManualMode = () => this.startManual();
    this.hud.onConnectPolar = () => this.polar.connect();
    this.hud.hideSetupBar();

    // Manual frequency selection (number keys 1–9) — the radial menu's keyboard
    // equivalent (Section 5.4).
    document.addEventListener('keydown', (e) => {
      const n = parseInt(e.key, 10);
      if (!this.usingMuse && n >= 1 && n <= 9) this.manual.selectFrequency(n - 1);
      // C peeks the Lo Shu cube (hero view) — releases the cursor to navigate.
      if (e.code === 'KeyC') this.toggleCube();
      // V opens the session metrics (honest measured-signal view).
      if (e.code === 'KeyV') this.toggleMetrics();
    });

    // Build the level behind the menu (continue point, or GUT-1 to start).
    this.loadLevel(this.continueIndex());
  }

  /** The level to resume at: the node at the current step of the current walk. */
  private continueIndex(): number {
    return this.walkNodeAt(this.walkStep);
  }

  // ── Walk progression helpers ──

  private currentWalkDef(): WalkDef {
    return walkByIndex(this.walkCurrent);
  }

  /** Resolve the current walk's {regime,pos} steps into ordered level indices. */
  private resolveCurrentWalk(): void {
    this.walkOrder = resolveWalkIndices(this.freqTable, this.currentWalkDef());
  }

  /** The level index at a given step of the current walk (clamped). */
  private walkNodeAt(step: number): number {
    if (!this.walkOrder.length) return 0;
    const s = Math.max(0, Math.min(this.walkOrder.length - 1, step));
    return this.walkOrder[s];
  }

  // ── Level loading ──

  private loadLevel(index: number): void {
    if (this.level) {
      this.level.dispose();
      this.world.clear();
    }
    const entry = this.freqTable.get(index);
    const config = buildConfig(entry, buildParamsForLevel(index));

    // Difficulty scales the settle threshold + sustained dwell (never adds time
    // pressure; ceilings still guarantee progress).
    const scale = DIFFICULTY_SCALE[this.settings.data.difficulty];
    config.coherenceThreshold = Math.max(0.2, Math.min(0.95, config.coherenceThreshold * scale.threshold));
    config.sustainedSeconds = Math.round(config.sustainedSeconds * scale.sustain);

    // Adaptive CABI (the 110-step final walk): pace the circuit by settling.
    // Settle well and the dose completes sooner; struggle and the node still
    // yields via its ceiling — never a wall. Targets are shortened so the full
    // circuit flows rather than becoming 110 long sits. This is honest "adaptive":
    // the ORDER is the fixed CABI circuit; only the PACING follows the body.
    const adaptiveWalk = this.currentWalkDef().adaptive;
    if (adaptiveWalk) {
      config.sustainedSeconds = Math.max(6, Math.round(config.sustainedSeconds * 0.55));
      config.minDwellSeconds = Math.max(8, Math.round(config.minDwellSeconds * 0.5));
      config.maxDwellSeconds = Math.max(40, Math.round(config.maxDwellSeconds * 0.6));
    }
    // Capture the neuro-adaptive baseline once, on entering the CABI walk (it
    // then persists across its 110 nodes so the dose reads against your own rest).
    // Per the tone-free-baseline protocol, this opens a short SILENT rest window.
    if (adaptiveWalk && !this.enteredAdaptive) {
      this.neuroPacer.reset();
      this.neuroPacer.beginBaseline();
      this.neuroBaselineUntil = performance.now() + NEURO_BASELINE_SEC * 1000;
      this.neuroBaselinePrompted = false;
    }
    this.enteredAdaptive = adaptiveWalk;

    const regime = REGIME_INDEX[config.regime];
    this.muse.setRegime(regime);
    this.manual.setRegime(regime);
    this.hud.setRegime(config.regime);
    this.applySky(config.regime, entry.ambient_color, entry.secondary_color);

    // A fresh visit seed each load → crystals + dressing re-scatter every arrival.
    const visitSeed = Math.floor(Math.random() * 0xffffffff) >>> 0;
    const level = new TemplateLevel(config, {
      world: this.world,
      scene: this.scene,
      propGroup: this.propGroup,
      audio: this.audio,
      player: this.player,
      freqTable: this.freqTable,
      getSource: () => this.getSource(),
      speak: (line) => this.hud.speak(line),
      isTouch: () => this.usingTouch,
      isRevisit: () => this.completedLevels.has(index),
    }, visitSeed);
    level.onComplete = (lvl) => this.onLevelComplete(lvl);
    level.build();
    // The tone-free baseline must be silent: level.build() starts the tone, so
    // rest it back down until the baseline window closes (see update()).
    if (performance.now() < this.neuroBaselineUntil) this.audio.fadeOutTone(1.5);
    this.level = level;
    this.world.remeshDirty();
    this.recomputeUnlocked();
    this.metrics.start(index, config.levelName, performance.now());
  }

  // ── Progression: completed set, unlock logic, cube navigation ──

  /**
   * Unlock rule (walk-based). The current walk defines the path through the cube;
   * a node is open once the walk has reached it. So every node at step ≤ the
   * current step is open (the path walked so far, revisitable), plus the current
   * "next" step, plus anything already completed. This guarantees the next node
   * on the walk always lights up — the fix for GUT's last node not appearing.
   */
  private recomputeUnlocked(): void {
    const u = new Set<number>();
    for (let s = 0; s <= this.walkStep && s < this.walkOrder.length; s++) u.add(this.walkOrder[s]);
    for (const i of this.completedLevels) u.add(i);
    if (this.level) u.add(this.level.levelIndex);
    this.unlockedLevels = u;
  }

  private onLevelComplete(lvl: LevelBase): void {
    // Persist completion + honest stats (Section 10.3).
    void this.save.recordCompletion(lvl.levelIndex, {
      coherence: lvl.meditationProgress, // sustained-settling progress (research field)
      timeSec: Math.round(lvl.timeInLevel),
      puzzlesSolved: (lvl as TemplateLevel).puzzlesSolvedCount ?? 0,
      meditationMinutes: lvl.meditationDwellSeconds / 60,
      completedBy: lvl.completedBy,
    });
    this.completedLevels = this.save.completedSet;
    this.completedLevels.add(lvl.levelIndex);

    // The frequency dose for this node is delivered → let the felt tone rest.
    // The next node's setFrequency() revives it. (User: "tones cut off when the
    // dose is met, baked into auto-advance so no one gets stuck.")
    this.audio.fadeOutTone();

    // Advance the walk only if this was the current step (not a replay of an
    // earlier, already-walked node the player travelled back to).
    const wasCurrentStep = lvl.levelIndex === this.walkNodeAt(this.walkStep);
    if (wasCurrentStep) this.walkStep++;
    const walkFinished = wasCurrentStep && this.walkStep >= this.walkOrder.length;

    this.recomputeUnlocked();
    this.hud.bloomNode(lvl.levelIndex);

    if (walkFinished) {
      this.advanceWalk();
      return;
    }

    void this.save.saveWalkProgress(this.walkCurrent, this.walkStep);
    this.hud.showCompletion(lvl.config.levelName);
    // Release the cursor and open the cube so the player can SEE where they are —
    // then the path continues on its own (auto-advance) unless they choose a node.
    this.state = 'complete';
    this.hud.showCubeHero();
    this.player.unlock();
    this.scheduleAutoAdvance();
  }

  /** A walk is finished — celebrate, roll to the next walk (or unlock CABI), and
   *  keep the journey moving. Completing all four walks unlocks adaptive CABI;
   *  CABI itself closes and re-opens (the dragon eats its tail). */
  private advanceWalk(): void {
    const finished = this.currentWalkDef();
    const wasProgression = this.walkCurrent < PROGRESSION_WALK_COUNT;
    const lastWalk = this.walkCurrent >= ALL_WALKS.length - 1;

    // The four walks advance in sequence; CABI (the last) loops closed.
    this.walkCurrent = lastWalk ? this.walkCurrent : this.walkCurrent + 1;
    this.walkStep = 0;
    this.resolveCurrentWalk();
    this.recomputeUnlocked();
    void this.save.saveWalkProgress(this.walkCurrent, this.walkStep);

    const next = this.currentWalkDef();
    const unlockedCabi = wasProgression && this.walkCurrent >= PROGRESSION_WALK_COUNT;
    this.hud.showWalkComplete(finished, next, unlockedCabi, lastWalk);

    this.state = 'complete';
    this.hud.showCubeHero();
    this.player.unlock();
    this.scheduleAutoAdvance();
  }

  /** Gently continue the walk on its own after a node completes, so no one gets
   *  stuck on the cube. The player can override by choosing a node (which cancels
   *  this) or just rest — opening/closing the map does not force the jump. */
  private scheduleAutoAdvance(): void {
    this.cancelAutoAdvance();
    const nextIdx = this.walkNodeAt(this.walkStep);
    const hint = this.usingTouch
      ? 'Rest here. The path continues on its own — or tap a node on the cube.'
      : 'Rest here. The path continues on its own — or click a node on the cube.';
    setTimeout(() => this.hud.speak(hint), 2600);
    this.autoAdvanceTimer = window.setTimeout(() => {
      this.autoAdvanceTimer = null;
      // Only auto-advance if the player is still resting at the completion screen.
      if (this.state !== 'complete') return;
      this.travelToNode(nextIdx);
    }, 9000);
  }

  private cancelAutoAdvance(): void {
    if (this.autoAdvanceTimer != null) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  /** Dev/testing hook: jump straight to a level, bypassing the unlock gate.
   *  Call from the console: aetheria.gotoLevel(10). */
  gotoLevel(index: number): void {
    this.cancelAutoAdvance();
    this.menus.hide();
    this.hud.hideCompletion();
    this.hud.hideCubeHero();
    this.hud.hideSetupBar();
    this.loadLevel(index);
    this.state = 'playing';
    this.requestPlay();
  }

  /** Dev/testing hook: force-complete the current level to exercise the dose
   *  fade-out + walk auto-advance. Console: aetheria.devComplete(). */
  devComplete(): void {
    if (this.level) this.onLevelComplete(this.level);
  }

  /** Dev/testing hook: read the current walk state. Console: aetheria.walkState(). */
  walkState(): { walk: string; step: number; total: number; adaptive: boolean; nextNode: number; neuroReadiness: number; neuroSources: string } {
    return {
      walk: this.currentWalkDef().name,
      step: this.walkStep,
      total: this.walkOrder.length,
      adaptive: this.currentWalkDef().adaptive,
      nextNode: this.walkNodeAt(this.walkStep),
      neuroReadiness: this.lastNeuroReadiness,
      neuroSources: this.lastNeuroSources,
    };
  }

  /** Dev/testing hook: current level's far-side layout (dais/gate/portal). */
  levelLayout(): unknown {
    return (this.level as TemplateLevel | null)?.debugPositions() ?? null;
  }

  /** Dev/testing hook: jump the walk pointer (e.g. straight to CABI) and load its
   *  current node. Console: aetheria.devSetWalk(4, 0). */
  devSetWalk(current: number, step = 0): void {
    this.cancelAutoAdvance();
    this.walkCurrent = Math.max(0, Math.min(ALL_WALKS.length - 1, current));
    this.walkStep = step;
    this.resolveCurrentWalk();
    this.recomputeUnlocked();
    void this.save.saveWalkProgress(this.walkCurrent, this.walkStep);
    this.gotoLevel(this.walkNodeAt(this.walkStep));
  }

  private travelToNode(index: number): void {
    if (!this.unlockedLevels.has(index)) return;
    this.cancelAutoAdvance();
    // No walk-pointer resync here: unlocked nodes are only those at or before the
    // current step, so the player can't skip ahead, and finishing a revisited
    // earlier node doesn't advance the walk (the `wasCurrentStep` check handles
    // that). Resyncing would be ambiguous for walks that revisit SOURCE.
    this.hud.hideCompletion();
    this.hud.hideCubeHero();
    this.loadLevel(index);
    this.state = 'playing';
    this.requestPlay();
  }

  private toggleMetrics(): void {
    if (this.metricsPanel.isVisible) {
      this.metricsPanel.hide();
      if (this.state === 'metrics') { this.state = 'playing'; this.requestPlay(); }
    } else if (this.state === 'playing') {
      // Set state before unlocking so the unlock doesn't trigger the pause menu.
      this.state = 'metrics';
      if (this.usingTouch) this.setPlaying(false); else this.player.unlock();
      this.metricsPanel.show(this.metrics);
    } else if (this.state === 'paused' || this.state === 'complete') {
      this.metricsPanel.show(this.metrics); // cursor already free
    }
  }

  private toggleCube(): void {
    // Only meaningful while in the Field (not on the title/pause screens).
    if (this.state !== 'playing' && this.state !== 'map') return;
    this.hud.toggleCube();
    if (this.hud.cubeIsHero) {
      this.state = 'map';
      if (this.usingTouch) this.setPlaying(false); else this.player.unlock();
    } else {
      this.state = 'playing';
      if (this.usingTouch) this.setPlaying(true); else this.player.lock();
    }
  }

  // ── Sky / atmosphere per regime ──

  private makeStarfield(): THREE.Points {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    // Deterministic-ish scatter on a large sphere shell around the level.
    for (let i = 0; i < count; i++) {
      const r = 180 + (i % 60);
      const theta = (i * 2.39996) % (Math.PI * 2); // golden angle
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      positions[i * 3] = 24 + r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = 24 + r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xcfc8ff, size: 1.4, sizeAttenuation: false });
    const pts = new THREE.Points(geo, mat);
    pts.visible = false;
    pts.frustumCulled = false;
    return pts;
  }

  private applySettings(s: import('./Settings').SettingsData): void {
    this.audio.setMasterVolume(s.masterVolume);
    this.hud.setSubtitlesEnabled(s.subtitles);
    this.hud.setReduceMotion(s.reduceMotion);
    this.player?.setReduceMotion(s.reduceMotion);
    // Re-resolve the control mode when the Controls setting changes.
    this.applyControls();
    // Tilt-to-look (mobile): keep sensitivity live and reconcile on/off with the
    // saved preference. Auto-enable is best-effort (Android grants without a
    // gesture; iOS needs the Settings tap, handled by the menu's setOn).
    this.tilt.sensitivity = s.tiltSensitivity;
    if (s.tiltLook && !this.tilt.enabled) void this.tilt.enable();
    else if (!s.tiltLook && this.tilt.enabled) this.tilt.disable();
    // Reduce flashes → gentler bloom (photosensitivity, Section 14.3).
    if (this.bloom) this.bloom.strength = s.reduceFlashes ? 0.22 : 0.5;
    // Render scale (perf / quality).
    const base = Math.min(window.devicePixelRatio, 1.5);
    this.renderer.setPixelRatio(base * s.renderScale);
    this.resize();
  }

  private applySky(regime: 'GUT' | 'HEART' | 'HEAD', ambient: string, sky: string): void {
    // Background beyond the chunks + scene fog for the standard-material props.
    const bg = regime === 'HEART' ? sky : ambient;
    this.scene.background = new THREE.Color(bg);
    const fogDensity = regime === 'GUT' ? 0.02 : regime === 'HEART' ? 0.012 : 0.008;
    this.scene.fog = new THREE.FogExp2(new THREE.Color(ambient).getHex(), fogDensity);
    this.starfield.visible = regime === 'HEAD';
  }

  // ── Coherence source ──

  private getSource(): CoherenceSource {
    return this.usingMuse && this.muse.isConnected ? this.muse : this.manual;
  }

  private async connectMuse(): Promise<void> {
    const ok = await this.muse.connect();
    if (ok) {
      this.usingMuse = true;
      this.muse.startCalibration(54);
    } else {
      // Graceful fall-through to Manual Mode (Section 12.3).
      this.hud.speak('No Muse found — entering Manual Mode. You can connect later from Settings.');
    }
    this.beginPlay();
  }

  private startManual(): void {
    this.usingMuse = false;
    this.beginPlay();
  }

  private beginPlay(): void {
    this.hud.hideSetupBar();
    this.setup.hide();
    this.state = 'playing';
    // Best-effort landscape lock — this runs off the player's "enter" tap, the
    // user gesture browsers require. iOS ignores it; the rotate prompt guides there.
    void this.rotatePrompt.tryLockLandscape();
    this.requestPlay();
    // Honest note: the healing tones are felt more than heard (sub-bass), so
    // many speakers won't reproduce the carrier (Selah Task 3, caution 1).
    this.hud.speak('For the full felt experience, use headphones or a subwoofer — these frequencies are felt more than heard.');
  }

  // ── Shell: menu → setup → play → pause ──

  /** Show the title menu (called at boot and from pause "Return to Title"). */
  showMainMenu(): void {
    this.state = 'menu';
    this.hud.hideSetupBar();
    this.hud.hideCompletion();
    if (this.hud.cubeIsHero) this.hud.hideCubeHero();
    if (this.player?.isLocked) this.player.unlock();
    this.menus.showMain();
    // First launch: the safety/honesty disclaimer must be acknowledged BEFORE the
    // welcome (it sits above both, z60). Once accepted it chains into the welcome.
    // Returning players skip straight to the (already-seen) welcome check.
    const shownDisclaimer = this.disclaimer.maybeShow(() => this.onboarding.maybeShow());
    if (!shownDisclaimer) this.onboarding.maybeShow();
  }

  /** From the title's "Enter the Field": guided sensor setup + calibration. */
  private enterFromMenu(): void {
    this.menus.hide();
    this.state = 'setup';
    // Make sure we resume at the right level.
    if (this.level && this.completedLevels.has(this.level.levelIndex)) {
      this.loadLevel(this.continueIndex());
    }
    this.setup.open({
      connectMuse: async () => { this.usingMuse = await this.muse.connect(); return this.usingMuse; },
      connectPolar: () => this.polar.connect(),
      disconnectMuse: () => { this.muse.disconnect(); this.usingMuse = false; },
      disconnectPolar: () => this.polar.disconnect(),
      cyclePreset: () => this.muse.cyclePreset(),
      startCalibration: () => { this.muse.startCalibration(54); this.polar.beginBaseline(); },
      finishCalibration: () => this.polar.finalizeBaseline(),
      enter: () => this.beginPlay(),
      manual: () => this.startManual(),
      calibrateSignal: () => this.calibrateSignal(),
    });
  }

  /** Advisory connection trust-check (aetheria-signal.js calibrate()). Runs on a
   *  short live window per connected sensor; judges only, never alters the stream
   *  and never blocks entry. Full results are retained for the session export. */
  private calibrateSignal(): SignalGateSummary {
    const api = window.AetheriaSignal;
    const out: SignalGateSummary = { muse: null, polar: null };
    if (!api) return out;
    if (this.usingMuse && this.muse.isConnected) {
      const samples = this.muse.getRawWindow();
      if (samples) {
        const r = api.calibrate('muse', { samples, fs: 256, channels: ['TP9', 'AF7', 'AF8', 'TP10'] });
        this.lastCalibrationFull.muse = r;
        out.muse = { passed: r.passed, reasons: r.reasons, fix: r.fixes[0] ?? null };
      }
    }
    if (this.polar.isConnected) {
      const rr = this.polar.getRecentRR();
      if (rr.length >= 8) {
        const r = api.calibrate('polar_h10', { rr });
        this.lastCalibrationFull.polar = r;
        out.polar = { passed: r.passed, reasons: r.reasons, fix: r.fixes[0] ?? null };
      }
    }
    return out;
  }

  private pause(): void {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.menus.showPause();
  }

  private resume(): void {
    this.menus.hide();
    this.state = 'playing';
    this.requestPlay();
  }

  private onPointerUnlock(): void {
    // Programmatic unlock during a control-mode switch must not pause.
    if (this.suppressUnlockPause) { this.suppressUnlockPause = false; return; }
    this.setPlaying(false);
    // Esc in the Field opens pause; cube/menu/completion unlocks are intentional.
    if (this.state === 'playing') this.pause();
  }

  // ── Play / pointer lock ──

  requestPlay(): void {
    this.audio.start().catch((e) => console.warn('[Aetheria] Audio start failed', e));
    if (this.usingTouch) {
      // No pointer-lock on touch; enter play directly and use on-screen controls.
      this.setPlaying(true);
    } else {
      this.player.lock();
    }
  }

  /** Pause from the on-screen touch button (no pointer-unlock event fires). */
  private touchPause(): void {
    this.setPlaying(false);
    this.pause();
  }

  // ── Control mode (touch vs mouse/keyboard) ──

  /** Record the last-used input so 'auto' can follow it on hybrid devices. */
  private noteInput(touch: boolean): void {
    if (touch === this.lastInputTouch) return;
    this.lastInputTouch = touch;
    if (this.settings.data.controls === 'auto') this.applyControls();
  }

  /** Resolve whether touch input is active right now. */
  private resolveUsingTouch(): boolean {
    if (!this.touchCapable) return false;
    const mode = this.settings.data.controls;
    if (mode === 'mouse') return false;
    if (mode === 'touch') return true;
    // auto: touch-only devices (no mouse/trackpad) always use touch; hybrids
    // (touchscreen + mouse, e.g. a 2-in-1) follow whichever was used last.
    if (!hasFinePointer()) return true;
    return this.lastInputTouch;
  }

  /** Apply the resolved control mode: toggle pointer-lock vs on-screen controls. */
  private applyControls(): void {
    const next = this.resolveUsingTouch();
    if (next === this.usingTouch) return;
    this.usingTouch = next;
    if (this.state !== 'playing') return; // visibility handled in update()
    if (this.usingTouch) {
      // Switched to touch mid-play: drop pointer-lock (without triggering pause).
      if (this.player.isLocked) {
        this.suppressUnlockPause = true;
        this.player.unlock();
      }
      this.setPlaying(true);
    } else {
      // Switched to mouse mid-play: keyboard already works; click to look.
      this.hud.speak('Mouse & keyboard mode — click to look around.');
    }
  }

  private setPlaying(p: boolean): void {
    this.playing = p;
    for (const cb of this.playStateListeners) cb(p);
  }

  onPlayStateChange(cb: (p: boolean) => void): void {
    this.playStateListeners.push(cb);
  }

  /** Export the parallel signal log as JSON (research corpus), stamped with the
   *  advisory calibration verdicts + the extract-and-disclose provenance (how much
   *  of each stream was clean vs recovered) from aetheria-signal.js. */
  exportSignalLog(): string {
    const base = JSON.parse(this.signalLog.exportJSON()) as Record<string, unknown>;
    base.calibration = this.lastCalibrationFull;
    base.provenance = {
      muse: this.muse.getProvenance(),
      polar: this.polar.getProvenance(),
    };
    base.resonance = this.summarizeResonance((base.records as SignalRecord[]) ?? []);
    return JSON.stringify(base, null, 2);
  }

  /** Session summary of the continuous placement signal: the min/median/max range
   *  of the pre-rescale resonance score + a placement histogram, so whether the
   *  placement is compressed into a band is answerable from data — never blind-
   *  edited. (Selah's calibration guide, TASK 3.) */
  private summarizeResonance(records: SignalRecord[]): unknown {
    const scores = records.map((r) => r.resonanceScore).filter((v): v is number => v != null);
    const stat = (arr: number[]) => {
      if (!arr.length) return null;
      const s = [...arr].sort((a, b) => a - b);
      return {
        min: s[0],
        median: s[Math.floor(s.length / 2)],
        mean: s.reduce((a, b) => a + b, 0) / s.length,
        max: s[s.length - 1],
        count: s.length,
      };
    };
    const placement: Record<number, number> = {};
    const states: Record<string, number> = {};
    for (const r of records) {
      if (r.resonanceRawIndex != null) placement[r.resonanceRawIndex] = (placement[r.resonanceRawIndex] ?? 0) + 1;
      if (r.resonanceState) states[r.resonanceState] = (states[r.resonanceState] ?? 0) + 1;
    }
    return {
      weights: RESONANCE_WEIGHTS,
      note: 'Pre-rescale weighted sum of relative alpha/theta/gamma + EEG coherence. Logged in parallel; it does NOT drive the game\'s placement. Exposed so the placement range can be calibrated from real data — do not blind-edit the weights or the placement thresholds.',
      score: stat(scores),
      placementHistogram: placement,
      stateHistogram: states,
    };
  }
  /** Download the signal log (call from the console: aetheria.downloadSignalLog()). */
  downloadSignalLog(): void {
    const blob = new Blob([this.exportSignalLog()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aetheria-signals.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Loop ──

  start(): void {
    this.lastFeet.copy(this.player.feet);
    this.renderer.setAnimationLoop(() => this.frame());
  }

  private frame(): void {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.update(dt);
    this.composer.render();
  }

  private update(dt: number): void {
    // Keep the on-screen touch controls in sync: shown only when touch is the
    // active mode and we're playing. Only writes DOM when the desired state
    // changes.
    if (this.touch) {
      const desired = this.usingTouch ? this.state : '';
      if (desired !== this.lastTouchUiState) {
        this.lastTouchUiState = desired;
        this.touch.setState(desired);
      }
    }

    // Live setup-screen feedback (signal bars + streaming status + countdown).
    if (this.state === 'setup' && this.setup.isVisible) {
      const sm = this.muse.getMetrics();
      const dg = this.muse.getDiagnostics();
      this.setup.update(dt, {
        quality: this.muse.getChannelQuality(),
        hr: this.polar.heartRate || sm.heartRate,
        ppgStreaming: dg.ppgStreaming || sm.heartRate != null,
        fnirsStreaming: dg.fnirsStreaming || sm.hbo != null,
        hbo: sm.hbo,
        museConnected: this.muse.isConnected,
        opticsPackets: dg.opticsPackets,
        opticsMode: dg.opticsMode,
        preset: dg.preset,
        polarConnected: this.polar.isConnected,
        calibProgress: this.muse.calibrationProgress,
        eegMode: dg.eegMode,
        eegPackets: dg.eegPackets,
        scalpMapped: dg.scalpMapped,
        deviceName: dg.deviceName,
      });
    }

    // Player movement (only when locked / playing).
    if (this.playing) this.player.update(dt);

    // Optional tilt-to-look (mobile): fold the smoothed tilt into the view exactly
    // like a drag. Touch-drag still works alongside it.
    if (this.playing && this.tilt.enabled) {
      const look = this.tilt.consume(dt);
      if (look) this.player.applyLook(look.dx, look.dy);
    }

    // Behaviour settling is always live as the universal fallback.
    const moved = this.player.feet.distanceTo(this.lastFeet) > 0.02;
    this.lastFeet.copy(this.player.feet);
    const meditating = this.player.isMeditating || this.isNearMeditation();
    this.manual.update(dt, moved, meditating);
    this.polar.update(dt);

    const source = this.getSource();
    // The BRAIN only chooses which frequency (prescription / manual selection).
    const freqIndex = source.getPrescribedFrequencyIndex();
    const bands = source.getBandPowers();

    // Settle-signal fallback chain (Selah Task 2): the BODY's settling drives the
    // gate — HRV (Polar) → relative stillness (Muse accelerometer) → behaviour.
    // EEG "coherence" never gates (honest-claims rule); it is only logged. The
    // level's max-dwell ceiling is the final fallback below all of these.
    let coherence: number;
    let settleSource: 'hrv' | 'stillness' | 'behaviour';
    if (this.polar.isConnected && this.polar.hasBaseline) {
      coherence = this.polar.getSettledness();
      settleSource = 'hrv';
    } else if (this.usingMuse && this.muse.isConnected && this.muse.hasStillness) {
      coherence = this.muse.getStillness();
      settleSource = 'stillness';
    } else {
      coherence = this.manual.getCoherenceScore();
      settleSource = 'behaviour';
    }

    // Neuro-adaptive fusion — always computed (logged in parallel), and used to
    // GATE the adaptive CABI walk. Fuses whatever sensors are live (Muse EEG +
    // stillness + Polar HRV), individually or in tandem, relative to baseline.
    const nm = this.muse.getMetrics();
    const neuro = this.neuroPacer.update(dt, {
      polarConnected: this.polar.isConnected,
      polarHasBaseline: this.polar.hasBaseline,
      hrvSettledness: this.polar.getSettledness(),
      museConnected: this.usingMuse && this.muse.isConnected,
      museHasStillness: this.muse.hasStillness,
      stillness: this.muse.getStillness(),
      bands: this.usingMuse && this.muse.isConnected
        ? { alphaRel: nm.alphaRel, thetaRel: nm.thetaRel, betaRel: nm.betaRel, gammaRel: nm.gammaRel }
        : null,
      eegQuality: (nm.quality.af7 + nm.quality.af8) / 2,
      hbo: nm.hbo,
      behaviourSettle: this.manual.getCoherenceScore(),
    });
    this.lastNeuroReadiness = neuro.readiness;
    this.lastNeuroSources = neuro.sources.join('+');
    // During the adaptive CABI walk, the fused readiness paces the dose; every
    // other walk keeps the standard body-settle gate untouched.
    const gate = this.currentWalkDef().adaptive ? neuro.readiness : coherence;

    // Tone-free baseline window (start of CABI): rest in silence while the pacer
    // captures the resting baseline, then resume the tone and begin adaptive
    // pacing. The dose does not progress during the silent rest.
    const baselineActive = performance.now() < this.neuroBaselineUntil;
    if (baselineActive) {
      if (!this.audio.isToneMuted) this.audio.fadeOutTone(1.5);
      if (!this.neuroBaselinePrompted) {
        this.neuroBaselinePrompted = true;
        this.hud.speak('The circuit attunes to you. Rest a moment in silence — then it moves as you settle.');
      }
    } else if (this.neuroPacer.isCapturingBaseline) {
      // Window just closed → freeze the tone-free baseline and bring the tone back.
      this.neuroPacer.endBaseline();
      this.level?.onFrequencyPrescribed(this.lastFreqIndex);
      this.hud.speak('Attuned. The circuit now moves with your own settling.');
    }
    const gateForLevel = baselineActive ? 0 : gate;

    // Drive the level (which drives world shader, audio, and every prop).
    if (this.level) {
      if (freqIndex !== this.lastFreqIndex) {
        // Hold the tone silent through the baseline window; revive it on close.
        if (!baselineActive) this.level.onFrequencyPrescribed(freqIndex);
        this.lastFreqIndex = freqIndex;
      }
      this.level.update(dt, freqIndex, gateForLevel, bands);
    }

    // Bridges and gates may have edited voxels — re-mesh anything dirty.
    this.world.remeshDirty();

    // Parallel signal logging at ~1 Hz (Selah Task 6 — log everything).
    this.logAccum += dt;
    if (this.logAccum >= 1 && this.level) {
      this.logAccum = 0;
      const entry = this.freqTable.get(freqIndex);

      // Feed the session metrics tracker (all Athena + Polar signals).
      const mm = this.muse.getMetrics();
      this.metrics.push({
        settledness: coherence,
        heartRate: this.polar.heartRate || mm.heartRate,
        hrvRmssd: this.polar.getRmssd(),
        plvCoherence: this.usingMuse ? mm.plvCoherence : null,
        stillness: this.usingMuse ? mm.stillness : null,
        thetaAlpha: this.usingMuse ? mm.thetaAlphaRatio : null,
        betaGamma: this.usingMuse ? mm.betaGammaRatio : null,
        alphaRel: this.usingMuse ? mm.alphaRel : null,
        thetaRel: this.usingMuse ? mm.thetaRel : null,
        betaRel: this.usingMuse ? mm.betaRel : null,
        gammaRel: this.usingMuse ? mm.gammaRel : null,
        deltaRel: this.usingMuse ? mm.deltaRel : null,
        hbo: mm.hbo,
        hbr: mm.hbr,
        battery: mm.battery,
      });

      const res = this.usingMuse ? this.muse.getResonance() : null;
      this.signalLog.push({
        t: Math.round(this.level.timeInLevel * 1000),
        source: this.usingMuse && this.muse.isConnected ? 'muse' : 'manual',
        heartConnected: this.polar.isConnected,
        level: this.level.levelIndex,
        freqIndex,
        trueHz: entry.frequency_hz,
        playbackHz: entry.playback_hz ?? 0,
        settleSource,
        behaviourSettling: this.manual.getCoherenceScore(),
        museStillness: this.usingMuse ? this.muse.getStillness() : 0,
        eegCoherence: this.usingMuse ? this.muse.getCoherenceScore() : 0,
        heartSettledness: this.polar.getSettledness(),
        fusedSettledness: coherence,
        neuroReadiness: neuro.readiness,
        neuroSources: neuro.sources.join('+'),
        eegRelaxation: neuro.eegRelaxation,
        adaptiveWalk: this.currentWalkDef().adaptive,
        neuroBaselineActive: baselineActive,
        resonanceScore: res?.score ?? null,
        resonanceState: res?.state ?? null,
        resonanceOffset: res?.offset ?? null,
        resonanceRawIndex: res?.rawIndex ?? null,
        hrvRmssd: this.polar.getRmssd(),
        hrvBaseline: this.polar.baselineRmssd,
        bpm: this.polar.heartRate,
        meditationDwell: this.level.meditationDwellSeconds,
        inMeditationSpace: this.level.isInMeditationSpace,
        px: this.player.feet.x,
        py: this.player.feet.y,
        pz: this.player.feet.z,
        advancedBy: this.level.completedBy,
      });
    }

    // HUD.
    const lvl = this.level as TemplateLevel | null;
    this.hud.update(dt, {
      coherence: gateForLevel,
      meditationProgress: this.level?.meditationProgress ?? 0,
      freqIndex,
      connected: source.isConnected,
      quality: source.connectionQuality,
      calibrating: this.usingMuse && this.muse.isCalibrating,
      nearMeditation: this.isNearMeditation(),
      puzzlesSolved: lvl?.puzzlesSolvedCount ?? 0,
      puzzleTotal: lvl?.puzzleTotal ?? 0,
      heartConnected: this.polar.isConnected,
      heartCoherence: this.polar.getSettledness(),
      bpm: this.polar.heartRate,
      levelIndex: this.level?.levelIndex ?? 0,
      completed: this.completedLevels,
      unlocked: this.unlockedLevels,
      breatheGuide: lvl?.breathingGuideActive ?? false,
      usingTouch: this.usingTouch,
      walkName: this.currentWalkDef().name,
      walkStep: Math.min(this.walkStep + 1, this.walkOrder.length),
      walkTotal: this.walkOrder.length,
      walkPhase: stepPhase(this.currentWalkDef(), this.walkStep),
      walkAdaptive: this.currentWalkDef().adaptive,
    });

    // Live tuning HUD (backtick) — the actual gate components for device tuning.
    const mm = this.muse.getMetrics();
    const ddg = this.muse.getDiagnostics();
    const dres = this.usingMuse ? this.muse.getResonance() : null;
    const as = this.audio.getAudioState();
    const dEntry = this.freqTable.get(freqIndex);
    this.debug.update({
      source: this.usingMuse && this.muse.isConnected ? 'muse' : 'manual',
      settleSource,
      settle: gateForLevel,
      neuroReadiness: this.lastNeuroReadiness,
      neuroSources: this.lastNeuroSources,
      adaptiveWalk: this.currentWalkDef().adaptive,
      threshold: this.level?.coherenceThreshold ?? 0,
      sustain: this.level?.settleSustainSeconds ?? 0,
      sustainReq: this.level?.requiredSustainSeconds ?? 0,
      dwell: this.level?.meditationDwellSeconds ?? 0,
      maxDwell: this.level?.maxDwell ?? 0,
      inMeditation: this.level?.isInMeditationSpace ?? false,
      gateProgress: lvl?.gateProgress ?? 0,
      puzzlesSolved: lvl?.puzzlesSolvedCount ?? 0,
      puzzleTotal: lvl?.puzzleTotal ?? 0,
      polarConnected: this.polar.isConnected,
      hr: this.polar.heartRate,
      rmssd: this.polar.getRmssd(),
      rmssdBaseline: this.polar.baselineRmssd,
      hrvSettle: this.polar.getSettledness(),
      museConnected: this.muse.isConnected,
      eegMode: ddg.eegMode,
      scalpMapped: ddg.scalpMapped,
      eegPackets: ddg.eegPackets,
      quality: mm.quality,
      plv: mm.plvCoherence,
      stillness: mm.stillness,
      thetaAlpha: mm.thetaAlphaRatio,
      betaGamma: mm.betaGammaRatio,
      bands: { delta: mm.deltaRel, theta: mm.thetaRel, alpha: mm.alphaRel, beta: mm.betaRel, gamma: mm.gammaRel },
      hbo: mm.hbo,
      hbr: mm.hbr,
      battery: mm.battery,
      resonanceScore: dres?.score ?? null,
      resonanceState: dres?.state ?? null,
      resonanceOffset: dres?.offset ?? null,
      resonanceRawIndex: dres?.rawIndex ?? null,
      freqIndex,
      regimePos: `${dEntry.regime}-${dEntry.regime_position}`,
      trueHz: as.trueHz || dEntry.frequency_hz,
      feltHz: as.carrierHz,
      subHz: as.subBass.subHz,
      subBand: as.subBass.band,
    });
  }

  private isNearMeditation(): boolean {
    return this.level?.isInMeditationSpace ?? false;
  }

  private resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.composer) this.composer.setSize(w, h);
  }

  dispose(): void {
    this.renderer.setAnimationLoop(null);
    this.world.dispose();
    this.audio.dispose();
    this.muse.disconnect();
    this.polar.disconnect();
  }
}
