// Components
import { SPListGroup } from './SPListGroup'
import { SPListItem } from '../SPListItem'
import { SPListSubheader } from './SPListSubheader'
import { SPDivider } from '@/components/SPDivider'

// Utilities
import { createList } from '../list'
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from './utils'
import type { SPListItemSlots } from '../SPListItem'
import type { GenericProps } from '@/utils'

export type SPListChildrenSlots<T> = {
  [K in keyof Omit<SPListItemSlots, 'default'>]: SPListItemSlots[K] & { item: T }
} & {
  default: never
  item: { props: InternalListItem['props'] }
  divider: { props: InternalListItem['props'] }
  subheader: { props: InternalListItem['props'] }
  header: { props: InternalListItem['props'] }
}

export const makeSPListChildrenProps = propsFactory({
  items: Array as PropType<readonly InternalListItem[]>,
  returnObject: Boolean,
}, 'SPListChildren')

export const SPListChildren = genericComponent<new <T extends InternalListItem>(
  props: {
    items?: readonly T[]
    returnObject?: boolean
  },
  slots: SPListChildrenSlots<T>
) => GenericProps<typeof props, typeof slots>>()({
  name: 'SPListChildren',

  props: makeSPListChildrenProps(),

  setup (props, { slots }) {
    createList()

    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, type, raw: item }) => {
      if (type === 'divider') {
        return slots.divider?.({ props: itemProps }) ?? (
          <SPDivider { ...itemProps } />
        )
      }

      if (type === 'subheader') {
        return slots.subheader?.({ props: itemProps }) ?? (
          <SPListSubheader { ...itemProps } />
        )
      }

      const slotsWithItem = {
        subtitle: slots.subtitle ? (slotProps: any) => slots.subtitle?.({ ...slotProps, item }) : undefined,
        prepend: slots.prepend ? (slotProps: any) => slots.prepend?.({ ...slotProps, item }) : undefined,
        append: slots.append ? (slotProps: any) => slots.append?.({ ...slotProps, item }) : undefined,
        title: slots.title ? (slotProps: any) => slots.title?.({ ...slotProps, item }) : undefined,
      }

      const listGroupProps = SPListGroup.filterProps(itemProps)

      return children ? (
        <SPListGroup
          { ...listGroupProps }
          value={ props.returnObject ? item : itemProps?.value }
          rawId={ itemProps?.value }
        >
          {{
            activator: ({ props: activatorProps }) => {
              const listItemProps = {
                ...itemProps,
                ...activatorProps,
                value: props.returnObject ? item : itemProps.value,
              }

              return slots.header
                ? slots.header({ props: listItemProps })
                : (
                  <SPListItem { ...listItemProps } v-slots={ slotsWithItem } />
                )
            },
            default: () => (
              <SPListChildren
                items={ children }
                returnObject={ props.returnObject }
                v-slots={ slots }
              />
            ),
          }}
        </SPListGroup>
      ) : (
        slots.item ? slots.item({ props: itemProps }) : (
          <SPListItem
            { ...itemProps }
            value={ props.returnObject ? item : itemProps.value }
            v-slots={ slotsWithItem }
          />
        )
      )
    })
  },
})
