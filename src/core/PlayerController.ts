/**
 * PlayerController — first-person walk + look + interact (Section 6.1).
 *
 * Deliberate, contemplative movement: walk only (no sprint), gentle regime-tuned
 * float-jump, block-stepping (auto step-up one block), and axis-separated AABB
 * collision against the voxel World. A fly toggle (G) is available for free
 * exploration / Manual Mode wandering.
 *
 * Also owns the two contemplative input states the gameplay layer reads:
 *   - Focus (hold F): look at a reactive block and concentrate.
 *   - Meditation (toggle M): the camera rises to a calm vantage; EEG/stillness
 *     becomes the primary input for coherence challenges and completion.
 */
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import type { World } from '../voxel/World';
import { CHUNK_SY } from '../voxel/VoxelChunk';

const PLAYER_HALF_WIDTH = 0.3;
const PLAYER_HEIGHT = 1.7;
const EYE_HEIGHT = 1.55;
const WALK_SPEED = 4.2;
const FLY_SPEED = 9.0;
const STEP_HEIGHT = 1.0;

export interface RegimeMovement {
  gravity: number;
  jumpSpeed: number;
}

// GUT heavy/short, HEART medium/floaty, HEAD near-weightless/long (Section 6.1).
export const REGIME_MOVEMENT: Record<string, RegimeMovement> = {
  GUT: { gravity: 26, jumpSpeed: 7.0 },
  HEART: { gravity: 16, jumpSpeed: 7.0 },
  HEAD: { gravity: 9, jumpSpeed: 6.5 },
};

export class PlayerController {
  readonly controls: PointerLockControls;
  private camera: THREE.PerspectiveCamera;
  private world: World;

  /** Feet position (the camera sits EYE_HEIGHT above this). */
  readonly feet = new THREE.Vector3(8, 40, 8);
  private velocity = new THREE.Vector3();
  private onGround = false;
  private flyMode = false;

  private move = { forward: false, back: false, left: false, right: false, up: false, down: false, jump: false };

  isFocusing = false;
  isMeditating = false;
  private meditationLift = 0; // smooth camera rise while meditating

  private regime: RegimeMovement = REGIME_MOVEMENT.GUT;

  // Listeners so other systems can react to focus/meditation toggles.
  private meditationListeners: ((on: boolean) => void)[] = [];

  constructor(camera: THREE.PerspectiveCamera, domElement: HTMLElement, world: World) {
    this.camera = camera;
    this.world = world;
    this.controls = new PointerLockControls(camera, domElement);
    this.bindInput();
    this.syncCamera();
  }

  onMeditationChange(cb: (on: boolean) => void): void {
    this.meditationListeners.push(cb);
  }

  setRegime(regime: 'GUT' | 'HEART' | 'HEAD'): void {
    this.regime = REGIME_MOVEMENT[regime] ?? REGIME_MOVEMENT.GUT;
  }

  spawnAt(x: number, y: number, z: number): void {
    this.feet.set(x, y, z);
    this.velocity.set(0, 0, 0);
    this.syncCamera();
  }

  get object(): THREE.Object3D {
    return this.controls.getObject();
  }

  lock(): void {
    this.controls.lock();
  }
  unlock(): void {
    this.controls.unlock();
  }
  get isLocked(): boolean {
    return this.controls.isLocked;
  }

  // ── Input ──

  private bindInput(): void {
    const down = (e: KeyboardEvent) => this.setKey(e.code, true, e);
    const up = (e: KeyboardEvent) => this.setKey(e.code, false, e);
    document.addEventListener('keydown', down);
    document.addEventListener('keyup', up);
  }

  private setKey(code: string, pressed: boolean, e: KeyboardEvent): void {
    switch (code) {
      case 'KeyW': case 'ArrowUp': this.move.forward = pressed; break;
      case 'KeyS': case 'ArrowDown': this.move.back = pressed; break;
      case 'KeyA': case 'ArrowLeft': this.move.left = pressed; break;
      case 'KeyD': case 'ArrowRight': this.move.right = pressed; break;
      case 'Space': this.move.up = pressed; this.move.jump = pressed; e.preventDefault(); break;
      case 'ShiftLeft': case 'ShiftRight': this.move.down = pressed; break;
      case 'KeyF': this.isFocusing = pressed; break;
      case 'KeyM':
        if (pressed) this.toggleMeditation();
        break;
      case 'KeyG':
        if (pressed) this.flyMode = !this.flyMode;
        break;
    }
  }

