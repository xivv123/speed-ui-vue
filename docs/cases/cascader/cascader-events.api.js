export default [
  {
    '事件名': 'change',
    '说明': '当选中节点变化时触发',
    '回调参数': '`(value: any | any[]) => void`'
  },
  {
    '事件名': 'expandChange',
    '说明': '当展开节点发生变化时触发',
    '回调参数': '`(value: any[]) => void`'
  },
  {
    '事件名': 'blur',
    '说明': '当失去焦点时触发',
    '回调参数': '`(event: FocusEvent) => void`'
  },
  {
    '事件名': 'focus',
    '说明': '当获得焦点时触发',
    '回调参数': '`(event: FocusEvent) => void`'
  },
  {
    '事件名': 'visibleChange',
    '说明': '下拉框出现/隐藏时触发',
    '回调参数': '`(visible: boolean) => void`'
  },
  {
    '事件名': 'removeTag',
    '说明': '在多选模式下，移除Tag时触发',
    '回调参数': '`(value: any) => void`'
  }
]
