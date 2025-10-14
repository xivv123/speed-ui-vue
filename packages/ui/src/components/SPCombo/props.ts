// Composables
import { makeFilterProps } from '@/composables/filter'
import { makeSelectProps } from '@/components/SPSelect/SPSelect'
import { makeSPTextFieldProps } from '@/components/SPTextField'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { omit, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPComboProps = propsFactory(
  {
    autoSelectFirst: {
      type: [Boolean, String] as PropType<boolean | 'exact'>,
    },
    clearOnSelect: {
      type: Boolean,
      default: true,
    },
    delimiters: Array as PropType<readonly string[]>,
    // tags: Boolean,
    closableChips: Boolean,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps({ hideNoData: true, returnObject: true }),
    ...omit(
      makeSPTextFieldProps({
        modelValue: null,
        role: 'combo',
      }),
      ['validationValue', 'dirty', 'appendInnerIcon']
    ),
    ...makeTransitionProps({ transition: false }),
  },
  'SPCombo'
)
