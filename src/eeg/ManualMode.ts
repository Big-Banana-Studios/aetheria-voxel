/**
 * ManualMode — first-class no-headset experience (Section 5.4).
 *
 * Coherence is simulated from behaviour: stillness (especially in meditation)
 * raises it; movement lowers it. The player selects frequencies with a radial
 * menu (the gameplay layer calls selectFrequency). All reactive visuals/audio
 * run exactly as they do under EEG, because ManualMode is a CoherenceSource like
 * MuseClient — levels never branch on which is active.
 *
 * This is NEVER a degraded fallback; it is a complete path through all 27 levels.
 */
import {
  type BandPowerResult,
  type CoherenceSource,
  type EEGEvent,
  emptyBandPower,
} from './types';

type Listener = (payload?: unknown) => void;

export class ManualMode implements CoherenceSource {
  private coherence = 0.15;
  private regimeBase = 0;
  private selectedOffset = 0;
  private listeners = new Map<EEGEvent, Listener[]>();
  private bands = emptyBandPower();

  readonly isConnected = false;
  readonly connectionQuality = 1; // not applicable; report "fine" so HUD is calm

  setRegime(regime: 0 | 1 | 2): void {
    this.regimeBase = regime * 9;
  }

  /** Player chooses a frequency offset 0..8 from the radial menu. */
  selectFrequency(offset: number): void {
    const clamped = Math.max(0, Math.min(8, Math.round(offset)));
    if (clamped !== this.selectedOffset) {
      this.selectedOffset = clamped;
      this.emit('frequencyChanged', this.getPrescribedFrequencyIndex());
    }
  }

  /**
   * Advance the simulated coherence from behaviour.
   * @param moving      is the player translating through the world?
   * @param meditating  is the player in meditation stance / a meditation space?
   */
  update(dt: number, moving: boolean, meditating: boolean): void {
    // Target coherence: high when meditating & still, gentle when simply walking.
    // Movement lowers coherence but never punishingly — Manual Mode is a full
    // path, never a fail state (Section 5.4 / 14.2), so a deliberate walk across
    // a coherence-gated bridge still succeeds.
    let target: number;
    if (meditating && !moving) target = 0.92;
    else if (!moving) target = 0.6;
    else target = 0.42;

    // Rise slowly (earned), fall a little faster (honest).
    const rate = target > this.coherence ? 0.18 : 0.45;
    const prev = this.coherence;
    this.coherence += (target - this.coherence) * Math.min(1, dt * rate);

    // Synthesize plausible band ratios so visuals/audio tied to bands still move.
    const c = this.coherence;
    this.bands = {
      ...emptyBandPower(),
      alphaRel: 0.2 + 0.4 * c,
      thetaRel: 0.15 + 0.3 * c,
      betaRel: 0.4 * (1 - c),
      gammaRel: 0.1 * (1 - c),
      deltaRel: 0.1,
      thetaAlphaRatio: 0.5 + c,
      betaGammaRatio: 1.0,
      overallCoherence: c,
    };

    if (Math.abs(c - prev) > 0.001) this.emit('coherenceChanged', c);
    this.emit('eegData', this.bands);
  }

  getCoherenceScore(): number {
    return this.coherence;
  }
  getBandPowers(): BandPowerResult {
    return this.bands;
  }
  getPrescribedFrequencyIndex(): number {
    return this.regimeBase + this.selectedOffset;
  }
  getPrescribedFrequencyHz(): number {
    return 0; // resolved by the level via the frequency table
  }

  on(event: EEGEvent, cb: Listener): void {
    const arr = this.listeners.get(event) ?? [];
    arr.push(cb);
    this.listeners.set(event, arr);
  }
  private emit(event: EEGEvent, payload?: unknown): void {
    for (const cb of this.listeners.get(event) ?? []) cb(payload);
  }
}
