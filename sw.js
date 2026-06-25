/**
 * Aetheria Voxel — offline service worker.
 *
 * Goal: visit once, then the WHOLE app runs with no network. At install we read
 * `sw-manifest.json` (emitted at build time) and precache every asset — the
 * hashed JS/CSS, the mesher worker, and the public/ data — so a single visit is
 * enough even before the worker controls the page. We also cache every
 * same-origin GET as it's fetched, as a backstop. Navigations are network-first
 * (fresh when online) with a cached index.html fallback so the app boots offline.
 *
 * The cache name carries the app version (passed as ?v=… on registration), so a
 * new release activates a fresh cache and old ones are pruned.
 */
const VERSION = new URL(self.location).searchParams.get('v') || 'dev';
const CACHE = 'aetheria-' + VERSION;
const INDEX = './index.html';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      let list = ['./', INDEX];
      try {
        const res = await fetch('./sw-manifest.json?v=' + VERSION, { cache: 'no-cache' });
        if (res.ok) list = await res.json();
      } catch {
        /* fall back to the shell + runtime caching */
      }
      // Add individually so one missing asset can't abort the whole precache.
      await Promise.all(list.map((u) => cache.add(u).catch(() => {})));
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith('aetheria-') && k !== CACHE).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // only our own assets

  // Navigations: try the network (stay current), fall back to the cached shell.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const c = await caches.open(CACHE);
          c.put(INDEX, fresh.clone());
          return fresh;
        } catch {
          const c = await caches.open(CACHE);
          return (await c.match(INDEX)) || (await c.match('./')) || Response.error();
        }
      })(),
    );
    return;
  }

  // Assets: cache-first (build assets are content-hashed → immutable), and
  // populate the cache on first fetch so the next load works offline.
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.status === 200 && fresh.type !== 'opaque') {
          const c = await caches.open(CACHE);
          c.put(req, fresh.clone());
        }
        return fresh;
      } catch {
        return cached || Response.error();
      }
    })(),
  );
});
