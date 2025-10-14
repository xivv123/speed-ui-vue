// Components
import { SPCardSubtitle } from './SPCardSubtitle'
import { SPCardTitle } from './SPCardTitle'
// import { VAvatar } from '@/components/VAvatar' // 暂时屏蔽，组件不存在
// import { VDefaultsProvider } from '@/components/VDefaultsProvider' // 暂时屏蔽，组件不存在
// import { VIcon } from '@/components/VIcon' // 暂时屏蔽，组件不存在

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'

// Utilities
import { toDisplayString } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/utils'

export type SPCardItemSlots = {
  default: never
  prepend: never
  append: never
  title: never
  subtitle: never
}

export const makeCardItemProps = propsFactory(
  {
    appendAvatar: String,
    appendIcon: IconValue,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    title: {
      type: [String, Number, Boolean],
      default: undefined,
    },

    ...makeComponentProps(),
    ...makeDensityProps(),
  },
  'SPCardItem'
)

export const SPCardItem = genericComponent<SPCardItemSlots>()({
  name: 'SPCardItem',

  props: makeCardItemProps(),

  setup(props, { slots }) {
    useRender(() => {
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || slots.prepend)
      const hasAppendMedia = !!(props.appendAvatar || props.appendIcon)
      const hasAppend = !!(hasAppendMedia || slots.append)
      const hasTitle = !!(props.title != null || slots.title)
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle)

      return (
        <div
          class={['sp-card-item', props.class]}
          style={props.style}
        >
          {/* 暂时屏蔽 prepend 功能，因为依赖的组件不存在 */}
          {hasPrepend && (
            <div
              key="prepend"
              class="sp-card-item__prepend"
            >
              {slots.prepend?.()}
            </div>
          )}

          <div class="sp-card-item__content">
            {hasTitle && (
              <SPCardTitle key="title">
                {slots.title?.() ?? toDisplayString(props.title)}
              </SPCardTitle>
            )}

            {hasSubtitle && (
              <SPCardSubtitle key="subtitle">
                {slots.subtitle?.() ?? toDisplayString(props.subtitle)}
              </SPCardSubtitle>
            )}

            {slots.default?.()}
          </div>

          {/* 暂时屏蔽 append 功能，因为依赖的组件不存在 */}
          {hasAppend && (
            <div
              key="append"
              class="sp-card-item__append"
            >
              {slots.append?.()}
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type SPCardItem = InstanceType<typeof SPCardItem>
