// Types
import type { SPCardItemSlots } from './internal/SPCardItem'
import type { LoaderSlotProps } from '@/composables/loader'

export type SPCardSlots = SPCardItemSlots & {
  default: never
  actions: never
  text: never
  loader: LoaderSlotProps
  image: never
  item: never
}

