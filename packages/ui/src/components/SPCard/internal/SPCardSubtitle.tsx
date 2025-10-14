// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPCardSubtitleProps = propsFactory(
  {
    opacity: [Number, String],

    ...makeComponentProps(),
    ...makeTagProps(),
  },
  'SPCardSubtitle'
)

export const SPCardSubtitle = genericComponent()({
  name: 'SPCardSubtitle',

  props: makeSPCardSubtitleProps(),

  setup(props, { slots }) {
    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          class={['sp-card-subtitle', props.class]}
          style={[{ '--sp-card-subtitle-opacity': props.opacity }, props.style]}
          v-slots={slots}
        />
      )
    })

    return {}
  },
})

export type SPCardSubtitle = InstanceType<typeof SPCardSubtitle>
