// Styles
import './SPLayout.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPLayoutProps = propsFactory({
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLayoutProps(),
}, 'SPLayout')

export const SPLayout = genericComponent()({
  name: 'SPLayout',

  props: makeSPLayoutProps(),

  setup (props, { slots }) {
    const { layoutClasses, layoutStyles, getLayoutItem, items, layoutRef } = createLayout(props)
    const { dimensionStyles } = useDimension(props)

    useRender(() => (
      <div
        ref={ layoutRef }
        class={[
          layoutClasses.value,
          props.class,
        ]}
        style={[
          dimensionStyles.value,
          layoutStyles.value,
          props.style,
        ]}
      >
        { slots.default?.() }
      </div>
    ))

    return {
      getLayoutItem,
      items,
    }
  },
})

export type SPLayout = InstanceType<typeof SPLayout>
