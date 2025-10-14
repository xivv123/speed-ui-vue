export type SegmentedOption =
  | string
  | {
      label: string
      value: any
      disabled?: boolean
      baseColor?: string
      color?: string
      trueIcon?: any
      falseIcon?: any
    }

export type SegmentedItemVariant = 'default' | 'outlined'

export type SegmentedVariant = 'filled' | 'outlined' | 'solo'
