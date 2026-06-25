/**
 * BreathingGuide — a calm, optional breathing pacer (Section 9 / 14, gentle by
 * design). It appears while the player is working a resonance lock (or settling
 * at the gate) and paces the breath that raises HRV above the resting baseline —
 * the body settling, which charges the locks and opens the gate.
 *
 * The pattern corresponds to the regime of the crystals you're resonating with:
 *   GUT   — grounding breath, a long slow exhale (in 4 · out 6)
 *   HEART — resonance breath, the balanced ~5.5/min coherent pace (in 5.5 · out 5.5)
 *   HEAD  — even "box" breath for clarity (in 4 · hold 4 · out 4 · hold 4)
 *
 * Honest framing: this is guidance, never a requirement and never scored. It
 * fades in softly, animates a single slow ring, and never flashes.
 */
export type Regime = 'GUT' | 'HEART' | 'HEAD';

interface Phase {
  dur: number; // seconds
  from: number; // ring fill at phase start (0..1)
  to: number; // ring fill at phase end
  label: string;
}

interface Pattern {
  name: string;
  tint: string;
  phases: Phase[]; // only non-zero-duration phases
}

const EMPTY = 0.5; // ring scale at full exhale
const FULL = 1.0; // ring scale at full inhale

function build(name: string, tint: string, inhale: number, holdIn: number, exhale: number, holdOut: number): Pattern {
  const phases: Phase[] = [];
  phases.push({ dur: inhale, from: EMPTY, to: FULL, label: 'Breathe in' });
  if (holdIn > 0) phases.push({ dur: holdIn, from: FULL, to: FULL, label: 'Hold' });
  phases.push({ dur: exhale, from: FULL, to: EMPTY, label: 'Breathe out' });
  if (holdOut > 0) phases.push({ dur: holdOut, from: EMPTY, to: EMPTY, label: 'Hold' });
  return { name, tint, phases };
}

const PATTERNS: Record<Regime, Pattern> = {
  GUT: build('Grounding breath', '#e0a06a', 4, 0, 6, 0),
  HEART: build('Resonance breath', '#e87aa0', 5.5, 0, 5.5, 0),
  HEAD: build('Even breath', '#b48ee8', 4, 4, 4, 4),
};

export class BreathingGuide {
  readonly el: HTMLDivElement;
  private ring: HTMLDivElement;
  private label: HTMLDivElement;
  private name: HTMLDivElement;
  private pattern: Pattern = PATTERNS.HEART;
  private t = 0; // seconds into the current cycle
  private opacity = 0;
  private reduceMotion = false;

  constructor(root: HTMLElement) {
    this.el = document.createElement('div');
    this.el.id = 'breathing-guide';
    this.el.style.cssText = [
      'position:fixed', 'left:50%', 'top:42%', 'transform:translate(-50%,-50%)',
      'pointer-events:none', 'z-index:14', 'opacity:0', 'transition:opacity 0.8s ease',
      'display:flex', 'flex-direction:column', 'align-items:center', 'gap:14px',
    ].join(';');

    this.ring = document.createElement('div');
    this.ring.style.cssText = [
      'width:150px', 'height:150px', 'border-radius:50%',
      'border:2px solid rgba(232,224,240,0.85)',
      'box-shadow:0 0 38px rgba(180,142,232,0.5), inset 0 0 26px rgba(180,142,232,0.35)',
      'background:radial-gradient(circle, rgba(180,142,232,0.18), rgba(180,142,232,0.02))',
    ].join(';');

    this.label = document.createElement('div');
    this.label.style.cssText = 'font:300 1.15rem "Segoe UI",system-ui,sans-serif;color:#f0eaf8;letter-spacing:0.1em;text-shadow:0 1px 6px rgba(0,0,0,0.7)';

    this.name = document.createElement('div');
    this.name.style.cssText = 'font:300 0.78rem "Segoe UI",sans-serif;color:#c8b8e0;opacity:0.7;letter-spacing:0.14em;text-transform:uppercase';

    this.el.append(this.ring, this.label, this.name);
    root.appendChild(this.el);
  }

  setRegime(regime: Regime): void {
    const p = PATTERNS[regime];
    if (p && p !== this.pattern) {
      this.pattern = p;
      this.t = 0;
      this.ring.style.borderColor = p.tint;
      this.name.textContent = p.name;
    }
  }

  setReduceMotion(v: boolean): void {
    this.reduceMotion = v;
  }

  /** Drive each frame. `active` shows/advances the guide; otherwise it fades out
   *  and resets so the next prompt always begins on a fresh inhale. */
  update(dt: number, active: boolean): void {
    const targetOpacity = active ? 1 : 0;
    this.opacity += (targetOpacity - this.opacity) * Math.min(1, dt * 3);
    this.el.style.opacity = this.opacity.toFixed(3);

    if (!active) {
      if (this.opacity < 0.04) this.t = 0; // reset once hidden
      return;
    }

    this.t += dt;
    const total = this.pattern.phases.reduce((s, p) => s + p.dur, 0);
    let tt = this.t % total;
    let phase = this.pattern.phases[0];
    for (const p of this.pattern.phases) {
      if (tt < p.dur) { phase = p; break; }
      tt -= p.dur;
    }
    const k = phase.dur > 0 ? tt / phase.dur : 1;
    const eased = 0.5 - 0.5 * Math.cos(Math.PI * k); // smooth in/out
    const fill = phase.from + (phase.to - phase.from) * eased;
    // Reduce-motion: keep the textual cue + a gentle glow, minimize the scaling.
    const scale = this.reduceMotion ? 0.92 + 0.04 * fill : fill;
    this.ring.style.transform = `scale(${scale.toFixed(3)})`;
    this.label.textContent = phase.label;
  }
}
