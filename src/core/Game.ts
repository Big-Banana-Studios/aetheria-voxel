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
import { GUT1_BUILD } from '../levels/definitions/gut1';
import { LevelBase } from '../levels/LevelBase';

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
  private hud: HUD;
  private debug!: EEGDebugOverlay;

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

  constructor(private opts: GameOptions) {
    this.renderer = new THREE.WebGLRenderer({ canvas: opts.canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.hud = new HUD(opts.hud);
  }

  async init(): Promise<void> {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Scene scaffolding.
    this.scene.add(this.world.group);
    this.scene.add(this.propGroup);
    this.scene.add(this.camera);

    // Lights for the standard-material props (the voxel world is self-lit).
    const hemi = new THREE.HemisphereLight(0x4a3a6a, 0x100a18, 0.7);
    const dir = new THREE.DirectionalLight(0xb89cdd, 0.6);
    dir.position.set(0.5, 1, 0.3);
    this.scene.add(hemi, dir);

    // Post-process: bloom carries the "earned with the mind" luminosity.
    const renderPass = new RenderPass(this.scene, this.camera);
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.7, // strength
      0.6, // radius
      0.55, // threshold
    );
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(bloom);

    // Data + EEG.
    this.freqTable = await FrequencyTable.load();
    this.muse = new MuseClient(this.freqTable);
    this.debug = new EEGDebugOverlay(this.opts.hud, () => this.getSource(), this.freqTable);

    // Player.
    this.player = new PlayerController(this.camera, this.renderer.domElement, this.world);
    this.player.controls.addEventListener('unlock', () => this.setPlaying(false));
    this.player.controls.addEventListener('lock', () => this.setPlaying(true));

    // HUD setup-bar wiring.
    this.hud.onConnectMuse = () => this.connectMuse();
    this.hud.onManualMode = () => this.startManual();
    this.hud.onConnectPolar = () => this.polar.connect();

    // Manual frequency selection (number keys 1–9) — the radial menu's keyboard
    // equivalent (Section 5.4).
    document.addEventListener('keydown', (e) => {
      const n = parseInt(e.key, 10);
      if (!this.usingMuse && n >= 1 && n <= 9) this.manual.selectFrequency(n - 1);
    });

    // Build the reference level (GUT-1).
    this.loadLevel(0);
  }

  // ── Level loading ──

  private loadLevel(index: number): void {
    if (this.level) {
      this.level.dispose();
      this.world.clear();
    }
    const entry = this.freqTable.get(index);
    const config = buildConfig(entry, { ...GUT1_BUILD });

    const regime = REGIME_INDEX[config.regime];
    this.muse.setRegime(regime);
    this.manual.setRegime(regime);
    this.hud.setRegime(config.regime);

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
    level.onComplete = (lvl) => this.hud.showCompletion(lvl.config.levelName);
    level.build();
    this.level = level;
    this.world.remeshDirty();
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
    this.requestPlay();
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
    // Player movement (only when locked / playing).
    if (this.playing) this.player.update(dt);

    // Manual Mode simulates coherence from behaviour.
    const moved = this.player.feet.distanceTo(this.lastFeet) > 0.02;
    this.lastFeet.copy(this.player.feet);
    const meditating = this.player.isMeditating || this.isNearMeditation();
    if (!this.usingMuse) this.manual.update(dt, moved, meditating);

    // Polar H10 heart coherence (optional, fuses with the active source).
    this.polar.update(dt);

    const source = this.getSource();
    const baseCoherence = source.getCoherenceScore();
    const freqIndex = source.getPrescribedFrequencyIndex();
    const bands = source.getBandPowers();

    // Fuse heart (HRV) coherence with the EEG/behaviour coherence when the
    // Polar H10 is connected. Heart coherence leads in Manual Mode (it is a real
    // biosignal); EEG leads when a Muse is streaming.
    let coherence = baseCoherence;
    if (this.polar.isConnected) {
      const hc = this.polar.getHeartCoherence();
      coherence = this.usingMuse ? 0.6 * baseCoherence + 0.4 * hc : 0.4 * baseCoherence + 0.6 * hc;
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
      heartCoherence: this.polar.getHeartCoherence(),
      bpm: this.polar.heartRate,
    });
    this.debug.update();
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
