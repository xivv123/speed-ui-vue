export default [
  {
    '事件名': 'update:modelValue',
    '说明': '内容变化时触发',
    '回调参数': '`(value: string) => void`'
  },
  {
    '事件名': 'update:title',
    '说明': '标题变化时触发',
    '回调参数': '`(title: string) => void`'
  },
  {
    '事件名': 'update:position',
    '说明': '位置变化时触发',
    '回调参数': '`(position: { x: number; y: number }) => void`'
  },
  {
    '事件名': 'update:width',
    '说明': '宽度变化时触发',
    '回调参数': '`(width: number | string) => void`'
  },
  {
    '事件名': 'update:height',
    '说明': '高度变化时触发',
    '回调参数': '`(height: number | string) => void`'
  },
  {
    '事件名': 'drag:start',
    '说明': '开始拖拽时触发',
    '回调参数': '`(position: { x: number; y: number }) => void`'
  },
  {
    '事件名': 'drag:move',
    '说明': '拖拽移动时触发',
    '回调参数': '`(position: { x: number; y: number }) => void`'
  },
  {
    '事件名': 'drag:end',
    '说明': '拖拽结束时触发',
    '回调参数': '`(position: { x: number; y: number }) => void`'
  },
  {
    '事件名': 'close',
    '说明': '点击关闭按钮时触发',
    '回调参数': '`() => void`'
  }
]
