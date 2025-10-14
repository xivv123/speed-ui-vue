export default [
  {
    '参数': 'items',
    '说明': '列表数据项数组',
    '类型': '`Array<{ title: string; value: any; subtitle?: string; prependIcon?: string; appendIcon?: string }>`',
    '默认值': '`[]`'
  },
  {
    '参数': 'lines',
    '说明': '列表项行数',
    '类型': '`\'one\' | \'two\' | \'three\'`',
    '默认值': '`\'two\'`'
  },
  {
    '参数': 'nav',
    '说明': '是否为导航列表样式',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'selected',
    '说明': '选中的项（支持 v-model）',
    '类型': '`any[]`',
    '默认值': '`[]`'
  },
  {
    '参数': 'disabled',
    '说明': '是否禁用',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'density',
    '说明': '列表密度',
    '类型': '`\'default\' | \'comfortable\' | \'compact\'`',
    '默认值': '`\'default\'`'
  },
  {
    '参数': 'activatable',
    '说明': '是否可激活',
    '类型': '`boolean`',
    '默认值': '`true`'
  }
]
