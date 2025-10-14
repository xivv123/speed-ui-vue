// Styles
import './SPVirtualScroll.scss'

// Components
import { SPVirtualScrollItem } from './SPVirtualScrollItem'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useToggleScope } from '@/composables/toggleScope'
import { makeVirtualProps, useVirtual } from '@/composables/virtual'

// Utilities
import { onMounted, onScopeDispose, toRef } from 'vue'
import {
  convertToUnit,
  genericComponent,
  getCurrentInstance,
  getScrollParent,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { PropType, Ref } from 'vue'
import type { GenericProps } from '@/utils'

export interface SPVirtualScrollSlot<T> {
  item: T
  index: number
}

export const makeSPVirtualScrollProps = propsFactory(
  {
    items: {
      type: Array as PropType<readonly unknown[]>,
      default: () => [],
    },
    renderless: Boolean,

    ...makeVirtualProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
  },
  'SPVirtualScroll'
)

export const SPVirtualScroll = genericComponent<
  new <T, Renderless extends boolean = false>(
    props: {
      items?: readonly T[]
      renderless?: Renderless
    },
    slots: {
      default: SPVirtualScrollSlot<T> &
        (Renderless extends true
          ? {
              itemRef: Ref<HTMLElement | undefined>
            }
          : {})
    }
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPVirtualScroll',

  props: makeSPVirtualScrollProps(),

  setup(props, { slots }) {
    const vm = getCurrentInstance('SPVirtualScroll')
    const { dimensionStyles } = useDimension(props)
    const {
      calculateVisibleItems,
      containerRef,
      markerRef,
      handleScroll,
      handleScrollend,
      handleItemResize,
      scrollToIndex,
      paddingTop,
      paddingBottom,
      computedItems,
    } = useVirtual(
      props,
      toRef(() => props.items)
    )

    useToggleScope(
      () => props.renderless,
      () => {
        function handleListeners(add = false) {
          const method = add ? 'addEventListener' : 'removeEventListener'

          if (containerRef.value === document.documentElement) {
            document[method]('scroll', handleScroll, { passive: true })
            document[method]('scrollend', handleScrollend)
          } else {
            containerRef.value?.[method]('scroll', handleScroll, {
              passive: true,
            })
            containerRef.value?.[method]('scrollend', handleScrollend)
          }
        }

        onMounted(() => {
          containerRef.value = getScrollParent(vm.vnode.el as HTMLElement, true)
          handleListeners(true)
        })
        onScopeDispose(handleListeners)
      }
    )

    useRender(() => {
      const children = computedItems.value.map(item => (
        <SPVirtualScrollItem
          key={item.key}
          renderless={props.renderless}
          onUpdate:height={height => handleItemResize(item.index, height)}
        >
          {slotProps =>
            slots.default?.({ item: item.raw, index: item.index, ...slotProps })
          }
        </SPVirtualScrollItem>
      ))

      return props.renderless ? (
        <>
          <div
            ref={markerRef}
            class="sp-virtual-scroll__spacer"
            style={{ paddingTop: convertToUnit(paddingTop.value) }}
          />
          {children}
          <div
            class="sp-virtual-scroll__spacer"
            style={{ paddingBottom: convertToUnit(paddingBottom.value) }}
          />
        </>
      ) : (
        <div
          ref={containerRef}
          class={['sp-virtual-scroll', props.class]}
          onScrollPassive={handleScroll}
          onScrollend={handleScrollend}
          style={[dimensionStyles.value, props.style]}
        >
          <div
            ref={markerRef}
            class="sp-virtual-scroll__container"
            style={{
              paddingTop: convertToUnit(paddingTop.value),
              paddingBottom: convertToUnit(paddingBottom.value),
            }}
          >
            {children}
          </div>
        </div>
      )
    })

    return {
      calculateVisibleItems,
      scrollToIndex,
    }
  },
})

export type SPVirtualScroll = InstanceType<typeof SPVirtualScroll>
