// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPCardTextProps = propsFactory(
  {
    opacity: [Number, String],

    ...makeComponentProps(),
    ...makeTagProps(),
  },
  'SPCardText'
)

export const SPCardText = genericComponent()({
  name: 'SPCardText',

  props: makeSPCardTextProps(),

  setup(props, { slots }) {
    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          class={['sp-card-text', props.class]}
          style={[{ '--sp-card-text-opacity': props.opacity }, props.style]}
          v-slots={slots}
        />
      )
    })

    return {}
  },
})

export type SPCardText = InstanceType<typeof SPCardText>
