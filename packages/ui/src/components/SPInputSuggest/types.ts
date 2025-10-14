import type { SPFieldSlots } from '@/components/SPField/types'
import type { SPInputSlots } from '@/components/SPInput/SPInput'
import type { ListItem } from '@/composables/list-items'

type Primitive = string | number | boolean | symbol

type Val<T, ReturnObject extends boolean> = [T] extends [Primitive]
  ? T
  : ReturnObject extends true
  ? T
  : any

type Value<
  T,
  ReturnObject extends boolean,
  Multiple extends boolean
> = Multiple extends true
  ? readonly Val<T, ReturnObject>[]
  : Val<T, ReturnObject> | null

export type { Primitive, Val, Value }

export type ItemType<T> = T extends readonly (infer U)[] ? U : never

export type SPInputSuggestSlots<Item = any> = Omit<
  SPInputSlots & SPFieldSlots,
  'default'
> & {
  item: {
    item: ListItem<Item>
    index: number
    props: Record<string, unknown>
  }
  chip: {
    item: ListItem<Item>
    index: number
    props: Record<string, unknown>
  }
  selection: { item: ListItem<Item>; index: number }
  subheader: { props: Record<string, unknown>; index: number }
  divider: { props: Record<string, unknown>; index: number }
  'prepend-item': never
  'append-item': never
  'no-data': never
}
