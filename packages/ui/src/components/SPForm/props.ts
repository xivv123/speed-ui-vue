// Composables
import { makeComponentProps } from '@/composables/component'
import { makeFormProps } from '@/composables/form'
import { makeDensityProps } from '@/composables/density'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPFormProps = propsFactory(
  {
    ...makeComponentProps(),
    ...makeFormProps(),
    ...makeDensityProps(),
    // Form model container
    model: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    // Form-level label configuration
    labelPosition: {
      type: String as PropType<'left' | 'right' | 'top'>,
      default: undefined,
      validator: (v: any) => v === undefined || ['left', 'right', 'top'].includes(v),
    },
    labelWidth: {
      type: [String, Number] as PropType<string | number>,
      default: undefined,
    },
    labelAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: undefined,
      validator: (v: any) => v === undefined || ['left', 'center', 'right'].includes(v),
    },
  },
  'SPForm'
)
