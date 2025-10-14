// Components
import { SPBadge } from '@/components/SPBadge'

// Composables
import { useDirectiveComponent } from '@/composables/directiveComponent'

// Types
import type { DirectiveBinding } from 'vue'
import type { Anchor } from '@/utils'

export interface BadgeDirectiveBinding
  extends Omit<DirectiveBinding<string | number>, 'arg' | 'value'> {
  arg?: {
    [T in Anchor]: T extends `${infer A} ${infer B}` ? `${A}-${B}` : T
  }[Anchor]
  value: boolean | string | number | Record<string, any>
}

export const Badge = useDirectiveComponent<BadgeDirectiveBinding>(
  SPBadge,
  binding => {
    const isActive = typeof binding.value === 'boolean' ? binding.value : true
    const content =
      typeof binding.value === 'boolean' ? undefined : binding.value

    return {
      modelValue: isActive,
      content:
        typeof content === 'object' && content !== null
          ? content.content || content.text || content.value
          : content,
      location: binding.arg?.replace('-', ' ') || 'top end',
      color:
        typeof content === 'object' && content !== null
          ? content.color
          : undefined,
      dot:
        typeof content === 'object' && content !== null
          ? content.dot
          : undefined,
      max:
        typeof content === 'object' && content !== null
          ? content.max
          : undefined,
      bordered:
        typeof content === 'object' && content !== null
          ? content.bordered
          : undefined,
      floating:
        typeof content === 'object' && content !== null
          ? content.floating
          : true,
      offsetX:
        typeof content === 'object' && content !== null
          ? content.offsetX
          : undefined,
      offsetY:
        typeof content === 'object' && content !== null
          ? content.offsetY
          : undefined,
      icon:
        typeof content === 'object' && content !== null
          ? content.icon
          : undefined,
      textColor:
        typeof content === 'object' && content !== null
          ? content.textColor
          : undefined,
    }
  }
)

export default Badge
