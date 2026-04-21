import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isSingleFile = process.env.VITE_SINGLE_FILE === 'true';
  const plugins = [react(), tailwindcss()];

  if (isSingleFile) {
    plugins.push(viteSingleFile());
  } else {
    // Only use PWA if not building a single exported file. (PWA needs separate SW + HTML + JS files to work locally/web)
    plugins.push(
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['logo.svg', 'apple-touch-icon.png'],
        manifest: {
          name: 'Real Casa F.C.',
          short_name: 'RealCasa',
          description: 'Sistema de Gestão Esportiva R.C.F.C',
          theme_color: '#020204',
          background_color: '#020204',
          display: 'standalone',
          icons: [
            {
              src: 'logo.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml'
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'unsplash-images',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    );
  }

  return {
    base: './',
    plugins,
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
    },
    css: {
      postcss: {}
    },
    build: {
      target: 'es2022',
      ...(isSingleFile ? {} : {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            }
          }
        }
      })
    }
  };
});
