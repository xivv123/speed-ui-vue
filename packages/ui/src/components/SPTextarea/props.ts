// Utilities
import { propsFactory } from '@/utils'

// Components
import { makeSPFieldProps } from '../SPField/props'
import { makeSPInputinnerProps } from '../SPInputinner/SPInputinner'

// Types
import type { PropType } from 'vue'

export const makeSPTextareaProps = propsFactory(
  {
    autoGrow: Boolean,
    autofocus: Boolean,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 5,
      validator: (v: any) => !isNaN(parseFloat(v)),
    },
    maxRows: {
      type: [Number, String],
      validator: (v: any) => !isNaN(parseFloat(v)),
    },
    suffix: String,
    modelModifiers: Object as PropType<Record<string, boolean>>,

    ...makeSPInputinnerProps(),
    ...makeSPFieldProps(),
  },
  'SPTextarea'
)
