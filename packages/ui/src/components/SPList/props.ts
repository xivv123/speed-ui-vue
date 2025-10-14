import { propsFactory, EventProp } from '@/utils'
import { makeBorderProps } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { makeDimensionProps } from '@/composables/dimensions'
import { makeElevationProps } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeItemsProps } from '@/composables/list-items'
import { makeNestedProps } from '@/composables/nested/nested'
import { makeRoundedProps } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps } from '@/composables/theme'
import { makeVariantProps } from '@/composables/variant'

import type { PropType } from 'vue'

export const makeSPListProps = propsFactory(
  {
    baseColor: String,
    /* @deprecated */
    activeColor: String,
    activeClass: String,
    bgColor: String,
    disabled: Boolean,
    filterable: Boolean,
    expandIcon: IconValue,
    collapseIcon: IconValue,
    lines: {
      type: [Boolean, String] as PropType<'one' | 'two' | 'three' | false>,
      default: 'one',
    },
    slim: Boolean,
    nav: Boolean,

    'onClick:open': EventProp<[{ id: unknown; value: boolean; path: unknown[] }]>(),
    'onClick:select': EventProp<[{ id: unknown; value: boolean; path: unknown[] }]>(),
    'onUpdate:opened': EventProp<[]>(),
    ...makeNestedProps({
      selectStrategy: 'single-leaf' as const,
      openStrategy: 'list' as const,
    }),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeItemsProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'text' } as const),
  },
  'SPList'
)
