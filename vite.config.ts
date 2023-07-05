import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (mode === 'dev') {
    return {
      // dev specific config
      plugins: [react()],
      build: {
        minify: false
      }
    };
  } else {
    // command === 'build'
    return {
      // build specific config
      plugins: [react()]
    };
  }
});
