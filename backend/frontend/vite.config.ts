import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1500 // Increase default 500KB limit to 1500KB
  }
});
