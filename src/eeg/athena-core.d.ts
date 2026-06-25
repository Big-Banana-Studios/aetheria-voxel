/**
 * Ambient type declaration for the ported athena-core.js driver (it attaches
 * `AthenaDevice` to the global object). We only declare the surface MuseClient
 * actually uses.
 */
export interface AthenaEEGData {
  samples: number[][]; // rows of channel values, order = labels
  labels: string[]; // e.g. ['TP9','AF7','AF8','TP10']
  numCh: number;
  count: number;
}

export interface AthenaAccGyroData {
  samples: number[][]; // rows of [ACC_X, ACC_Y, ACC_Z, GYRO_X, GYRO_Y, GYRO_Z]
  labels: string[];
  count: number;
}

export interface AthenaOptions {
  preset?: string;
  dcOffset?: boolean;
  processInterval?: number;
  onEEG?: (d: AthenaEEGData) => void;
  onAccGyro?: (d: AthenaAccGyroData) => void;
  onBandPowers?: (bp: Record<string, number>) => void;
  onBattery?: (pct: number) => void;
  onStatus?: (s: string) => void;
  onLog?: (type: string, msg: string) => void;
}

export declare class AthenaDevice {
  constructor(options?: AthenaOptions);
  connect(): Promise<void>;
  startStream(preset?: string): Promise<void>;
  stopStream(): Promise<void>;
  disconnect(): Promise<void>;
  get status(): string;
  get battery(): number | null;
  get deviceName(): string | null;
  static get isSupported(): boolean;
}

declare global {
  interface Window {
    AthenaDevice: typeof AthenaDevice;
  }
  // Web Bluetooth — not in the default DOM lib for all TS configs.
  interface Navigator {
    bluetooth?: unknown;
  }
}
