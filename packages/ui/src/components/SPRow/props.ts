// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { SPRowAlign, SPRowJustify } from './types'

export const makeSPRowProps = propsFactory(
  {
    // Grid column count
    cols: {
      type: [String, Number],
      default: 12,
    },
    // Spacing
    gap: [String, Number],
    columnGap: [String, Number],
    rowGap: [String, Number],
    // Alignment
    align: String as PropType<SPRowAlign>,
    justify: String as PropType<SPRowJustify>,
    // Dense mode
    dense: Boolean,
    // Auto-grid helpers
    autoFill: Boolean,
    autoFit: Boolean,
    // Minimum column width for auto-fill/auto-fit
    minColWidth: {
      type: [String, Number],
      default: '250px',
    },

    ...makeComponentProps(),
    ...makeTagProps(),
  },
  'SPRow'
)
