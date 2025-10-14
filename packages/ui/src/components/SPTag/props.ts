// Composables
import { makeBorderProps } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeElevationProps } from '@/composables/elevation'
import { makeGroupItemProps } from '@/composables/group'
import { IconValue } from '@/composables/icons'
import { makeRoundedProps } from '@/composables/rounded'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

// Utilities
import { EventProp, propsFactory } from '@/utils'

export const makeVChipProps = propsFactory(
  {
    activeClass: String,
    appendAvatar: String,
    appendIcon: IconValue,
    baseColor: String,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: '$delete',
    },
    closeLabel: {
      type: String,
      default: '$speed.close',
    },
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: IconValue,
      default: '$complete',
    },
    label: Boolean,
    link: {
      type: Boolean,
      default: undefined,
    },
    pill: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    text: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    modelValue: {
      type: Boolean,
      default: true,
    },

    onClick: EventProp<[MouseEvent]>(),
    onClickOnce: EventProp<[MouseEvent]>(),

    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'span' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'tonal' } as const),
  },
  'SPTag'
)
