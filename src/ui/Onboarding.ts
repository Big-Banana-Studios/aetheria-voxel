/**
 * Onboarding — the first-launch welcome (Task 1 of the Narrative Director's
 * Onboarding & Mobile guide, June 2026).
 *
 * Why this exists: Aetheria is a calming app, and a person cannot settle while
 * they are confused or locked out. A cold first-play showed the build assumed the
 * player already knew what the game is, was on a keyboard, and had found the
 * How-to-Play by hunting. This welcome fixes all three: it comes to the player
 * automatically on first launch, speaks in plain warm language (no jargon — no
 * "resonance locks," "regimes," "coherence"), and shows the controls that match
 * the device they are actually on.
 *
 * Shape: 3 short cards + a closing line, "Skip" always visible, and a
 * "Don't show this again" on the last card. Shown once (remembered), and kept
 * reachable later from the menu so returning players can re-read it.
 *
 * Voice & honesty: lead with feeling and goal, never mechanism; "relax / breathe
 * / settle / crystals / gates / levels / calm"; "you can never get stuck"; no
 * medical or brain-state claims.
 */
import { hasTouch } from './TouchControls';

const SEEN_KEY = 'aetheria_onboarded_v1';

interface Card {
  html: string;
}

export class Onboarding {
  private overlay: HTMLDivElement;
  private panel: HTMLDivElement;
  private body: HTMLDivElement;
  private dots: HTMLDivElement;
  private nextBtn: HTMLButtonElement;
  private skipBtn: HTMLButtonElement;
  private closing: HTMLDivElement;
  private dontShowWrap: HTMLLabelElement;
  private dontShow: HTMLInputElement;

  private cards: Card[] = [];
  private index = 0;
  private onClose?: () => void;

  constructor(private root: HTMLElement) {
    this.overlay = document.createElement('div');
    // Above the menus (z 40) so it greets the player over the title on first run.
    // Scrollable + centering: the panel centers when there's room, but on a short
    // viewport (phone in landscape) the overlay scrolls instead of clipping cards.
    this.overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:50', 'display:none',
      'flex-direction:column', 'align-items:center', 'justify-content:flex-start',
      'overflow-y:auto', 'overscroll-behavior:contain', '-webkit-overflow-scrolling:touch',
      'padding:24px 16px',
      'background:radial-gradient(circle at center, rgba(20,12,34,0.92), rgba(8,5,16,0.98))',
      'pointer-events:auto', 'font-family:"Segoe UI",system-ui,sans-serif', 'color:#e8e0f0',
    ].join(';');

    this.panel = document.createElement('div');
    this.panel.style.cssText =
      'width:100%;max-width:440px;margin:auto 0;text-align:center;display:flex;flex-direction:column;align-items:stretch;';

    this.body = document.createElement('div');
    this.body.style.cssText =
      'min-height:200px;font:300 1rem/1.6 "Segoe UI",system-ui,sans-serif;' +
      'display:flex;flex-direction:column;justify-content:center;';

    // Progress dots.
    this.dots = document.createElement('div');
    this.dots.style.cssText = 'display:flex;gap:8px;justify-content:center;margin:18px 0 6px;';

    // Closing line, shown under the last card.
    this.closing = document.createElement('div');
    this.closing.style.cssText =
      'opacity:0;transition:opacity 0.4s ease;margin-top:10px;font-style:italic;opacity:0.7;font-size:0.9rem;';
    this.closing.textContent = 'Take your time. There’s no wrong way to be here.';

    // "Don't show this again" — only meaningful on the last card.
    this.dontShowWrap = document.createElement('label');
    this.dontShowWrap.style.cssText =
      'display:none;align-items:center;justify-content:center;gap:8px;margin-top:14px;' +
      'font-size:0.85rem;opacity:0.75;cursor:pointer;user-select:none;';
    this.dontShow = document.createElement('input');
    this.dontShow.type = 'checkbox';
    this.dontShow.checked = true; // default: respect that they've now seen it
    this.dontShow.style.cssText = 'accent-color:#b48ee8;width:16px;height:16px;cursor:pointer;';
    const dsLabel = document.createElement('span');
    dsLabel.textContent = "Don’t show this again";
    this.dontShowWrap.append(this.dontShow, dsLabel);

    // Controls row: Skip (always) + Next / Begin.
    const controls = document.createElement('div');
    controls.style.cssText =
      'display:flex;gap:12px;align-items:center;justify-content:space-between;margin-top:8px;';
    this.skipBtn = this.button('Skip', false);
    this.skipBtn.style.flex = '0 0 auto';
    this.skipBtn.onclick = () => this.finish();
    this.nextBtn = this.button('Next', true);
    this.nextBtn.style.flex = '1 1 auto';
    this.nextBtn.onclick = () => this.advance();
    controls.append(this.skipBtn, this.nextBtn);

