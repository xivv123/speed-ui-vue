export default [
  {
    '事件名': 'update:modelValue',
    '说明': '值改变时触发',
    '回调参数': '(value: boolean | any) => void'
  },
  {
    '事件名': 'update:focused',
    '说明': '焦点状态改变时触发',
    '回调参数': '(focused: boolean) => void'
  },
  {
    '事件名': 'focus',
    '说明': '获得焦点时触发',
    '回调参数': '(e: FocusEvent) => void'
  },
  {
    '事件名': 'blur',
    '说明': '失去焦点时触发',
    '回调参数': '(e: FocusEvent) => void'
  },
  {
    '事件名': 'change',
    '说明': '状态改变时触发',
    '回调参数': '(value: boolean | any) => void'
  },
  {
    '事件名': 'click',
    '说明': '点击时触发',
    '回调参数': '(e: MouseEvent) => void'
  }
]