import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			formats: ['es'],
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'StraboSDK',
			fileName: 'index',
		},
		rollupOptions: {
			external: ['axios'],
		}
	},

	plugins: [dts()]
})
