/**
 * EEGDebugOverlay — dev HUD (Phase 3): band powers, coherence, prescribed
 * frequency, per-electrode quality. Toggle with the backtick (`) key. Hidden by
 * default; this is a development aid, not part of the player-facing HUD.
 */
import type { CoherenceSource } from './types';
import type { FrequencyTable } from '../core/FrequencyTable';

export class EEGDebugOverlay {
  private el: HTMLDivElement;
  private visible = false;

  constructor(
    parent: HTMLElement,
    private source: () => CoherenceSource,
    private freqTable: FrequencyTable,
  ) {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed',
      'top:8px',
      'left:8px',
      'z-index:50',
      'font:11px/1.4 ui-monospace,Consolas,monospace',
      'color:#9ad6c8',
      'background:rgba(8,5,16,0.82)',
      'border:1px solid rgba(154,214,200,0.25)',
      'border-radius:6px',
      'padding:8px 10px',
      'min-width:220px',
      'pointer-events:none',
      'white-space:pre',
      'display:none',
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

  update(): void {
    if (!this.visible) return;
    const s = this.source();
    const b = s.getBandPowers();
    const idx = s.getPrescribedFrequencyIndex();
    const entry = this.freqTable.get(idx);
    const hz = this.freqTable.hz(idx);
    const bar = (v: number, w = 12) => {
      const n = Math.round(Math.max(0, Math.min(1, v)) * w);
      return '█'.repeat(n) + '·'.repeat(w - n);
    };

    this.el.textContent = [
      `AETHERIA EEG DEBUG  (\` to hide)`,
      `source     : ${s.isConnected ? 'MUSE' : 'MANUAL/SIM'}`,
      `quality    : ${(s.connectionQuality * 100).toFixed(0)}%`,
      ``,
      `coherence  : ${bar(s.getCoherenceScore())} ${(s.getCoherenceScore() * 100).toFixed(0)}%`,
      ``,
      `delta rel  : ${bar(b.deltaRel)} ${b.deltaRel.toFixed(2)}`,
      `theta rel  : ${bar(b.thetaRel)} ${b.thetaRel.toFixed(2)}`,
      `alpha rel  : ${bar(b.alphaRel)} ${b.alphaRel.toFixed(2)}`,
      `beta  rel  : ${bar(b.betaRel)} ${b.betaRel.toFixed(2)}`,
      `gamma rel  : ${bar(b.gammaRel)} ${b.gammaRel.toFixed(2)}`,
      ``,
      `θ/α (relax): ${b.thetaAlphaRatio.toFixed(2)}`,
      `β/γ (focus): ${b.betaGammaRatio.toFixed(2)}`,
      ``,
      `prescribed : #${idx} ${entry.regime}-${entry.regime_position}`,
      `frequency  : ${hz > 0 ? hz.toFixed(2) + ' Hz' : '— (placeholder)'}`,
      `level      : ${entry.level_name}`,
    ].join('\n');
  }
}
