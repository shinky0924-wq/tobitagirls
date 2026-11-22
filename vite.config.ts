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
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('data/blogArticles.json')) {
              return 'blog-articles-data';
            }
            if (id.includes('node_modules/firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-lucide';
            }
          },
        },
      },
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
