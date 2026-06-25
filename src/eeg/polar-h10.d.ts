/**
 * Types for the ported polar-h10.js Web Bluetooth driver (HR + R-R intervals).
 */
export interface PolarBus {
  publish(channel: string, payload: unknown): void;
}

export declare class PolarH10 {
  constructor(bus: PolarBus);
  get status(): string;
  get isConnected(): boolean;
  get contactQuality(): number;
  get ecgActive(): boolean;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

/** Payload shape published on the 'Aetheria_RR' channel. */
export interface AetheriaRRPayload {
  hr_bpm: number;
  rr_ms: number | null;
  source: string;
}
