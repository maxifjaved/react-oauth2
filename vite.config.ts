import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    root: 'example',
    build: {
        outDir: 'dist/example',
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
}); 