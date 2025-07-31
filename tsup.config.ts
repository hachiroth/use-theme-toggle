import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'esnext',
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
})
