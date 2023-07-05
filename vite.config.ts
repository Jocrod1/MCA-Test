import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
