import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  const withTypes =
    process.env.NO_DTS !== '1' && process.env.BUILD_TYPES !== 'false'
  const plugins: any[] = [vue() as any, vueJsx()]

  if (withTypes) {
    plugins.push(
      dts({
        outDir: 'types',
        insertTypesEntry: true,
        copyDtsFiles: true,
        // Avoid blocking builds with type-checking while docs consume source
        skipDiagnostics: true,
        logDiagnostics: false,
        include: [
          'src/**/*.ts',
          'src/**/*.tsx',
          'src/**/*.vue',
          'src/**/*.d.ts',
        ],
        exclude: [
          'src/**/__tests__/**',
          'src/**/*.spec.*',
          'src/**/*.test.*',
          'src/**/*.cy.*',
          'src/**/cases/**',
          'src/**/demo*/**',
          'src/**/examples/**',
          'src/**/capable/**',
          'src/**/copy*/**',
        ],
      })
    )
  }

  // Add bundle analyzer in analyze mode
  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        open: true,
        filename: 'stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    )
  }
  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@speed-ui/theme': resolve(__dirname, '../theme'),
        '@theme': resolve(__dirname, '../theme'),
      },
    },
    build: {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          entry: resolve(__dirname, 'src/entry.ts'),
          styles: resolve(__dirname, 'src/styles.ts'),
        },
        name: 'SpeedUI',
      },
      rollupOptions: {
        external: ['vue', 'vue-router'],
        output: [
          {
            format: 'es',
            dir: 'es',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: 'named',
          },
          {
            format: 'cjs',
            dir: 'lib',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: 'src',
            exports: 'named',
          },
        ],
      },
      cssCodeSplit: false,
      // Enable CSS minification using esbuild (built-in, no extra deps)
      cssMinify: 'esbuild',
      // Additional minification options
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // Keep console for library debugging
          drop_debugger: true,
          pure_funcs: ['console.debug'], // Only remove debug logs
        },
        format: {
          comments: false, // Remove comments to reduce size
        },
      },
    },
  }
})
