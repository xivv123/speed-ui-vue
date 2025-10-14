import { createApp } from 'vue'
import SpeedUI from '@speed-ui/ui'
import { i18n } from './i18n'
import { router } from './router'
import App from './App.vue'

import './style.css'

// 导入简化的主题设置 - 在样式之前设置主题
// import { setTheme } from '../../packages/ui/src'

// 立即设置主题，在任何组件加载之前
console.log('🎨 设置主题色为: #722ed1')
// setTheme('#722ed1') // 紫色主题

// 导入Speed UI默认主题样式（已包含尺寸预设）
import '@speed-ui/theme/src/index.scss'

// 可以随时切换主题
// setTheme('#1890ff')  // 蓝色
// setTheme('#52c41a')  // 绿色
// setTheme('#722ed1')  // 紫色
// setTheme('#ec4899')  // 粉色

const app = createApp(App)

app.use(SpeedUI)
app.use(i18n)
app.use(router)

// 同步路由参数和 i18n 语言
router.afterEach(to => {
  const locale = to.params.locale as string
  if (locale && locale !== i18n.global.locale.value) {
    i18n.global.locale.value = locale as any
  }
})

app.mount('#app')
