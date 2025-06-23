import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/styles': path.resolve(__dirname, 'src/assets/styles'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/types': path.resolve(__dirname, 'src/types'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '**/*.d.ts',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    },
  },
});
