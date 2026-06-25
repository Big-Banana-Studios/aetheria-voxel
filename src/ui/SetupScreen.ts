/**
 * SetupScreen — the guided EEG / sensor setup flow (Section 9.2 / 12).
 *
 * Four gentle steps: detect → signal-quality check (4 electrode bars) → 30s
 * calibration baseline (guided breathing) → confirmation. Manual Mode is always
 * one click away and never a degraded fallback (Section 5.4). No claims about
 * brain state — just connection, signal, and a captured baseline.
 */
import type { ChannelQuality } from '../eeg/types';

type Step = 'sensors' | 'quality' | 'calibrate' | 'ready';

export interface SetupCallbacks {
  connectMuse: () => Promise<boolean>;
  connectPolar: () => Promise<boolean>;
  startCalibration: () => void; // capture baselines (30s)
  enter: () => void; // begin the Field
  manual: () => void; // skip straight to Manual Mode
}

const CHANNELS: (keyof ChannelQuality)[] = ['tp9', 'af7', 'af8', 'tp10'];
const CH_LABEL: Record<string, string> = { tp9: 'TP9', af7: 'AF7', af8: 'AF8', tp10: 'TP10' };
const CALIB_SECONDS = 30;

export class SetupScreen {
  readonly el: HTMLDivElement;
  private panel: HTMLDivElement;
  private step: Step = 'sensors';
  private museConnected = false;
  private polarConnected = false;
  private calibElapsed = 0;
  private cb!: SetupCallbacks;

