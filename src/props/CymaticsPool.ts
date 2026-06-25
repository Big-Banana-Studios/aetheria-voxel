/**
 * CymaticsPool — a translucent block surface displaying a cymatic pattern
 * (Section 6.2 / 8.1.2). A Chladni-style standing-wave function, whose mode
 * scales with the prescribed frequency index, drives per-tile height and glow.
 * At resonance + coherence the pattern resolves into a clean, ordered figure.
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';

export class CymaticsPool extends FrequencyReactiveBlock {
  private tiles: THREE.Mesh[] = [];
  private tilePos: { x: number; z: number }[] = [];
  private material: THREE.MeshStandardMaterial;
  private size: number;
  private baseColor: THREE.Color;

  constructor(
    position: THREE.Vector3,
    tunedFreqIndex: number,
    color: THREE.ColorRepresentation,
    size = 8,
  ) {
    super(position);
    this.size = size;
    this.tunedFrequencyIndex = tunedFreqIndex;
    this.baseColor = new THREE.Color(color);
    this.material = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.6,
      roughness: 0.4,
    });

    const geo = new THREE.BoxGeometry(0.9, 0.4, 0.9);
    for (let z = 0; z < size; z++) {
      for (let x = 0; x < size; x++) {
        const tile = new THREE.Mesh(geo, this.material.clone());
        tile.position.set(x - size / 2, 0, z - size / 2);
        this.tiles.push(tile);
        this.tilePos.push({ x: x - size / 2, z: z - size / 2 });
        this.object.add(tile);
      }
    }
  }

  onResonance(): void {
    /* visual only */
  }

  update(_dt: number, time: number): void {
    // Mode numbers grow with the frequency slot, giving higher frequencies
    // tighter, more intricate cymatic figures.
    const slot = this.currentFreqIndex >= 0 ? this.currentFreqIndex % 9 : 0;
    const m = 1 + slot * 0.6;
    const n = 1 + ((slot * 1.3) % 4);
    const strength = this.getResonanceStrength(this.currentFreqIndex);
    const order = 0.3 + 0.7 * this.coherence; // high coherence = clean pattern

    const L = this.size;
    for (let i = 0; i < this.tiles.length; i++) {
      const { x, z } = this.tilePos[i];
      const u = (x + L / 2) / L;
      const v = (z + L / 2) / L;
      // Chladni standing-wave amplitude.
      let a =
        Math.cos(n * Math.PI * u) * Math.cos(m * Math.PI * v) -
        Math.cos(m * Math.PI * u) * Math.cos(n * Math.PI * v);
      a *= order;
      const wobble = Math.sin(time * 1.5 + i * 0.1) * 0.1 * (1 - order);
      this.tiles[i].position.y = a * (0.5 + strength) + wobble;
      const mat = this.tiles[i].material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.15 + Math.abs(a) * strength * 1.2;
      mat.color.copy(this.baseColor).multiplyScalar(0.6 + Math.abs(a));
    }
  }
}
