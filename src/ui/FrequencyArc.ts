/**
 * FrequencyArc — a subtle arc above the mandala (Section 9.1): 9 color-coded
 * nodes for the current regime; the active frequency pulses. Sits just above the
 * CoherenceMandala, bottom-center.
 */
const SVGNS = 'http://www.w3.org/2000/svg';

const REGIME_HUES: Record<string, [number, number]> = {
  // [startHue, endHue] across the 9 nodes
  GUT: [0, 40],
  HEART: [90, 160],
  HEAD: [250, 300],
};

export class FrequencyArc {
  readonly el: SVGSVGElement;
  private nodes: SVGCircleElement[] = [];
  private activeIndex = 0;
  private t = 0;

  constructor() {
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', '0 0 220 60');
    svg.setAttribute('width', '240');
    svg.setAttribute('height', '64');
    svg.style.cssText = 'position:fixed;left:50%;bottom:168px;transform:translateX(-50%);overflow:visible;';
    this.el = svg;

    for (let i = 0; i < 9; i++) {
      const a = Math.PI - (i / 8) * Math.PI; // left→right along a shallow arc
      const x = 110 + Math.cos(a) * 100;
      const y = 52 - Math.sin(a) * 30;
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', String(x));
      c.setAttribute('cy', String(y));
      c.setAttribute('r', '4');
      c.setAttribute('fill', '#444');
      this.nodes.push(c);
      svg.appendChild(c);
    }
  }

  setRegime(regime: 'GUT' | 'HEART' | 'HEAD'): void {
    const [h0, h1] = REGIME_HUES[regime] ?? REGIME_HUES.GUT;
    this.nodes.forEach((n, i) => {
      const h = h0 + ((h1 - h0) * i) / 8;
      n.dataset.hue = String(h);
      n.setAttribute('fill', `hsl(${h} 60% 45%)`);
    });
  }

  /** freqIndex is 0..26; we display the position within the regime (0..8). */
  setActive(freqIndex: number): void {
    this.activeIndex = ((freqIndex % 9) + 9) % 9;
  }

  update(dt: number): void {
    this.t += dt;
    const pulse = 0.5 + 0.5 * Math.sin(this.t * 4);
    this.nodes.forEach((n, i) => {
      const hue = n.dataset.hue ?? '0';
      if (i === this.activeIndex) {
        n.setAttribute('r', String(5 + pulse * 2.5));
        n.setAttribute('fill', `hsl(${hue} 85% ${55 + pulse * 20}%)`);
        n.style.filter = `drop-shadow(0 0 ${4 + pulse * 6}px hsl(${hue} 90% 60%))`;
      } else {
        n.setAttribute('r', '4');
        n.setAttribute('fill', `hsl(${hue} 50% 40%)`);
        n.style.filter = 'none';
      }
    });
  }
}
