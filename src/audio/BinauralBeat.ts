/**
 * BinauralBeat — stereo offset entrainment (Section 7.2, L2).
 *
 * Left ear = carrier, right ear = carrier + offset. The perceived beat equals
 * the offset (e.g. 4 Hz → theta entrainment). Offset is fixed per level config;
 * the carrier follows the prescribed frequency. Requires headphones to work as
 * intended (the game advises this in Settings).
 */
export class BinauralBeat {
  private leftOsc: OscillatorNode;
  private rightOsc: OscillatorNode;
  private leftPan: StereoPannerNode;
  private rightPan: StereoPannerNode;
  private gain: GainNode;
  private offset = 4;
  private carrier = 0;
  private started = false;

  constructor(private ctx: AudioContext, destination: AudioNode) {
    this.gain = ctx.createGain();
    this.gain.gain.value = 0;
    this.gain.connect(destination);

    this.leftOsc = ctx.createOscillator();
    this.rightOsc = ctx.createOscillator();
    this.leftOsc.type = 'sine';
    this.rightOsc.type = 'sine';

    this.leftPan = ctx.createStereoPanner();
    this.rightPan = ctx.createStereoPanner();
    this.leftPan.pan.value = -1;
    this.rightPan.pan.value = 1;

    this.leftOsc.connect(this.leftPan).connect(this.gain);
    this.rightOsc.connect(this.rightPan).connect(this.gain);
  }

  start(): void {
    if (this.started) return;
    this.leftOsc.start();
    this.rightOsc.start();
    this.started = true;
  }

  setOffset(hz: number): void {
    this.offset = hz;
    this.applyFrequencies();
  }

  setCarrier(hz: number): void {
    this.carrier = hz;
    this.applyFrequencies();
  }

  private applyFrequencies(): void {
    const t = this.ctx.currentTime;
    if (this.carrier <= 0) {
      this.setAmplitude(0);
      return;
    }
    this.leftOsc.frequency.setTargetAtTime(this.carrier, t, 0.08);
    this.rightOsc.frequency.setTargetAtTime(this.carrier + this.offset, t, 0.08);
  }

  setAmplitude(a: number, ramp = 0.2): void {
    const t = this.ctx.currentTime;
    this.gain.gain.setTargetAtTime(Math.max(0, a), t, ramp);
  }

  stop(): void {
    if (!this.started) return;
    try {
      this.leftOsc.stop();
      this.rightOsc.stop();
    } catch {
      /* already stopped */
    }
    this.started = false;
  }
}
