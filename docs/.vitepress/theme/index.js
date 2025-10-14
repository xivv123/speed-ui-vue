import DefaultTheme from 'vitepress/theme'
import './style.css'
import SpeedUI from 'speed-ui-vue'
import 'speed-ui-vue/es/speed-ui-vue.css'
import Layout from './Layout.vue'
import { registerServiceWorker } from './registerSW.js'

// 同步导入组件（VitePress 全局组件必须同步）
import DemoShowcase from './components/DemoShowcase.vue'
import ComponentOverview from './components/ComponentOverview.vue'
import ApiTable from './components/ApiTable.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(SpeedUI)

    // 注册全局组件（必须同步导入）
    app.component('DemoShowcase', DemoShowcase)
    app.component('ComponentOverview', ComponentOverview)
    app.component('ApiTable', ApiTable)

    // 注册 Service Worker
    if (typeof window !== 'undefined') {
      registerServiceWorker()
    }

    // 路由钩子（仅开发环境记录日志）
    if (typeof window !== 'undefined') {
      const originalOnBeforeRouteChange = router.onBeforeRouteChange
      const originalOnAfterRouteChange = router.onAfterRouteChange

      router.onBeforeRouteChange = to => {
        return originalOnBeforeRouteChange?.(to)
      }

      router.onAfterRouteChange = to => {
        return originalOnAfterRouteChange?.(to)
      }
    }
  },
}
