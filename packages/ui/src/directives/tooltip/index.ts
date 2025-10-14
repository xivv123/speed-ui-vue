// Components
import { SPTooltip } from '@/components/SPTooltip'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'
import type { Anchor } from '@/utils'

export interface TooltipDirectiveBinding extends Omit<DirectiveBinding<string>, 'arg' | 'value'> {
  arg?: { [T in Anchor]: T extends `${infer A} ${infer B}` ? `${A}-${B}` : T }[Anchor]
  value: boolean | string | Record<string, any>
}

export const Tooltip = useDirectiveComponent<TooltipDirectiveBinding>(SPTooltip, binding => {
  return {
    activator: 'parent',
    location: binding.arg?.replace('-', ' '),
    text: typeof binding.value === 'boolean' ? undefined : binding.value,
  }
})

export default Tooltip
