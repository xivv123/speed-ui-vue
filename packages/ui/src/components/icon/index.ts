import type { App } from 'vue'
import Icon from './Icon'

// 导出组件 - TSX 版本
export { Icon }
export default Icon

// 导出类型
export * from './types'

// 插件安装函数
export const IconPlugin = {
  install(app: App) {
    app.component('SpIcon', Icon)
    app.component('SpeedIcon', Icon) // 别名
  },
}
