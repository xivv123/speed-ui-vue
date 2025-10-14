export default [
  {
    '插槽名': 'default',
    '说明': '默认内容插槽，用于自定义单选按钮的显示内容',
    '作用域参数': '`{ backgroundColorClasses: Ref<string[]>, backgroundColorStyles: Ref<CSSProperties> }`'
  },
  {
    '插槽名': 'label',
    '说明': '自定义标签内容',
    '作用域参数': '`{ label: string | undefined, props: Record<string, unknown> }`'
  },
  {
    '插槽名': 'input',
    '说明': '自定义输入控件内容',
    '作用域参数': '`{ model: WritableComputedRef<boolean>, textColorClasses: Ref<string[]>, textColorStyles: Ref<CSSProperties>, backgroundColorClasses: Ref<string[]>, backgroundColorStyles: Ref<CSSProperties>, inputNode: VNode, icon: IconValue | undefined, props: { onBlur: (e: FocusEvent) => void, onFocus: (e: FocusEvent) => void, id: string } }`'
  }
]