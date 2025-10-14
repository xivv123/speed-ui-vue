// Types
export type SPSidebarLocation = 'left' | 'right'

export type SPSidebarSlots = {
  default: never
  prepend: never
  append: never
  toggle: { isOpen: boolean; toggle: () => void }
}
