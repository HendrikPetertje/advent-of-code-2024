import { defineConfig } from 'vitest/config';
import path from 'path';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: { index: path.resolve(__dirname, './lib/index.ts') },
      name: 'advent-2024',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
  },
  plugins: [
    dtsPlugin({
      tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
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
