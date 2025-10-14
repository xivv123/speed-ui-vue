// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPListItemSubtitleProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'SPListItemSubtitle')

export const SPListItemSubtitle = genericComponent()({
  name: 'SPListItemSubtitle',

  props: makeSPListItemSubtitleProps(),

  setup (props, { slots }) {
    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          class={[
            'sp-list-item-subtitle',
            props.class,
          ]}
          style={[
            { '--sp-list-item-subtitle-opacity': props.opacity },
            props.style,
          ]}
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type SPListItemSubtitle = InstanceType<typeof SPListItemSubtitle>
