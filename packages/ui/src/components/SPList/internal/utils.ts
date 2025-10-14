import { computed } from 'vue'
import { getPropertyFromItem, isPrimitive, omit } from '@/utils'

import type { ItemProps, ListItem } from '@/composables/list-items'

export interface InternalListItem<T = any> extends ListItem<T> {}

const itemTypes = new Set(['item', 'divider', 'subheader'])

export function transformItem(props: ItemProps, item: any): ListItem {
  const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle)
  const value = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemValue, undefined)
  const children = getPropertyFromItem(item, props.itemChildren)
  const itemProps = props.itemProps === true
    ? omit(item, ['children'])
    : getPropertyFromItem(item, props.itemProps)

  let type = getPropertyFromItem(item, props.itemType, 'item')
  if (!itemTypes.has(type)) {
    type = 'item'
  }

  const _props = {
    title,
    value,
    ...itemProps,
  }

  return {
    type,
    title: _props.title,
    value: _props.value,
    props: _props,
    children: type === 'item' && children ? transformItems(props, children) : undefined,
    raw: item,
  }
}

export function transformItems(props: ItemProps, items: (string | object)[]) {
  const array: InternalListItem[] = []

  for (const item of items) {
    array.push(transformItem(props, item))
  }

  return array
}

export function useListItems(props: ItemProps) {
  const items = computed(() => transformItems(props, props.items))

  return { items }
}
