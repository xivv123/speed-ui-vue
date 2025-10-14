// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPListItemActionProps = propsFactory({
  start: Boolean,
  end: Boolean,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'SPListItemAction')

export const SPListItemAction = genericComponent()({
  name: 'SPListItemAction',

  props: makeSPListItemActionProps(),

  setup (props, { slots }) {
    useRender(() => {
      const Tag = props.tag as any
      return (
        <Tag
          class={[
            'sp-list-item-action',
            {
              'sp-list-item-action--start': props.start,
              'sp-list-item-action--end': props.end,
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

export type SPListItemAction = InstanceType<typeof SPListItemAction>
