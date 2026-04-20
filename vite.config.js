import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Configure Vite build and dev server.
 * @complexity O(1) time logic for configuration setup.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  }
});
