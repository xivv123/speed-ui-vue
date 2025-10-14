export default [
  {
    '参数': 'modelValue / v-model',
    '说明': '表单验证状态',
    '类型': '`boolean | null`',
    '默认值': '`null`'
  },
  {
    '参数': 'fastFail',
    '说明': '快速失败模式，遇到第一个错误时停止验证',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'disabled',
    '说明': '是否禁用整个表单',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'readonly',
    '说明': '是否为只读模式',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'validateOn',
    '说明': '验证触发时机',
    '类型': "`'blur' | 'input' | 'submit'`",
    '默认值': "`'submit'`"
  }
]