export default [
  {
    '插槽名': 'default',
    '说明': '默认内容，复选框控件',
    '作用域参数': '{ backgroundColorClasses: Ref<string[]>, backgroundColorStyles: Ref<CSSProperties> }'
  },
  {
    '插槽名': 'label',
    '说明': '自定义标签内容',
    '作用域参数': '{ label: string | undefined, props: Record<string, unknown> }'
  },
  {
    '插槽名': 'input',
    '说明': '自定义输入控件',
    '作用域参数': 'SelctrlSlot'
  },
  {
    '插槽名': 'prepend',
    '说明': '前置内容',
    '作用域参数': 'SPInputinnerSlot'
  },
  {
    '插槽名': 'append',
    '说明': '后置内容',
    '作用域参数': 'SPInputinnerSlot'
  },
  {
    '插槽名': 'details',
    '说明': '详细信息区域',
    '作用域参数': 'SPInputinnerSlot'
  },
  {
    '插槽名': 'message',
    '说明': '消息内容',
    '作用域参数': 'SPMsgslot'
  }
]