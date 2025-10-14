// Composables
import { makeComponentProps } from '@/composables/component'
import { SPLabel } from '../../SPLabel'
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPFloatLabelProps = propsFactory(
  {
    floating: Boolean,
    for: String,

    ...makeComponentProps(),
  },
  'SPFloatLabel'
)

export const SPFloatLabel = genericComponent()({
  name: 'SPFloatLabel',

  props: makeSPFloatLabelProps(),

  setup(props, { slots }) {
    useRender(() => (
      <SPLabel
        class={[
          'sp-float-label',
          { 'sp-float-label--floating': props.floating },
          props.class,
        ]}
        style={props.style}
        for={props.for}
        v-slots={slots}
      />
    ))

    return {}
  },
})

export type SPFloatLabel = InstanceType<typeof SPFloatLabel>
