import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './src/admin/index.tsx',
      output: {
        entryFileNames: 'admin.bundle.js',
        assetFileNames: 'admin.styles.css'
      }
    },
    outDir: 'build',
    assetsDir: '',
    emptyOutDir: true
  }
});
