import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
      emptyOutDir: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      allowedHosts: true as const,
      cors: true,
      hmr: false,
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/public/images/**', '**/public/assets/**', '**/src/assets/**', '**/dist/**', '**/.aistudio/**'],
      },
    },
  };
});
