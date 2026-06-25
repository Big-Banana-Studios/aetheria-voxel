/**
 * EEGDebugOverlay — live tuning HUD (dev). Toggle with the backtick (`) key.
 *
 * Unlike the player-facing panels, this shows the ACTUAL gate components live so
 * the device tuning loop is data-driven: the fused settle signal + which source
 * produced it, the level thresholds/timers, raw Polar (HR/RMSSD/baseline) and
 * Muse (PLV/stillness/bands/quality) values, and the resolved audio (true/felt/
 * sub-bass) frequencies. Fed a snapshot from Game each frame.
 */

export interface TuningSnapshot {
  source: 'muse' | 'manual';
  settleSource: 'hrv' | 'stillness' | 'behaviour';
  settle: number; // fused gate value 0..1
  threshold: number;
  sustain: number;
  sustainReq: number;
  dwell: number;
  maxDwell: number;
  inMeditation: boolean;
  gateProgress: number;
  puzzlesSolved: number;
  puzzleTotal: number;
  // Polar
  polarConnected: boolean;
  hr: number;
  rmssd: number | null;
  rmssdBaseline: number | null;
  hrvSettle: number;
  // Muse
  museConnected: boolean;
  quality: { tp9: number; af7: number; af8: number; tp10: number };
  plv: number;
  stillness: number;
  thetaAlpha: number;
  betaGamma: number;
  bands: { delta: number; theta: number; alpha: number; beta: number; gamma: number };
  hbo: number | null;
  hbr: number | null;
  battery: number | null;
  // Audio / frequency
  freqIndex: number;
  regimePos: string;
  trueHz: number;
  feltHz: number;
  subHz: number;
  subBand: string;
}

export class EEGDebugOverlay {
  private el: HTMLDivElement;
  private visible = false;

  constructor(parent: HTMLElement) {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed', 'top:8px', 'left:168px', 'z-index:50',
      'font:11px/1.45 ui-monospace,Consolas,monospace', 'color:#9ad6c8',
      'background:rgba(8,5,16,0.85)', 'border:1px solid rgba(154,214,200,0.25)',
      'border-radius:6px', 'padding:8px 10px', 'min-width:260px',
      'pointer-events:none', 'white-space:pre', 'display:none',
    ].join(';');
    parent.appendChild(this.el);
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Backquote') this.toggle();
    });
  }

  toggle(): void {
    this.visible = !this.visible;
    this.el.style.display = this.visible ? 'block' : 'none';
  }

  update(s: TuningSnapshot): void {
    if (!this.visible) return;
    const bar = (v: number, w = 10) => {
      const n = Math.round(Math.max(0, Math.min(1, v)) * w);
      return '█'.repeat(n) + '·'.repeat(w - n);
    };
    const f = (v: number | null, d = 2) => (v == null ? '—' : v.toFixed(d));

    this.el.textContent = [
      `AETHERIA TUNING HUD            (\` hide)`,
      ``,
      `GATE  ${bar(s.settle)} ${(s.settle * 100).toFixed(0)}%  via ${s.settleSource}`,
      `  threshold ${s.threshold.toFixed(2)}  ${s.settle >= s.threshold ? 'OPEN' : 'below'}`,
      `  meditate  ${s.inMeditation ? 'IN ' : 'out'}  sustain ${s.sustain.toFixed(1)}/${s.sustainReq}s`,
      `  dwell ${s.dwell.toFixed(0)}/${s.maxDwell}s  gate ${(s.gateProgress * 100).toFixed(0)}%  locks ${s.puzzlesSolved}/${s.puzzleTotal}`,
      ``,
      `POLAR ${s.polarConnected ? 'on ' : 'off'}  hr ${f(s.hr, 0)} bpm`,
      `  rmssd ${f(s.rmssd, 0)} / base ${f(s.rmssdBaseline, 0)} ms  settle ${f(s.hrvSettle)}`,
      ``,
      `MUSE  ${s.museConnected ? 'on ' : 'off'}  q ${(s.quality.tp9).toFixed(1)} ${(s.quality.af7).toFixed(1)} ${(s.quality.af8).toFixed(1)} ${(s.quality.tp10).toFixed(1)}`,
      `  still ${f(s.stillness)}  plv ${f(s.plv)}  θ/α ${f(s.thetaAlpha)}  β/γ ${f(s.betaGamma)}`,
      `  δ${f(s.bands.delta)} θ${f(s.bands.theta)} α${f(s.bands.alpha)} β${f(s.bands.beta)} γ${f(s.bands.gamma)}`,
      `  fNIRS HbO ${f(s.hbo, 1)} HbR ${f(s.hbr, 1)}  batt ${f(s.battery, 0)}%`,
      ``,
      `FREQ #${s.freqIndex} ${s.regimePos}  true ${s.trueHz.toFixed(0)}Hz`,
      `  felt ${s.feltHz.toFixed(1)}Hz  sub ${s.subHz.toFixed(2)}Hz ${s.subBand}`,
    ].join('\n');
  }
}
