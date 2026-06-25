/**
 * CoherenceMandala — the primary HUD element (Section 9.1). Bottom-center SVG.
 * At 0% a dim circle; as coherence rises, geometric petals unfold and glow; at
 * 100% a fully manifested Flower of Life. Doubles as the meditation-progress
 * ring. No rectangular bars anywhere in this UI.
 */
const SVGNS = 'http://www.w3.org/2000/svg';

export class CoherenceMandala {
  readonly el: SVGSVGElement;
  private petals: SVGCircleElement[] = [];
  private core: SVGCircleElement;
  private progressRing: SVGCircleElement;
  private readonly ringCirc: number;
  private readonly R = 46;

  constructor() {
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', '0 0 140 140');
    svg.setAttribute('width', '150');
    svg.setAttribute('height', '150');
    svg.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);overflow:visible;';
    this.el = svg;

    const cx = 70;
    const cy = 70;
    const r = 22;

    // Flower-of-Life: central circle + 6 around (the Seed of Life).
    const centers: [number, number][] = [[cx, cy]];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      centers.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    for (const [x, y] of centers) {
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', String(x));
      c.setAttribute('cy', String(y));
      c.setAttribute('r', String(r));
      c.setAttribute('fill', 'none');
      c.setAttribute('stroke', '#b48ee8');
      c.setAttribute('stroke-width', '1');
      c.style.opacity = '0';
      this.petals.push(c);
      svg.appendChild(c);
    }

    // Progress ring (meditation sustain).
    this.ringCirc = 2 * Math.PI * this.R;
    this.progressRing = document.createElementNS(SVGNS, 'circle');
    this.progressRing.setAttribute('cx', String(cx));
    this.progressRing.setAttribute('cy', String(cy));
    this.progressRing.setAttribute('r', String(this.R));
    this.progressRing.setAttribute('fill', 'none');
    this.progressRing.setAttribute('stroke', '#9ad6c8');
    this.progressRing.setAttribute('stroke-width', '2');
    this.progressRing.setAttribute('stroke-linecap', 'round');
    this.progressRing.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
    this.progressRing.style.strokeDasharray = String(this.ringCirc);
    this.progressRing.style.strokeDashoffset = String(this.ringCirc);
    svg.appendChild(this.progressRing);

    // Core dot.
    this.core = document.createElementNS(SVGNS, 'circle');
    this.core.setAttribute('cx', String(cx));
    this.core.setAttribute('cy', String(cy));
    this.core.setAttribute('r', '4');
    this.core.setAttribute('fill', '#e8e0f0');
    svg.appendChild(this.core);
  }

  /** coherence 0..1, meditationProgress 0..1. */
  update(coherence: number, meditationProgress: number): void {
    const c = Math.max(0, Math.min(1, coherence));
    // Petals unfold progressively; central first, then the ring.
    this.petals.forEach((p, i) => {
      const threshold = i === 0 ? 0 : (i - 1) / 6;
      const local = Math.max(0, Math.min(1, (c - threshold) * 3));
      p.style.opacity = String(0.15 + local * 0.85);
      p.setAttribute('stroke-width', String(0.6 + local * 1.6));
    });
    this.core.setAttribute('r', String(3 + c * 4));
    this.core.style.filter = `drop-shadow(0 0 ${2 + c * 10}px #b48ee8)`;

    // Meditation progress ring.
    this.progressRing.style.strokeDashoffset = String(this.ringCirc * (1 - Math.max(0, Math.min(1, meditationProgress))));
    this.progressRing.style.opacity = meditationProgress > 0.001 ? '1' : '0.15';
  }
}
