export default [
  {
    '参数': 'modelValue',
    '说明': '是否显示警告提示，支持 v-model',
    '类型': '`boolean`',
    '默认值': '`true`'
  },
  {
    '参数': 'type',
    '说明': '警告类型',
    '类型': "`'success' | 'info' | 'warning' | 'error'`",
    '默认值': '-'
  },
  {
    '参数': 'title',
    '说明': '警告标题',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'text',
    '说明': '警告内容文本',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'closable',
    '说明': '是否显示关闭按钮',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'closeIcon',
    '说明': '关闭按钮图标',
    '类型': '`IconValue`',
    '默认值': "`'$close'`"
  },
  {
    '参数': 'closeLabel',
    '说明': '关闭按钮的 aria-label',
    '类型': '`string`',
    '默认值': "`'关闭'`"
  },
  {
    '参数': 'icon',
    '说明': '自定义图标，设置为 false 隐藏图标',
    '类型': '`false | IconValue`',
    '默认值': '根据 type 自动选择'
  },
  {
    '参数': 'prominent',
    '说明': '是否使用醒目样式（图标更大）',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '参数': 'border',
    '说明': '边框位置',
    '类型': "`boolean | 'top' | 'end' | 'bottom' | 'start'`",
    '默认值': '-'
  },
  {
    '参数': 'borderColor',
    '说明': '边框颜色',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'variant',
    '说明': '样式变体',
    '类型': "`'flat' | 'tonal' | 'outlined' | 'text'`",
    '默认值': "`'flat'`"
  },
  {
    '参数': 'color',
    '说明': '自定义颜色（覆盖 type 的颜色）',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '参数': 'density',
    '说明': '密度',
    '类型': "`'default' | 'comfortable' | 'compact'`",
    '默认值': "`'default'`"
  },
  {
    '参数': 'elevation',
    '说明': '阴影高度',
    '类型': '`number | string`',
    '默认值': '-'
  },
  {
    '参数': 'rounded',
    '说明': '圆角大小',
    '类型': '`string | number | boolean`',
    '默认值': '-'
  },
  {
    '参数': 'height',
    '说明': '高度',
    '类型': '`string | number`',
    '默认值': '-'
  },
  {
    '参数': 'width',
    '说明': '宽度',
    '类型': '`string | number`',
    '默认值': '-'
  },
  {
    '参数': 'maxHeight',
    '说明': '最大高度',
    '类型': '`string | number`',
    '默认值': '-'
  },
  {
    '参数': 'maxWidth',
    '说明': '最大宽度',
    '类型': '`string | number`',
    '默认值': '-'
  },
  {
    '参数': 'minHeight',
    '说明': '最小高度',
    '类型': '`string | number`',
    '默认值': '-'
  },
  {
    '参数': 'minWidth',
    '说明': '最小宽度',
    '类型': '`string | number`',
    '默认值': '-'
  },
  {
    '参数': 'tag',
    '说明': '根元素标签名',
    '类型': '`string`',
    '默认值': "`'div'`"
  }
]
