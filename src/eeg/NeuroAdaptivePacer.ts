/**
 * NeuroAdaptivePacer — the honest neuro-adaptive fusion that paces the adaptive
 * CABI walk (the 110-step closed circuit).
 *
 * Given whatever sensors the player brings — Muse S Athena (EEG bands + fNIRS +
 * accelerometer stillness) and/or a Polar H10 (HRV) — INDIVIDUALLY OR IN TANDEM —
 * it fuses the ones that are actually live into a single "settle readiness" 0..1.
 * That readiness paces how CABI advances: settle (brain + body easing, relative to
 * your own baseline) and the node's dose completes sooner; struggle and it takes
 * longer, always ceiling-guaranteed (never a wall).
 *
 * HONEST-CLAIMS (Selah, [[honest-claims-rule]]):
 *  - Every component is RELATIVE TO THE PLAYER'S OWN BASELINE, never absolute.
 *  - Readiness drives PACING/geometry only. It is never shown as a score, a
 *    coherence %, or a claim about how "deep" the player got.
 *  - Graceful degradation: with no sensor it falls back to behaviour + the level
 *    ceiling, so the walk still completes.
 *  - Everything is logged in parallel (fusion is a data question, not a guess);
 *    fNIRS is surfaced/logged but kept out of the gate (its calming direction is
 *    not settled science) — HRV, stillness and the EEG relaxation index (well-
 *    established relaxation correlates) do the pacing.
 *
 * The fusion weights available components and renormalises over whichever are
 * present, so one sensor, the other, both, or none all produce a coherent signal.
 */

export interface NeuroInputs {
  // Polar HRV (already baseline-relative in PolarClient).
  polarConnected: boolean;
  polarHasBaseline: boolean;
  hrvSettledness: number; // 0..1

  // Muse accelerometer stillness (already baseline-relative in StillnessIndex).
  museConnected: boolean;
  museHasStillness: boolean;
  stillness: number; // 0..1

  // Muse EEG relative band powers (fractions of total), + contact quality.
  bands: { alphaRel: number; thetaRel: number; betaRel: number; gammaRel: number } | null;
  eegQuality: number; // 0..1 mean frontal contact quality

  // Muse fNIRS (logged only — not gated).
  hbo: number | null;

  // Universal behaviour fallback (stillness + meditation posture), always present.
  behaviourSettle: number; // 0..1
}

export interface NeuroReadout {
  readiness: number; // 0..1 fused settle readiness (drives CABI pacing)
  components: { hrv: number | null; stillness: number | null; eeg: number | null; behaviour: number };
  sources: string[]; // which sensors actually contributed this tick
  eegRelaxation: number | null; // the baseline-relative EEG relaxation index (logged)
}

// Baseline is a slow EMA so a sustained rise over seconds registers as "above
// your baseline" while long-term drift is still tracked. Nodes are short, so
// within a node the baseline is effectively held.
const BASELINE_TAU = 90; // seconds
const READINESS_TAU = 2.5; // seconds — smooth the fused output
const EEG_GAIN = 2.2; // maps the relaxation-index rise into 0..1
const EEG_MIN_QUALITY = 0.25; // below this, EEG contact is too poor to gate on

