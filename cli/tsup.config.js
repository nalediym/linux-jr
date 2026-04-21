import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.jsx'],
  outDir: 'dist',
  format: ['esm'],
  target: 'node20',
  platform: 'node',
  clean: true,
  minify: false,
  splitting: false,
  sourcemap: false,
  banner: { js: '#!/usr/bin/env node' },
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  external: ['ink', 'ink-text-input', 'react'],
})
