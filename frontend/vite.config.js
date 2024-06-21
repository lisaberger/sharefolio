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
                './src/i18n/locales/**'
            ),
            runtimeOnly: false, // This ensures runtime i18n support
        }),
    ],
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
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
});
