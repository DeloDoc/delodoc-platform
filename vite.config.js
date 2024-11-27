import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

const plugins = [react()];

if (process.env.ANALYZE) {
    plugins.push(analyzer());
}

export default defineConfig({
    plugins,
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
            },
        },
    },
});
