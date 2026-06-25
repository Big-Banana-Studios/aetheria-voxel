import { defineConfig, type Plugin } from 'vite';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

// App version (single source of truth: package.json) — exposed to the app for
// the title-screen label and to the service worker for cache-busting.
const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

// Emit `sw-manifest.json` listing every asset to precache, so a single visit
// caches the WHOLE app (hashed JS/CSS, the mesher worker, and public/ data) for
// true offline use — not just whatever the first uncontrolled load happened to
// fetch. The service worker reads this list at install time.
function swManifest(): Plugin {
  const walk = (dir: string, base: string, out: string[]) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full, base, out);
      else out.push('./' + relative(base, full).split('\\').join('/'));
    }
  };
  return {
    name: 'aetheria-sw-manifest',
    apply: 'build',
    generateBundle(_options, bundle) {
      // Built (hashed) outputs — skip sourcemaps; they're dev-only and large.
      const built = Object.keys(bundle)
        .filter((f) => !f.endsWith('.map'))
        .map((f) => './' + f);
      // Static files copied from public/ (e.g. data/*.json), minus the SW itself.
      const publicDir = fileURLToPath(new URL('./public', import.meta.url));
      const pub: string[] = [];
      try {
        walk(publicDir, publicDir, pub);
      } catch {
        /* no public dir */
      }
      const list = ['./', './index.html', ...built, ...pub.filter((p) => p !== './sw.js')];
      this.emitFile({
        type: 'asset',
        fileName: 'sw-manifest.json',
        source: JSON.stringify([...new Set(list)]),
      });
    },
  };
}

// Aetheria Voxel — static build for GitHub Pages.
// `base` is relative so the bundle works under a project subpath
// (e.g. https://user.github.io/aetheria-voxel/) as well as a custom domain.
export default defineConfig({
  base: './',
  plugins: [swManifest()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
  },
  worker: {
    format: 'es',
  },
  server: {
    host: 'localhost',
    port: 5173,
  },
});
