// Styles
import './SPLayoutMain.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useLayout } from '@/composables/layout'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

export const makeSPLayoutMainProps = propsFactory({
  ...makeComponentProps(),
}, 'SPLayoutMain')

export const SPLayoutMain = genericComponent()({
  name: 'SPLayoutMain',

  props: makeSPLayoutMainProps(),

  setup (props, { slots }) {
    const { mainStyles } = useLayout()

    useRender(() => (
      <main
        class={[
          'sp-layout-main',
          props.class,
        ]}
        style={[
          mainStyles.value,
          props.style,
        ]}
      >
        { slots.default?.() }
      </main>
    ))

    return {}
  },
})

export type SPLayoutMain = InstanceType<typeof SPLayoutMain>
