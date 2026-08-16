import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: '@actview/jsx',
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setupVitest.ts',
  },
});
