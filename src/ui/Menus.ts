/**
 * Menus — shell screens (Section 9.2 / Phase 7): main menu, settings, credits,
 * and an in-game pause overlay. Level selection reuses the Lo Shu cube map
 * (press C in game), so there is no separate level grid here.
 *
 * Sacred-geometry aesthetic; calm; accessibility-first settings (Section 14).
 */
import type { Settings, SettingsData, Difficulty } from '../core/Settings';
import type { SaveSystem } from '../core/SaveSystem';

export interface MenuCallbacks {
  onEnter: () => void; // begin / continue → sensor choice
  onResume: () => void;
  onMainMenu: () => void; // return to title from pause
}

export class MenuSystem {
  private overlay: HTMLDivElement;
  private panel: HTMLDivElement;

  constructor(
    private root: HTMLElement,
    private settings: Settings,
    private save: SaveSystem,
    private cb: MenuCallbacks,
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
  }

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
  hide(): void { this.overlay.style.display = 'none'; }

  showMain(): void {
    this.panel.innerHTML = '';
    this.panel.appendChild(this.title());
    const completed = this.save.data.levelsCompleted;
    const enter = this.btn(completed > 0 ? 'Continue the Journey' : 'Enter the Field', true);
    enter.onclick = () => this.cb.onEnter();
    const settings = this.btn('Settings');
    settings.onclick = () => this.showSettings(() => this.showMain());
    const credits = this.btn('Credits');
    credits.onclick = () => this.showCredits(() => this.showMain());
    this.panel.append(enter, settings, credits);
    if (completed > 0) {
      const note = document.createElement('div');
      note.style.cssText = 'margin-top:14px;opacity:0.5;font-size:0.85rem';
      note.textContent = `${completed}/27 nodes restored · press C in the Field for the map`;
      this.panel.appendChild(note);
    }
    this.show();
  }

  showPause(): void {
    this.panel.innerHTML = '';
    const h = document.createElement('div');
    h.style.cssText = 'font-weight:300;letter-spacing:0.16em;font-size:1.5rem;margin-bottom:1rem';
    h.textContent = 'Paused';
    this.panel.appendChild(h);
    const resume = this.btn('Resume', true);
    resume.onclick = () => this.cb.onResume();
    const settings = this.btn('Settings');
    settings.onclick = () => this.showSettings(() => this.showPause());
    const main = this.btn('Return to Title');
    main.onclick = () => this.cb.onMainMenu();
    this.panel.append(resume, settings, main);
    this.show();
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

  showCredits(back: () => void): void {
    this.panel.innerHTML = '';
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
