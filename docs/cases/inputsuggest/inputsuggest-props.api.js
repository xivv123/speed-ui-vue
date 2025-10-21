export default [
  {
    '参数': 'modelValue',
    '说明': '绑定值，支持 v-model',
    '类型': '`any | any[]`',
    '默认值': '`null`'
  },
  {
    '参数': 'items',
    '说明': '可选项数据列表',
    '类型': '`readonly any[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'itemTitle',
    '说明': '指定选项的标题字段名或函数',
    '类型': '`string | ((item: any) => string)`',
    '默认值': "`'title'`"
  },
  {
    '参数': 'itemValue',
    '说明': '指定选项的值字段名或函数',
    '类型': '`string | ((item: any) => any)`',
    '默认值': "`'value'`"
  },
  {
    '参数': 'itemProps',
    '说明': '指定选项的 props 字段名或函数',
    '类型': '`string | ((item: any) => any)`',
    '默认值': "`'props'`"
  },
  {
    '参数': 'multiple',
    '说明': '是否启用多选模式',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'returnObject',
    '说明': '是否返回完整的选项对象',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'autoSelectFirst',
    '说明': '自动选择第一项，"exact" 表示仅在完全匹配时选择',
    '类型': "`boolean | 'exact'`",
    '默认值': '`false`'
  },
  {
    '参数': 'clearOnSelect',
    '说明': '选择后是否清空输入内容（多选模式下有效）',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'search',
    '说明': '搜索文本，支持 v-model:search',
    '类型': '`string`',
    '默认值': "`''`"
  },
  {
    '参数': 'label',
    '说明': '输入框标签文本',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'placeholder',
    '说明': '输入框占位符文本',
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
    '参数': 'clearable',
    '说明': '是否显示清空按钮',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'hideSelected',
    '说明': '是否隐藏已选择的选项',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'hideNoData',
    '说明': '是否隐藏无数据提示',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'noDataText',
    '说明': '无数据时的提示文本',
    '类型': '`string`',
    '默认值': "`'$vuetify.noDataText'`"
  },
  {
    '参数': 'openOnClear',
    '说明': '清空时是否打开菜单',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'tags',
    '说明': '是否使用标签模式显示选中项（多选）',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'closableTags',
    '说明': '标签是否可关闭',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'menuIcon',
    '说明': '菜单图标',
    '类型': '`string`',
    '默认值': "`'$dropdown'`"
  },
  {
    '参数': 'variant',
    '说明': '输入框样式变体',
    '类型': "`'filled' | 'outlined' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'`",
    '默认值': "`'filled'`"
  },
  {
    '参数': 'density',
    '说明': '输入框密度',
    '类型': "`'default' | 'comfortable' | 'compact'`",
    '默认值': "`'default'`"
  },
  {
    '参数': 'color',
    '说明': '主题颜色',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'itemColor',
    '说明': '选项颜色',
    '类型': '`string`',
    '默认值': '-'
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
    '参数': 'error',
    '说明': '是否显示错误状态',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'errorMessages',
    '说明': '错误提示信息',
    '类型': '`string | string[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'rules',
    '说明': '验证规则数组',
    '类型': '`ValidationRule[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'validateOn',
    '说明': '验证触发时机',
    '类型': "`'blur' | 'input' | 'submit' | 'lazy'`",
    '默认值': "`'input'`"
  },
  {
    '参数': 'eager',
    '说明': '是否立即渲染菜单内容',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'filterKeys',
    '说明': '过滤时使用的字段',
    '类型': '`string[]`',
    '默认值': "`['title']`"
  },
  {
    '参数': 'customFilter',
    '说明': '自定义过滤函数',
    '类型': '`Function`',
    '默认值': '-'
  },
  {
    '参数': 'counter',
    '说明': '是否显示计数器',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'counterValue',
    '说明': '计数器值',
    '类型': '`number | ((value: any) => number)`',
    '默认值': '-'
  },
  {
    '参数': 'menuProps',
    '说明': '传递给菜单组件的 props',
    '类型': '`object`',
    '默认值': '-'
  },
  {
    '参数': 'listProps',
    '说明': '传递给列表组件的 props',
    '类型': '`object`',
    '默认值': '-'
  },
  {
    '参数': 'transition',
    '说明': '菜单过渡动画',
    '类型': '`string | boolean`',
    '默认值': '`false`'
  }
]
