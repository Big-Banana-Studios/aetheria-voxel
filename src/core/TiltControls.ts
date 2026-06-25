/**
 * TiltControls — optional tilt-to-look for mobile (Task 4 of the Onboarding &
 * Mobile guide).
 *
 * A gentle tilt-to-look suits a meditative app — calmer than constant drag. This
 * is purely additive: touch-drag remains the base (see TouchControls), and tilt
 * is an enhancement the player turns ON from Settings and can turn off any time.
 * Same graceful-degradation rule as the sensors — touch always works, tilt only
 * deepens it.
 *
 * It acts as a rate control: how far you hold the phone from your neutral pose
 * sets how fast the view turns, smoothed and dead-zoned so it stays gentle, never
 * twitchy. Each frame the Game asks for the accumulated look delta and feeds it to
 * the PlayerController exactly like a drag.
 *
 * iOS 13+ requires permission requested from a user gesture, so enable() must be
 * called from a button tap (the Settings toggle).
 */
type DeviceOrientationEventiOS = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
};

export class TiltControls {
  enabled = false;
  /** User-tunable strength (Settings). Higher = a small tilt turns faster. */
  sensitivity = 1.5;

  private neutral: { beta: number; gamma: number } | null = null;
  private latest: { beta: number; gamma: number } | null = null;
  private readonly deadzoneDeg = 2;
  // Smoothed angular offset from neutral, in degrees (low-pass filtered).
  private smYaw = 0;
  private smPitch = 0;

  private bound = (e: DeviceOrientationEvent) => this.onTilt(e);

  /** Whether this device can even report orientation (so Settings can hide the
   *  toggle on a desktop / non-touch device). */
  static isSupported(): boolean {
    return typeof window !== 'undefined' && typeof DeviceOrientationEvent !== 'undefined';
  }

  /** Turn tilt on. MUST be called from a user gesture (iOS permission gate).
   *  Returns false if the device denies permission. */
  async enable(): Promise<boolean> {
    const DOE = DeviceOrientationEvent as DeviceOrientationEventiOS;
    if (typeof DOE !== 'undefined' && typeof DOE.requestPermission === 'function') {
      try {
        const res = await DOE.requestPermission();
        if (res !== 'granted') return false;
      } catch {
        return false;
      }
    }
    if (!this.enabled) {
      window.addEventListener('deviceorientation', this.bound);
      this.enabled = true;
    }
    this.recenter();
    return true;
  }

  disable(): void {
    if (!this.enabled) return;
    window.removeEventListener('deviceorientation', this.bound);
    this.enabled = false;
    this.neutral = null;
    this.latest = null;
    this.smYaw = 0;
    this.smPitch = 0;
  }

  /** The next reading becomes the neutral pose — the player holds the phone
   *  however is comfortable and recenters there (never forced flat-on-a-table). */
  recenter(): void {
    this.neutral = null;
  }

  private onTilt(e: DeviceOrientationEvent): void {
    if (e.beta == null || e.gamma == null) return;
    this.latest = { beta: e.beta, gamma: e.gamma };
    if (!this.neutral) this.neutral = { beta: e.beta, gamma: e.gamma };
  }

  /**
   * Per-frame look delta (pixel-equivalent, matching PlayerController.applyLook).
   * Returns null when tilt is off or has no reading yet, so the caller can skip.
   */
  consume(dt: number): { dx: number; dy: number } | null {
    if (!this.enabled || !this.latest || !this.neutral) return null;

    let dGamma = this.latest.gamma - this.neutral.gamma; // left-right tilt
    let dBeta = this.latest.beta - this.neutral.beta; // front-back tilt

    // When the screen rotates to landscape, beta/gamma roles swap. Map raw axes
    // to (yaw = turn left/right, pitch = look up/down) per the screen angle.
    const angle = (screen.orientation && screen.orientation.angle) || 0;
    let rawYaw: number;
    let rawPitch: number;
    switch (angle) {
      case 90:
        rawYaw = dBeta;
        rawPitch = -dGamma;
        break;
      case 270:
        rawYaw = -dBeta;
        rawPitch = dGamma;
        break;
      case 180:
        rawYaw = -dGamma;
        rawPitch = -dBeta;
        break;
      default: // 0 (portrait)
        rawYaw = dGamma;
        rawPitch = dBeta;
        break;
    }

    // Deadzone so a steady hold doesn't drift.
    const dz = this.deadzoneDeg;
    if (Math.abs(rawYaw) < dz) rawYaw = 0;
    if (Math.abs(rawPitch) < dz) rawPitch = 0;

    // Low-pass smoothing → gentle and steady, not jittery (a calm app).
    this.smYaw += (rawYaw - this.smYaw) * 0.1;
    this.smPitch += (rawPitch - this.smPitch) * 0.1;

    // Rate control: angular offset (deg) → look speed (pixels/sec) → this frame's
    // delta. PlayerController.applyLook turns pixels into radians (0.004 rad/px).
    const speed = this.sensitivity * 14; // px/sec per degree of tilt
    return {
      dx: this.smYaw * speed * dt,
      dy: this.smPitch * speed * dt,
    };
  }
}
