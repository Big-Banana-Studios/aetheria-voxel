/**
 * SignalLog — instrument & log everything in parallel (Selah Task 6).
 *
 * Records every signal each tick (~1 Hz), even those not currently driving the
 * gate, so the "should we fuse signals?" question stays answerable from data
 * rather than guessed. The cardiac channel is independent of EEG → a genuine
 * third witness. Local-only; exportable as JSON to sit alongside the research
 * corpus (GDD Section 10.3 / 15).
 *
 * Honest-claims note: this is raw research instrumentation, never shown to the
 * player as a score.
 */
export interface SignalRecord {
  t: number; // ms since level start
  source: 'muse' | 'manual';
  heartConnected: boolean;
  level: number;
  freqIndex: number;
  trueHz: number;
  playbackHz: number;
  baseSignal: number; // EEG/behaviour settling 0..1
  heartSettledness: number; // HRV settledness 0..1
  fusedSettledness: number; // what actually drove the world
  hrvRmssd: number | null; // ms
  hrvBaseline: number | null; // ms
  bpm: number;
  meditationDwell: number; // s in the meditation space
  inMeditationSpace: boolean;
  px: number;
  py: number;
  pz: number;
  advancedBy: 'settled' | 'ceiling' | null; // set on the completing tick
}

export class SignalLog {
  private records: SignalRecord[] = [];
  private readonly cap = 100_000; // ~28h at 1Hz; bounded memory

  push(rec: SignalRecord): void {
    this.records.push(rec);
    if (this.records.length > this.cap) this.records.shift();
  }

  get size(): number {
    return this.records.length;
  }

  clear(): void {
    this.records = [];
  }

  exportJSON(): string {
    return JSON.stringify(
      { schema: 'aetheria_game_signal_log', version: '1.0', records: this.records },
      null,
      2,
    );
  }

  /** Trigger a browser download of the log (for archiving with sessions). */
  download(filename = 'aetheria-signals.json'): void {
    const blob = new Blob([this.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
