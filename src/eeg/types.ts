/**
 * Shared EEG types (Section 4.2). These mirror the v1.0 UE5 structs.
 */

export interface ChannelQuality {
  tp9: number;
  af7: number;
  af8: number;
  tp10: number;
}

/** One frame of raw Muse data (4-channel montage). */
export interface EEGSample {
  tp9: number;
  af7: number;
  af8: number;
  tp10: number; // microvolts
  timestamp: number; // ms
  quality: ChannelQuality; // 0..1 per channel
}

export function isValid(s: EEGSample): boolean {
  return (
    s.quality.tp9 > 0.5 &&
    s.quality.af7 > 0.5 &&
    s.quality.af8 > 0.5 &&
    s.quality.tp10 > 0.5
  );
}

/** Output of the band-power analyzer (ported from the Coherence Lab). */
export interface BandPowerResult {
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number; // absolute (proportional) μV²/Hz
  deltaRel: number;
  thetaRel: number;
  alphaRel: number;
  betaRel: number;
  gammaRel: number; // 0..1 fractions of total
  thetaAlphaRatio: number; // relaxation index
  betaGammaRatio: number; // focus index
  overallCoherence: number; // 0..1 (filled by CoherenceCalculator)
}

export function emptyBandPower(): BandPowerResult {
  return {
    delta: 0, theta: 0, alpha: 0, beta: 0, gamma: 0,
    deltaRel: 0, thetaRel: 0, alphaRel: 0, betaRel: 0, gammaRel: 0,
    thetaAlphaRatio: 0, betaGammaRatio: 0, overallCoherence: 0,
  };
}

/**
 * A snapshot of all relevant Muse S Athena metrics for the session metrics panel.
 * These are RAW measured signals (honest-claims rule) — never an attainment score.
 */
export interface MuseMetrics {
  connected: boolean;
  quality: ChannelQuality;
  deltaRel: number;
  thetaRel: number;
  alphaRel: number;
  betaRel: number;
  gammaRel: number;
  thetaAlphaRatio: number; // relaxation index
  betaGammaRatio: number; // focus index
  plvCoherence: number; // inter-channel phase-locking (0..1)
  stillness: number; // accelerometer relative stillness (0..1)
  heartRate: number | null; // PPG bpm
  hbo: number | null; // fNIRS oxy-haemoglobin (μM)
  hbr: number | null; // fNIRS deoxy-haemoglobin (μM)
  battery: number | null; // %
}

export type EEGEvent =
  | 'eegData'
  | 'frequencyChanged'
  | 'coherenceChanged'
  | 'connected'
  | 'disconnected';

/**
 * A source of the live coherence/frequency signal that the gameplay layer
 * consumes. Both the EEG-backed MuseClient and the behaviour-driven Manual Mode
 * implement this, so levels never branch on which is active (Section 5.4 —
 * Manual Mode is first-class).
 */
export interface CoherenceSource {
  readonly isConnected: boolean;
  readonly connectionQuality: number; // 0..1
  getCoherenceScore(): number; // 0..1
  getBandPowers(): BandPowerResult;
  getPrescribedFrequencyIndex(): number; // 0..26
  getPrescribedFrequencyHz(): number;
  on(event: EEGEvent, cb: (payload?: unknown) => void): void;
}
