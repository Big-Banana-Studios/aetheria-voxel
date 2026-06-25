/**
 * PWA install affordance. The app is installable via the manifest + service
 * worker regardless (browsers offer their own "Install app" UI). This just
 * captures the `beforeinstallprompt` event so we can surface a tidy in-app
 * "Install" button on the title screen, and fires an event so the menu can
 * show/hide that button reactively.
 */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

let deferred: BeforeInstallPromptEvent | null = null;

export function initInstall(): void {
  if (typeof window === 'undefined') return;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // keep the default mini-infobar from popping; we offer our own button
    deferred = e as BeforeInstallPromptEvent;
    window.dispatchEvent(new CustomEvent('aetheria:installable'));
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    window.dispatchEvent(new CustomEvent('aetheria:installable'));
  });
}

/** True if the page is already running as an installed app. */
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as { standalone?: boolean }).standalone === true
  );
}

/** True if we can offer our own install button right now. */
export function canInstall(): boolean {
  return !!deferred && !isStandalone();
}

/** Trigger the native install prompt. Returns true if the user accepted. */
export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;
  deferred.prompt();
  const choice = await deferred.userChoice.catch(() => null);
  deferred = null;
  window.dispatchEvent(new CustomEvent('aetheria:installable'));
  return choice?.outcome === 'accepted';
}
