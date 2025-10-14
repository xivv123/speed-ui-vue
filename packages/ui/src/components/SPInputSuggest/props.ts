// Utilities
import { omit, propsFactory } from '@/utils'

// Composables
import { makeFilterProps } from '@/composables/filter'
import { makeTransitionProps } from '@/composables/transition'
import { makeSelectProps } from '@/components/SPSelect/SPSelect'
import { makeSPTextFieldProps } from '@/components/SPTextField'

// Types
import type { PropType } from 'vue'

export const makeSPInputSuggestProps = propsFactory(
  {
    autoSelectFirst: {
      type: [Boolean, String] as PropType<boolean | 'exact'>,
    },
    clearOnSelect: Boolean,
    search: String,

    ...makeFilterProps({ filterKeys: ['title'] }),
    ...makeSelectProps(),
    ...omit(
      makeSPTextFieldProps({
        modelValue: null,
        role: 'combobox',
      }),
      ['validationValue', 'dirty', 'appendInnerIcon']
    ),
    ...makeTransitionProps({ transition: false }),
  },
  'SPInputSuggest'
)
