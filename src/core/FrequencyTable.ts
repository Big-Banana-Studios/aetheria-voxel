/**
 * FrequencyTable — loads public/data/aetheria-frequency-table.json, the single
 * source of truth for the 27 frequencies (Section 13).
 *
 * HARD RULE: Hz values are owner-provided and must never be fabricated. The game
 * runs structurally with placeholder 0.0 values; the real values are dropped in
 * later. This loader tolerates 0.0 placeholders (audio simply stays silent for
 * an un-filled frequency) and exposes the per-level metadata used everywhere.
 */

export interface FrequencyEntry {
  index: number;
  regime: 'GUT' | 'HEART' | 'HEAD';
  regime_position: number;
  frequency_hz: number; // 0.0 until owner provides the real value
  digital_root: 3 | 6 | 9;
  solfeggio_note: string;
  therapeutic_target: string;
  level_name: string;
  binaural_offset_hz: number;
  coherence_threshold: number;
  sustained_seconds: number;
  primary_color: string;
  secondary_color: string;
  ambient_color: string;
}

export interface FrequencyTableData {
  version: string;
  concert_pitch: number;
  tuning_system: string;
  frequencies: FrequencyEntry[];
}

export class FrequencyTable {
  private constructor(public readonly data: FrequencyTableData) {}

  static async load(url = 'data/aetheria-frequency-table.json'): Promise<FrequencyTable> {
    // Vite serves /public at the base root; use a base-relative URL so it works
    // under a GitHub Pages subpath too.
    const base = import.meta.env.BASE_URL ?? '/';
    const res = await fetch(`${base}${url}`);
    if (!res.ok) throw new Error(`Failed to load frequency table: ${res.status}`);
    const data = (await res.json()) as FrequencyTableData;
    if (!Array.isArray(data.frequencies) || data.frequencies.length !== 27) {
      console.warn(
        `[Aetheria] frequency-table has ${data.frequencies?.length ?? 0} entries; expected 27.`,
      );
    }
    return new FrequencyTable(data);
  }

  get(index: number): FrequencyEntry {
    const e = this.data.frequencies[index];
    if (!e) throw new Error(`No frequency entry at index ${index}`);
    return e;
  }

  hz(index: number): number {
    return this.get(index)?.frequency_hz ?? 0;
  }

  /** True if the owner's real Hz values have been dropped in (not all zero). */
  get hasRealValues(): boolean {
    return this.data.frequencies.some((f) => f.frequency_hz > 0);
  }
}
