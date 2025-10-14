// Styles are inherited from SPTextSuper.scss

// Composables
import { makeComponentProps } from '@/composables/component'

// Utils
import { EventProp, genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPTextSuperFooterProps = propsFactory(
  {
    // Allow native listeners forwarded to the root
    onMousedown: EventProp<[MouseEvent]>(),
    ...makeComponentProps(),
  },
  'SPTextSuperFooter'
)

export type SPTextSuperFooterSlots = {
  default: void
  left: void
  right: void
}

export const SPTextSuperFooter = genericComponent<SPTextSuperFooterSlots>()({
  name: 'SPTextSuperFooter',

  props: makeSPTextSuperFooterProps(),

  setup(props, { slots, attrs }) {
    useRender(() => (
      <div
        class={['sp-text-super__footer', props.class]}
        style={props.style}
        onMousedown={props.onMousedown}
        {...attrs}
      >
        {slots.left && (
          <div class="sp-text-super__footer__left">{slots.left?.()}</div>
        )}

        {slots.default && (
          <div class="sp-text-super__footer__content">{slots.default?.()}</div>
        )}

        {slots.right && (
          <div class="sp-text-super__footer__right">{slots.right?.()}</div>
        )}
      </div>
    ))

    return {}
  },
})

export type SPTextSuperFooter = InstanceType<typeof SPTextSuperFooter>
