/**
 * ResonanceCrystal — emissive crystal cluster; the core puzzle building block
 * (Section 6.2 "Resonance Locks", Section 8.1.2). It pulses at a visible rate;
 * match its tuned frequency with focus/manual selection and hold a little
 * coherence to "lock" it open.
 *
 * No fail state: an unsolved crystal simply waits, dim. Solving emits a soft
 * chime via the onSolved callback.
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';
import { RNG } from '../core/rng';

export class ResonanceCrystal extends FrequencyReactiveBlock {
  private shards: THREE.Mesh[] = [];
  private material: THREE.MeshStandardMaterial;
  private solveTimer = 0;
  solved = false;
  onSolved?: () => void;

  constructor(
    position: THREE.Vector3,
    tunedFreqIndex: number,
    color: THREE.ColorRepresentation,
    seed = 1,
  ) {
    super(position);
    this.tunedFrequencyIndex = tunedFreqIndex;
    this.material = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.95,
    });

    const rng = new RNG(seed);
    const count = rng.int(5, 7);
    for (let i = 0; i < count; i++) {
      const h = rng.range(0.6, 1.6);
      const geo = new THREE.BoxGeometry(rng.range(0.18, 0.34), h, rng.range(0.18, 0.34));
      const shard = new THREE.Mesh(geo, this.material);
      shard.position.set(rng.range(-0.5, 0.5), h / 2, rng.range(-0.5, 0.5));
      shard.rotation.y = rng.range(0, Math.PI);
      shard.rotation.z = rng.range(-0.2, 0.2);
      this.shards.push(shard);
      this.object.add(shard);
    }
  }

  onResonance(_coherence: number): void {
    // Visual flare handled in update via `resonating`.
  }

  update(dt: number, time: number): void {
    // Visible pulse — faster/brighter as it's nearer resonance.
    const strength = this.getResonanceStrength(this.currentFreqIndex);
    const pulse = 0.5 + 0.5 * Math.sin(time * (2 + strength * 4));

    if (this.solved) {
      this.material.emissiveIntensity = 1.6;
      this.object.rotation.y += dt * 0.4;
      return;
    }

    const target = 0.2 + strength * (0.4 + 0.8 * this.coherence) * pulse;
    this.material.emissiveIntensity += (target - this.material.emissiveIntensity) * Math.min(1, dt * 6);

    // Lock when resonating with at least gentle coherence, sustained ~2s.
    if (this.resonating && this.coherence > 0.35) {
      this.solveTimer += dt;
      if (this.solveTimer >= 2) {
        this.solved = true;
        this.onSolved?.();
      }
    } else {
      this.solveTimer = Math.max(0, this.solveTimer - dt * 0.5);
    }
  }
}
