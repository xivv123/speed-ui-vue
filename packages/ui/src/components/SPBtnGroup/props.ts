// Composables
import { makeBorderProps } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeElevationProps } from '@/composables/elevation'
import { makeRoundedProps } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPBtnGroupProps = propsFactory({
  baseColor: String,
  divided: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeVariantProps(),
}, 'SPBtnGroup')