  constructor(root: HTMLElement) {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:41', 'display:none',
      'align-items:center', 'justify-content:center',
      'background:radial-gradient(circle at center, rgba(20,12,34,0.82), rgba(8,5,16,0.97))',
      'pointer-events:auto', 'color:#e8e0f0', 'font-family:"Segoe UI",system-ui,sans-serif',
    ].join(';');
    this.panel = document.createElement('div');
    this.panel.style.cssText = 'width:min(440px,92vw);text-align:center;';
    this.el.appendChild(this.panel);
    root.appendChild(this.el);
  }

  private btn(label: string, primary = false): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = [
      'display:block', 'width:100%', 'margin:8px 0', 'padding:12px 18px',
      'border-radius:26px', 'border:1px solid rgba(180,142,232,0.5)',
      `background:${primary ? 'rgba(180,142,232,0.22)' : 'rgba(20,12,34,0.6)'}`,
      'color:#e8e0f0', 'font:300 1rem "Segoe UI",sans-serif', 'cursor:pointer',
    ].join(';');
    return b;
  }
  private heading(t: string, sub = ''): HTMLDivElement {
    const d = document.createElement('div');
    d.innerHTML =
      `<div style="font-weight:300;letter-spacing:0.14em;font-size:1.4rem;margin-bottom:0.3rem">${t}</div>` +
      (sub ? `<div style="opacity:0.6;font-size:0.9rem;margin-bottom:1.1rem;line-height:1.5">${sub}</div>` : '');
    return d;
  }

  open(cb: SetupCallbacks): void {
    this.cb = cb;
    this.step = 'sensors';
    this.calibElapsed = 0;
    this.el.style.display = 'flex';
    this.renderSensors();
  }
  hide(): void {
    this.el.style.display = 'none';
  }
  get isVisible(): boolean {
    return this.el.style.display !== 'none';
  }

  // ── Step 1: sensors ──
  private renderSensors(): void {
    this.panel.innerHTML = '';
    this.panel.appendChild(this.heading('Prepare to enter', 'Connect a sensor for the full experience, or enter in Manual Mode — a complete path either way.'));

    const muse = this.btn(this.museConnected ? 'Muse  ✓ connected' : 'Connect Muse (EEG)', !this.museConnected);
    muse.onclick = async () => {
      if (this.museConnected) return;
      muse.textContent = 'Pairing…'; muse.disabled = true;
      this.museConnected = await this.cb.connectMuse();
      muse.disabled = false;
      if (this.museConnected) this.gotoQuality();
      else { muse.textContent = 'No Muse found — try again'; }
    };

    const polar = this.btn(this.polarConnected ? 'Polar H10  ✓ connected' : '+ Polar H10 (heart)');
    polar.onclick = async () => {
      polar.textContent = 'Pairing…'; polar.disabled = true;
      this.polarConnected = await this.cb.connectPolar();
      polar.disabled = false;
      polar.textContent = this.polarConnected ? 'Polar H10  ✓ connected' : '+ Polar H10 (heart)';
    };

    const manual = this.btn('Enter in Manual Mode');
    manual.onclick = () => { this.hide(); this.cb.manual(); };

    this.panel.append(muse, polar, manual);

    // If only Polar (no Muse), allow calibrating the heart baseline too.
    if (this.polarConnected) {
      const cont = this.btn('Continue', true);
      cont.onclick = () => this.gotoCalibrate();
      this.panel.appendChild(cont);
    }
  }

  private gotoQuality(): void {
    this.step = 'quality';
    this.panel.innerHTML = '';
    this.panel.appendChild(this.heading('Signal check', 'Settle the band on your forehead until the four bars are green. A little movement is fine.'));
    const bars = document.createElement('div');
    bars.id = 'setup-bars';
    bars.style.cssText = 'display:flex;gap:10px;justify-content:center;margin:1rem 0;';
    for (const ch of CHANNELS) {
      const col = document.createElement('div');
      col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;width:48px;';
      const bar = document.createElement('div');
      bar.dataset.ch = ch;
      bar.style.cssText = 'width:14px;height:80px;border-radius:7px;background:#3a2f4a;position:relative;overflow:hidden;';
      const fill = document.createElement('div');
      fill.className = 'fill';
      fill.style.cssText = 'position:absolute;bottom:0;left:0;right:0;height:0%;background:#e85a5a;transition:height 0.3s,background 0.3s;';
      bar.appendChild(fill);
      const lbl = document.createElement('div');
      lbl.textContent = CH_LABEL[ch];
      lbl.style.cssText = 'font:0.72rem ui-monospace,monospace;opacity:0.7;';
      col.append(bar, lbl);
      bars.appendChild(col);
    }
    this.panel.appendChild(bars);
    const cont = this.btn('Begin Calibration', true);
    cont.onclick = () => this.gotoCalibrate();
    const skip = this.btn('Skip — enter now');
    skip.onclick = () => { this.hide(); this.cb.enter(); };
    this.panel.append(cont, skip);
  }

  private gotoCalibrate(): void {
    this.step = 'calibrate';
    this.calibElapsed = 0;
    this.cb.startCalibration();
    this.panel.innerHTML = '';
    this.panel.appendChild(this.heading('Finding your baseline', 'Sit comfortably. Breathe slowly — in for four, out for six. This 30-second baseline lets the Field meet you where you are.'));
    const ring = document.createElement('div');
    ring.id = 'setup-calib';
    ring.style.cssText = 'font:300 2.4rem "Segoe UI",sans-serif;margin:1rem 0;';
    ring.textContent = String(CALIB_SECONDS);
    this.panel.appendChild(ring);
    const skip = this.btn('Skip baseline');
    skip.onclick = () => this.gotoReady();
    this.panel.appendChild(skip);
  }

  private gotoReady(): void {
    this.step = 'ready';
    this.panel.innerHTML = '';
    this.panel.appendChild(this.heading("You're ready", 'The node awaits. Press C any time for the map, V for your session metrics.'));
    const enter = this.btn('Enter the Field', true);
    enter.onclick = () => { this.hide(); this.cb.enter(); };
    this.panel.appendChild(enter);
  }

  /** Called each frame while visible: live signal bars + calibration countdown. */
  update(dt: number, quality: ChannelQuality, calibProgress: number): void {
    if (this.step === 'quality') {
      const bars = this.panel.querySelectorAll<HTMLElement>('[data-ch]');
      bars.forEach((bar) => {
        const ch = bar.dataset.ch as keyof ChannelQuality;
        const q = quality[ch] ?? 0;
        const fill = bar.querySelector<HTMLElement>('.fill');
        if (fill) {
          fill.style.height = `${Math.round(q * 100)}%`;
          fill.style.background = q > 0.6 ? '#5ad48a' : q > 0.3 ? '#d4c050' : '#e85a5a';
        }
      });
    } else if (this.step === 'calibrate') {
      this.calibElapsed += dt;
      const ring = this.panel.querySelector('#setup-calib');
      const remain = Math.max(0, CALIB_SECONDS - this.calibElapsed);
      if (ring) ring.textContent = remain > 0 ? Math.ceil(remain).toString() : '✓';
      if (calibProgress >= 1 || this.calibElapsed >= CALIB_SECONDS) this.gotoReady();
    }
  }
}
