/**
 * SaveSystem — IndexedDB load/save for progress across all 27 levels
 * (Section 10.3 / Phase 7). Local-first, account-free, via the `idb` wrapper.
 *
 * Honest-claims note: stored coherence history is raw research instrumentation
 * (settling signals), never surfaced to the player as an attainment score.
 */
import { openDB, type IDBPDatabase } from 'idb';

export interface LevelSaveData {
  completed: boolean;
  bestCoherence: number; // best sustained settling reached (research field)
  completionTimeSec: number;
  puzzlesSolved: number;
  meditationMinutes: number;
  completedBy: 'settled' | 'ceiling' | null;
}

export interface SessionCoherenceRecord {
  level: number;
  startedAt: number; // epoch ms
  durationSec: number;
  meanSettling: number;
  source: string; // 'hrv' | 'stillness' | 'behaviour'
}

export interface AetheriaSave {
  version: number;
  levelData: LevelSaveData[]; // 27 entries
  totalPlayTimeSec: number;
  levelsCompleted: number;
  lastPlayed: number; // epoch ms
  coherenceHistory: SessionCoherenceRecord[];
  // calibration kept minimal until the EEG setup flow needs more.
  calibration: { capturedAt: number | null };
}

const DB_NAME = 'aetheria-voxel';
const STORE = 'save';
const KEY = 'progress';
const SAVE_VERSION = 1;

function emptySave(): AetheriaSave {
  return {
    version: SAVE_VERSION,
    levelData: Array.from({ length: 27 }, () => ({
      completed: false,
      bestCoherence: 0,
      completionTimeSec: 0,
      puzzlesSolved: 0,
      meditationMinutes: 0,
      completedBy: null,
    })),
    totalPlayTimeSec: 0,
    levelsCompleted: 0,
    lastPlayed: 0,
    coherenceHistory: [],
    calibration: { capturedAt: null },
  };
}

export class SaveSystem {
  private db: IDBPDatabase | null = null;
  private save: AetheriaSave = emptySave();

  async init(): Promise<void> {
    this.db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      },
    });
    const loaded = (await this.db.get(STORE, KEY)) as AetheriaSave | undefined;
    if (loaded) {
      this.save = { ...emptySave(), ...loaded };
    } else {
      // One-time migration from the Phase B localStorage prototype.
      this.migrateFromLocalStorage();
      await this.flush();
    }
  }

  private migrateFromLocalStorage(): void {
    try {
      const raw = localStorage.getItem('aetheria-completed');
      if (!raw) return;
      const completed = JSON.parse(raw) as number[];
      for (const i of completed) {
        if (this.save.levelData[i]) this.save.levelData[i].completed = true;
      }
      this.save.levelsCompleted = completed.length;
    } catch {
      /* ignore */
    }
  }

  private async flush(): Promise<void> {
    this.save.lastPlayed = this.now();
    if (this.db) await this.db.put(STORE, this.save, KEY);
  }

  // Date.now via a small indirection so it's easy to stub in tests.
  private now(): number {
    return Date.now();
  }

  get data(): AetheriaSave {
    return this.save;
  }

  get completedSet(): Set<number> {
    const s = new Set<number>();
    this.save.levelData.forEach((d, i) => { if (d.completed) s.add(i); });
    return s;
  }

  isCompleted(index: number): boolean {
    return !!this.save.levelData[index]?.completed;
  }

  /** Record a level completion with its honest stats. */
  async recordCompletion(
    index: number,
    stats: { coherence: number; timeSec: number; puzzlesSolved: number; meditationMinutes: number; completedBy: 'settled' | 'ceiling' | null },
  ): Promise<void> {
    const d = this.save.levelData[index];
    if (!d) return;
    const wasComplete = d.completed;
    d.completed = true;
    d.bestCoherence = Math.max(d.bestCoherence, stats.coherence);
    d.completionTimeSec = stats.timeSec;
    d.puzzlesSolved = stats.puzzlesSolved;
    d.meditationMinutes += stats.meditationMinutes;
    d.completedBy = stats.completedBy;
    if (!wasComplete) this.save.levelsCompleted++;
    await this.flush();
  }

  async addPlayTime(sec: number): Promise<void> {
    this.save.totalPlayTimeSec += sec;
    await this.flush();
  }

  async addSessionRecord(rec: SessionCoherenceRecord): Promise<void> {
    this.save.coherenceHistory.push(rec);
    if (this.save.coherenceHistory.length > 2000) this.save.coherenceHistory.shift();
    await this.flush();
  }

  // ── Export / import (archive alongside the research corpus) ──

  exportJSON(): string {
    return JSON.stringify({ ...this.save, source: 'aetheria_game', schema: 'aetheria_save_v1' }, null, 2);
  }

  async importJSON(json: string): Promise<void> {
    const parsed = JSON.parse(json) as Partial<AetheriaSave>;
    this.save = { ...emptySave(), ...parsed };
    await this.flush();
  }

  download(filename = 'aetheria-save.json'): void {
    const blob = new Blob([this.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async reset(): Promise<void> {
    this.save = emptySave();
    await this.flush();
  }
}
