import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/styles': path.resolve(__dirname, 'src/assets/styles'),
    },
  },
  build: {
    cssCodeSplit: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.resolve(__dirname, 'src/assets/styles/helpers')}" as *;`,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});