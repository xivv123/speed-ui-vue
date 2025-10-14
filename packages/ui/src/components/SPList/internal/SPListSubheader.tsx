// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'SPListSubheader')

export const SPListSubheader = genericComponent()({
  name: 'SPListSubheader',

  props: makeSPListSubheaderProps(),

  setup (props, { slots }) {
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    useRender(() => {
      const hasText = !!(slots.default || props.title)
      const Tag = props.tag as any

      return (
        <Tag
          class={[
            'sp-list-subheader',
            {
              'sp-list-subheader--inset': props.inset,
              'sp-list-subheader--sticky': props.sticky,
            },
            textColorClasses.value,
            props.class,
          ]}
          style={[
            { textColorStyles },
            props.style,
          ]}
        >
          { hasText && (
            <div class="sp-list-subheader__text">
              { slots.default?.() ?? props.title }
            </div>
          )}
        </Tag>
      )
    })

    return {}
  },
})

export type SPListSubheader = InstanceType<typeof SPListSubheader>