// Component weights (renormalised over whichever are present each tick).
const W_HRV = 1.0; // autonomic calming — the strongest single settle signal
const W_STILL = 0.6; // bodily stillness
const W_EEG = 0.8; // cortical relaxation (alpha/theta rise vs beta/gamma)
const W_BEHAV = 0.35; // universal floor

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export class NeuroAdaptivePacer {
  private eegBaseline: number | null = null; // frozen EEG relaxation-index baseline
  private readiness = 0;
  private started = false;

  // Tone-free baseline capture (Selah's calibration guide, TASK 2): the baseline
  // must be measured with tones OFF, or it is already an intervention state. While
  // capturing we accumulate the resting relaxation index and DON'T let EEG gate.
  private capturing = false;
  private capSum = 0;
  private capN = 0;

  /** Full reset (call when the adaptive CABI walk begins, before baseline). */
  reset(): void {
    this.eegBaseline = null;
    this.readiness = 0;
    this.started = false;
    this.capturing = false;
    this.capSum = 0;
    this.capN = 0;
  }

  /** Begin the tone-free baseline window — accumulate the resting EEG relaxation
   *  index (tones must be silent while this runs). */
  beginBaseline(): void {
    this.capturing = true;
    this.capSum = 0;
    this.capN = 0;
    this.eegBaseline = null;
  }

  /** End the baseline window — freeze the captured resting baseline. Adaptive
   *  pacing (relative to this baseline) starts now; tones resume. */
  endBaseline(): void {
    this.capturing = false;
    if (this.capN > 0) this.eegBaseline = this.capSum / this.capN;
  }

  get isCapturingBaseline(): boolean {
    return this.capturing;
  }

  /** Fuse the live sensors into a settle readiness. Call once per frame. */
  update(dt: number, inp: NeuroInputs): NeuroReadout {
    const sources: string[] = [];
    const parts: { w: number; v: number }[] = [];
    const components: NeuroReadout['components'] = { hrv: null, stillness: null, eeg: null, behaviour: inp.behaviourSettle };

    // 1. HRV settledness (Polar) — needs a captured baseline to be meaningful.
    if (inp.polarConnected && inp.polarHasBaseline) {
      const v = clamp01(inp.hrvSettledness);
      components.hrv = v;
      parts.push({ w: W_HRV, v });
      sources.push('hrv');
    }

    // 2. Bodily stillness (Muse accelerometer).
    if (inp.museConnected && inp.museHasStillness) {
      const v = clamp01(inp.stillness);
      components.stillness = v;
      parts.push({ w: W_STILL, v });
      sources.push('stillness');
    }

    // 3. EEG relaxation index (Muse), relative to the player's own slow baseline.
    //    calmRaw rises when slow rhythms (alpha+theta) grow relative to fast ones
    //    (beta+gamma) — the classic relaxation signature. Only gated when contact
    //    quality is adequate; always computed for logging.
    let eegRelaxation: number | null = null;
    if (inp.bands) {
      const calmRaw = inp.bands.alphaRel + inp.bands.thetaRel - (inp.bands.betaRel + inp.bands.gammaRel);
      if (this.capturing) {
        // Tone-free baseline window: accumulate the resting index; do NOT gate on
        // EEG yet (we are still measuring what "rest" is for this player).
        if (inp.museConnected && inp.eegQuality >= EEG_MIN_QUALITY) { this.capSum += calmRaw; this.capN++; }
        this.eegBaseline = this.capN > 0 ? this.capSum / this.capN : calmRaw;
      } else {
        // Gate against the FROZEN tone-free baseline. If none was captured (no
        // EEG during the window), fall back to a slow self-baseline so a lone
        // sensor still works.
        if (this.eegBaseline == null) this.eegBaseline = calmRaw;
        else this.eegBaseline += (calmRaw - this.eegBaseline) * Math.min(1, dt / BASELINE_TAU) * 0.15;
        eegRelaxation = clamp01(0.5 + (calmRaw - this.eegBaseline) * EEG_GAIN);
        if (inp.museConnected && inp.eegQuality >= EEG_MIN_QUALITY) {
          components.eeg = eegRelaxation;
          parts.push({ w: W_EEG, v: eegRelaxation });
          sources.push('eeg');
        }
      }
    }

    // 4. Behaviour floor — always present so there is never a dead signal.
    parts.push({ w: W_BEHAV, v: clamp01(inp.behaviourSettle) });
    if (sources.length === 0) sources.push('behaviour');

    // Weighted fusion, renormalised over whichever components are present.
    let wSum = 0;
    let acc = 0;
    for (const p of parts) { wSum += p.w; acc += p.w * p.v; }
    const fused = wSum > 0 ? acc / wSum : clamp01(inp.behaviourSettle);

    // Smooth to avoid jitter driving the gate.
    if (!this.started) { this.readiness = fused; this.started = true; }
    else this.readiness += (fused - this.readiness) * Math.min(1, dt / READINESS_TAU);

    return { readiness: clamp01(this.readiness), components, sources, eegRelaxation };
  }

  get value(): number {
    return clamp01(this.readiness);
  }
}
