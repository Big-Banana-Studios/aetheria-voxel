/**
 * Aetheria: Resonance of the Spheres — Voxel Edition
 * Entry point. Boots the Game and opens the main menu (Section 9.2).
 */
import { Game } from './core/Game';

async function boot() {
  const canvas = document.getElementById('scene') as HTMLCanvasElement;
  const hud = document.getElementById('hud') as HTMLDivElement;
  const loading = document.getElementById('loading') as HTMLDivElement;
  const clickToPlay = document.getElementById('click-to-play') as HTMLDivElement;

  if (!canvas || !hud) {
    throw new Error('Aetheria: required DOM elements missing.');
  }

  const game = new Game({ canvas, hud });
  await game.init();

  // The MenuSystem replaces the old click-to-play gate.
  loading.classList.add('hidden');
  clickToPlay.remove();

  game.start();
  game.showMainMenu();

  // Expose for debugging in the console.
  (window as unknown as { aetheria: Game }).aetheria = game;
}

boot().catch((err) => {
  console.error('[Aetheria] Boot failed:', err);
  const loading = document.getElementById('loading');
  if (loading) {
    loading.textContent = 'The Field could not awaken. See console.';
    loading.style.color = '#e88e8e';
  }
});
