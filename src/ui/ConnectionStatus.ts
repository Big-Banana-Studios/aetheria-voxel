/**
 * ConnectionStatus — small brain icon, top-right (Section 9.1).
 * Green = good signal, yellow = weak, red/grey = disconnected (Manual Mode),
 * pulsing while calibrating. Non-intrusive; never nags (Section 5.4).
 */
export class ConnectionStatus {
  readonly el: HTMLDivElement;
  private icon: HTMLSpanElement;
  private label: HTMLSpanElement;
  private heart: HTMLSpanElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed',
      'top:14px',
      'right:16px',
      'display:flex',
      'align-items:center',
      'gap:8px',
      'font:12px/1 "Segoe UI",system-ui,sans-serif',
      'color:#cfc2e8',
      'opacity:0.85',
    ].join(';');

    this.icon = document.createElement('span');
    this.icon.textContent = '🧠';
    this.icon.style.cssText = 'font-size:18px;filter:grayscale(1);transition:filter .3s,opacity .3s;';

    this.label = document.createElement('span');
    this.label.textContent = 'Manual Mode';

    // Heart (Polar H10) indicator — hidden until the sensor connects.
    this.heart = document.createElement('span');
    this.heart.style.cssText = 'display:none;margin-left:10px;color:#e88ea8;';

    this.el.append(this.icon, this.label, this.heart);
  }

  /**
   * Reflect the Polar H10 heart sensor. Honest-claims rule (Selah): show the
   * real measurement (bpm) and a qualitative settling word — NEVER a settledness
   * score/percentage or any brain-state/attainment claim.
   */
  updateHeart(connected: boolean, settledness: number, bpm: number): void {
    if (!connected) {
      this.heart.style.display = 'none';
      return;
    }
    this.heart.style.display = 'inline';
    const word = settledness > 0.66 ? ' · settled' : settledness > 0.33 ? ' · settling' : '';
    this.heart.textContent = `❤ ${bpm > 0 ? Math.round(bpm) + ' bpm' : 'heart'}${word}`;
    this.heart.style.opacity = String(0.6 + settledness * 0.4);
  }

  /** quality 0..1; connected = EEG source active; calibrating optional. */
  update(connected: boolean, quality: number, calibrating = false): void {
    if (!connected) {
      this.icon.style.filter = 'grayscale(1)';
      this.icon.style.opacity = '0.6';
      this.label.textContent = 'Manual Mode';
      return;
    }
    this.icon.style.opacity = '1';
    if (calibrating) {
      this.icon.style.filter = 'hue-rotate(40deg)';
      this.label.textContent = 'Calibrating…';
      const t = (performance.now() / 500) % 2;
      this.icon.style.opacity = t < 1 ? '1' : '0.5';
      return;
    }
    if (quality > 0.6) {
      this.icon.style.filter = 'hue-rotate(80deg) saturate(1.4)'; // greenish
      this.label.textContent = 'Muse · strong';
    } else if (quality > 0.3) {
      this.icon.style.filter = 'hue-rotate(20deg) saturate(1.3)'; // yellowish
      this.label.textContent = 'Muse · weak';
    } else {
      this.icon.style.filter = 'saturate(2) brightness(0.8)'; // reddish
      this.label.textContent = 'Muse · poor signal';
    }
  }
}
