export default [
  {
    '参数': 'modelValue / v-model',
    '说明': '当前展开的面板的 name',
    '类型': '`string | number | (string | number)[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'accordion',
    '说明': '是否手风琴模式',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'expandIconPosition',
    '说明': '展开图标的位置',
    '类型': "`'left' | 'right'`",
    '默认值': "`'right'`"
  },
  {
    '参数': 'beforeChange',
    '说明': '切换面板前的钩子函数',
    '类型': '`(name: string | number, value: boolean) => boolean | Promise<boolean>`',
    '默认值': '-'
  }
]
