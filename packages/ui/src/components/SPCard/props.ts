// Composables
import { makeBorderProps } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeDimensionProps } from '@/composables/dimensions'
import { makeElevationProps } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeLoaderProps } from '@/composables/loader'
import { makeLocationProps } from '@/composables/location'
import { makePositionProps } from '@/composables/position'
import { makeRoundedProps } from '@/composables/rounded'
import { makeRouterProps } from '@/composables/router'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
// import type { RippleDirectiveBinding } from '@/directives/ripple'

export const makeSPCardProps = propsFactory(
  {
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: {
      type: Boolean,
      default: undefined,
    },
    prependAvatar: String,
    prependIcon: IconValue,
    // ripple: {
    //   type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    //   default: true,
    // },
    subtitle: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    text: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    title: {
      type: [String, Number, Boolean],
      default: undefined,
    },

    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'elevated' } as const),
  },
  'SPCard'
)
