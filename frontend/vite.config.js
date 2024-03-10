import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            config: fileURLToPath(
                new URL('./src/assets/css/_variables.scss', import.meta.url)
            ),
            '/css': fileURLToPath(new URL('./src/assets/css', import.meta.url)),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
});
