/**
 * CubeMiniMap — the Lo Shu cube as orientation + progress + settle feedback
 * (Selah Tasks 4 & 5). Repurposes the aetheria432.com cube structure: the 27
 * frequencies ARE the 27 cells of a 3×3×3 magic cube — GUT the bottom layer,
 * HEART the middle, HEAD the crown, with 2178 Hz (HEART-5) as the centre and the
 * central vertical pillar 528 → 2178 → 4920 drawn bright.
 *
 * HARD LINE (Selah Task 5): the map shows WHERE you are (real geometry) and THAT
 * you've settled (current-node glow, honestly measured). It NEVER shows a
 * coherence score, attainment level, or any number claiming how deep you got.
 *
 * Two modes: a small always-on corner map during play, and a large rotatable-feel
 * hero view between levels (click a node to travel to an unlocked level).
 */
import type { FrequencyTable } from '../core/FrequencyTable';

const SVGNS = 'http://www.w3.org/2000/svg';

// Lo Shu magic square → (col,row), row 0 at top:  6 1 8 / 7 5 3 / 2 9 4
const POS_CELL: Record<number, [number, number]> = {
  1: [1, 0], 2: [0, 2], 3: [2, 1], 4: [2, 2], 5: [1, 1],
  6: [0, 0], 7: [0, 1], 8: [2, 0], 9: [1, 2],
};
const REGIME_LAYER: Record<string, number> = { GUT: 0, HEART: 1, HEAD: 2 };
const REGIME_COLOR: Record<string, string> = { GUT: '#ff5a3c', HEART: '#56c878', HEAD: '#b48ee8' };

// Isometric projection constants (viewBox 0..160 x 0..220).
const UX = 17, UY = 9, LZ = 40, OX = 80, OY = 150;

interface NodePos {
  index: number;
  x: number;
  y: number;
  regime: string;
  isSource: boolean;
  isPillar: boolean; // position 5 of each layer (central vertical axis)
}

export class CubeMiniMap {
  readonly el: HTMLDivElement;
  private svg: SVGSVGElement;
  private circles: SVGCircleElement[] = [];
  private nodes: NodePos[] = [];
  private mode: 'corner' | 'hero' = 'corner';
  private bloomIndex = -1;
  private bloomT = 0;
  private currentIndex = 0;
  private completed = new Set<number>();
  private unlocked = new Set<number>();
  private settledness = 0;
  private updateAccum = 0; // throttle the costly SVG-filter repaint

  onSelectNode?: (index: number) => void;

  constructor(private freqTable: FrequencyTable) {
    this.el = document.createElement('div');
    this.el.style.cssText = [
      'position:fixed',
      'top:14px',
      'left:14px',
      'z-index:12',
      'transition:all 0.4s ease',
      'pointer-events:none',
    ].join(';');

    this.svg = document.createElementNS(SVGNS, 'svg');
    this.svg.setAttribute('viewBox', '0 0 160 220');
    this.el.appendChild(this.svg);

    this.computeNodes();
    this.drawEdges();
    this.drawNodes();
    this.applyMode();
  }

  private computeNodes(): void {
    for (let i = 0; i < 27; i++) {
      const e = this.freqTable.get(i);
      const layer = REGIME_LAYER[e.regime] ?? 0;
      const [col, row] = POS_CELL[e.regime_position] ?? [1, 1];
      const x = OX + (col - row) * UX;
      const y = OY + (col + row) * UY - layer * LZ;
      this.nodes.push({
        index: i,
        x,
        y,
        regime: e.regime,
        isSource: !!e.is_source,
        isPillar: e.regime_position === 5,
      });
    }
  }

  private line(a: NodePos, b: NodePos, stroke: string, width: number, opacity: number): void {
    const l = document.createElementNS(SVGNS, 'line');
    l.setAttribute('x1', String(a.x));
    l.setAttribute('y1', String(a.y));
    l.setAttribute('x2', String(b.x));
    l.setAttribute('y2', String(b.y));
    l.setAttribute('stroke', stroke);
    l.setAttribute('stroke-width', String(width));
    l.setAttribute('opacity', String(opacity));
    this.svg.appendChild(l);
  }

