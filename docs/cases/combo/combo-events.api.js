export default [
  {
    '事件名': 'update:modelValue',
    '说明': '值变化时触发',
    '回调参数': '`(value: any) => void`'
  },
  {
    '事件名': 'update:search',
    '说明': '搜索内容变化时触发',
    '回调参数': '`(value: string) => void`'
  },
  {
    '事件名': 'update:menu',
    '说明': '下拉菜单显示状态变化时触发',
    '回调参数': '`(value: boolean) => void`'
  },
  {
    '事件名': 'update:focused',
    '说明': '焦点状态变化时触发',
    '回调参数': '`(focused: boolean) => void`'
  },
  {
    '事件名': 'click:clear',
    '说明': '点击清空按钮时触发',
    '回调参数': '`(event: MouseEvent) => void`'
  },
  {
    '事件名': 'click:appendInner',
    '说明': '点击内部后置图标时触发',
    '回调参数': '`(event: MouseEvent) => void`'
  },
  {
    '事件名': 'click:prependInner',
    '说明': '点击内部前置图标时触发',
    '回调参数': '`(event: MouseEvent) => void`'
  },
  {
    '事件名': 'focus',
    '说明': '获得焦点时触发',
    '回调参数': '`(event: FocusEvent) => void`'
  },
  {
    '事件名': 'blur',
    '说明': '失去焦点时触发',
    '回调参数': '`(event: FocusEvent) => void`'
  }
]