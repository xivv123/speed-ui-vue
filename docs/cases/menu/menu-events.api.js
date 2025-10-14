export default [
  {
    '事件名': 'update:model-value',
    '说明': '菜单显示状态变化时触发',
    '回调参数': '`(value: boolean) => void`'
  },
  {
    '事件名': 'after-enter',
    '说明': '菜单进入动画完成后触发',
    '回调参数': '`() => void`'
  },
  {
    '事件名': 'after-leave',
    '说明': '菜单离开动画完成后触发',
    '回调参数': '`() => void`'
  }
]
