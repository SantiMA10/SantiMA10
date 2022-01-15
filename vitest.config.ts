/// <reference types="vitest" />

import { defineConfig } from 'vite';

export default defineConfig({
	test: {
		environment: 'node',
		global: true,
		setupFiles: ['./test/setup.ts'],
	},
});
