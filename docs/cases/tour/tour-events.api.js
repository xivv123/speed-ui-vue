export default [
  {
    '事件名': 'update:modelValue',
    '说明': '显示状态改变',
    '回调参数': '`(visible: boolean) => void`'
  },
  {
    '事件名': 'update:current',
    '说明': '当前步骤改变',
    '回调参数': '`(current: number) => void`'
  },
  {
    '事件名': 'finish',
    '说明': '完成引导',
    '回调参数': '`() => void`'
  },
  {
    '事件名': 'skip',
    '说明': '跳过引导',
    '回调参数': '`() => void`'
  },
  {
    '事件名': 'close',
    '说明': '关闭引导',
    '回调参数': '`() => void`'
  },
  {
    '事件名': 'change',
    '说明': '步骤变化',
    '回调参数': '`(current: number) => void`'
  },
  {
    '事件名': 'before-enter',
    '说明': '进入步骤前',
    '回调参数': '`(step: TourStep, index: number) => void`'
  },
  {
    '事件名': 'before-leave',
    '说明': '离开步骤前',
    '回调参数': '`(step: TourStep, index: number) => void`'
  }
]