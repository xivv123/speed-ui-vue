export default [
  {
    '插槽名': 'item',
    '说明': '自定义选项的渲染内容',
    '作用域参数': '`{ item: ListItem, index: number, props: Record<string, unknown> }`'
  },
  {
    '插槽名': 'chip',
    '说明': '自定义多选时的标签显示（tags 模式）',
    '作用域参数': '`{ item: ListItem, index: number, props: Record<string, unknown> }`'
  },
  {
    '插槽名': 'selection',
    '说明': '自定义选中项的显示',
    '作用域参数': '`{ item: ListItem, index: number }`'
  },
  {
    '插槽名': 'prepend-item',
    '说明': '在选项列表前插入内容',
    '作用域参数': '-'
  },
  {
    '插槽名': 'append-item',
    '说明': '在选项列表后插入内容',
    '作用域参数': '-'
  },
  {
    '插槽名': 'no-data',
    '说明': '自定义无数据时的显示内容',
    '作用域参数': '-'
  },
  {
    '插槽名': 'divider',
    '说明': '自定义分隔符的显示',
    '作用域参数': '`{ props: Record<string, unknown>, index: number }`'
  },
  {
    '插槽名': 'subheader',
    '说明': '自定义子标题的显示',
    '作用域参数': '`{ props: Record<string, unknown>, index: number }`'
  },
  {
    '插槽名': 'prepend',
    '说明': '前置内容插槽（输入框外部左侧）',
    '作用域参数': '-'
  },
  {
    '插槽名': 'append',
    '说明': '后置内容插槽（输入框外部右侧）',
    '作用域参数': '-'
  },
  {
    '插槽名': 'prepend-inner',
    '说明': '内部前置内容插槽（输入框内部左侧）',
    '作用域参数': '-'
  },
  {
    '插槽名': 'append-inner',
    '说明': '内部后置内容插槽（输入框内部右侧）',
    '作用域参数': '-'
  },
  {
    '插槽名': 'label',
    '说明': '自定义标签内容',
    '作用域参数': '-'
  },
  {
    '插槽名': 'details',
    '说明': '自定义详情区域（通常用于提示或错误信息）',
    '作用域参数': '-'
  }
]
