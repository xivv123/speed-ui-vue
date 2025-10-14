// Types
import type { InjectionKey, Ref } from 'vue'

type ReadonlyRef<T> = Readonly<Ref<T>>

export interface SPCollapseSlots {
  default: never
  [key: string]: any
}

export interface SPCollapseContext {
  isOpen: (name: string | number) => boolean
  toggle: (name: string | number, value?: boolean) => void
  accordion: ReadonlyRef<boolean>
  expandIconPosition: ReadonlyRef<'left' | 'right'>
  beforeChange?: ReadonlyRef<
    ((name: string | number, value: boolean) => boolean | Promise<boolean>) | undefined
  >
}

export const SPCollapseSymbol: InjectionKey<SPCollapseContext> = Symbol.for('sp:collapse')
