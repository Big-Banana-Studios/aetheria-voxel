/**
 * Ambient types for aetheria-signal.js (Selah's calibration & provenance module).
 * The JS attaches window.AetheriaSignal as a side effect of importing it.
 */

export interface CalibrationResult {
  passed: boolean;
  calibVersion: string;
  thresholds: Record<string, number>;
  metrics: Record<string, number | null | string>;
  perSensor?: Record<string, { contact: boolean; quality: number; reason?: string }>;
  baseline: Record<string, number>;
  reasons: string[];
  fixes: string[];
}

export interface MuseCalibWindow {
  samples: number[][]; // [[TP9, AF7, AF8, TP10], ...]
  fs?: number;
  channels?: string[];
}
export interface PolarCalibWindow {
  rr?: number[]; // R-R intervals (ms)
  rrMs?: number[];
}

export interface StreamProvenance {
  rawFraction: number;
  recoveredFraction: number;
  interpolatedFraction: number;
  gapFraction: number;
  compensationsApplied: string[];
  qualityTimeline: { tMs: number; quality: number }[];
  tier: string; // 'clean' | 'compensated' | 'salvage'
  detail: Record<string, unknown>;
}
export interface ProvenanceResult {
  provVersion: string;
  perStream: Record<string, StreamProvenance>;
}

export interface SignalProcessor {
  push(raw: { ch?: number[]; acc?: number[]; rr?: number | null; rrMs?: number | null; t?: number }): void;
  onClean(cb: (sample: unknown) => void): void;
  onRaw(cb: (sample: unknown) => void): void;
  finalize(): ProvenanceResult;
}

export interface AetheriaSignalAPI {
  calibVersion: string;
  provVersion: string;
  calibrate(
    sensor: 'muse' | 'polar_h10',
    window: MuseCalibWindow | PolarCalibWindow,
    opts?: Record<string, unknown>,
  ): CalibrationResult;
  makeProcessor(sensor: 'muse' | 'polar_h10', opts?: Record<string, unknown>): SignalProcessor;
}

declare global {
  interface Window {
    AetheriaSignal?: AetheriaSignalAPI;
  }
}

export {};