    this.panel.append(this.body, this.dots, this.closing, this.dontShowWrap, controls);
    this.overlay.appendChild(this.panel);
    this.root.appendChild(this.overlay);
  }

  private button(label: string, primary: boolean): HTMLButtonElement {
    const b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = [
      'padding:12px 22px', 'border-radius:26px', 'border:1px solid rgba(180,142,232,0.5)',
      `background:${primary ? 'rgba(180,142,232,0.22)' : 'rgba(20,12,34,0.6)'}`,
      'color:#e8e0f0', 'font:300 1rem "Segoe UI",sans-serif', 'letter-spacing:0.04em',
      'cursor:pointer',
    ].join(';');
    return b;
  }

  /** Auto-show on first launch only (remembered via localStorage). */
  maybeShow(onClose?: () => void): void {
    let seen = false;
    try {
      seen = !!localStorage.getItem(SEEN_KEY);
    } catch {
      /* private mode / blocked storage — just show it */
    }
    if (!seen) this.show(onClose);
  }

  /** Force-show (from the menu) so a returning player can re-read the welcome. */
  show(onClose?: () => void): void {
    this.onClose = onClose;
    this.cards = this.buildCards(hasTouch());
    this.index = 0;
    this.renderDots();
    this.renderCard();
    this.overlay.style.display = 'flex';
  }

  private buildCards(touch: boolean): Card[] {
    const card1 =
      '<div style="font-weight:300;letter-spacing:0.18em;font-size:2rem;text-transform:uppercase;' +
      'text-shadow:0 0 24px rgba(180,142,232,0.5)">Welcome to Aetheria</div>' +
      '<div style="opacity:0.65;margin:0.3rem 0 1.3rem;letter-spacing:0.08em">Resonance of the Spheres</div>' +
      '<p style="opacity:0.92;margin:0">Your only task is to relax while staying gently engaged. ' +
      'There’s nothing to fight, no way to lose, and no clock — just a quiet place to breathe.</p>';

    const card2 =
      this.heading('Wake the crystals') +
      '<p style="opacity:0.92;margin:0 0 0.9rem">Twenty-seven crystals have gone quiet. Find one, sit with it, ' +
      'and breathe. As you settle, the crystal wakes and its gate opens — and you rise, one level at a time, ' +
      'through all twenty-seven.</p>' +
      '<p style="opacity:0.92;margin:0">If you can’t quite settle, that’s okay. Given a little time, every gate ' +
      'opens on its own. <b>You can never get stuck.</b></p>';

    // Card 3 — controls that match the device (the copy follows the real code).
    const card3 = touch
      ? this.heading('Finding your way') +
        '<div style="text-align:left;opacity:0.92;margin:0 auto;max-width:340px">' +
        '<p style="margin:0 0 0.7rem"><b>Look around:</b> drag on the screen, or gently tilt your phone ' +
        '(you can turn tilt off anytime).</p>' +
        '<p style="margin:0 0 0.7rem"><b>Move:</b> the circle at the bottom-left — slide your thumb the way you want to go.</p>' +
        '<p style="margin:0 0 0.7rem"><b>Sit with a crystal:</b> walk up close, then tap <b>Meditate</b> and just breathe with the ring.</p>' +
        '<p style="margin:0"><b>Wake a crystal:</b> stand near it and hold <b>Focus</b> until it brightens.</p>' +
        '</div>' +
        '<p style="opacity:0.7;margin:1rem 0 0">Turn your phone sideways for the fullest view. 🌿</p>'
      : this.heading('Finding your way') +
        '<div style="text-align:left;opacity:0.92;margin:0 auto;max-width:340px;line-height:1.9">' +
        '<div><b>Move:</b> W A S D or the arrow keys.</div>' +
        '<div><b>Look:</b> your mouse.</div>' +
        '<div><b>Sit and breathe:</b> press <b>M</b>.</div>' +
        '<div><b>Settle into a crystal:</b> hold <b>F</b>.</div>' +
        '<div><b>Map:</b> C&nbsp;&nbsp;·&nbsp;&nbsp;<b>Pause:</b> Esc</div>' +
        '</div>';

    // Optional 4th card — sensors, kept light and clearly optional.
    const card4 =
      this.heading('Going deeper (optional)') +
      '<p style="opacity:0.92;margin:0">If you have a Muse headband or a Polar heart-rate strap, connect it ' +
      'from the Pause menu to let your breath and body guide the experience. But you need nothing here except yourself.</p>';

    return [{ html: card1 }, { html: card2 }, { html: card3 }, { html: card4 }];
  }

  private heading(text: string): string {
    return `<div style="color:#c4a8ec;font-weight:300;letter-spacing:0.06em;font-size:1.4rem;margin-bottom:0.9rem">${text}</div>`;
  }

  private renderCard(): void {
    this.body.innerHTML = this.cards[this.index].html;
    const last = this.index === this.cards.length - 1;
    this.nextBtn.textContent = last ? 'Begin' : 'Next';
    this.closing.style.opacity = last ? '0.7' : '0';
    this.dontShowWrap.style.display = last ? 'flex' : 'none';
    this.renderDots();
  }

  private renderDots(): void {
    this.dots.innerHTML = '';
    for (let i = 0; i < this.cards.length; i++) {
      const d = document.createElement('div');
      const active = i === this.index;
      d.style.cssText =
        `width:8px;height:8px;border-radius:50%;transition:all 0.2s ease;` +
        `background:${active ? '#b48ee8' : 'rgba(180,142,232,0.3)'};` +
        `box-shadow:${active ? '0 0 8px rgba(180,142,232,0.7)' : 'none'};`;
      this.dots.appendChild(d);
    }
  }

  private advance(): void {
    if (this.index < this.cards.length - 1) {
      this.index++;
      this.renderCard();
    } else {
      this.finish();
    }
  }

  /** Close, remembering the dismissal if "don't show again" is checked (it is by
   *  default once they reach the last card; Skip always remembers so we never nag). */
  private finish(): void {
    const remember = this.index < this.cards.length - 1 ? true : this.dontShow.checked;
    if (remember) {
      try {
        localStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* ignore */
      }
    }
    this.overlay.style.display = 'none';
    this.onClose?.();
    this.onClose = undefined;
  }
}
