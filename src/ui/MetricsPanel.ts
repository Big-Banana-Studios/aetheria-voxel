/**
 * MetricsPanel — the "Session Metrics" analysis view (Selah's honest Data mode).
 *
 * Shows every tracked Muse S Athena (+ Polar) signal as last / mean / min / max
 * with a sparkline of the session. Raw measured signals only — no attainment
 * score, no brain-state claim. Opened from pause, on level complete, or with V.
 *
 * Canonical styling: dark ground, JetBrains Mono for the numbers.
 */
import { METRIC_DEFS, type MetricsTracker } from '../core/MetricsTracker';

const SVGNS = 'http://www.w3.org/2000/svg';

export class MetricsPanel {
  readonly el: HTMLDivElement;
  private body: HTMLDivElement;
  private titleEl: HTMLDivElement;
  private visible = false;
  onClose?: () => void;
  onExport?: () => void;

  constructor(root: HTMLElement) {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:42', 'display:none',
      'align-items:center', 'justify-content:center',
      'background:radial-gradient(circle at center, rgba(14,9,22,0.92), rgba(6,4,12,0.97))',
      'pointer-events:auto', 'color:#e8e0f0', 'font-family:"Segoe UI",system-ui,sans-serif',
    ].join(';');

    const panel = document.createElement('div');
    panel.style.cssText = 'width:min(760px,92vw);max-height:88vh;display:flex;flex-direction:column;';

    this.titleEl = document.createElement('div');
    this.titleEl.style.cssText = 'font-weight:300;letter-spacing:0.14em;font-size:1.4rem;text-align:center;margin-bottom:0.2rem;';
    this.titleEl.textContent = 'Session Metrics';
    const sub = document.createElement('div');
    sub.style.cssText = 'text-align:center;opacity:0.55;font-size:0.82rem;margin-bottom:1rem;';
    sub.textContent = 'Measured signals — not a score. The geometry is proven; an effect on you is not claimed.';

    this.body = document.createElement('div');
    this.body.style.cssText = 'overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;padding-right:6px;';

    const tools = document.createElement('div');
    tools.style.cssText = 'display:flex;gap:10px;justify-content:center;margin-top:14px;';
    const exp = this.btn('Export Session JSON');
    exp.onclick = () => this.onExport?.();
    const close = this.btn('Close', true);
    close.onclick = () => { this.hide(); this.onClose?.(); };
    tools.append(exp, close);

    panel.append(this.titleEl, sub, this.body, tools);
    this.el.appendChild(panel);
    root.appendChild(this.el);
  }

  private btn(label: string, primary = false): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = [
      'padding:9px 18px', 'border-radius:22px', 'border:1px solid rgba(180,142,232,0.5)',
      `background:${primary ? 'rgba(180,142,232,0.22)' : 'rgba(20,12,34,0.6)'}`,
      'color:#e8e0f0', 'font:300 0.92rem "Segoe UI",sans-serif', 'cursor:pointer',
    ].join(';');
    return b;
  }

  private sparkline(series: (number | null)[], color: string): SVGSVGElement {
    const w = 120, h = 26;
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const pts = series.filter((v): v is number => v != null);
    if (pts.length >= 2) {
      let min = Math.min(...pts), max = Math.max(...pts);
      if (max - min < 1e-9) { max = min + 1; }
      const n = series.length;
      let d = '';
      let started = false;
      series.forEach((v, i) => {
        if (v == null) return;
        const x = (i / (n - 1)) * (w - 2) + 1;
        const y = h - 2 - ((v - min) / (max - min)) * (h - 4);
        d += `${started ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
        started = true;
      });
      const path = document.createElementNS(SVGNS, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '1.3');
      path.setAttribute('opacity', '0.9');
      svg.appendChild(path);
    } else {
      const t = document.createElementNS(SVGNS, 'text');
      t.setAttribute('x', '2'); t.setAttribute('y', '17');
      t.setAttribute('fill', '#6a6478'); t.setAttribute('font-size', '9');
      t.textContent = 'no signal';
      svg.appendChild(t);
    }
    return svg;
  }

  render(tracker: MetricsTracker): void {
    this.titleEl.textContent = tracker.levelName ? `Session Metrics · ${tracker.levelName}` : 'Session Metrics';
    this.body.innerHTML = '';
    for (const def of METRIC_DEFS) {
      const s = tracker.summary(def.key);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:5px 0;border-bottom:1px solid rgba(120,100,160,0.12);';

      const txt = document.createElement('div');
      txt.style.cssText = 'flex:1;min-width:0;';
      const fmt = (v: number | null) => (v == null ? '—' : v.toFixed(def.decimals));
      txt.innerHTML =
        `<div style="font-size:0.82rem;opacity:0.85">${def.label}</div>` +
        `<div style="font-family:ui-monospace,Consolas,monospace;font-size:0.74rem;opacity:0.6">` +
        `now ${fmt(s.last)}${def.unit} · avg ${fmt(s.mean)} · ${fmt(s.min)}–${fmt(s.max)}</div>`;

      row.append(txt, this.sparkline(tracker.getSeries(def.key), def.color));
      this.body.appendChild(row);
    }
  }

  show(tracker: MetricsTracker): void {
    this.render(tracker);
    this.visible = true;
    this.el.style.display = 'flex';
  }
  hide(): void {
    this.visible = false;
    this.el.style.display = 'none';
  }
  get isVisible(): boolean {
    return this.visible;
  }
}
