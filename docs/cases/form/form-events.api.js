export default [
  {
    '事件名': 'update:modelValue',
    '说明': '表单验证状态变化时触发',
    '回调参数': '`(valid: boolean | null) => void`'
  },
  {
    '事件名': 'submit',
    '说明': '表单提交事件',
    '回调参数': '`(event: Promise<{ valid: boolean, errors: any[] }>) => void`'
  }
]