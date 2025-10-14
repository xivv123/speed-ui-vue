export type VChipSlots = {
  default: {
    isSelected: boolean | undefined
    selectedClass: boolean | (string | undefined)[] | undefined
    select: ((value: boolean) => void) | undefined
    toggle: (() => void) | undefined
    value: unknown
    disabled: boolean
  }
  label: never
  prepend: never
  append: never
  close: never
  filter: never
}
