/**
 * FrequencyReactiveBlock — base reactive prop (Section 8.1.2).
 *
 * Every puzzle is built from these. Each is a Three.js Object3D (so it can pulse
 * and bloom independently of the static voxel grid) plus the reactive hooks:
 *   - onFrequencyUpdate(currentFreqIndex, coherence): called every tick.
 *   - onResonance(coherence): the tuned frequency is matched.
 *   - getResonanceStrength(currentFreqIndex): 0..1 by proximity to the tuning.
 *
 * tunedFrequencyIndex = -1 means "responds to all frequencies".
 */
import * as THREE from 'three';

export abstract class FrequencyReactiveBlock {
  readonly object = new THREE.Group();
  tunedFrequencyIndex = -1;
  reactivity = 1.0; // 0 inert .. 1 fully reactive

  protected currentFreqIndex = -1;
  protected coherence = 0;
  protected resonating = false;

  constructor(position: THREE.Vector3) {
    this.object.position.copy(position);
  }

  /** 0..1 — how strongly the current frequency matches this block's tuning. */
  getResonanceStrength(currentFreqIndex: number): number {
    if (this.tunedFrequencyIndex < 0) return 1; // responds to all
    const dist = Math.abs(currentFreqIndex - this.tunedFrequencyIndex);
    return Math.max(0, 1 - dist / 2); // within ±2 slots
  }

  onFrequencyUpdate(currentFreqIndex: number, coherence: number): void {
    this.currentFreqIndex = currentFreqIndex;
    this.coherence = coherence;
    const strength = this.getResonanceStrength(currentFreqIndex) * this.reactivity;
    const matched = strength > 0.6;
    if (matched && !this.resonating) {
      this.resonating = true;
      this.onResonance(coherence);
    } else if (!matched) {
      this.resonating = false;
    }
  }

  abstract onResonance(coherence: number): void;

  /** Per-frame animation; `time` is seconds since level start. */
  abstract update(dt: number, time: number): void;

  dispose(): void {
    this.object.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else if (mat) mat.dispose();
    });
  }
}
