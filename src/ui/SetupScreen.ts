/**
 * SetupScreen — the guided EEG / sensor setup flow (Section 9.2 / 12).
 *
 * Four gentle steps: detect → signal-quality check (4 electrode bars) → 30s
 * calibration baseline (guided breathing) → confirmation. Manual Mode is always
 * one click away and never a degraded fallback (Section 5.4). No claims about
 * brain state — just connection, signal, and a captured baseline.
 */
import type { ChannelQuality } from '../eeg/types';
import { hasTouch } from './TouchControls';

type Step = 'sensors' | 'quality' | 'calibrate' | 'ready';

export interface SetupCallbacks {
  connectMuse: () => Promise<boolean>; // also used to reconnect after a preset change
  connectPolar: () => Promise<boolean>;
  disconnectMuse: () => void;
  disconnectPolar: () => void;
  cyclePreset: () => string; // switch to the next optics preset; returns its name
  startCalibration: () => void; // begin the baseline window (54s of resting breath)
  finishCalibration: () => void; // capture the baseline at the end of the window
  enter: () => void; // begin the Field
  manual: () => void; // skip straight to Manual Mode
}

const CHANNELS: (keyof ChannelQuality)[] = ['tp9', 'af7', 'af8', 'tp10'];
const CH_LABEL: Record<string, string> = { tp9: 'TP9', af7: 'AF7', af8: 'AF8', tp10: 'TP10' };
const CALIB_SECONDS = 54;

/** Live sensor status shown during the signal-check step. */
export interface SetupStatus {
  quality: ChannelQuality; // 0..1 per EEG electrode
  hr: number | null; // heart rate (Polar or Muse PPG)
  ppgStreaming: boolean; // Muse pulse stream producing data
  fnirsStreaming: boolean; // Muse optical (HbO/HbR) producing data
  hbo: number | null;
  museConnected: boolean; // Muse paired (so we know to show optics rows at all)
  opticsPackets: number; // optics subpackets received; 0 ⇒ stream not arriving
  opticsMode: string | null; // e.g. 'OPTICS16' once decoded
  preset: string; // active Muse preset (for the toggle label)
  polarConnected: boolean;
  calibProgress: number;
}

export class SetupScreen {
  readonly el: HTMLDivElement;
  private panel: HTMLDivElement;
  private step: Step = 'sensors';
  private museConnected = false;
  private polarConnected = false;
  private pairingMuse = false; // an in-flight connect attempt (don't let reconcile stomp it)
  private pairingPolar = false;
  private notice = ''; // transient message (e.g. "Muse disconnected")
  private calibElapsed = 0;
  private cb!: SetupCallbacks;

