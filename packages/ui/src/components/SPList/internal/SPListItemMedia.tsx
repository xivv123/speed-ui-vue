// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPListItemMediaProps = propsFactory({
  start: Boolean,
  end: Boolean,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'SPListItemMedia')

export const SPListItemMedia = genericComponent()({
  name: 'SPListItemMedia',

  props: makeSPListItemMediaProps(),

  setup (props, { slots }) {
    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          class={[
            'sp-list-item-media',
            {
              'sp-list-item-media--start': props.start,
              'sp-list-item-media--end': props.end,
            },
            props.class,
          ]}
          style={ props.style }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type SPListItemMedia = InstanceType<typeof SPListItemMedia>
