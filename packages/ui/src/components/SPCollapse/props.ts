// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPCollapseProps = propsFactory(
  {
    modelValue: {
      type: [Array, String, Number] as PropType<readonly (string | number)[] | string | number>,
      default: () => [],
    },
    accordion: Boolean,
    expandIconPosition: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
    beforeChange: Function as PropType<
      (name: string | number, value: boolean) => boolean | Promise<boolean>
    >,

    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPCollapse'
)