  private drawEdges(): void {
    // Cube wireframe through the four corner cells (positions 6,8,4,2) of each
    // layer, plus vertical corner edges between layers.
    const corners = [6, 8, 4, 2];
    const byLayerPos = (layer: number, pos: number) =>
      this.nodes.find((n) => REGIME_LAYER[n.regime] === layer && this.freqTable.get(n.index).regime_position === pos)!;

    for (let layer = 0; layer < 3; layer++) {
      for (let c = 0; c < 4; c++) {
        const a = byLayerPos(layer, corners[c]);
        const b = byLayerPos(layer, corners[(c + 1) % 4]);
        if (a && b) this.line(a, b, '#6a5a8a', 0.6, 0.35);
      }
    }
    for (const pos of corners) {
      for (let layer = 0; layer < 2; layer++) {
        const a = byLayerPos(layer, pos);
        const b = byLayerPos(layer + 1, pos);
        if (a && b) this.line(a, b, '#6a5a8a', 0.6, 0.35);
      }
    }
    // Central vertical pillar 528 → 2178 → 4920 (positions 5), drawn bright.
    for (let layer = 0; layer < 2; layer++) {
      const a = byLayerPos(layer, 5);
      const b = byLayerPos(layer + 1, 5);
      if (a && b) this.line(a, b, '#e8d24a', 1.4, 0.8);
    }
  }

  private drawNodes(): void {
    for (const n of this.nodes) {
      const c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', String(n.x));
      c.setAttribute('cy', String(n.y));
      c.setAttribute('r', n.isSource ? '3.4' : '2.6');
      c.setAttribute('fill', REGIME_COLOR[n.regime]);
      c.dataset.index = String(n.index);
      c.style.cursor = 'pointer';
      c.addEventListener('click', () => {
        if (this.mode === 'hero' && this.unlocked.has(n.index)) this.onSelectNode?.(n.index);
      });
      this.circles.push(c);
      this.svg.appendChild(c);
    }
  }

  setMode(mode: 'corner' | 'hero'): void {
    this.mode = mode;
    this.applyMode();
  }

  toggleHero(): void {
    this.setMode(this.mode === 'hero' ? 'corner' : 'hero');
  }

  get isHero(): boolean {
    return this.mode === 'hero';
  }

  private applyMode(): void {
    if (this.mode === 'corner') {
      this.svg.setAttribute('width', '140');
      this.svg.setAttribute('height', '192');
      this.el.style.top = '14px';
      this.el.style.left = '14px';
      this.el.style.transform = 'none';
      this.el.style.pointerEvents = 'none';
      this.el.style.background = 'none';
      this.el.style.padding = '0';
    } else {
      this.svg.setAttribute('width', '380');
      this.svg.setAttribute('height', '520');
      this.el.style.top = '50%';
      this.el.style.left = '50%';
      this.el.style.transform = 'translate(-50%,-50%)';
      this.el.style.pointerEvents = 'auto';
      this.el.style.background = 'radial-gradient(circle, rgba(20,12,34,0.85), rgba(8,5,16,0.95))';
      this.el.style.padding = '12px';
      this.el.style.borderRadius = '16px';
    }
  }

  setProgress(currentIndex: number, completed: Set<number>, unlocked: Set<number>): void {
    this.currentIndex = currentIndex;
    this.completed = completed;
    this.unlocked = unlocked;
  }

  /** Fire when a level completes: bloom the node, then it joins the lit path. */
  bloom(index: number): void {
    this.bloomIndex = index;
    this.bloomT = 0;
  }

  /** settledness 0..1 drives only the CURRENT node's glow — never a number. */
  update(dt: number, settledness: number): void {
    this.settledness = settledness;
    if (this.bloomIndex >= 0) {
      this.bloomT += dt;
      if (this.bloomT > 1.2) this.bloomIndex = -1;
    }

    // Repainting 27 SVG drop-shadow filters every frame is expensive (it can
    // stall weaker GPUs, especially in the large hero view). The glow only
    // breathes slowly, so ~20 Hz is plenty; run full-rate only during a bloom.
    this.updateAccum += dt;
    if (this.updateAccum < 0.05 && this.bloomIndex < 0) return;
    this.updateAccum = 0;

    for (const n of this.nodes) {
      const c = this.circles[n.index];
      const isCurrent = n.index === this.currentIndex;
      const done = this.completed.has(n.index);
      const open = this.unlocked.has(n.index);

      let r = n.isSource ? 3.4 : 2.6;
      let opacity = open ? 0.95 : 0.28; // locked nodes are dim
      let glow = 0;

      if (isCurrent) {
        // Current node breathes brighter as the player settles (Task 4).
        const s = 0.3 + 0.7 * this.settledness;
        r += 1.6 * s;
        glow = 4 + 8 * s;
        opacity = 1;
      } else if (done) {
        opacity = 1; // path-behind lit
        glow = 2;
      }

      // Bloom pulse on advance.
      if (n.index === this.bloomIndex) {
        const p = Math.sin((this.bloomT / 1.2) * Math.PI);
        r += 4 * p;
        glow += 14 * p;
      }

      c.setAttribute('r', r.toFixed(2));
      c.setAttribute('opacity', opacity.toFixed(2));
      c.style.filter = glow > 0 ? `drop-shadow(0 0 ${glow.toFixed(1)}px ${REGIME_COLOR[n.regime]})` : 'none';
    }
  }
}
