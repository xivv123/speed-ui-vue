export default [
  {
    '属性名': 'modelValue',
    '说明': '绑定值，支持 v-model',
    '类型': '`any`',
    '默认值': '-'
  },
  {
    '属性名': 'value',
    '说明': '单选按钮的值，当选中时会将此值赋给 modelValue',
    '类型': '`any`',
    '默认值': '-'
  },
  {
    '属性名': 'label',
    '说明': '标签文本内容',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '属性名': 'disabled',
    '说明': '是否禁用状态',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '属性名': 'readonly',
    '说明': '是否只读状态',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '属性名': 'color',
    '说明': '主题颜色，影响选中状态的颜色',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '属性名': 'baseColor',
    '说明': '基础颜色，影响未选中状态的颜色',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '属性名': 'density',
    '说明': '密度，控制组件的紧凑程度',
    '类型': '`"compact" | "default" | "comfortable"`',
    '默认值': '`"default"`'
  },
  {
    '属性名': 'variant',
    '说明': '样式变体',
    '类型': '`"default" | "outlined"`',
    '默认值': '`"default"`'
  },
  {
    '属性名': 'trueValue',
    '说明': '选中时的值，如果未设置则使用 value 或 true',
    '类型': '`any`',
    '默认值': '-'
  },
  {
    '属性名': 'falseValue',
    '说明': '未选中时的值',
    '类型': '`any`',
    '默认值': '`false`'
  },
  {
    '属性名': 'trueIcon',
    '说明': '选中状态的图标',
    '类型': '`string`',
    '默认值': '`"$radioOn"`'
  },
  {
    '属性名': 'falseIcon',
    '说明': '未选中状态的图标',
    '类型': '`string`',
    '默认值': '`"$radioOff"`'
  },
  {
    '属性名': 'multiple',
    '说明': '是否支持多选（继承自 SPSelctrlGroup）',
    '类型': '`boolean`',
    '默认值': '`false`'
  },
  {
    '属性名': 'name',
    '说明': '原生 name 属性，用于表单提交',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '属性名': 'id',
    '说明': '元素的唯一标识符',
    '类型': '`string`',
    '默认值': '-'
  },
  {
    '属性名': 'type',
    '说明': '输入类型',
    '类型': '`string`',
    '默认值': '`"radio"`'
  },
  {
    '属性名': 'class',
    '说明': '自定义 CSS 类名',
    '类型': '`string | string[] | Record<string, boolean>`',
    '默认值': '-'
  },
  {
    '属性名': 'style',
    '说明': '自定义样式',
    '类型': '`string | CSSProperties`',
    '默认值': '-'
  }
]