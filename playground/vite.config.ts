import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      // UI 包内部别名（用于 UI 包的源码）
      '@': resolve(__dirname, '../packages/ui/src'),
      // UI 包
      '@speed-ui/ui': resolve(__dirname, '../packages/ui/src'),
      // '@theme': resolve(__dirname, '../packages/theme'),
      '@speed-ui/theme': resolve(
        __dirname,
        '../packages/theme'
      ),
      '@theme': resolve(__dirname, '../packages/theme'),
    },
  },
})
