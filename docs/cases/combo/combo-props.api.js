export default [
  {
    '参数': 'modelValue',
    '说明': '绑定值',
    '类型': '`any | any[]`',
    '默认值': '`null`'
  },
  {
    '参数': 'items',
    '说明': '选项数据',
    '类型': '`readonly any[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'itemTitle',
    '说明': '指定选项标题字段',
    '类型': '`string | ((item: any) => string)`',
    '默认值': "`'title'`"
  },
  {
    '参数': 'itemValue',
    '说明': '指定选项值字段',
    '类型': '`string | ((item: any) => any)`',
    '默认值': "`'value'`"
  },
  {
    '参数': 'multiple',
    '说明': '是否多选',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'returnObject',
    '说明': '是否返回完整对象',
    '类型': '`boolean`',
    '默认值': '`true`'
  },
  {
    '参数': 'autoSelectFirst',
    '说明': '自动选择第一项',
    '类型': "`boolean | 'exact'`",
    '默认值': '`false`'
  },
  {
    '参数': 'clearOnSelect',
    '说明': '选择后清空输入',
    '类型': '`boolean`',
    '默认值': '`true`'
  },
  {
    '参数': 'closableChips',
    '说明': '标签是否可关闭',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'delimiters',
    '说明': '分隔符数组',
    '类型': '`readonly string[]`',
    '默认值': '-'
  },
  {
    '参数': 'hideNoData',
    '说明': '隐藏无数据提示',
    '类型': '`boolean`',
    '默认值': '`true`'
  },
  {
    '参数': 'label',
    '说明': '标签文本',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'placeholder',
    '说明': '占位符文本',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'disabled',
    '说明': '是否禁用',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'readonly',
    '说明': '是否只读',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'loading',
    '说明': '是否加载中',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'clearable',
    '说明': '是否可清空',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'variant',
    '说明': '输入框变体',
    '类型': "`'filled' | 'outlined' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'`",
    '默认值': "`'filled'`"
  },
  {
    '参数': 'density',
    '说明': '密度',
    '类型': "`'default' | 'comfortable' | 'compact'`",
    '默认值': "`'default'`"
  },
  {
    '参数': 'prependIcon',
    '说明': '前置图标',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'appendIcon',
    '说明': '后置图标',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'prependInnerIcon',
    '说明': '内部前置图标',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'appendInnerIcon',
    '说明': '内部后置图标',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'error',
    '说明': '是否错误状态',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'errorMessages',
    '说明': '错误信息',
    '类型': '`string | string[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'rules',
    '说明': '验证规则',
    '类型': '`ValidationRule[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'validateOn',
    '说明': '验证触发时机',
    '类型': "`'blur' | 'input' | 'submit' | 'lazy'`",
    '默认值': "`'input'`"
  }
]