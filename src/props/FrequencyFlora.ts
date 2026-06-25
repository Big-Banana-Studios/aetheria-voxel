/**
 * FrequencyFlora — voxel plants that grow, bloom, and glow with coherence
 * (Section 8.1.2). Withered/dormant when low, budding mid-range, full bloom and
 * bioluminescent when high (Section 8.1.1). GUT flora: glowing mushroom/lichen.
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';
import { RNG } from '../core/rng';

export class FrequencyFlora extends FrequencyReactiveBlock {
  private stem: THREE.Mesh;
  private bloom: THREE.Mesh;
  private bloomMat: THREE.MeshStandardMaterial;
  private stemMat: THREE.MeshStandardMaterial;
  private fullHeight: number;

  constructor(
    position: THREE.Vector3,
    color: THREE.ColorRepresentation,
    seed = 1,
  ) {
    super(position);
    this.tunedFrequencyIndex = -1;
    const rng = new RNG(seed);
    this.fullHeight = rng.range(0.8, 1.8);

    this.stemMat = new THREE.MeshStandardMaterial({ color: 0x4f7a3a, roughness: 0.8 });
    this.stem = new THREE.Mesh(new THREE.BoxGeometry(0.16, this.fullHeight, 0.16), this.stemMat);
    this.stem.position.y = this.fullHeight / 2;
    this.object.add(this.stem);

    this.bloomMat = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.3,
      roughness: 0.4,
    });
    // Mushroom-cap style bloom.
    this.bloom = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), this.bloomMat);
    this.bloom.position.y = this.fullHeight;
    this.object.add(this.bloom);

    this.object.scale.set(1, 0.2, 1); // start dormant
  }

  onResonance(): void {
    /* coherence-driven */
  }

  update(dt: number, time: number): void {
    // Grow with coherence; gentle sway.
    const grow = 0.2 + 0.8 * this.coherence;
    const sy = this.object.scale.y + (grow - this.object.scale.y) * Math.min(1, dt * 1.5);
    this.object.scale.set(1, sy, 1);
    this.object.rotation.z = Math.sin(time * 0.8 + this.object.position.x) * 0.05 * this.coherence;
    this.bloomMat.emissiveIntensity = 0.2 + this.coherence * 1.3;
    const bloomScale = 0.4 + this.coherence * 0.8;
    this.bloom.scale.setScalar(bloomScale);
  }
}
