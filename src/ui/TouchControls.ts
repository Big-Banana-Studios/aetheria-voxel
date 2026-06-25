/**
 * TouchControls — on-screen controls for touch devices (Android phones/tablets).
 *
 * Desktop is untouched (keyboard + pointer-lock). On touch we replace that with:
 *   - a left-thumb virtual joystick → analog walk
 *   - drag anywhere (the full-screen look zone behind everything) → look
 *   - right-side buttons: Focus (hold), Jump (hold), Meditate (tap)
 *   - top buttons: Map (tap, toggles the Lo Shu cube) and Pause (tap)
 *
 * Multitouch works because each zone is its own element: a touch is delivered to
 * the element it started on, so joystick + look + a button press run at once.
 */
export interface TouchCallbacks {
  move: (x: number, z: number) => void; // analog strafe/forward, −1..1
  look: (dx: number, dy: number) => void; // pixel deltas
  setFocus: (on: boolean) => void;
  setJump: (on: boolean) => void;
  meditate: () => void;
  pause: () => void;
}

/** The device has a touchscreen (true on phones AND touchscreen laptops/2-in-1s). */
export function hasTouch(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(
    navigator.maxTouchPoints > 0 ||
    'ontouchstart' in window ||
    window.matchMedia?.('(pointer: coarse)')?.matches
  );
}

/** The device has a precise pointer (mouse / trackpad / stylus). A touchscreen
 *  laptop reports BOTH this and hasTouch(), so we can't assume touch-only. */
export function hasFinePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return !!window.matchMedia?.('(pointer: fine)')?.matches;
}

const JOY_RADIUS = 56; // px travel for full deflection

export class TouchControls {
  readonly el: HTMLDivElement;
  private cb: TouchCallbacks;
  private moveGroup: HTMLDivElement; // joystick + action buttons (play only)
  private lookZone: HTMLDivElement;
  private topGroup: HTMLDivElement; // map + pause (play or map)
  private joyBase: HTMLDivElement;
  private joyThumb: HTMLDivElement;

  private joyId: number | null = null;
  private joyCenter = { x: 0, y: 0 };
  private lookId: number | null = null;
  private lookLast = { x: 0, y: 0 };

  constructor(root: HTMLElement, cb: TouchCallbacks) {
    this.cb = cb;
    this.el = document.createElement('div');
    this.el.style.cssText = 'position:fixed;inset:0;z-index:16;display:none;pointer-events:none;';

    // Look zone — full screen, behind the controls; drag to look.
    this.lookZone = document.createElement('div');
    this.lookZone.style.cssText = 'position:absolute;inset:0;pointer-events:auto;touch-action:none;';
    this.el.appendChild(this.lookZone);

    // Movement + actions (visible only while playing).
    this.moveGroup = document.createElement('div');
    this.moveGroup.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    this.el.appendChild(this.moveGroup);

    // Joystick (bottom-left).
    this.joyBase = document.createElement('div');
    this.joyBase.style.cssText = [
      'position:absolute', 'left:26px', 'bottom:30px', 'width:120px', 'height:120px',
      'border-radius:50%', 'border:2px solid rgba(180,142,232,0.4)',
      'background:rgba(20,12,34,0.35)', 'pointer-events:auto', 'touch-action:none',
    ].join(';');
    this.joyThumb = document.createElement('div');
    this.joyThumb.style.cssText = [
      'position:absolute', 'left:50%', 'top:50%', 'width:52px', 'height:52px',
      'margin:-26px 0 0 -26px', 'border-radius:50%',
      'background:rgba(180,142,232,0.5)', 'box-shadow:0 0 12px rgba(180,142,232,0.5)',
      'transition:transform 0.06s linear', 'pointer-events:none',
    ].join(';');
    this.joyBase.appendChild(this.joyThumb);
    this.moveGroup.appendChild(this.joyBase);

    // Action buttons (bottom-right).
    const focusBtn = this.actionButton('Focus', 'right:26px', 'bottom:118px', 80, true);
    const jumpBtn = this.actionButton('Jump', 'right:120px', 'bottom:46px', 64, true);
    const medBtn = this.actionButton('Meditate', 'right:26px', 'bottom:36px', 76, false);
    this.holdButton(focusBtn, (on) => this.cb.setFocus(on));
    this.holdButton(jumpBtn, (on) => this.cb.setJump(on));
    this.tapButton(medBtn, () => this.cb.meditate());
    this.moveGroup.append(focusBtn, jumpBtn, medBtn);

    // Pause — top-CENTRE so it never covers the sensor/connection indicators
    // (top-right) or the cube mini-map (top-left). The map itself is tapped to
    // open/close, so there's no separate Map button.
    this.topGroup = document.createElement('div');
    this.topGroup.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    this.el.appendChild(this.topGroup);
    const pauseBtn = this.actionButton('⏸', 'left:50%', 'top:14px', 52, false);
    pauseBtn.style.transform = 'translateX(-50%)';
    this.tapButton(pauseBtn, () => this.cb.pause());
    this.topGroup.append(pauseBtn);

    this.bindJoystick();
    this.bindLook();
    root.appendChild(this.el);
  }

