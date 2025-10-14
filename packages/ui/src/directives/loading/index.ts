// Components
import { SPLoading } from '@/components/SPLoading'

// Composables
import { createCDirective } from '@/composables/vdirective'

// Types
import type { DirectiveBinding } from 'vue'

export interface LoadingDirectiveBinding
  extends Omit<
    DirectiveBinding<boolean | string | Record<string, any>>,
    'value'
  > {
  value:
    | boolean
    | string
    | {
        modelValue?: number | string
        text?: string
        color?: string
        scrimColor?: string
        opacity?: number
        indeterminate?: boolean
        progress?: number
        size?: string | number
        width?: number
        absolute?: boolean
        contained?: boolean
        persistent?: boolean
        zIndex?: number
      }
}

export const Loading = createCDirective<LoadingDirectiveBinding>(
  SPLoading,
  binding => {
    const value = binding.value

    if (typeof value === 'boolean') {
      return {
        modelValue: value,
        contained: true,
        indeterminate: true,
      }
    }

    if (typeof value === 'string') {
      return {
        modelValue: true,
        text: value,
        contained: true,
      }
    }

    if (typeof value === 'object' && value !== null) {
      return {
        contained: true,
        modelValue: value.modelValue !== undefined ? value.modelValue : true,
        ...value,
      }
    }

    return {
      modelValue: false,
      contained: true,
    }
  }
)

export default Loading
