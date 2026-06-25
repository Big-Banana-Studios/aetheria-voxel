/**
 * RotatePrompt — landscape guidance for mobile (Task 3 of the Onboarding &
 * Mobile guide).
 *
 * First-person 3D wants landscape. Testing found the game didn't go landscape and
 * gave no guidance in portrait. Orientation-lock is unreliable cross-browser
 * (iOS Safari ignores it), so the robust pattern is BOTH: attempt the lock where
 * supported, and show a gentle, on-brand "turn sideways" overlay in portrait so
 * the player is guided, never dead-ended.
 *
 * Touch devices only — a desktop browser in a tall window should never be nagged.
 * The overlay is calm and not an error.
 */
import { hasTouch } from './TouchControls';

export class RotatePrompt {
  private el: HTMLDivElement;
  private touch = hasTouch();

  /** @param onReflow called on every rotate/resize so the renderer can resize. */
  constructor(root: HTMLElement, private onReflow: () => void) {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:45', 'display:none',
      'flex-direction:column', 'align-items:center', 'justify-content:center', 'gap:1.1rem',
      'background:radial-gradient(circle at center, rgba(20,12,34,0.94), rgba(8,5,16,0.99))',
      'color:#e8e0f0', 'font-family:"Segoe UI",system-ui,sans-serif', 'text-align:center',
      'padding:24px', 'pointer-events:auto',
    ].join(';');

    // A gently rotating phone glyph + calm line.
    const glyph = document.createElement('div');
    glyph.textContent = '🌿';
    glyph.style.cssText =
      'font-size:2.4rem;animation:aetheria-rotate-hint 2.6s ease-in-out infinite;';
    const text = document.createElement('p');
    text.textContent = 'Turn your device sideways to begin 🌿';
    text.style.cssText = 'margin:0;font-weight:300;font-size:1.15rem;letter-spacing:0.04em;opacity:0.9;';

    if (!document.getElementById('aetheria-rotate-style')) {
      const style = document.createElement('style');
      style.id = 'aetheria-rotate-style';
      style.textContent =
        '@keyframes aetheria-rotate-hint{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(78deg)}}';
      document.head.appendChild(style);
    }

    this.el.append(glyph, text);
    root.appendChild(this.el);

    const handle = () => this.handleOrientation();
    window.addEventListener('resize', handle);
    window.addEventListener('orientationchange', handle);
    this.handleOrientation();
  }

  private handleOrientation(): void {
    // Keep the renderer/canvas correct on every rotate or resize.
    this.onReflow();
    const portrait = window.matchMedia('(orientation: portrait)').matches;
    // Only guide on real touch devices; desktop in a tall window is left alone.
    this.el.style.display = this.touch && portrait ? 'flex' : 'none';
  }

  /** Best-effort landscape lock — works on Android/PWA; iOS Safari ignores it, so
   *  the portrait overlay above remains the fallback. Call after a user gesture
   *  (e.g. entering the Field) for the best chance of success. */
  async tryLockLandscape(): Promise<void> {
    if (!this.touch) return;
    try {
      const orientation = screen.orientation as ScreenOrientation & {
        lock?: (o: string) => Promise<void>;
      };
      await orientation.lock?.('landscape');
    } catch {
      /* unsupported (iOS) — the rotate prompt guides instead */
    }
  }
}
