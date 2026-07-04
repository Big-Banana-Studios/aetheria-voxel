/**
 * Disclaimer — the first-launch acknowledgment gate (shown once, remembered).
 *
 * Why this exists: Aetheria plays low-frequency tones and pulsing light to
 * veterans and people with TBI/PTSD. Before any of that reaches a player they
 * must see, in plain language, what this is and — just as important — what it is
 * NOT. This screen honours the honest-claims rule: it makes no medical or
 * brain-state claim, promises no cure, and says outright that the sensors measure
 * bodily settling, never "coherence" or attainment.
 *
 * Shape: one scrollable card, a required "I've read and understand" checkbox, and
 * an Enter button that only lights once the box is ticked. Shown before the
 * welcome on first launch; kept reachable from the menu (About / re-read).
 *
 * Voice: calm, honest, non-clinical. No fear, no hype, no diagnosis.
 */
const SEEN_KEY = 'aetheria_disclaimer_v1';

export class Disclaimer {
  private overlay: HTMLDivElement;
  private panel: HTMLDivElement;
  private agree: HTMLInputElement;
  private enterBtn: HTMLButtonElement;
  private onClose?: () => void;

  constructor(private root: HTMLElement) {
    this.overlay = document.createElement('div');
    // Above the menus AND the welcome (z 60) — it is the very first thing seen.
    this.overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:60', 'display:none',
      'flex-direction:column', 'align-items:center', 'justify-content:flex-start',
      'overflow-y:auto', 'overscroll-behavior:contain', '-webkit-overflow-scrolling:touch',
      'padding:24px 16px',
      'background:radial-gradient(circle at center, rgba(18,10,30,0.96), rgba(6,4,12,0.99))',
      'pointer-events:auto', 'font-family:"Segoe UI",system-ui,sans-serif', 'color:#e8e0f0',
    ].join(';');

    this.panel = document.createElement('div');
    this.panel.style.cssText =
      'width:100%;max-width:520px;margin:auto 0;display:flex;flex-direction:column;align-items:stretch;';

    const title = document.createElement('div');
    title.style.cssText =
      'font-weight:300;letter-spacing:0.14em;font-size:1.5rem;text-transform:uppercase;text-align:center;' +
      'text-shadow:0 0 24px rgba(180,142,232,0.45);margin-bottom:0.3rem;';
    title.textContent = 'Before you begin';

    const sub = document.createElement('div');
    sub.style.cssText = 'opacity:0.6;text-align:center;letter-spacing:0.06em;margin-bottom:1.4rem;font-size:0.9rem;';
    sub.textContent = 'A calm place — and an honest one.';

    const body = document.createElement('div');
    body.style.cssText =
      'font:300 0.98rem/1.65 "Segoe UI",system-ui,sans-serif;text-align:left;' +
      'background:rgba(255,255,255,0.03);border:1px solid rgba(180,142,232,0.18);' +
      'border-radius:14px;padding:18px 20px;';
    body.innerHTML = this.copy();

    // Required acknowledgment.
    const agreeWrap = document.createElement('label');
    agreeWrap.style.cssText =
      'display:flex;align-items:flex-start;gap:10px;margin:18px 2px 4px;' +
      'font-size:0.92rem;line-height:1.5;cursor:pointer;user-select:none;';
    this.agree = document.createElement('input');
    this.agree.type = 'checkbox';
    this.agree.style.cssText = 'accent-color:#b48ee8;width:18px;height:18px;margin-top:2px;flex:0 0 auto;cursor:pointer;';
    const agreeText = document.createElement('span');
    agreeText.innerHTML =
      'I’ve read the above. I understand this is a wellness and contemplative tool, ' +
      '<b>not medical care</b>, and I’ll stop if anything feels unwell.';
    agreeWrap.append(this.agree, agreeText);

    // Enter button — disabled until the box is ticked.
    this.enterBtn = document.createElement('button');
    this.enterBtn.textContent = 'Enter Aetheria';
    this.enterBtn.disabled = true;
    this.enterBtn.style.cssText = this.btnCss(false);
    this.enterBtn.onclick = () => { if (!this.enterBtn.disabled) this.accept(); };

    this.agree.addEventListener('change', () => {
      const on = this.agree.checked;
      this.enterBtn.disabled = !on;
      this.enterBtn.style.cssText = this.btnCss(on);
    });

    this.panel.append(title, sub, body, agreeWrap, this.enterBtn);
    this.overlay.appendChild(this.panel);
    this.root.appendChild(this.overlay);
  }

  private btnCss(enabled: boolean): string {
    return [
      'margin-top:16px', 'padding:13px 24px', 'border-radius:26px',
      `border:1px solid rgba(180,142,232,${enabled ? '0.6' : '0.25'})`,
      `background:${enabled ? 'rgba(180,142,232,0.24)' : 'rgba(20,12,34,0.4)'}`,
      `color:${enabled ? '#f0eaf8' : 'rgba(232,224,240,0.4)'}`,
      'font:300 1.05rem "Segoe UI",sans-serif', 'letter-spacing:0.05em',
      `cursor:${enabled ? 'pointer' : 'default'}`, 'transition:all 0.25s ease',
    ].join(';');
  }

  private copy(): string {
    return (
      '<p style="margin:0 0 0.9rem"><b>What this is.</b> Aetheria is a quiet game for relaxation and ' +
      'contemplation. It plays gentle, low tuned tones (felt more than heard) and soft, slow visuals while ' +
      'you explore and breathe. Nothing here is a test, and there is no way to lose.</p>' +

      '<p style="margin:0 0 0.9rem"><b>What it is not.</b> It is <b>not a medical device</b> and does not ' +
      'diagnose, treat, cure, or prevent any condition. It is not therapy and not a substitute for ' +
      'professional care. If you are working with a clinician, keep doing so.</p>' +

      '<p style="margin:0 0 0.9rem"><b>What the sensors do.</b> If you connect a headband or heart-rate ' +
      'strap, they simply reflect your body <i>settling</i> — your breath and heart easing. They never ' +
      'score you, rate your brain, or measure how “deep” you got. No sensor is required; the experience is ' +
      'whole without one.</p>' +

      '<p style="margin:0 0 0.9rem"><b>Please take care.</b> The visuals include soft pulsing light. If you ' +
      'have photosensitive epilepsy, or are sensitive to flashing light or low-frequency sound, please be ' +
      'cautious — you can reduce motion and flashes in Settings. Use comfortable volume; headphones or a ' +
      'subwoofer are best but never loud. Don’t use while driving or operating machinery.</p>' +

      '<p style="margin:0"><b>If anything feels wrong</b> — dizziness, discomfort, distress — gently stop and ' +
      'rest. Take breaks. There is no wrong way to be here, and no reason to push.</p>'
    );
  }

  /** Show on first launch only; returns true if it was shown (still to be accepted). */
  maybeShow(onClose?: () => void): boolean {
    let seen = false;
    try { seen = !!localStorage.getItem(SEEN_KEY); } catch { /* blocked storage — show it */ }
    if (seen) return false;
    this.show(onClose);
    return true;
  }

  /** Force-show (from the menu) so a player can re-read it; no gate on re-read. */
  show(onClose?: () => void): void {
    this.onClose = onClose;
    // On a re-read the box may already be irrelevant, but keep the flow identical.
    this.overlay.style.display = 'flex';
    this.overlay.scrollTop = 0;
  }

  private accept(): void {
    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ }
    this.overlay.style.display = 'none';
    const cb = this.onClose;
    this.onClose = undefined;
    cb?.();
  }

  get isVisible(): boolean {
    return this.overlay.style.display !== 'none';
  }
}
