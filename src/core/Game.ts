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
import { EEGDebugOverlay } from '../eeg/EEGDebugOverlay';
import type { CoherenceSource } from '../eeg/types';
import { HUD } from '../ui/HUD';
import { buildConfig } from '../levels/LevelFrequencyConfig';
import { TemplateLevel } from '../levels/TemplateLevel';
import { buildParamsForLevel } from '../levels/buildParams';
import { LevelBase } from '../levels/LevelBase';
import { SignalLog } from './SignalLog';
import { SaveSystem } from './SaveSystem';
import { Settings, DIFFICULTY_SCALE } from './Settings';
import { MenuSystem } from '../ui/Menus';
import { MetricsTracker } from './MetricsTracker';
import { MetricsPanel } from '../ui/MetricsPanel';
import { SetupScreen } from '../ui/SetupScreen';

export interface GameOptions {
  canvas: HTMLCanvasElement;
  hud: HTMLElement;
}

const REGIME_INDEX: Record<string, 0 | 1 | 2> = { GUT: 0, HEART: 1, HEAD: 2 };

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
    this.muse = new MuseClient(this.freqTable);
    this.debug = new EEGDebugOverlay(this.opts.hud);

    // Persistent save (IndexedDB) → completed set.
    await this.save.init();
    this.completedLevels = this.save.completedSet;
    this.recomputeUnlocked();

    // Menus + settings + metrics panel.
    this.menus = new MenuSystem(this.opts.hud, this.settings, this.save, {
      onEnter: () => this.enterFromMenu(),
      onResume: () => this.resume(),
      onMainMenu: () => this.showMainMenu(),
      onMetrics: () => this.metricsPanel.show(this.metrics),
    });
    this.metricsPanel = new MetricsPanel(this.opts.hud);
    this.metricsPanel.onExport = () => this.downloadSignalLog();
    this.setup = new SetupScreen(this.opts.hud);
    this.metricsPanel.onClose = () => {
      // Returning from metrics while in the Field re-locks the cursor.
      if (this.state === 'metrics') { this.state = 'playing'; this.requestPlay(); }
    };
    this.settings.onChange((s) => this.applySettings(s));

    // Player.
    this.player = new PlayerController(this.camera, this.renderer.domElement, this.world);
    this.player.controls.addEventListener('unlock', () => this.onPointerUnlock());
    this.player.controls.addEventListener('lock', () => this.setPlaying(true));

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

  /** The level to resume at: the first unlocked-but-unfinished level, else GUT-1. */
  private continueIndex(): number {
    for (let i = 0; i < 27; i++) {
      if (this.unlockedLevels.has(i) && !this.completedLevels.has(i)) return i;
    }
    return 0;
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

    const regime = REGIME_INDEX[config.regime];
    this.muse.setRegime(regime);
    this.manual.setRegime(regime);
    this.hud.setRegime(config.regime);
    this.applySky(config.regime, entry.ambient_color, entry.secondary_color);

    const level = new TemplateLevel(config, {
      world: this.world,
      scene: this.scene,
      propGroup: this.propGroup,
      audio: this.audio,
      player: this.player,
      freqTable: this.freqTable,
      getSource: () => this.getSource(),
      speak: (line) => this.hud.speak(line),
    });
    level.onComplete = (lvl) => this.onLevelComplete(lvl);
    level.build();
    this.level = level;
    this.world.remeshDirty();
    this.recomputeUnlocked();
    this.metrics.start(index, config.levelName, performance.now());
  }

  // ── Progression: completed set, unlock logic, cube navigation ──

  /**
   * Unlock rule (GDD §10.1): regimes can be entered in any order, but levels
   * complete in order WITHIN a regime. So a level is unlocked if it is the first
   * of its regime, already completed, or its in-regime predecessor is completed.
   */
  private recomputeUnlocked(): void {
    const u = new Set<number>();
    for (let i = 0; i < 27; i++) {
      const posInRegime = i % 9;
      if (posInRegime === 0 || this.completedLevels.has(i) || this.completedLevels.has(i - 1)) {
        u.add(i);
      }
    }
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
    this.recomputeUnlocked();
    this.hud.bloomNode(lvl.levelIndex);
    this.hud.showCompletion(lvl.config.levelName);
    // Release the cursor and open the cube so the player can choose where next.
    this.state = 'complete';
    this.hud.showCubeHero();
    this.player.unlock();
  }

  /** Dev/testing hook: jump straight to a level, bypassing the unlock gate.
   *  Call from the console: aetheria.gotoLevel(10). */
  gotoLevel(index: number): void {
    this.menus.hide();
    this.hud.hideCompletion();
    this.hud.hideCubeHero();
    this.hud.hideSetupBar();
    this.loadLevel(index);
    this.state = 'playing';
    this.requestPlay();
  }

  private travelToNode(index: number): void {
    if (!this.unlockedLevels.has(index)) return;
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
      this.player.unlock();
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
      this.player.unlock();
    } else {
      this.state = 'playing';
      this.player.lock();
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
    this.player?.setReduceMotion(s.reduceMotion);
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
      this.muse.startCalibration(30);
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
      startCalibration: () => { this.muse.startCalibration(30); this.polar.captureBaseline(); },
      enter: () => this.beginPlay(),
      manual: () => this.startManual(),
    });
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
    this.setPlaying(false);
    // Esc in the Field opens pause; cube/menu/completion unlocks are intentional.
    if (this.state === 'playing') this.pause();
  }

  // ── Play / pointer lock ──

  requestPlay(): void {
    this.audio.start().catch((e) => console.warn('[Aetheria] Audio start failed', e));
    this.player.lock();
  }

  private setPlaying(p: boolean): void {
    this.playing = p;
    for (const cb of this.playStateListeners) cb(p);
  }

  onPlayStateChange(cb: (p: boolean) => void): void {
    this.playStateListeners.push(cb);
  }

  /** Export the parallel signal log as JSON (research corpus). */
  exportSignalLog(): string {
    return this.signalLog.exportJSON();
  }
  /** Download the signal log (call from the console: aetheria.downloadSignalLog()). */
  downloadSignalLog(): void {
    this.signalLog.download();
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
    // Live setup-screen feedback (signal bars + calibration countdown).
    if (this.state === 'setup' && this.setup.isVisible) {
      this.setup.update(dt, this.muse.getChannelQuality(), this.muse.calibrationProgress);
    }

    // Player movement (only when locked / playing).
    if (this.playing) this.player.update(dt);

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

    // Drive the level (which drives world shader, audio, and every prop).
    if (this.level) {
      if (freqIndex !== this.lastFreqIndex) {
        this.level.onFrequencyPrescribed(freqIndex);
        this.lastFreqIndex = freqIndex;
      }
      this.level.update(dt, freqIndex, coherence, bands);
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
      coherence,
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
    });

    // Live tuning HUD (backtick) — the actual gate components for device tuning.
    const mm = this.muse.getMetrics();
    const as = this.audio.getAudioState();
    const dEntry = this.freqTable.get(freqIndex);
    this.debug.update({
      source: this.usingMuse && this.muse.isConnected ? 'muse' : 'manual',
      settleSource,
      settle: coherence,
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
      quality: mm.quality,
      plv: mm.plvCoherence,
      stillness: mm.stillness,
      thetaAlpha: mm.thetaAlphaRatio,
      betaGamma: mm.betaGammaRatio,
      bands: { delta: mm.deltaRel, theta: mm.thetaRel, alpha: mm.alphaRel, beta: mm.betaRel, gamma: mm.gammaRel },
      hbo: mm.hbo,
      hbr: mm.hbr,
      battery: mm.battery,
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
