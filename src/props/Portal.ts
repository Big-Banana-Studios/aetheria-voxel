/**
 * Portal — a luminous gateway that appears when the CoherenceGate opens, framing
 * the path to the meditation dais it faces. Hidden until activated; then it fades
 * and scales in, its ring turning slowly. On a revisit it starts already open, so
 * a returning player can walk straight through to the still centre without
 * re-solving the node. Stepping through it (proximity, handled by the level)
 * gently places the player on the dais — the "arrival".
 *
 * Purely welcoming: no fail state, no startle. It only ever opens, never closes.
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';

export class Portal extends FrequencyReactiveBlock {
  private ring: THREE.Mesh;
  private disc: THREE.Mesh;
  private ringMat: THREE.MeshStandardMaterial;
  private discMat: THREE.MeshBasicMaterial;
  private active = false;
  private appear = 0; // 0..1 fade/scale-in progress

  constructor(position: THREE.Vector3, color: THREE.ColorRepresentation, radius = 1.4) {
    super(position);
    this.tunedFrequencyIndex = -1;

    // A standing ring (torus in the XY plane → faces ±z, oriented by the level).
    this.ringMat = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0,
      roughness: 0.2,
      metalness: 0.1,
    });
    this.ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.16, 12, 40), this.ringMat);
    this.ring.position.y = radius + 0.3; // stand it up off the ground
    this.object.add(this.ring);

    // A soft shimmer disc filling the ring (the "surface" you step through).
    this.discMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.disc = new THREE.Mesh(new THREE.CircleGeometry(radius - 0.1, 40), this.discMat);
    this.disc.position.y = radius + 0.3;
    this.object.add(this.disc);

    this.object.scale.setScalar(0.01);
    this.object.visible = false;
  }

  /** Open the portal (called on gate-open, or immediately on a revisit). */
  activate(): void {
    if (this.active) return;
    this.active = true;
    this.object.visible = true;
  }

  get isActive(): boolean {
    return this.active;
  }

  onResonance(): void {
    /* portal is coherence-agnostic — it responds to the gate, not the frequency */
  }

  update(dt: number, time: number): void {
    if (!this.active) return;
    // Ease in on first open.
    this.appear += (1 - this.appear) * Math.min(1, dt * 1.2);
    const s = 0.2 + 0.8 * this.appear;
    this.object.scale.setScalar(s);

    // Slow turn + gentle breathing shimmer (no flashing — Section 14.3/14.4).
    this.ring.rotation.z += dt * 0.5;
    const pulse = 0.5 + 0.5 * Math.sin(time * 1.4);
    this.ringMat.opacity = 0.9 * this.appear;
    this.ringMat.emissiveIntensity = 1.0 + 0.6 * pulse;
    this.discMat.opacity = (0.16 + 0.12 * pulse) * this.appear;
  }
}
