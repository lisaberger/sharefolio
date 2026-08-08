import { fileURLToPath, URL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin({
            include: resolve(
                dirname(fileURLToPath(import.meta.url)),
                './src/**/*.vue'
            ),
            runtimeOnly: false, // This ensures runtime i18n support
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
            '@core': fileURLToPath(new URL('./src/core', import.meta.url)),
            '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
            '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        },
    },
    server: {
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
    build: {
        target: 'esnext',
    },
});
