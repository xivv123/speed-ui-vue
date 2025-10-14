// Components
import { SPBtn } from '@/components/SPBtn'

// Utilities
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
import { IconValue } from '@/composables/icons'

export const makeSPTourHeaderProps = propsFactory(
  {
    title: String,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: 'Close',
    },
    onClose: Function as PropType<() => void>,
  },
  'SPTourHeader'
)

export const SPTourHeader = genericComponent()({
  name: 'SPTourHeader',

  props: makeSPTourHeaderProps(),

  setup(props) {
    return () => {
      if (!props.title && !props.closable) return null

      return (
        <div class="sp-tour__header">
          {props.title && <h3 class="sp-tour__title">{props.title}</h3>}
          {props.closable && (
            <SPBtn icon={props.closeIcon} onClick={props.onClose} size="x-small" />
          )}
        </div>
      )
    }
  },
})

export type SPTourHeader = InstanceType<typeof SPTourHeader>

