/**
 * SacredGeometryEmitter — assembles rotating sacred geometry from cubes/nodes
 * (Section 8.1.2). Becomes visible only at high coherence: fragmented/hidden
 * when low, partially formed in the mid-range, fully assembled, rotating and
 * glowing when high (Section 8.1.1). GUT levels use a simple Flower-of-Life ring.
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';

export class SacredGeometryEmitter extends FrequencyReactiveBlock {
  private nodes: THREE.Mesh[] = [];
  private material: THREE.MeshStandardMaterial;
  private targetScale = 0;

  constructor(position: THREE.Vector3, color: THREE.ColorRepresentation, radius = 2.2) {
    super(position);
    this.tunedFrequencyIndex = -1;
    this.material = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0,
      roughness: 0.2,
    });

    // Flower-of-Life: a central node + 6 around it (seed of life), each as a
    // small ring of cubes.
    const centers: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      centers.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius));
    }
    const cube = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    for (const c of centers) {
      const ringCount = 12;
      for (let j = 0; j < ringCount; j++) {
        const a = (j / ringCount) * Math.PI * 2;
        const node = new THREE.Mesh(cube, this.material);
        node.position.set(c.x + Math.cos(a) * radius, 0, c.y + Math.sin(a) * radius);
        this.nodes.push(node);
        this.object.add(node);
      }
    }
    this.object.scale.setScalar(0.01);
  }

  onResonance(): void {
    /* coherence-driven */
  }

  update(dt: number, _time: number): void {
    // Assemble with coherence (visible above ~0.4, full at ~0.85).
    this.targetScale = Math.max(0.01, (this.coherence - 0.3) / 0.55);
    this.targetScale = Math.min(1.2, this.targetScale);
    const s = this.object.scale.x + (this.targetScale - this.object.scale.x) * Math.min(1, dt * 2);
    this.object.scale.setScalar(s);
    this.material.opacity += (Math.min(0.9, this.coherence) - this.material.opacity) * Math.min(1, dt * 2);
    this.material.emissiveIntensity = 0.4 + this.coherence;
    this.object.rotation.y += dt * (0.2 + this.coherence * 0.6);
  }
}
