// Utilities
import { propsFactory } from '@/utils'

// Types
import type { SPExpandBtnShape } from './types'

export const makeExpandBtnProps = propsFactory(
  {
    collapsedWidth: [Number, String],
    expandedWidth: [Number, String],
    duration: {
      type: Number,
      validator: (val: number) => val >= 0 && val <= 10000,
    },
    disabled: Boolean,
    shape: {
      type: String as () => SPExpandBtnShape,
      validator: (val: string) => ['circle', 'rectangle'].includes(val),
    },
  },
  'SPExpandBtn'
)
