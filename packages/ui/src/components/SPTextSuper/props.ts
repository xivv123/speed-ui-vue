// Composables
import { makeSPFieldProps } from '../SPField/props'
import { makeSPInputinnerProps } from '../SPInputinner/SPInputinner'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPTextSuperProps = propsFactory(
  {
    autoGrow: Boolean,
    autofocus: Boolean,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 4,
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
  'SPTextSuper'
)