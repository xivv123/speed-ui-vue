export default [
  {
    '事件名': 'update:modelValue',
    '说明': '对话框显示/隐藏状态变化时触发',
    '回调参数': '`(value: boolean) => void`'
  },
  {
    '事件名': 'click:outside',
    '说明': '点击对话框外部时触发',
    '回调参数': '`(event: MouseEvent) => void`'
  },
  {
    '事件名': 'keydown',
    '说明': '键盘按下时触发',
    '回调参数': '`(event: KeyboardEvent) => void`'
  },
  {
    '事件名': 'after-enter',
    '说明': '进入动画完成后触发',
    '回调参数': '`() => void`'
  },
  {
    '事件名': 'after-leave',
    '说明': '离开动画完成后触发',
    '回调参数': '`() => void`'
  }
]