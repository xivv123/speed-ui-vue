// Styles
import './SPTagGroup.sass'

// Components
import {
  makeSPSlideGroupProps,
  SPSlideGroup,
} from '../SPSlideGroup/SPSlideGroup'

// Composables
import { makeComponentProps } from '../../composables/component'
import { provideDefaults } from '../../composables/defaults'
import { makeGroupProps, useGroup } from '../../composables/group'
import { makeTagProps } from '../../composables/tag'
import { makeThemeProps, provideTheme } from '../../composables/theme'
import { makeVariantProps } from '../../composables/variant'

// Utilities
import { toRef } from 'vue'
import {
  deepEqual,
  genericComponent,
  propsFactory,
  useRender,
} from '../../utils'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export const SPTagGroupSymbol = Symbol.for('speed:sp-tag-group')

export const makeSPTagGroupProps = propsFactory(
  {
    baseColor: String,
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },

    ...makeSPSlideGroupProps(),
    ...makeComponentProps(),
    ...makeGroupProps({ selectedClass: 'sp-tag--selected' }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'tonal' } as const),
  },
  'SPTagGroup'
)

type SPTagGroupSlots = {
  default: {
    isSelected: (id: string) => boolean
    select: (id: string, value: boolean) => void
    next: () => void
    prev: () => void
    selected: readonly string[]
  }
}

export const SPTagGroup = genericComponent<
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: SPTagGroupSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPTagGroup',

  props: makeSPTagGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup(props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { isSelected, select, next, prev, selected } = useGroup(
      props,
      SPTagGroupSymbol
    )

    provideDefaults({
      VChip: {
        baseColor: toRef(() => props.baseColor),
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        filter: toRef(() => props.filter),
        variant: toRef(() => props.variant),
      },
    })

    useRender(() => {
      const slideGroupProps = SPSlideGroup.filterProps(props)

      return (
        <SPSlideGroup
          {...slideGroupProps}
          class={[
            'sp-tag-group',
            {
              'sp-tag-group--column': props.column,
            },
            themeClasses.value,
            props.class,
          ]}
          style={props.style}
        >
          {slots.default?.({
            isSelected,
            select,
            next,
            prev,
            selected: selected.value,
          })}
        </SPSlideGroup>
      )
    })

    return {}
  },
})

export type SPTagGroup = InstanceType<typeof SPTagGroup>
