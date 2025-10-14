// Components
import { SPProgressLinear } from '@/components/SPProgressLinear'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'

export interface ProgbarDirectiveBinding extends Omit<DirectiveBinding<number | string | Record<string, any>>, 'arg' | 'value'> {
  arg?: 'top' | 'bottom'
  value: number | string | {
    modelValue?: number | string
    max?: number | string
    color?: string
    height?: number | string
    indeterminate?: boolean
    active?: boolean
    striped?: boolean
    rounded?: boolean
    bufferValue?: number | string
    bufferColor?: string
    clickable?: boolean
    stream?: boolean
  }
}

export const Progbar = useDirectiveComponent<ProgbarDirectiveBinding>(SPProgressLinear, binding => {
  const value = binding.value
  
  if (typeof value === 'number' || typeof value === 'string') {
    return {
      modelValue: value,
      location: binding.arg || 'top',
      absolute: true,
    }
  }
  
  if (typeof value === 'object' && value !== null) {
    return {
      modelValue: value.modelValue || 0,
      max: value.max || 100,
      color: value.color,
      height: value.height || 4,
      indeterminate: value.indeterminate || false,
      active: value.active !== false,
      striped: value.striped || false,
      rounded: value.rounded || false,
      bufferValue: value.bufferValue || 0,
      bufferColor: value.bufferColor,
      clickable: value.clickable || false,
      stream: value.stream || false,
      location: binding.arg || 'top',
      absolute: true,
    }
  }
  
  return {
    modelValue: 0,
    location: binding.arg || 'top',
    absolute: true,
  }
})

export default Progbar