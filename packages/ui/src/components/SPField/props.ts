// Composables
import { makeComponentProps } from '@/composables/component'
import { makeLoaderProps } from '@/composables/loader'
import { makeRoundedProps } from '@/composables/rounded'
import { makeThemeProps } from '@/composables/theme'
import { IconValue } from '@/composables/icons'

// Utilities
import { EventProp, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

const allowedVariants = [
  'underlined',
  'outlined',
  'filled',
  'solo',
  'solo-inverted',
  'solo-filled',
  'plain',
] as const

export type Variant = (typeof allowedVariants)[number]

// 需要浮动标签的变体
export const FLOATING_LABEL_VARIANTS: readonly Variant[] = [
  'filled',
  'solo',
  'solo-inverted',
  'solo-filled',
] as const

// 平面和下划线变体
export const PLAIN_OR_UNDERLINED_VARIANTS: readonly Variant[] = [
  'plain',
  'underlined',
] as const

export const makeSPFieldProps = propsFactory(
  {
    appendInnerIcon: IconValue,
    bgColor: String,
    clearable: Boolean,
    clearIcon: {
      type: IconValue,
      default: 'CloseCircle',
    },
    clearIconSize: {
      type: [String, Number],
      default: 26,
    },
    active: Boolean,
    centerAffix: {
      type: Boolean,
      default: undefined,
    },
    color: String,
    baseColor: String,
    details: Boolean,
    dirty: Boolean,
    disabled: {
      type: Boolean,
      default: null,
    },
    glow: Boolean,
    error: Boolean,
    flat: Boolean,
    iconColor: [Boolean, String],
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: IconValue,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String as PropType<Variant>,
      default: 'filled',
      validator: (v: any) => allowedVariants.includes(v),
    },
    // 'onUpdate:modelValue': EventProp<[any]>(),
    modelValue: null,
    // 计数器相关
    counter: [Boolean, Number, String],
    counterValue: [Number, Function] as PropType<number | ((value: any) => number)>,
    persistentCounter: Boolean,
    showInlineCounter: Boolean, // 新增：控制是否在输入框内显示计数器
    // 事件处理器
    'onClick:clear': EventProp<[MouseEvent]>(),
    'onClick:appendInner': EventProp<[MouseEvent]>(),
    'onClick:prependInner': EventProp<[MouseEvent]>(),
    // 鼠标事件
    onMousedown: EventProp<[MouseEvent]>(),
    onClick: EventProp<[MouseEvent]>(),

    ...makeComponentProps(),
    ...makeLoaderProps(),
    ...makeRoundedProps(),
    ...makeThemeProps(),
  },
  'SPField'
)