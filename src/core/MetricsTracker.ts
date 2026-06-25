/**
 * MetricsTracker — records a per-second time-series of all relevant Muse S Athena
 * (+ Polar) metrics for one level/session, and summarizes it for the metrics
 * panel (Section 15 research export; honest "Data mode" per Selah — raw measured
 * signals, never an attainment score).
 */

export interface MetricDef {
  key: string;
  label: string;
  unit: string;
  decimals: number;
  color: string;
}

// The metrics shown/analyzed. Order = display order.
export const METRIC_DEFS: MetricDef[] = [
  { key: 'settledness', label: 'Settling (gate)', unit: '', decimals: 2, color: '#9ad6c8' },
  { key: 'heartRate', label: 'Heart rate', unit: 'bpm', decimals: 0, color: '#e88ea8' },
  { key: 'hrvRmssd', label: 'HRV (RMSSD)', unit: 'ms', decimals: 0, color: '#e8a8c4' },
  { key: 'plvCoherence', label: 'EEG coherence (PLV)', unit: '', decimals: 2, color: '#b48ee8' },
  { key: 'stillness', label: 'Stillness', unit: '', decimals: 2, color: '#cfc2e8' },
  { key: 'thetaAlpha', label: 'Theta/Alpha (relax)', unit: '', decimals: 2, color: '#7fc8e8' },
  { key: 'betaGamma', label: 'Beta/Gamma (focus)', unit: '', decimals: 2, color: '#e8c87f' },
  { key: 'alphaRel', label: 'Alpha power', unit: '', decimals: 2, color: '#56c878' },
  { key: 'thetaRel', label: 'Theta power', unit: '', decimals: 2, color: '#50d4a0' },
  { key: 'betaRel', label: 'Beta power', unit: '', decimals: 2, color: '#d4a050' },
  { key: 'gammaRel', label: 'Gamma power', unit: '', decimals: 2, color: '#d47fb0' },
  { key: 'deltaRel', label: 'Delta power', unit: '', decimals: 2, color: '#7f8ad4' },
  { key: 'hbo', label: 'fNIRS HbO', unit: 'μM', decimals: 1, color: '#e85a4a' },
  { key: 'hbr', label: 'fNIRS HbR', unit: 'μM', decimals: 1, color: '#4a7ae8' },
  { key: 'battery', label: 'Muse battery', unit: '%', decimals: 0, color: '#9aa0b0' },
];

export interface MetricSummary {
  last: number | null;
  mean: number | null;
  min: number | null;
  max: number | null;
  n: number;
}

export class MetricsTracker {
  private series = new Map<string, (number | null)[]>();
  levelIndex = 0;
  levelName = '';
  startedAt = 0;
  private maxLen = 1800; // ~30 min at 1 Hz

  constructor() {
    for (const d of METRIC_DEFS) this.series.set(d.key, []);
  }

  start(levelIndex: number, levelName: string, now: number): void {
    this.levelIndex = levelIndex;
    this.levelName = levelName;
    this.startedAt = now;
    for (const d of METRIC_DEFS) this.series.set(d.key, []);
  }

  push(values: Record<string, number | null>): void {
    for (const d of METRIC_DEFS) {
      const arr = this.series.get(d.key)!;
      arr.push(values[d.key] ?? null);
      if (arr.length > this.maxLen) arr.shift();
    }
  }

  getSeries(key: string): (number | null)[] {
    return this.series.get(key) ?? [];
  }

  summary(key: string): MetricSummary {
    const arr = (this.series.get(key) ?? []).filter((v): v is number => v != null);
    if (arr.length === 0) return { last: null, mean: null, min: null, max: null, n: 0 };
    let sum = 0, min = Infinity, max = -Infinity;
    for (const v of arr) { sum += v; if (v < min) min = v; if (v > max) max = v; }
    return { last: arr[arr.length - 1], mean: sum / arr.length, min, max, n: arr.length };
  }

  get sampleCount(): number {
    return this.series.get('settledness')?.length ?? 0;
  }
}
