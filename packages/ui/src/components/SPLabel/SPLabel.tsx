// Styles
import './SPLabel.scss'

// Composables
import { makeComponentProps } from '../../composables/component'
import { makeThemeProps } from '../../composables/theme'
import {
  EventProp,
  genericComponent,
  propsFactory,
  useRender,
} from '../../utils'

export const makeSPLabelProps = propsFactory(
  {
    text: String,
    for: String,
    onClick: EventProp<[MouseEvent]>(),
    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPLabel'
)

export const SPLabel = genericComponent()({
  name: 'SPLabel',

  props: makeSPLabelProps(),

  setup(props, { slots }) {
    useRender(() => (
      <label
        class={[
          'sp-label',
          {
            'sp-label--clickable': !!props.onClick,
          },
          props.class,
        ]}
        style={props.style}
        for={props.for}
        onClick={props.onClick}
      >
        {props.text}

        {slots.default?.()}
      </label>
    ))

    return {}
  },
})

export type SPLabel = InstanceType<typeof SPLabel>