  private actionButton(
    label: string,
    xCss: string,
    yCss: string,
    size: number,
    big: boolean,
  ): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = [
      'position:absolute', xCss, yCss,
      `width:${size}px`, `height:${size}px`, 'border-radius:50%',
      'border:1px solid rgba(180,142,232,0.5)', 'background:rgba(20,12,34,0.55)',
      'color:#e8e0f0', `font:300 ${big ? 0.95 : 0.78}rem "Segoe UI",sans-serif`,
      'pointer-events:auto', 'touch-action:none', 'user-select:none',
      '-webkit-user-select:none', 'backdrop-filter:blur(3px)',
    ].join(';');
    return b;
  }

  /** Press-and-hold button (Focus / Jump). */
  private holdButton(b: HTMLButtonElement, set: (on: boolean) => void): void {
    const on = (e: Event) => { e.preventDefault(); b.style.background = 'rgba(180,142,232,0.4)'; set(true); };
    const off = (e: Event) => { e.preventDefault(); b.style.background = 'rgba(20,12,34,0.55)'; set(false); };
    b.addEventListener('touchstart', on, { passive: false });
    b.addEventListener('touchend', off, { passive: false });
    b.addEventListener('touchcancel', off, { passive: false });
  }

  /** Single-tap button (Meditate / Map / Pause). */
  private tapButton(b: HTMLButtonElement, fn: () => void): void {
    b.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fn();
    }, { passive: false });
  }

  private bindJoystick(): void {
    const rect = () => this.joyBase.getBoundingClientRect();
    this.joyBase.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.joyId !== null) return;
      const t = e.changedTouches[0];
      this.joyId = t.identifier;
      const r = rect();
      this.joyCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      this.updateJoy(t.clientX, t.clientY);
    }, { passive: false });
    const moveHandler = (e: TouchEvent) => {
      if (this.joyId === null) return;
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.joyId) { e.preventDefault(); this.updateJoy(t.clientX, t.clientY); }
      }
    };
    const endHandler = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.joyId) {
          this.joyId = null;
          this.joyThumb.style.transform = 'translate(0px,0px)';
          this.cb.move(0, 0);
        }
      }
    };
    this.joyBase.addEventListener('touchmove', moveHandler, { passive: false });
    this.joyBase.addEventListener('touchend', endHandler, { passive: false });
    this.joyBase.addEventListener('touchcancel', endHandler, { passive: false });
  }

  private updateJoy(cx: number, cy: number): void {
    let dx = cx - this.joyCenter.x;
    let dy = cy - this.joyCenter.y;
    const len = Math.hypot(dx, dy);
    if (len > JOY_RADIUS) { dx = (dx / len) * JOY_RADIUS; dy = (dy / len) * JOY_RADIUS; }
    this.joyThumb.style.transform = `translate(${dx}px,${dy}px)`;
    // Screen-y points down; forward is up → negate dy.
    this.cb.move(dx / JOY_RADIUS, -dy / JOY_RADIUS);
  }

  private bindLook(): void {
    this.lookZone.addEventListener('touchstart', (e) => {
      if (this.lookId !== null) return;
      const t = e.changedTouches[0];
      this.lookId = t.identifier;
      this.lookLast = { x: t.clientX, y: t.clientY };
    }, { passive: false });
    this.lookZone.addEventListener('touchmove', (e) => {
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.lookId) {
          e.preventDefault();
          this.cb.look(t.clientX - this.lookLast.x, t.clientY - this.lookLast.y);
          this.lookLast = { x: t.clientX, y: t.clientY };
        }
      }
    }, { passive: false });
    const end = (e: TouchEvent) => {
      for (const t of Array.from(e.changedTouches)) {
        if (t.identifier === this.lookId) this.lookId = null;
      }
    };
    this.lookZone.addEventListener('touchend', end, { passive: false });
    this.lookZone.addEventListener('touchcancel', end, { passive: false });
  }

  /** Drive visibility from the game state. Shown only while playing; in the map
   *  view the cube itself is tapped (and its background closes it). */
  setState(state: string): void {
    if (state !== 'playing') {
      this.hide();
      return;
    }
    this.el.style.display = 'block';
    this.lookZone.style.display = 'block';
    this.moveGroup.style.display = 'block';
    this.topGroup.style.display = 'block';
  }

  private hide(): void {
    if (this.el.style.display === 'none') return;
    this.el.style.display = 'none';
    this.resetInputs();
  }

  /** Release any held inputs so leaving play never leaves movement stuck. */
  private resetInputs(): void {
    this.joyId = null;
    this.lookId = null;
    this.joyThumb.style.transform = 'translate(0px,0px)';
    this.cb.move(0, 0);
    this.cb.setFocus(false);
    this.cb.setJump(false);
  }
}
