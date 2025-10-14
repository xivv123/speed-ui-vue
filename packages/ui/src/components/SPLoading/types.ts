/**
 * SPLoading组件的插槽类型定义
 */
export type SPLoadingSlots = {
  /** 默认插槽，用于自定义加载内容 */
  default: { isActive: boolean; progress: number }
  /** 文本插槽，用于自定义加载文本 */
  text: { isActive: boolean; progress: number }
}
