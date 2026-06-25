/**
 * CoherenceGate — a massive block-gate whose opacity/opening maps 1:1 to the
 * coherence meter (Section 6.2). You literally watch yourself open it with your
 * mind. Gates major progression points. Opening is sustained, not instantaneous,
 * and never reverses harshly (no fail state).
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';

export class CoherenceGate extends FrequencyReactiveBlock {
  private doorMat: THREE.MeshStandardMaterial;
  private door: THREE.Mesh;
  private frame: THREE.Group;
  private threshold: number;
  private openTimer = 0;
  private requiredSeconds: number;
  opened = false;
  onOpened?: () => void;
  private baseY: number;

  constructor(
    position: THREE.Vector3,
    color: THREE.ColorRepresentation,
    threshold = 0.6,
    requiredSeconds = 3,
    width = 3,
    height = 5,
  ) {
    super(position);
    this.threshold = threshold;
    this.requiredSeconds = requiredSeconds;
    this.baseY = height / 2;
    this.tunedFrequencyIndex = -1;

    // Stone frame.
    this.frame = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2e2630, roughness: 0.9 });
    const post = new THREE.BoxGeometry(0.5, height + 1, 0.6);
    const left = new THREE.Mesh(post, frameMat);
    left.position.set(-width / 2 - 0.25, (height + 1) / 2, 0);
    const right = new THREE.Mesh(post, frameMat);
    right.position.set(width / 2 + 0.25, (height + 1) / 2, 0);
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(width + 1.5, 0.6, 0.6), frameMat);
    lintel.position.set(0, height + 0.5, 0);
    this.frame.add(left, right, lintel);
    this.object.add(this.frame);

    // The luminous door that dissolves/rises as coherence rises.
    this.doorMat = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.9,
      roughness: 0.25,
    });
    this.door = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.35), this.doorMat);
    this.door.position.y = this.baseY;
    this.object.add(this.door);
  }

  onResonance(): void {
    /* gate responds to coherence */
  }

  update(dt: number, _time: number): void {
    if (this.opened) {
      // Fully risen and faded.
      this.door.position.y += (this.baseY + 6 - this.door.position.y) * Math.min(1, dt * 1.5);
      this.doorMat.opacity += (0 - this.doorMat.opacity) * Math.min(1, dt * 1.5);
      return;
    }

    // Opacity inversely tracks coherence: the clearer your mind, the more the
    // door dissolves. Emissive grows so it reads as "energizing", not vanishing.
    const c = this.coherence;
    const targetOpacity = 0.9 * (1 - 0.7 * c);
    this.doorMat.opacity += (targetOpacity - this.doorMat.opacity) * Math.min(1, dt * 3);
    this.doorMat.emissiveIntensity = 0.4 + 0.9 * c;
    // Gentle partial rise proportional to coherence.
    const targetY = this.baseY + Math.max(0, c - this.threshold) * 3;
    this.door.position.y += (targetY - this.door.position.y) * Math.min(1, dt * 2);

    if (c >= this.threshold) {
      this.openTimer += dt;
      if (this.openTimer >= this.requiredSeconds) {
        this.opened = true;
        this.onOpened?.();
      }
    } else {
      this.openTimer = Math.max(0, this.openTimer - dt * 0.5);
    }
  }

  /** 0..1 progress toward opening, for HUD feedback. */
  get openProgress(): number {
    return Math.min(1, this.openTimer / this.requiredSeconds);
  }

  /**
   * Open regardless of signal — used by the level's max-dwell ceiling so a gate
   * is never a wall (Selah's "guaranteed progress" rule). The Field simply
   * yields after the player has dwelt long enough.
   */
  forceOpen(): void {
    if (this.opened) return;
    this.opened = true;
    this.onOpened?.();
  }
}
