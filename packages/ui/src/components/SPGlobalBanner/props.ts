// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps } from '@/composables/dimensions'
import { makeElevationProps } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makePositionProps } from '@/composables/position'
import { makeRoundedProps } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPGlobalBannerProps = propsFactory(
  {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    closable: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    closeIcon: {
      type: IconValue,
      default: '$close',
    },
    closeLabel: {
      type: String as PropType<string>,
      default: '关闭',
    },
    bgColor: String as PropType<string>,
    sticky: {
      type: Boolean as PropType<boolean>,
      default: false,
    },

    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps({ tag: 'div' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'flat' } as const),
  },
  'SPGlobalBanner'
)
