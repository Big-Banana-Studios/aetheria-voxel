import { defineConfig } from 'vite';

// Aetheria Voxel — static build for GitHub Pages.
// `base` is relative so the bundle works under a project subpath
// (e.g. https://user.github.io/aetheria-voxel/) as well as a custom domain.
export default defineConfig({
  base: './',
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
