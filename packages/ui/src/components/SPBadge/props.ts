// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps } from '@/composables/dimensions'
import { IconValue } from '@/composables/icons'
import { makeLocationProps } from '@/composables/location'
import { makeRoundedProps } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { propsFactory } from '@/utils'

export const makeSPBadgeProps = propsFactory(
  {
    bordered: Boolean,
    color: String,
    content: [Number, String],
    dot: Boolean,
    floating: Boolean,
    icon: IconValue,
    inline: Boolean,
    label: {
      type: String,
      default: '$speed.badge',
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true,
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,

    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeLocationProps({ location: 'top end' } as const),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeTransitionProps(),
  },
  'SPBadge'
)
