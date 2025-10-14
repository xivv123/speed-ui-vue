// Types used by SPTour and related components

export interface TourStep {
  // 标题
  title?: string
  // 描述
  description?: string
  // 目标元素选择器或元素引用
  target: string | HTMLElement | (() => HTMLElement)
  // 指示卡片相对目标的位置
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  // 自定义遮罩样式
  mask?: {
    style?: Record<string, any>
    color?: string
  }
  // 是否显示箭头
  showArrow?: boolean
  // 下一步/上一步按钮文字
  nextText?: string
  prevText?: string
  // 当前步骤是否可关闭
  closable?: boolean
  // 是否自动滚动到目标元素
  scrollIntoView?: boolean
  // 滚动配置
  scrollOptions?: ScrollIntoViewOptions
  // 进入/离开钩子
  onEnter?: (step: TourStep, index: number) => void
  onLeave?: (step: TourStep, index: number) => void
}

