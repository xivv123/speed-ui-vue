// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { SPColAlign, SPColJustify } from './types'

export const makeSPColProps = propsFactory(
  {
    // Column span
    cols: {
      type: [String, Number],
      default: 'auto',
    },
    // Column line indices
    colStart: [String, Number],
    colEnd: [String, Number],
    // Row span
    rows: [String, Number],
    rowStart: [String, Number],
    rowEnd: [String, Number],
    // Offset & order
    offset: [String, Number],
    order: [String, Number],
    // Alignment helpers
    alignSelf: String as PropType<SPColAlign>,
    justifySelf: String as PropType<SPColJustify>,

    ...makeComponentProps(),
    ...makeTagProps(),
  },
  'SPCol'
)
