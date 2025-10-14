// Composables
import { makeBorderProps } from '../../composables/border'
import { makeComponentProps } from '../../composables/component'
import { makeDensityProps } from '../../composables/density'
import { makeDimensionProps } from '../../composables/dimensions'
import { makeElevationProps } from '../../composables/elevation'
import { makeGroupItemProps } from '../../composables/group'
import { IconValue } from '../../composables/icons'
import { makeLoaderProps } from '../../composables/loader'
import { makeLocationProps } from '../../composables/location'
import { makePositionProps } from '../../composables/position'
import { makeRoundedProps } from '../../composables/rounded'
// import { makeRouterProps } from '../../composables/router'
import { makeSizeProps } from '../../composables/size'
import { makeTagProps } from '../../composables/tag'
import { makeThemeProps } from '../../composables/theme'
import { makeVariantProps } from '../../composables/variant'

// Utilities
import { propsFactory } from '../../utils'

// Types
import type { PropType } from 'vue'
// import type { RippleDirectiveBinding } from '@/directives/ripple'

export const makeVBtnProps = propsFactory(
  {
    active: {
      type: Boolean,
      default: undefined,
    },
    activeColor: String,
    baseColor: String,
    symbol: {
      type: null,
      default: '', // VBtnToggleSymbol,
    },
    flat: Boolean,
    icon: [Boolean, String, Function, Object] as PropType<boolean | IconValue>,
    prependIcon: IconValue,
    appendIcon: IconValue,

    block: Boolean,
    readonly: Boolean,
    slim: Boolean,
    stacked: Boolean,

    // ripple: {
    //   type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    //   default: true,
    // },

    text: {
      type: [String, Number, Boolean],
      default: undefined,
    },

    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    // ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'button' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'elevated' } as const),
  },
  'SPBtn'
)
