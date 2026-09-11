import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This project lives under a Windows folder that is reparsed to another
  // location. Left alone, Vite resolves module ids to the real path, decides
  // they sit outside the project root, and refuses to read them — so source
  // files get served untransformed. Keeping the ids as written fixes it and is
  // harmless anywhere else.
  resolve: { preserveSymlinks: true },
  server: { fs: { strict: false } },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          router: ['react-router-dom'],
        },
      },
    },
  },
});
