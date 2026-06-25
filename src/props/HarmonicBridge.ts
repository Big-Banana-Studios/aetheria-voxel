/**
 * HarmonicBridge — translucent block-bridge held up by sustained coherence
 * (Section 6.2). Coherence high → the planks solidify and become walkable;
 * coherence drops → they fade and (optionally) turn non-solid. Teaches
 * sustained attention / equanimity. No startle: fading is smooth, never sudden.
 *
 * The bridge writes/clears solid voxels in the World so the player can actually
 * walk across it, mirroring its visual opacity.
 */
import * as THREE from 'three';
import { FrequencyReactiveBlock } from './FrequencyReactiveBlock';
import type { World } from '../voxel/World';
import { blockId } from '../voxel/BlockRegistry';

export class HarmonicBridge extends FrequencyReactiveBlock {
  private planks: THREE.Mesh[] = [];
  private material: THREE.MeshStandardMaterial;
  private threshold: number;
  private solidNow = false;
  private cells: { x: number; y: number; z: number }[] = [];

  constructor(
    private world: World,
    start: THREE.Vector3,
    length: number,
    color: THREE.ColorRepresentation,
    threshold = 0.5,
  ) {
    super(start.clone());
    this.threshold = threshold;
    this.tunedFrequencyIndex = -1;
    this.material = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.0,
      roughness: 0.3,
    });

    const geo = new THREE.BoxGeometry(1, 0.2, 1);
    for (let i = 0; i < length; i++) {
      const plank = new THREE.Mesh(geo, this.material);
      plank.position.set(i, 0, 0);
      this.planks.push(plank);
      this.object.add(plank);
      // Voxel cell aligned with this plank (world coords).
      this.cells.push({
        x: Math.floor(start.x + i),
        y: Math.floor(start.y),
        z: Math.floor(start.z),
      });
    }
  }

  onResonance(): void {
    /* bridges respond to coherence, not a specific frequency */
  }

  update(dt: number, _time: number): void {
    const want = this.coherence >= this.threshold;
    const targetOpacity = want ? 0.85 : 0.12;
    // Fade is deliberately slow so a brief coherence dip while walking across
    // does not drop the bridge out from under the player (no fail states).
    const lerp = want ? dt * 3 : dt * 1.1;
    this.material.opacity += (targetOpacity - this.material.opacity) * Math.min(1, lerp);
    this.material.emissiveIntensity = 0.3 + 0.7 * this.coherence;

    // Toggle solidity once the bridge is sufficiently manifested (with a small
    // hysteresis gap so it doesn't flicker at the threshold).
    if (!this.solidNow && this.material.opacity > 0.6) {
      this.setSolid(true);
    } else if (this.solidNow && this.material.opacity < 0.35) {
      this.setSolid(false);
    }
  }

  private setSolid(solid: boolean): void {
    this.solidNow = solid;
    const id = solid ? blockId('path_glow') : 0;
    for (const c of this.cells) this.world.setBlock(c.x, c.y, c.z, id);
  }
}
