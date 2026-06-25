/**
 * Menus — shell screens (Section 9.2 / Phase 7): main menu, settings, credits,
 * and an in-game pause overlay. Level selection reuses the Lo Shu cube map
 * (press C in game), so there is no separate level grid here.
 *
 * Sacred-geometry aesthetic; calm; accessibility-first settings (Section 14).
 */
import type { Settings, SettingsData, Difficulty, ControlMode } from '../core/Settings';
import type { SaveSystem } from '../core/SaveSystem';
import { canInstall, promptInstall } from './install';

export interface MenuCallbacks {
  onEnter: () => void; // begin / continue → sensor choice
  onResume: () => void;
  onMainMenu: () => void; // return to title from pause
  onMetrics: () => void; // open the session metrics panel
}

/** Live sensor state + actions for the in-Field (pause) sensor controls, so a
 *  device that drops mid-session can be reconnected without leaving the Field. */
export interface SensorControls {
  museConnected: () => boolean;
  polarConnected: () => boolean;
  connectMuse: () => Promise<boolean>;
  connectPolar: () => Promise<boolean>;
  disconnectMuse: () => void;
  disconnectPolar: () => void;
}

export class MenuSystem {
  private overlay: HTMLDivElement;
  private panel: HTMLDivElement;

  constructor(
    private root: HTMLElement,
    private settings: Settings,
    private save: SaveSystem,
    private cb: MenuCallbacks,
    private sensors: SensorControls,
  ) {
    this.overlay = document.createElement('div');
    this.overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:40', 'display:none',
      'align-items:center', 'justify-content:center',
      'background:radial-gradient(circle at center, rgba(20,12,34,0.78), rgba(8,5,16,0.96))',
      'pointer-events:auto', 'font-family:"Segoe UI",system-ui,sans-serif', 'color:#e8e0f0',
    ].join(';');
    this.panel = document.createElement('div');
    this.panel.style.cssText = 'min-width:320px;max-width:520px;text-align:center;';
    this.overlay.appendChild(this.panel);
    this.root.appendChild(this.overlay);

