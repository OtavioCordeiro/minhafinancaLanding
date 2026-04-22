import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react(), mdx()],
  site: 'https://minhafinanca.com.br',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.BACKEND_TARGET ?? 'https://localhost:7182',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
});
