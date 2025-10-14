import type { PropType } from 'vue'
import { propsFactory, pick } from '@/utils'
import { makeDimensionProps } from '@/composables/dimensions'
import { makeComponentProps } from '@/composables/component'
import { makeValidationProps } from '@/composables/validation'

export const makeSPFormItemProps = propsFactory(
  {
    id: String,
    prop: String, // 表单字段名
    required: Boolean, // 是否必填，显示红色星号
    requiredicon: {
      type: [Boolean, String] as PropType<boolean | 'true' | 'false'>,
      default: true,
    }, // 是否显示必填星号，默认为 true
    labelPosition: {
      type: String as PropType<'left' | 'top' | 'right'>,
      default: undefined,
      validator: (v: any) => ['left', 'top', 'right'].includes(v),
    },
    labelWidth: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    }, // 标签宽度，作用于 left/right 位置
    labelAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: undefined,
      validator: (v: any) => ['left', 'center', 'right'].includes(v),
    }, // 标签对齐方式

    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,

    hint: String,
    persistentHint: Boolean,
    messages: {
      type: [Array, String] as PropType<string | readonly string[]>,
      default: () => [],
    },

    ...makeComponentProps(),
    ...pick(makeDimensionProps(), ['maxWidth', 'minWidth', 'width']),
    ...makeValidationProps(),
  },
  'SPFormItem'
)
