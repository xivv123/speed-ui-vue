// Types only for SPField consumers
import type { Ref } from 'vue'
import type { LoaderSlotProps } from '@/composables/loader'

export interface DefaultInputSlot {
  isActive: Ref<boolean>
  isFocused: Ref<boolean>
  controlRef: Ref<HTMLElement | undefined>
  focus: () => void
  blur: () => void
}

export interface SPFieldSlot extends DefaultInputSlot {
  props: Record<string, unknown>
}

export type SPFieldSlots = {
  clear: DefaultInputSlot & { props: Record<string, any> }
  'prepend-inner': DefaultInputSlot
  'append-inner': DefaultInputSlot
  label: DefaultInputSlot & {
    label: string | undefined
    props: Record<string, any>
  }
  loader: LoaderSlotProps
  counter: DefaultInputSlot & {
    value: number
    max: number | undefined
    active: boolean
  }
  default: SPFieldSlot
}