    // If the browser becomes installable while the title is showing, re-render
    // so the "Install app" button appears (or disappears after install).
    window.addEventListener('aetheria:installable', () => {
      if (this.mainVisible) this.showMain();
    });
  }

  private mainVisible = false;

  private btn(label: string, primary = false): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = [
      'display:block', 'width:100%', 'margin:8px 0', 'padding:12px 18px',
      'border-radius:26px', 'border:1px solid rgba(180,142,232,0.5)',
      `background:${primary ? 'rgba(180,142,232,0.22)' : 'rgba(20,12,34,0.6)'}`,
      'color:#e8e0f0', 'font:300 1rem "Segoe UI",sans-serif', 'letter-spacing:0.04em',
      'cursor:pointer',
    ].join(';');
    return b;
  }

  private title(): HTMLDivElement {
    const t = document.createElement('div');
    t.innerHTML =
      '<div style="font-weight:300;letter-spacing:0.2em;font-size:2.2rem;text-transform:uppercase;text-shadow:0 0 24px rgba(180,142,232,0.5)">Aetheria</div>' +
      '<div style="opacity:0.65;margin:0.3rem 0 1.4rem;letter-spacing:0.08em">Resonance of the Spheres</div>';
    return t;
  }

  show(): void { this.overlay.style.display = 'flex'; }
  hide(): void { this.overlay.style.display = 'none'; this.mainVisible = false; }

  showMain(): void {
    this.mainVisible = true;
    this.panel.innerHTML = '';
    this.panel.appendChild(this.title());
    const completed = this.save.data.levelsCompleted;
    const enter = this.btn(completed > 0 ? 'Continue the Journey' : 'Enter the Field', true);
    enter.onclick = () => this.cb.onEnter();
    const how = this.btn('How to Play');
    how.onclick = () => this.showHowToPlay(() => this.showMain());
    const settings = this.btn('Settings');
    settings.onclick = () => this.showSettings(() => this.showMain());
    const credits = this.btn('Credits');
    credits.onclick = () => this.showCredits(() => this.showMain());
    this.panel.append(enter, how, settings, credits);
    // Offer to install as an app when the browser allows it (Android Chrome etc.).
    if (canInstall()) {
      const install = this.btn('⤓ Install app');
      install.onclick = () => void promptInstall().then(() => this.showMain());
      this.panel.appendChild(install);
    }
    if (completed > 0) {
      const note = document.createElement('div');
      note.style.cssText = 'margin-top:14px;opacity:0.5;font-size:0.85rem';
      note.textContent = `${completed}/27 nodes restored · press C in the Field for the map`;
      this.panel.appendChild(note);
    }
    const version = document.createElement('div');
    version.style.cssText = 'margin-top:22px;opacity:0.4;font:0.78rem ui-monospace,Consolas,monospace;letter-spacing:0.1em;';
    version.textContent = `v${__APP_VERSION__}`;
    this.panel.appendChild(version);
    this.show();
  }

  showPause(): void {
    this.mainVisible = false;
    this.panel.innerHTML = '';
    const h = document.createElement('div');
    h.style.cssText = 'font-weight:300;letter-spacing:0.16em;font-size:1.5rem;margin-bottom:1rem';
    h.textContent = 'Paused';
    this.panel.appendChild(h);
    const resume = this.btn('Resume', true);
    resume.onclick = () => this.cb.onResume();
    const metrics = this.btn('Session Metrics');
    metrics.onclick = () => this.cb.onMetrics();
    const how = this.btn('How to Play');
    how.onclick = () => this.showHowToPlay(() => this.showPause());
    const settings = this.btn('Settings');
    settings.onclick = () => this.showSettings(() => this.showPause());
    const main = this.btn('Return to Title');
    main.onclick = () => this.cb.onMainMenu();
    this.panel.append(resume, metrics, how, settings, main);
    this.panel.appendChild(this.sensorsBlock());
    this.show();
  }

  /** Live sensor rows in the pause menu: reconnect a device that dropped, or
   *  disconnect one, without leaving the Field. Re-renders the pause menu after
   *  any action so the state stays truthful. */
  private sensorsBlock(): HTMLDivElement {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin-top:18px;padding-top:14px;border-top:1px solid rgba(180,142,232,0.18);';
    const lbl = document.createElement('div');
    lbl.textContent = 'Sensors';
    lbl.style.cssText = 'opacity:0.5;font-size:0.78rem;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:8px;';
    wrap.appendChild(lbl);
    wrap.appendChild(this.sensorRow('Muse', this.sensors.museConnected(),
      () => this.sensors.connectMuse(), () => this.sensors.disconnectMuse()));
    wrap.appendChild(this.sensorRow('Polar H10', this.sensors.polarConnected(),
      () => this.sensors.connectPolar(), () => this.sensors.disconnectPolar()));
    return wrap;
  }

  private sensorRow(
    name: string,
    connected: boolean,
    connect: () => Promise<boolean>,
    disconnect: () => void,
  ): HTMLDivElement {
    const r = document.createElement('div');
    r.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;margin:7px 0;text-align:left;';
    const status = document.createElement('span');
    status.textContent = `${name}: ${connected ? 'connected ✓' : 'not connected'}`;
    status.style.cssText = `font-size:0.92rem;${connected ? 'color:#9ad6c8;' : 'opacity:0.7;'}`;

    const action = document.createElement('button');
    action.textContent = connected ? 'Disconnect' : 'Connect';
    action.style.cssText = [
      'padding:6px 16px', 'border-radius:18px', 'border:1px solid rgba(180,142,232,0.4)',
      'background:rgba(20,12,34,0.6)', 'color:#e8e0f0',
      'font:300 0.85rem "Segoe UI",sans-serif', 'cursor:pointer', 'flex:0 0 auto',
    ].join(';');
    action.onclick = async () => {
      if (connected) {
        disconnect();
        this.showPause(); // re-render with the new state
      } else {
        action.textContent = 'Pairing…';
        action.disabled = true;
        await connect();
        this.showPause();
      }
    };
    r.append(status, action);
    return r;
  }

  private row(label: string, control: HTMLElement): HTMLDivElement {
    const r = document.createElement('div');
    r.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:16px;margin:10px 0;text-align:left;';
    const l = document.createElement('span');
    l.textContent = label;
    l.style.cssText = 'font-size:0.95rem;opacity:0.85;';
    r.append(l, control);
    return r;
  }

  private toggle(get: () => boolean, set: (v: boolean) => void): HTMLButtonElement {
    const b = document.createElement('button');
    const render = () => { b.textContent = get() ? 'On' : 'Off'; b.style.opacity = get() ? '1' : '0.55'; };
    b.style.cssText = 'padding:6px 16px;border-radius:18px;border:1px solid rgba(180,142,232,0.5);background:rgba(20,12,34,0.6);color:#e8e0f0;cursor:pointer;min-width:64px;';
    b.onclick = () => { set(!get()); render(); };
    render();
    return b;
  }

  private slider(min: number, max: number, step: number, get: () => number, set: (v: number) => void): HTMLInputElement {
    const s = document.createElement('input');
    s.type = 'range';
    s.min = String(min); s.max = String(max); s.step = String(step);
    s.value = String(get());
    s.style.cssText = 'width:160px;accent-color:#b48ee8;';
    s.oninput = () => set(parseFloat(s.value));
    return s;
  }

  showSettings(back: () => void): void {
    this.mainVisible = false;
    this.panel.innerHTML = '';
    const h = document.createElement('div');
    h.style.cssText = 'font-weight:300;letter-spacing:0.16em;font-size:1.4rem;margin-bottom:1rem';
    h.textContent = 'Settings';
    this.panel.appendChild(h);
    const d = this.settings.data;
    const set = <K extends keyof SettingsData>(k: K, v: SettingsData[K]) => this.settings.set(k, v);

    this.panel.appendChild(this.row('Master volume', this.slider(0, 1, 0.05, () => d.masterVolume, (v) => set('masterVolume', v))));
    this.panel.appendChild(this.row('Render scale', this.slider(0.5, 1.5, 0.1, () => d.renderScale, (v) => set('renderScale', v))));
    this.panel.appendChild(this.row('Subtitles', this.toggle(() => d.subtitles, (v) => set('subtitles', v))));
    this.panel.appendChild(this.row('Reduce motion', this.toggle(() => d.reduceMotion, (v) => set('reduceMotion', v))));
    this.panel.appendChild(this.row('Reduce flashes', this.toggle(() => d.reduceFlashes, (v) => set('reduceFlashes', v))));

    // Difficulty (scales settle threshold/dwell — never adds time pressure).
    const diffSel = document.createElement('select');
    diffSel.style.cssText = 'padding:6px 12px;border-radius:14px;background:rgba(20,12,34,0.6);color:#e8e0f0;border:1px solid rgba(180,142,232,0.5);';
    for (const opt of ['gentle', 'standard', 'deep'] as Difficulty[]) {
      const o = document.createElement('option');
      o.value = opt; o.textContent = opt[0].toUpperCase() + opt.slice(1);
      if (opt === d.difficulty) o.selected = true;
      diffSel.appendChild(o);
    }
    diffSel.onchange = () => set('difficulty', diffSel.value as Difficulty);
    this.panel.appendChild(this.row('Settling depth', diffSel));

    // Controls: Auto follows the device / last-used input; or force mouse+keyboard
    // or touch (useful on a touchscreen laptop or a detached 2-in-1).
    const ctrlSel = document.createElement('select');
    ctrlSel.style.cssText = diffSel.style.cssText;
    const ctrlOpts: [ControlMode, string][] = [
      ['auto', 'Auto'],
      ['mouse', 'Mouse & keyboard'],
      ['touch', 'Touch'],
    ];
    for (const [val, label] of ctrlOpts) {
      const o = document.createElement('option');
      o.value = val; o.textContent = label;
      if (val === d.controls) o.selected = true;
      ctrlSel.appendChild(o);
    }
    ctrlSel.onchange = () => set('controls', ctrlSel.value as ControlMode);
    this.panel.appendChild(this.row('Controls', ctrlSel));

    // Save data tools.
    const tools = document.createElement('div');
    tools.style.cssText = 'display:flex;gap:8px;margin-top:14px;';
    const exp = this.btn('Export Save'); exp.style.margin = '0';
    exp.onclick = () => this.save.download();
    const imp = this.btn('Import'); imp.style.margin = '0';
    imp.onclick = () => this.importSave();
    const reset = this.btn('Reset'); reset.style.margin = '0';
    reset.onclick = async () => { if (confirm('Reset all progress? This cannot be undone.')) { await this.save.reset(); back(); } };
    tools.append(exp, imp, reset);
    this.panel.appendChild(tools);

    const backBtn = this.btn('Back', true);
    backBtn.onclick = back;
    this.panel.appendChild(backBtn);
    this.show();
  }

  private importSave(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const f = input.files?.[0];
      if (!f) return;
      await this.save.importJSON(await f.text());
      location.reload();
    };
    input.click();
  }

  /** How to Play — complete, gentle play directions, objectives, and what each
   *  sensor adds to the depth of the experience. Reachable from the pause menu
   *  and the title. Scrolls; honest language (the body settles — never a score). */
  showHowToPlay(back: () => void): void {
    this.mainVisible = false;
    this.panel.innerHTML = '';
    const head = document.createElement('div');
    head.style.cssText = 'font-weight:300;letter-spacing:0.16em;font-size:1.5rem;margin-bottom:0.2rem';
    head.textContent = 'How to Play';
    const tag = document.createElement('div');
    tag.style.cssText = 'opacity:0.6;font-size:0.9rem;margin-bottom:1rem;line-height:1.5';
    tag.textContent = 'A contemplative journey — there is no way to lose, and no clock. You restore each node by settling, at your own pace.';
    this.panel.append(head, tag);

    const scroll = document.createElement('div');
    scroll.style.cssText =
      'max-height:54vh;overflow-y:auto;text-align:left;padding-right:10px;' +
      'font:300 0.95rem/1.65 "Segoe UI",system-ui,sans-serif;color:#e2d9f0;';

    const sec = (title: string, body: string) =>
      `<div style="margin:0 0 1.1rem">` +
      `<div style="color:#c4a8ec;letter-spacing:0.08em;font-size:0.82rem;text-transform:uppercase;margin-bottom:0.35rem">${title}</div>` +
      `<div style="opacity:0.9">${body}</div></div>`;

    const key = (k: string) =>
      `<span style="display:inline-block;min-width:2.1em;text-align:center;padding:1px 7px;margin:0 2px;` +
      `border:1px solid rgba(180,142,232,0.4);border-radius:6px;background:rgba(20,12,34,0.6);` +
      `font:0.82rem ui-monospace,Consolas,monospace;color:#e8e0f0">${k}</span>`;

    scroll.innerHTML =
      sec('Your goal',
        'Each of the 27 nodes is a place that has gone quiet. You restore it by <b>settling</b> — letting your body grow calm and steady. ' +
        'As you settle, the Field around you brightens, bridges form, and locks open. When a node is restored, the next opens on the map. ' +
        'Nothing punishes you: there are no enemies, no timers, no falling damage, no failure. If you simply spend time in a node, it will always open eventually.') +

      sec('Moving around',
        `${key('W')}${key('A')}${key('S')}${key('D')} or the arrow keys to walk &nbsp;·&nbsp; <b>Mouse</b> to look &nbsp;·&nbsp; ${key('Space')} to jump / rise &nbsp;·&nbsp; ${key('Shift')} to step down. ` +
        'Click the window first to capture the mouse; press ' + key('Esc') + ' to release it and open this menu.') +

      sec('What to do in a node',
        `<b>Settle.</b> Find the calm spot — often a glowing meditation dais — and press ${key('M')} to sit. ` +
        'The longer you stay settled, the more the node restores. You can also just stand still and breathe anywhere.<br><br>' +
        `<b>Resonance locks</b> (glowing crystal clusters): walk up close and <b>hold ${key('F')}</b> for about 2½ seconds to charge one open. ` +
        'You will see it brighten and swell as it fills — keep holding until it locks. Holding never "resets," so a pause is fine.<br><br>' +
        `<b>The breathing ring.</b> After a few seconds at a lock (or while settling at the gate) a soft ring fades in to <b>pace your breath</b> — ` +
        'follow it in and out. This slow breathing is what raises your heart-rhythm above your resting baseline, settling you so locks charge and the gate opens. ' +
        'It is only a guide — never required (see “The breathing patterns” below).<br><br>' +
        '<b>Harmonic bridges</b>: these solidify as you settle. The calmer you are, the more solid the path — then walk across. If you slip off, you are gently returned, never hurt.') +

      sec('The breathing patterns',
        'Each regime has its own pace, shown on the breathing ring with its name. Breathe along — in as the ring grows, out as it shrinks:' +
        '<div style="margin-top:0.5rem;line-height:1.9">' +
        '<span style="color:#e0a06a">●</span> <b>GUT — Grounding breath:</b> in for 4, out for 6. A long, slow exhale to settle and ground.<br>' +
        '<span style="color:#e87aa0">●</span> <b>HEART — Resonance breath:</b> in for 5½, out for 5½. The balanced ~5–6 breaths-a-minute pace that most steadies the heart.<br>' +
        '<span style="color:#b48ee8">●</span> <b>HEAD — Even breath:</b> in 4 · hold 4 · out 4 · hold 4. An even “box” breath for calm clarity.' +
        '</div><br>' +
        'The colour and pace match the node you are in. None of it is timed or scored — if a pace doesn’t suit you, breathe however feels easy; the ring is just an offer.') +

      sec('Finding your way',
        `${key('M')} enter / leave meditation &nbsp;·&nbsp; <b>hold ${key('F')}</b> charge a resonance lock &nbsp;·&nbsp; ` +
        `${key('C')} open the Lo Shu cube map (see all 27 nodes and your progress) &nbsp;·&nbsp; ` +
        `${key('V')} your session metrics &nbsp;·&nbsp; ${key('Esc')} pause.`) +

      sec('The frequencies',
        'Each node is tuned to one of the 27 Aetheria frequencies. They are <i>felt more than heard</i> — a low, grounding tone. ' +
        'Best on headphones or a subwoofer, but they work on any speaker. With a Muse, your own brain rhythms choose which frequency the Field tunes to. ' +
        `Without a headset you choose it yourself with the number keys ${key('1')}–${key('9')}.`) +

      sec('Playing without sensors — Manual Mode',
        'A complete path, never a lesser one. The game reads your <b>settling from how you play</b>: holding still, slow movement, and entering meditation all deepen it. ' +
        `Pick frequencies with ${key('1')}–${key('9')}, hold ${key('F')} on locks, and breathe. Everything in the game is reachable this way.`) +

      sec('Adding the Muse S Athena (EEG headband)',
        '<b>Your brain chooses the frequency.</b> The Field listens to your brain rhythms and automatically tunes each node to meet the state you are in — you no longer pick numbers by hand. ' +
        'Its motion sensor also reads how physically still you are, which helps gate settling. Its optical sensors add heart rate and blood-oxygen depth to your <i>session metrics</i>. ' +
        'It makes the Field feel responsive to you, not just your keys.') +

      sec('Adding the Polar H10 (heart strap)',
        '<b>The deepest settle signal.</b> It measures your heart-rhythm variability and compares it to your own baseline from the opening breath. ' +
        'Slow, easy breathing raises it — and that is what most directly tells the Field you have settled, opening gates and bridges. ' +
        'When the Polar is connected it leads; the others support it. It is the most direct, validated read of the body settling.') +

      sec('Using both together',
        'The richest experience: the <b>Muse chooses</b> the frequency for where your mind is, while the <b>Polar gates</b> the settling from your heart. ' +
        'Every signal is recorded for your session metrics (' + key('V') + ') as honest, raw data — never a grade. ' +
        'If a sensor drops out mid-journey, reconnect it any time from <b>Pause → Sensors</b>; the Field falls back gracefully until it returns.') +

      sec('A gentle promise',
        'This was made as a calm place — for veterans and anyone who needs one. Go slowly. Rest when you like. ' +
        'You cannot do it wrong, and every node will open in time.');

    this.panel.appendChild(scroll);
    const backBtn = this.btn('Back', true);
    backBtn.style.marginTop = '1rem';
    backBtn.onclick = back;
    this.panel.appendChild(backBtn);
    this.show();
  }

  showCredits(back: () => void): void {
    this.mainVisible = false;
    this.panel.innerHTML =
      '<div style="font-weight:300;letter-spacing:0.16em;font-size:1.4rem;margin-bottom:1rem">Credits</div>' +
      '<div style="line-height:1.9;opacity:0.85;font-size:0.95rem">' +
      'Joseph (Jobo) Lewis — Creative Director / Lead Designer<br>' +
      'Alisha Lewis — Narrative Director / Co-Designer<br>' +
      'Aetheria Foundation — Mountain Home, Idaho<br><br>' +
      'Frequencies from the Aetheria Guidebook.<br>' +
      'Signal &amp; honesty guidance: Selah.<br>' +
      'Built with Three.js · A = 432 Hz · made for veterans.' +
      '</div>';
    const backBtn = this.btn('Back', true);
    backBtn.style.marginTop = '1.2rem';
    backBtn.onclick = back;
    this.panel.appendChild(backBtn);
    this.show();
  }
}
