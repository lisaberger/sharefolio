/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            coverage: {
                provider: 'istanbul', // or 'v8'
            },
            setupFiles: ['./src/ui/test-utils/vitest-setup.ts'],
        },
    })
);
