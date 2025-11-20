// frontend/vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is necessary to properly handle cross-origin requests
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true, // Rewrites the Origin header
        secure: false,      // Allows connection without SSL/TLS
        // Fix: Ensure the path is rewritten correctly if needed, 
        // though typically /api/ is enough when the target is port:5000
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});