// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/utils'

// Types
import type { GenericProps, TemplateRef } from '@/utils'

export const makeSPVirtualScrollItemProps = propsFactory(
  {
    renderless: Boolean,

    ...makeComponentProps(),
  },
  'SPVirtualScrollItem'
)

export const SPVirtualScrollItem = genericComponent<
  new <Renderless extends boolean = false>(
    props: {
      renderless?: Renderless
    },
    slots: {
      default: Renderless extends true
        ? {
            itemRef: TemplateRef
          }
        : never
    }
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPVirtualScrollItem',

  inheritAttrs: false,

  props: makeSPVirtualScrollItemProps(),

  emits: {
    'update:height': (height: number) => true,
  },

  setup(props, { attrs, emit, slots }) {
    const { resizeRef, contentRect } = useResizeObserver(undefined, 'border')

    watch(
      () => contentRect.value?.height,
      height => {
        if (height != null) emit('update:height', height)
      }
    )

    useRender(() =>
      props.renderless ? (
        <>{slots.default?.({ itemRef: resizeRef })}</>
      ) : (
        <div
          ref={resizeRef}
          class={['v-virtual-scroll__item', props.class]}
          style={props.style}
          {...attrs}
        >
          {(slots.default as any)?.()}
        </div>
      )
    )
  },
})
