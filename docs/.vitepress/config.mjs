import { defineConfig } from 'vitepress'
import { markdownCasePlugin } from './markdown-case-plugin.js'
import { caseFilePlugin } from './vite-plugin-case.js'
// import { imageOptimizerPlugin } from './plugins/vite-plugin-image-optimizer.js'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const base = process.env.BASE_PATH || '/speed-ui-vue/'

export default defineConfig({
  title: 'Speed UI',
  description: 'Vue 3 组件库',
  base, // GitHub Pages 部署路径
  head: [
    ['link', { rel: 'icon', href: `${base}logos/logo.png` }],
    // 预加载关键资源
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    // Service Worker 支持
    ['link', { rel: 'manifest', href: `${base}manifest.json` }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],

  markdown: {
    config: md => {
      markdownCasePlugin(md)
    },
  },
  vite: {
    plugins: [
      caseFilePlugin(),
      // imageOptimizerPlugin(), // 暂时禁用，可能导致问题
      {
        name: 'api-file-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // 确保 .api.js 文件返回正确的 MIME 类型
            if (req.url && req.url.includes('.api.js')) {
              res.setHeader('Content-Type', 'application/javascript')
            }
            next()
          })
        }
      },
      {
        name: 'docs-path-resolver',
        resolveId(id) {
          if (id.startsWith('/docs/')) {
            const relativePath = id.replace('/docs/', '')
            const fullPath = resolve(__dirname, '..', relativePath)
            return fullPath
          }
          return null
        },
        load(id) {
          // 确保 .api.js 文件能被正确加载
          if (id.endsWith('.api.js')) {
            return null // 让 Vite 使用默认的加载逻辑
          }
          return null
        }
      },
    ],
    server: {
      fs: {
        allow: ['..', '../../packages', '../..', '../cases'],
      },
    },
    resolve: {
      alias: {
        '@/packages': resolve(__dirname, '../../packages'),
        '@/cases': resolve(__dirname, '../cases'),
      },
    },
    optimizeDeps: {
      exclude: ['@button-cases'],
      include: ['speed-ui-vue', '@vicons/ionicons5', '@vicons/ionicons4'],
    },
    build: {
      // 代码分割优化
      rollupOptions: {
        output: {
          manualChunks: {
            'speed-ui': ['speed-ui-vue'],
            'vitepress-theme': ['vitepress/theme'],
          },
        },
      },
      cssCodeSplit: false,
      // 压缩选项
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // 暂时保留 console 用于调试
          drop_debugger: true,
        },
      },
      // 确保 case 文件被复制到输出目录
      copyPublicDir: true,
    },
  },
  themeConfig: {
    logo: '/logos/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
    ],

    sidebar: {
      // 指南区域的侧边栏
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '主题定制', link: '/guide/theming' },
            // { text: '国际化', link: '/guide/i18n' },
            // { text: '更新日志', link: '/guide/changelog' },
          ],
        },
      ],
      // 组件区域的侧边栏
      '/components/': [
        {
          text: 'Overview 组件总览',
          items: [{ text: 'Overview 组件总览', link: '/components/' }],
        },
        {
          text: 'Basic 基础组件',
          items: [
            { text: 'btn 按钮', link: '/components/btn' },
            { text: 'btngroup 按钮组', link: '/components/btngroup' },
            { text: 'icon 图标', link: '/components/icon' },
            { text: 'card 卡片', link: '/components/card' },
            { text: 'divider 分割线', link: '/components/divider' },
            { text: 'tag 标签', link: '/components/tag' },
            { text: 'expandbtn 展开按钮', link: '/components/expandbtn' },
          ],
        },
        {
          text: 'Layout 布局组件',
          items: [
            { text: 'grid 栅格', link: '/components/grid' },
            { text: 'Space 间距', link: '/components/space' },
          ],
        },
        {
          text: 'Form 表单组件',
          items: [
            { text: 'textfield单行文本框', link: '/components/textfield' },
            { text: 'textarea多行文本框', link: '/components/textarea' },
            { text: 'select选择框', link: '/components/select' },
            { text: 'combo选择器', link: '/components/combo' },
            { text: 'inputsuggest输入建议', link: '/components/inputsuggest' },
            { text: 'form表单', link: '/components/form' },
            { text: 'formitem表单项', link: '/components/formitem' },
            { text: 'cascader级联选择器', link: '/components/cascader' },
            { text: 'switch开关', link: '/components/switch' },
            { text: 'radio单选', link: '/components/radio' },
            { text: 'radiogroup单选组', link: '/components/radiogroup' },
            { text: 'checkbox复选', link: '/components/checkbox' },
            { text: 'slider滑块', link: '/components/slider' },
            { text: 'badge徽章', link: '/components/badge' },
            { text: 'segmented分段控制器', link: '/components/segmented' },
            { text: 'inputnum数字输入框', link: '/components/inputnum' },
          ],
        },
        {
          text: 'Navigation 导航组件',
          items: [{ text: 'menu菜单', link: '/components/menu' }],
        },
        {
          text: 'Data Display 数据展示',
          items: [
            { text: 'list列表', link: '/components/list' },
            { text: 'progcir环形进度条', link: '/components/progcir' },
            {
              text: 'progresslinear条形进度条',
              link: '/components/progresslinear',
            },
            { text: 'scrolltext滚动文字', link: '/components/scrolltext' },
          ],
        },
        {
          text: 'Feedback 反馈组件',
          items: [
            { text: 'alert警告提示', link: '/components/alert' },
            { text: 'dialog弹窗', link: '/components/dialog' },
            { text: 'drawer抽屉', link: '/components/drawer' },
            { text: 'msgbar消息条', link: '/components/msgbar' },
            { text: 'tour指引', link: '/components/tour' },
            { text: 'tooltip提示框', link: '/components/tooltip' },
            { text: 'collapse折叠面板', link: '/components/collapse' },
            { text: 'notification通知提醒', link: '/components/notification' },
            { text: 'loading加载状态', link: '/components/loading' },
            { text: 'overlay遮罩层', link: '/components/overlay' },
            { text: 'note便签', link: '/components/note' },
            { text: 'globalbanner全局横幅', link: '/components/globalbanner' },
          ],
        },
        {
          text: '指令',
          items: [{ text: 'progress加载', link: '/components/progress' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xivv123/speed-ui-vue' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Speed UI',
    },
  },
})
