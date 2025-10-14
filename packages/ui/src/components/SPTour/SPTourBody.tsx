// Utilities
import { genericComponent, propsFactory } from '@/utils'

export const makeSPTourBodyProps = propsFactory(
  {
    description: String,
  },
  'SPTourBody'
)

export const SPTourBody = genericComponent()({
  name: 'SPTourBody',

  props: makeSPTourBodyProps(),

  setup(props, { slots }) {
    return () => (
      <div class="sp-tour__body">
        {props.description && (
          <p class="sp-tour__description">{props.description}</p>
        )}
        {slots.default?.()}
      </div>
    )
  },
})

export type SPTourBody = InstanceType<typeof SPTourBody>