  constructor(root: HTMLElement) {
    this.el = document.createElement('div');
    // Scrollable + centering so a short viewport (phone in landscape) scrolls
    // rather than clipping the calibration rows top/bottom (see MenuSystem).
    this.el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:41', 'display:none',
      'flex-direction:column', 'align-items:center', 'justify-content:flex-start',
      'overflow-y:auto', 'overscroll-behavior:contain', '-webkit-overflow-scrolling:touch',
      'padding:24px 16px',
      'background:radial-gradient(circle at center, rgba(20,12,34,0.82), rgba(8,5,16,0.97))',
      'pointer-events:auto', 'color:#e8e0f0', 'font-family:"Segoe UI",system-ui,sans-serif',
    ].join(';');
    this.panel = document.createElement('div');
    this.panel.style.cssText = 'width:min(440px,92vw);margin:auto 0;text-align:center;';
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
    this.notice = '';
    this.pairingMuse = this.pairingPolar = false;
    this.el.style.display = 'flex';
    this.renderSensors();
  }
  hide(): void {
    this.el.style.display = 'none';
  }
  get isVisible(): boolean {
    return this.el.style.display !== 'none';
  }

  /** A small inline "Disconnect" button (secondary, low-emphasis). */
  private linkBtn(label: string): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = [
      'display:inline-block', 'margin:0 0 10px', 'padding:5px 14px',
      'border-radius:18px', 'border:1px solid rgba(180,142,232,0.3)',
      'background:transparent', 'color:#c8b8e0', 'opacity:0.8',
      'font:300 0.82rem "Segoe UI",sans-serif', 'cursor:pointer',
    ].join(';');
    return b;
  }

  // ── Step 1: sensors ──
  private renderSensors(): void {
    this.step = 'sensors';
    this.panel.innerHTML = '';
    this.panel.appendChild(this.heading('Prepare to enter', 'Connect a sensor for the full experience, or enter in Manual Mode — a complete path either way.'));

    if (this.notice) {
      const n = document.createElement('div');
      n.textContent = this.notice;
      n.style.cssText = 'margin:-0.4rem 0 0.9rem;color:#d4c050;font:300 0.9rem "Segoe UI",sans-serif;';
      this.panel.appendChild(n);
    }

    // Connecting a sensor does NOT advance the screen — you can pair the Muse
    // AND the Polar here, then hit Continue. (Previously the Muse auto-jumped to
    // the signal check, stranding the Polar connect.)
    this.deviceRow('Muse (EEG)', this.museConnected, this.pairingMuse,
      async (b) => {
        this.pairingMuse = true;
        b.textContent = 'Pairing…'; b.disabled = true;
        this.museConnected = await this.cb.connectMuse();
        this.pairingMuse = false;
        if (!this.museConnected) this.notice = 'No Muse found — try again, or continue without it.';
        this.renderSensors(); // re-render so Continue appears, Polar still available
      },
      () => { this.cb.disconnectMuse(); this.museConnected = false; this.notice = ''; this.renderSensors(); });

    this.deviceRow('Polar H10 (heart)', this.polarConnected, this.pairingPolar,
      async (b) => {
        this.pairingPolar = true;
        b.textContent = 'Pairing…'; b.disabled = true;
        this.polarConnected = await this.cb.connectPolar();
        this.pairingPolar = false;
        if (!this.polarConnected) this.notice = 'No Polar H10 found — make sure the strap is wet and snug.';
        this.renderSensors();
      },
      () => { this.cb.disconnectPolar(); this.polarConnected = false; this.notice = ''; this.renderSensors(); });

    // Continue appears once any sensor is paired → signal check (Muse) or
    // straight to the baseline (Polar-only). Add sensors in any order first.
    if (this.museConnected || this.polarConnected) {
      const cont = this.btn('Continue', true);
      cont.onclick = () => (this.museConnected ? this.gotoQuality() : this.gotoCalibrate());
      this.panel.appendChild(cont);
    }

    const manual = this.btn('Enter in Manual Mode');
    manual.onclick = () => { this.hide(); this.cb.manual(); };
    this.panel.appendChild(manual);
  }

  /** One sensor's row: a connect/reconnect button, plus a Disconnect button when
   *  paired. `connect` gets the button so it can show "Pairing…"; `disconnect`
   *  drops the device and re-renders so it can be paired again. */
  private deviceRow(
    name: string,
    connected: boolean,
    pairing: boolean,
    connect: (b: HTMLButtonElement) => void,
    disconnect: () => void,
  ): void {
    const b = this.btn(connected ? `${name}  ✓ connected` : `Connect ${name}`, !connected);
    b.disabled = pairing;
    b.onclick = () => { if (!connected && !pairing) connect(b); };
    this.panel.appendChild(b);
    if (connected) {
      const d = this.linkBtn('Disconnect');
      d.onclick = disconnect;
      this.panel.appendChild(d);
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

    // Streaming status for the other Athena/Polar channels (so you can confirm
    // PPG + fNIRS are actually flowing — fNIRS needs good forehead contact and
    // ~10–30s to warm up).
    const status = document.createElement('div');
    status.id = 'setup-stream';
    status.style.cssText = 'margin:0.6rem auto 0.2rem;font:0.82rem/1.8 ui-monospace,Consolas,monospace;opacity:0.85;text-align:left;display:inline-block;min-width:240px;';
    status.innerHTML =
      '<div data-row="eeg">EEG signal: —</div>' +
      '<div data-row="optics">Optical stream: —</div>' +
      '<div data-row="ppg">Pulse (PPG): —</div>' +
      '<div data-row="fnirs">fNIRS (HbO/HbR): —</div>' +
      '<div data-row="polar">Polar H10: —</div>';
    this.panel.appendChild(status);

    // Optics troubleshooting: if no optical packets arrive under this preset, the
    // user can cycle to another optics-capable preset and reconnect right here.
    // (Hidden until we actually see zero optics on a connected Muse.)
    const presetBtn = this.btn('');
    presetBtn.dataset.role = 'preset';
    presetBtn.style.display = 'none';
    presetBtn.style.fontSize = '0.85rem';
    presetBtn.onclick = async () => {
      const next = this.cb.cyclePreset();
      presetBtn.textContent = `Reconnecting on ${next}…`;
      presetBtn.disabled = true;
      await this.cb.connectMuse();
      presetBtn.disabled = false;
    };
    this.panel.appendChild(presetBtn);

    const cont = this.btn('Begin Calibration', true);
    cont.onclick = () => this.gotoCalibrate();
    const back = this.btn('← Back (add a sensor)');
    back.onclick = () => this.renderSensors();
    const skip = this.btn('Skip — enter now');
    skip.onclick = () => { this.hide(); this.cb.enter(); };
    this.panel.append(cont, back, skip);
  }

  private gotoCalibrate(): void {
    this.step = 'calibrate';
    this.calibElapsed = 0;
    this.cb.startCalibration();
    this.panel.innerHTML = '';
    this.panel.appendChild(this.heading('Finding your baseline', 'Sit comfortably and breathe <b>normally — easy and relaxed</b>, however you are right now. Don’t pace it. This 54-second baseline simply learns your resting rhythm, so the Field can meet you where you are.'));
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
    // Capture the baseline now — at the end of the relaxed-breathing window.
    this.cb.finishCalibration();
    this.step = 'ready';
    this.panel.innerHTML = '';
    const readyHint = hasTouch()
      ? 'The node awaits. Tap the map any time to travel, and find your session metrics in the Pause menu.'
      : 'The node awaits. Press C any time for the map, V for your session metrics.';
    this.panel.appendChild(this.heading("You're ready", readyHint));
    const enter = this.btn('Enter the Field', true);
    enter.onclick = () => { this.hide(); this.cb.enter(); };
    this.panel.appendChild(enter);
  }

  /** Reconcile our local flags with the live client state so an unexpected drop
   *  (e.g. the Muse powered off) is reflected immediately — flag flips, a notice
   *  shows, and the device becomes re-connectable. Skips while a connect attempt
   *  is in flight so it can't stomp the "Pairing…" state. */
  private reconcile(s: SetupStatus): void {
    if (!this.pairingMuse && s.museConnected !== this.museConnected) {
      const dropped = !s.museConnected;
      this.museConnected = s.museConnected;
      if (dropped) {
        this.notice = 'Muse disconnected — power it back on, then press Connect Muse.';
        // The signal check is meaningless without the Muse → return to sensors.
        if (this.step === 'sensors' || this.step === 'quality') this.renderSensors();
      } else if (this.step === 'sensors') {
        this.renderSensors();
      }
    }
    if (!this.pairingPolar && s.polarConnected !== this.polarConnected) {
      const dropped = !s.polarConnected;
      this.polarConnected = s.polarConnected;
      if (dropped) this.notice = 'Polar H10 disconnected — re-check the strap, then reconnect.';
      if (this.step === 'sensors') this.renderSensors();
    }
  }

  /** Called each frame while visible: live signal bars + streaming status + countdown. */
  update(dt: number, s: SetupStatus): void {
    this.reconcile(s);
    if (this.step === 'quality') {
      const bars = this.panel.querySelectorAll<HTMLElement>('[data-ch]');
      let qSum = 0;
      bars.forEach((bar) => {
        const ch = bar.dataset.ch as keyof ChannelQuality;
        const q = s.quality[ch] ?? 0;
        qSum += q;
        const fill = bar.querySelector<HTMLElement>('.fill');
        if (fill) {
          fill.style.height = `${Math.round(q * 100)}%`;
          fill.style.background = q > 0.6 ? '#5ad48a' : q > 0.3 ? '#d4c050' : '#e85a5a';
        }
      });

      const row = (key: string): HTMLElement | null => this.panel.querySelector(`[data-row="${key}"]`);
      const ok = '#5ad48a', warn = '#d4c050', bad = '#e88e8e';
      const set = (key: string, text: string, color: string) => {
        const el = row(key);
        if (el) { el.textContent = text; el.style.color = color; }
      };
      const eegAvg = qSum / 4;
      set('eeg', `EEG signal: ${eegAvg > 0.6 ? 'strong' : eegAvg > 0.3 ? 'weak — reseat band' : 'poor — dampen/reseat'}`,
        eegAvg > 0.6 ? ok : eegAvg > 0.3 ? warn : bad);

      // The optical stream is the root of both PPG and fNIRS. Diagnose it
      // explicitly: 0 packets ⇒ optics aren't arriving at all (LED/preset/
      // firmware) — wetting or reseating the EEG band cannot help, since fNIRS
      // is infrared, not electrical. Packets arriving ⇒ it's just warm-up/contact.
      const opticsOn = s.opticsPackets > 0;
      if (!s.museConnected) {
        set('optics', 'Optical stream: Muse not connected', warn);
      } else if (opticsOn) {
        set('optics', `Optical stream: on ✓ ${s.opticsMode ?? ''} (${s.opticsPackets} pkts)`, ok);
      } else {
        set('optics', `Optical stream: none on ${s.preset} — try another preset ↓`, bad);
      }

      set('ppg', `Pulse (PPG): ${
        s.ppgStreaming ? `streaming ✓ ${s.hr ? Math.round(s.hr) + ' bpm' : ''}`
        : opticsOn ? 'warming up (~4 s)…'
        : 'waiting for optics'}`,
        s.ppgStreaming ? ok : opticsOn ? warn : bad);
      set('fnirs', `fNIRS (HbO/HbR): ${
        s.fnirsStreaming ? `streaming ✓ (HbO ${s.hbo?.toFixed(1)})`
        : opticsOn ? 'warming up (~10–30 s)…'
        : 'no optics — not a contact issue'}`,
        s.fnirsStreaming ? ok : opticsOn ? warn : bad);
      set('polar', s.polarConnected ? `Polar H10: connected ✓ ${s.hr ? Math.round(s.hr) + ' bpm' : ''}` : 'Polar H10: not connected',
        s.polarConnected ? ok : warn);

      // Show the preset-toggle only when a Muse is connected but no optics arrive.
      const presetBtn = this.panel.querySelector<HTMLButtonElement>('[data-role="preset"]');
      if (presetBtn && !presetBtn.disabled) {
        if (s.museConnected && !opticsOn) {
          presetBtn.style.display = 'block';
          presetBtn.textContent = `Optics not flowing — switch preset (now ${s.preset})`;
        } else {
          presetBtn.style.display = 'none';
        }
      }
    } else if (this.step === 'calibrate') {
      this.calibElapsed += dt;
      const ring = this.panel.querySelector('#setup-calib');
      const remain = Math.max(0, CALIB_SECONDS - this.calibElapsed);
      if (ring) ring.textContent = remain > 0 ? Math.ceil(remain).toString() : '✓';
      if (s.calibProgress >= 1 || this.calibElapsed >= CALIB_SECONDS) this.gotoReady();
    }
  }
}
