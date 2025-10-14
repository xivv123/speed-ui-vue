import type { App } from 'vue'
import { SPInputSrch } from './SPInputSrch'

// 导出组件
export { SPInputSrch }
export default SPInputSrch

// 导出类型
// export type { SearchSuggestion, SearchPosition } from './SPInputSrch'

// 插件安装函数
export const SPInputSrchPlugin = {
  install(app: App) {
    app.component('SPInputSrch', SPInputSrch)
    app.component('SpInputSrch', SPInputSrch) // 别名
    app.component('SpeedInputSrch', SPInputSrch) // 别名
  },
}