// Composables
import { useColor } from './color'

// Utilities
import { toRef, toValue } from 'vue'
import { getCurrentInstanceName, propsFactory } from '../utils'

// Types
import type { MaybeRefOrGetter, PropType } from 'vue'

export const allowedVariants = [
  'elevated',
  'flat',
  'tonal',
  'outlined',
  'text',
  'plain',
] as const

export type Variant = (typeof allowedVariants)[number]

export interface VariantProps {
  color?: string
  variant: Variant
}

export function genOverlays(isClickable: boolean, name: string) {
  return (
    <>
      {isClickable && (
        <span
          key="overlay"
          class={`${name}__overlay`}
        />
      )}

      <span
        key="underlay"
        class={`${name}__underlay`}
      />
    </>
  )
}

export const makeVariantProps = propsFactory(
  {
    color: String,
    variant: {
      type: String as PropType<Variant>,
      default: 'elevated',
      validator: (v: any) => allowedVariants.includes(v),
    },
  },
  'variant'
)

export function useVariant(
  props: MaybeRefOrGetter<VariantProps>,
  name = getCurrentInstanceName()
) {
  const variantClasses = toRef(() => {
    const { variant } = toValue(props)
    return `${name}--variant-${variant}`
  })

  const { colorClasses, colorStyles } = useColor(() => {
    const { variant, color } = toValue(props)
    // For elevated and flat variants, always return background color
    // For other variants, also use background color to ensure proper text color calculation
    if (['elevated', 'flat'].includes(variant)) {
      return { background: color || (name === 'sp-msgbar' ? 'surface-variant' : undefined) }
    }
    // For tonal variant, also use background color for proper contrast
    if (variant === 'tonal' && color) {
      return { background: color }
    }
    return color ? { text: color } : {}
  })

  return { colorClasses, colorStyles, variantClasses }
}
