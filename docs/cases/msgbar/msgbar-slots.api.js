export default [
  {
    '插槽名': 'default',
    '说明': '自定义消息内容',
    '作用域参数': '-'
  },
  {
    '插槽名': 'text',
    '说明': '自定义文本内容',
    '作用域参数': '-'
  },
  {
    '插槽名': 'actions',
    '说明': '操作按钮区域',
    '作用域参数': '`{ isActive: Ref<boolean> }`'
  },
  {
    '插槽名': 'activator',
    '说明': '触发器',
    '作用域参数': '`{ isActive: boolean; props: Record<string, any> }`'
  }
]
