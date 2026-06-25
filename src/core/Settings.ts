/**
 * Settings — player preferences (Section 9.2 / 14). Persisted to localStorage.
 *
 * Accessibility is first-class (Section 14.3): subtitles, reduced motion,
 * reduced flashes/particles, and a difficulty that scales settle thresholds and
 * dwell — never adds time pressure (there are no timers).
 */
export type Difficulty = 'gentle' | 'standard' | 'deep';
// 'auto' = follow the device / last-used input; 'mouse' = keyboard + mouse-look
// (pointer lock); 'touch' = on-screen controls.
export type ControlMode = 'auto' | 'mouse' | 'touch';

export interface SettingsData {
  masterVolume: number; // 0..1
  subtitles: boolean;
  reduceMotion: boolean; // camera smoothing + no view bob/lift
  reduceFlashes: boolean; // damp particle/emissive flashes (photosensitivity)
  difficulty: Difficulty;
  renderScale: number; // 0.5..1.5
  controls: ControlMode;
}

const DEFAULTS: SettingsData = {
  masterVolume: 0.6,
  subtitles: true,
  reduceMotion: false,
  reduceFlashes: false,
  difficulty: 'standard',
  renderScale: 1.0,
  controls: 'auto',
};

const KEY = 'aetheria-settings';

// Difficulty scales the settle threshold and the sustained-dwell requirement.
// Gentler = lower threshold + shorter hold; deeper = higher + longer. Ceilings
// still guarantee progress regardless (no walls).
export const DIFFICULTY_SCALE: Record<Difficulty, { threshold: number; sustain: number }> = {
  gentle: { threshold: 0.8, sustain: 0.7 },
  standard: { threshold: 1.0, sustain: 1.0 },
  deep: { threshold: 1.15, sustain: 1.3 },
};

export class Settings {
  data: SettingsData;
  private listeners: ((s: SettingsData) => void)[] = [];

  constructor() {
    this.data = this.load();
  }

  private load(): SettingsData {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<SettingsData>) };
    } catch {
      /* ignore */
    }
    return { ...DEFAULTS };
  }

  save(): void {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data));
    } catch {
      /* ignore */
    }
  }

  set<K extends keyof SettingsData>(key: K, value: SettingsData[K]): void {
    this.data[key] = value;
    this.save();
    for (const cb of this.listeners) cb(this.data);
  }

  onChange(cb: (s: SettingsData) => void): void {
    this.listeners.push(cb);
    cb(this.data); // apply immediately
  }
}
