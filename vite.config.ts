import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'JanAQI - Breathe the Future',
        short_name: 'JanAQI',
        description: 'India\'s Public Air Quality App',
        theme_color: '#00C853',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            // Cache API requests using StaleWhileRevalidate so it works offline
            urlPattern: /^https:\/\/.*\/api\/v2\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'vayu-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Aggressively cache map tiles (MapLibre/Carto/Satellite)
            urlPattern: /^https:\/\/[a-z]\.basemaps\.cartocdn\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Point 92: Implement Webpack/Vite Bundle Anonymization
  build: {
    sourcemap: false, // Completely strip out development paths and source mappings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Strip away internal code comments and logs
        drop_debugger: true,
      },
      format: {
        comments: false,
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'; // Core React libraries
            }
            if (id.includes('recharts')) {
              return 'charts'; // Data Visualization
            }
            if (id.includes('leaflet') || id.includes('maplibre-gl')) {
              return 'maps'; // Geospatial Engine
            }
          }
        }
      }
    }
  }
}));
