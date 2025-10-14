// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeDimensionProps } from '@/composables/dimensions'
import { makeElevationProps } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeLocationProps } from '@/composables/location'
import { makePositionProps } from '@/composables/position'
import { makeRoundedProps } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

const allowedTypes = ['success', 'info', 'warning', 'error'] as const

export type ContextualType = (typeof allowedTypes)[number]

export const makeVAlertProps = propsFactory(
  {
    border: {
      type: [Boolean, String] as PropType<
        boolean | 'top' | 'end' | 'bottom' | 'start'
      >,
      validator: (val: boolean | string) => {
        return (
          typeof val === 'boolean' ||
          ['top', 'end', 'bottom', 'start'].includes(val)
        )
      },
    },
    borderColor: String,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: '$close',
    },
    closeLabel: {
      type: String,
      default: '关闭',
    },
    icon: {
      type: [Boolean, String, Function, Object] as PropType<false | IconValue>,
      default: null,
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
    prominent: Boolean,
    title: String,
    text: String,
    type: {
      type: String as PropType<ContextualType>,
      validator: (val: ContextualType) => allowedTypes.includes(val),
    },

    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'flat' } as const),
  },
  'SPAlert'
)
