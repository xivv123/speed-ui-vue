export default [
  {
    '事件名': 'update:modelValue',
    '说明': '当选择值改变时触发',
    '回调参数': '`(value: any | any[]) => void`'
  },
  {
    '事件名': 'update:search',
    '说明': '当搜索文本改变时触发',
    '回调参数': '`(value: string) => void`'
  },
  {
    '事件名': 'update:focused',
    '说明': '当输入框聚焦状态改变时触发',
    '回调参数': '`(focused: boolean) => void`'
  },
  {
    '事件名': 'update:menu',
    '说明': '当菜单显示/隐藏状态改变时触发',
    '回调参数': '`(value: boolean) => void`'
  }
]
