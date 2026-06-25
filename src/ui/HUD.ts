/**
 * HUD — composes the player-facing overlay (Section 9.1): the Coherence Mandala,
 * the Frequency Arc, the EEG Connection Status, the Resonance subtitle line, the
 * meditation prompt, the completion banner, and the initial EEG/Manual setup bar.
 *
 * Minimal and non-intrusive; sacred-geometry aesthetic; never nags. All text is
 * high-contrast and can be read as subtitles (Section 14.3).
 */
import { CoherenceMandala } from './CoherenceMandala';
import { FrequencyArc } from './FrequencyArc';
import { ConnectionStatus } from './ConnectionStatus';

export interface HUDState {
  coherence: number;
  meditationProgress: number;
  freqIndex: number;
  connected: boolean;
  quality: number;
  calibrating: boolean;
  nearMeditation: boolean;
  puzzlesSolved: number;
  puzzleTotal: number;
  heartConnected: boolean;
  heartCoherence: number;
  bpm: number;
}

export class HUD {
  private mandala = new CoherenceMandala();
  private arc = new FrequencyArc();
  private status = new ConnectionStatus();
  private subtitle: HTMLDivElement;
  private prompt: HTMLDivElement;
  private puzzleCount: HTMLDivElement;
  private banner: HTMLDivElement;
  private setupBar: HTMLDivElement;
  private subtitleTimer = 0;

  constructor(private root: HTMLElement) {
    root.appendChild(this.mandala.el);
    root.appendChild(this.arc.el);
    root.appendChild(this.status.el);

    this.subtitle = this.makeCenterText('', 'bottom:220px', '1.05rem', '#e8e0f0');
    this.subtitle.style.maxWidth = '46rem';
    this.subtitle.style.textAlign = 'center';
    this.subtitle.style.lineHeight = '1.5';

    this.prompt = this.makeCenterText('', 'top:50%', '1.1rem', '#cfc2e8');
    this.prompt.style.transform = 'translate(-50%,-50%)';
    this.prompt.style.textShadow = '0 0 18px rgba(180,142,232,0.6)';
    this.prompt.style.opacity = '0';

    this.puzzleCount = document.createElement('div');
    this.puzzleCount.style.cssText =
      'position:fixed;top:46px;right:16px;font:12px/1 "Segoe UI",sans-serif;color:#9ad6c8;opacity:0.8;';
    root.appendChild(this.puzzleCount);

    this.banner = this.makeCenterText('', 'top:38%', '2rem', '#fff');
    this.banner.style.transform = 'translateX(-50%)';
    this.banner.style.textAlign = 'center';
    this.banner.style.opacity = '0';
    this.banner.style.fontWeight = '300';
    this.banner.style.letterSpacing = '0.12em';
    this.banner.style.textShadow = '0 0 28px rgba(180,142,232,0.8)';

    this.setupBar = this.buildSetupBar();
    root.appendChild(this.setupBar);
  }

  private makeCenterText(text: string, posCss: string, size: string, color: string): HTMLDivElement {
    const el = document.createElement('div');
    el.textContent = text;
    el.style.cssText = [
      'position:fixed',
      'left:50%',
      'transform:translateX(-50%)',
      posCss,
      `font:300 ${size}/1.4 "Segoe UI",system-ui,sans-serif`,
      `color:${color}`,
      'pointer-events:none',
      'transition:opacity 0.6s ease',
      'text-shadow:0 1px 4px rgba(0,0,0,0.8)',
    ].join(';');
    this.root.appendChild(el);
    return el;
  }

  // ── Setup bar (Connect Muse / Manual Mode) ──
  onConnectMuse?: () => void;
  onManualMode?: () => void;
  onConnectPolar?: () => Promise<boolean>;

  private buildSetupBar(): HTMLDivElement {
    const bar = document.createElement('div');
    bar.className = 'interactive';
    bar.style.cssText = [
      'position:fixed',
      'left:50%',
      'bottom:40px',
      'transform:translateX(-50%)',
      'display:flex',
      'gap:14px',
      'pointer-events:auto',
      'z-index:15',
    ].join(';');

    const mkBtn = (label: string, primary: boolean) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.cssText = [
        'padding:10px 18px',
        'border-radius:24px',
        'border:1px solid rgba(180,142,232,0.5)',
        `background:${primary ? 'rgba(180,142,232,0.22)' : 'rgba(20,12,34,0.6)'}`,
        'color:#e8e0f0',
        'font:300 0.95rem "Segoe UI",sans-serif',
        'letter-spacing:0.05em',
        'cursor:pointer',
        'backdrop-filter:blur(4px)',
      ].join(';');
      return b;
    };

    const connect = mkBtn('Connect Muse', true);
    const manual = mkBtn('Enter in Manual Mode', false);
    // Polar H10 is optional and pairs alongside either path (adds heart
    // coherence); clicking it connects but does not enter the Field.
    const polar = mkBtn('+ Polar H10  ❤', false);
    connect.addEventListener('click', () => this.onConnectMuse?.());
    manual.addEventListener('click', () => this.onManualMode?.());
    polar.addEventListener('click', async () => {
      if (!this.onConnectPolar) return;
      polar.textContent = 'Pairing…';
      polar.disabled = true;
      const ok = await this.onConnectPolar();
      polar.textContent = ok ? 'Polar H10  ✓' : '+ Polar H10  ❤';
      polar.disabled = false;
    });
    bar.append(connect, manual, polar);
    return bar;
  }

  hideSetupBar(): void {
    this.setupBar.style.display = 'none';
  }
  showSetupBar(): void {
    this.setupBar.style.display = 'flex';
  }

  setRegime(regime: 'GUT' | 'HEART' | 'HEAD'): void {
    this.arc.setRegime(regime);
  }

  speak(line: string): void {
    this.subtitle.textContent = line;
    this.subtitle.style.opacity = '1';
    this.subtitleTimer = 7; // seconds visible
  }

  showCompletion(levelName: string): void {
    this.banner.innerHTML = `<div>The node is restored</div><div style="font-size:1rem;opacity:0.7;margin-top:0.5rem">${levelName}</div>`;
    this.banner.style.opacity = '1';
  }

  update(dt: number, state: HUDState): void {
    this.mandala.update(state.coherence, state.meditationProgress);
    this.arc.setActive(state.freqIndex);
    this.arc.update(dt);
    this.status.update(state.connected, state.quality, state.calibrating);
    this.status.updateHeart(state.heartConnected, state.heartCoherence, state.bpm);

    this.puzzleCount.textContent = `Resonance locks: ${state.puzzlesSolved}/${state.puzzleTotal}`;

    // Meditation prompt fades in near the meditation space.
    this.prompt.textContent = 'Enter Meditation  ·  M';
    this.prompt.style.opacity = state.nearMeditation ? '0.9' : '0';

    if (this.subtitleTimer > 0) {
      this.subtitleTimer -= dt;
      if (this.subtitleTimer <= 0) this.subtitle.style.opacity = '0';
    }
  }
}
