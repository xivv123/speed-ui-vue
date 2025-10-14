// Composables
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps } from '@/composables/elevation'
import { makeRoundedProps } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { SPSidebarLocation } from './types'

export const makeSPSidebarProps = propsFactory(
  {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    location: {
      type: String as PropType<SPSidebarLocation>,
      default: 'left',
    },
    rail: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: 256,
    },
    railWidth: {
      type: [Number, String] as PropType<number | string>,
      default: 56,
    },
    permanent: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    floating: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    color: String as PropType<string>,
    bgColor: String as PropType<string>,
    border: {
      type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
      default: false,
    },

    ...makeComponentProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'aside' }),
    ...makeThemeProps(),
  },
  'SPSidebar'
)
