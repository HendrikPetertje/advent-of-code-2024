console.log('hello world');

import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: { index: 'src/main.ts' },
      name: 'Advent2024',
    },
  },
  plugins: [
    dts({
      tsconfigPath: 'tsconfig.json',
      include: 'src',
      rollupTypes: true,
    }),
  ],
  test: {
    clearMocks: true,
    globals: true,
    include: ['./src/**/*.test.ts'],
    reporters: ['default'],
  },
});
