import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/population-chart/',
  plugins: [vanillaExtractPlugin(), react()],
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
    },
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    includeSource: ['src/**/*.{ts,tsx}'],
    environment: 'happy-dom',
    globals: true,
    setupFiles: 'src/test/setup.ts',
    deps: {
      fallbackCJS: true,
    },
  },
});
