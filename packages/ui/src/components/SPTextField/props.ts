// Composables
import { makeSPInputinnerProps } from '@/components/SPInputinner/SPInputinner'
import { makeSPFieldProps } from '@/components/SPField/props'

// Utilities
import { inputModeProp, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

// 始终处于激活状态的输入类型
export const ACTIVE_TYPES = [
  'color',
  'file',
  'time',
  'date',
  'datetime-local',
  'week',
  'month',
] as const

export type ActiveType = (typeof ACTIVE_TYPES)[number]

export const makeSPTextFieldProps = propsFactory(
  {
    autofocus: Boolean,
    inputmode: inputModeProp,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    suffix: String,
    role: String,
    type: {
      type: String,
      default: 'text',
    },
    modelModifiers: Object as PropType<Record<string, boolean>>,

    ...makeSPInputinnerProps(),
    ...makeSPFieldProps(),
  },
  'SPTextField'
)