  private toggleMeditation(): void {
    this.isMeditating = !this.isMeditating;
    for (const cb of this.meditationListeners) cb(this.isMeditating);
  }

  // ── Collision ──

  private boxCollides(fx: number, fy: number, fz: number): boolean {
    const minX = Math.floor(fx - PLAYER_HALF_WIDTH);
    const maxX = Math.floor(fx + PLAYER_HALF_WIDTH);
    const minY = Math.floor(fy);
    const maxY = Math.floor(fy + PLAYER_HEIGHT);
    const minZ = Math.floor(fz - PLAYER_HALF_WIDTH);
    const maxZ = Math.floor(fz + PLAYER_HALF_WIDTH);
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        for (let x = minX; x <= maxX; x++) {
          if (this.world.isSolidAt(x, y, z)) return true;
        }
      }
    }
    return false;
  }

  // ── Update ──

  update(dt: number): void {
    // Clamp dt to avoid tunneling on frame hitches.
    dt = Math.min(dt, 0.05);

    const speed = this.flyMode ? FLY_SPEED : WALK_SPEED;

    // Build the horizontal wish direction from camera yaw.
    const wish = new THREE.Vector3();
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const rightVec = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

    if (this.move.forward) wish.add(forward);
    if (this.move.back) wish.sub(forward);
    if (this.move.right) wish.add(rightVec);
    if (this.move.left) wish.sub(rightVec);
    if (wish.lengthSq() > 0) wish.normalize();

    // Meditation gently halts movement and lifts the view (Section 6.1).
    const moveScale = this.isMeditating ? 0.0 : 1.0;
    const horizVel = wish.multiplyScalar(speed * moveScale);

    if (this.flyMode) {
      this.velocity.x = horizVel.x;
      this.velocity.z = horizVel.z;
      let vy = 0;
      if (this.move.up) vy += FLY_SPEED;
      if (this.move.down) vy -= FLY_SPEED;
      this.velocity.y = vy * moveScale;
    } else {
      this.velocity.x = horizVel.x;
      this.velocity.z = horizVel.z;
      // Gravity + gentle float-jump.
      this.velocity.y -= this.regime.gravity * dt;
      if (this.move.jump && this.onGround && !this.isMeditating) {
        this.velocity.y = this.regime.jumpSpeed;
        this.onGround = false;
      }
    }

    this.moveAxis('x', this.velocity.x * dt);
    this.moveAxis('z', this.velocity.z * dt);
    this.moveAxisY(this.velocity.y * dt);

    // Keep within vertical world bounds.
    if (this.feet.y < -8) {
      this.feet.set(this.feet.x, 40, this.feet.z);
      this.velocity.set(0, 0, 0);
    }
    if (this.feet.y > CHUNK_SY) this.feet.y = CHUNK_SY;

    // Smoothly raise the camera while meditating.
    const targetLift = this.isMeditating ? 1.2 : 0.0;
    this.meditationLift += (targetLift - this.meditationLift) * Math.min(1, dt * 2.5);

    this.syncCamera();
  }

  private moveAxis(axis: 'x' | 'z', delta: number): void {
    if (delta === 0) return;
    const prev = this.feet[axis];
    this.feet[axis] = prev + delta;
    if (this.boxCollides(this.feet.x, this.feet.y, this.feet.z)) {
      // Try a one-block step-up (block-stepping, Section 6.1).
      if (this.onGround || this.flyMode) {
        const raised = this.feet.y + STEP_HEIGHT;
        if (!this.boxCollides(this.feet.x, raised, this.feet.z)) {
          this.feet.y = raised;
          return;
        }
      }
      this.feet[axis] = prev;
      this.velocity[axis] = 0;
    }
  }

  private moveAxisY(delta: number): void {
    if (delta === 0) return;
    const prev = this.feet.y;
    this.feet.y = prev + delta;
    if (this.boxCollides(this.feet.x, this.feet.y, this.feet.z)) {
      this.feet.y = prev;
      if (delta < 0) this.onGround = true;
      this.velocity.y = 0;
    } else if (delta < 0) {
      this.onGround = false;
    }
  }

  private syncCamera(): void {
    const obj = this.controls.getObject();
    obj.position.set(this.feet.x, this.feet.y + EYE_HEIGHT + this.meditationLift, this.feet.z);
  }
}
