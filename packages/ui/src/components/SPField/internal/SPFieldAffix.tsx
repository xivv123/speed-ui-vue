// Utilities
import { genericComponent, propsFactory, useRender } from '@/utils'

// Types
import type { PropType } from 'vue'

export const makeSPFieldAffixProps = propsFactory(
  {
    position: {
      type: String as PropType<'prepend' | 'append'>,
      required: true,
    },
  },
  'SPFieldAffix'
)

export const SPFieldAffix = genericComponent()({
  name: 'SPFieldAffix',

  props: makeSPFieldAffixProps(),

  setup(props, { slots }) {
    useRender(() => (
      <div
        class={
          props.position === 'prepend'
            ? 'sp-field__prepend-inner'
            : 'sp-field__append-inner'
        }
      >
        {slots.default?.()}
      </div>
    ))

    return {}
  },
})

export type SPFieldAffix = InstanceType<typeof SPFieldAffix>

