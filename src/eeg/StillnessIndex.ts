/**
 * StillnessIndex — relative bodily-stillness from the Muse accelerometer
 * (Selah Task 2 fallback: HRV → stillness → timer).
 *
 * Rolling variance of accelerometer-magnitude, expressed relative to the
 * player's own baseline: less motion than baseline = more settled. Honest claim:
 * "you've gone still and present" — measurable, no brain-state assertion.
 *
 * Mirrors HrvIndex in shape (relative, never absolute). Pure / dependency-free.
 */
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

const WINDOW_SEC = 6;
const MIN_SAMPLES = 32;
const STILL_RATIO = 3; // this much stiller than baseline → fully "settled"
const EPS = 1e-6;

export class StillnessIndex {
  private mags: { t: number; m: number }[] = [];
  private baseline: number | null = null; // baseline std of accel magnitude

  /** Feed one accelerometer sample (g units). */
  push(ax: number, ay: number, az: number): void {
    const m = Math.sqrt(ax * ax + ay * ay + az * az);
    const now = performance.now();
    this.mags.push({ t: now, m });
    const cut = now - WINDOW_SEC * 1000;
    while (this.mags.length && this.mags[0].t < cut) this.mags.shift();
  }

  /** Std-dev of magnitude over the window (motion amount), or null. */
  private std(): number | null {
    if (this.mags.length < MIN_SAMPLES) return null;
    let mean = 0;
    for (const s of this.mags) mean += s.m;
    mean /= this.mags.length;
    let v = 0;
    for (const s of this.mags) v += (s.m - mean) * (s.m - mean);
    return Math.sqrt(v / this.mags.length);
  }

  captureBaseline(): void {
    const s = this.std();
    if (s != null) this.baseline = Math.max(s, EPS);
  }

  get hasBaseline(): boolean {
    return this.baseline != null;
  }

  /** 0..1 settledness — how much stiller than baseline the player has become. */
  settledness(): number | null {
    const cur = this.std();
    if (cur == null || this.baseline == null) return null;
    const ratio = this.baseline / Math.max(cur, EPS);
    return clamp((ratio - 1) / (STILL_RATIO - 1), 0, 1);
  }
}
