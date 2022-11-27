import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias:
    { '@':      fileURLToPath(new URL('./src/assets',                  import.meta.url)),
      'config': fileURLToPath(new URL('./src/assets/css/_config.scss', import.meta.url)),
      '/css':   fileURLToPath(new URL('./src/assets/css',              import.meta.url)),
    }
  }
})
