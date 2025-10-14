// Styles
import './SPMsgs.sass'

// Components
import { VSlideYTransition } from '@/components/transitions'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender, wrapInArray } from '@/utils'

// Types
import type { Component, PropType } from 'vue'

export type SPMsgslot = {
  message: string
}

export type SPMsgsSlots = {
  message: SPMsgslot
}

export const makeSPMsgsProps = propsFactory({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String] as PropType<string | readonly string[]>,
    default: () => ([]),
  },

  ...makeComponentProps(),
  ...makeTransitionProps({
    transition: {
      component: VSlideYTransition as Component,
      leaveAbsolute: true,
      group: true,
    },
  }),
}, 'SPMsgs')

export const SPMsgs = genericComponent<SPMsgsSlots>()({
  name: 'SPMsgs',

  props: makeSPMsgsProps(),

  setup (props, { slots }) {
    const messages = computed(() => wrapInArray(props.messages))
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    useRender(() => (
      <MaybeTransition
        transition={ props.transition }
        tag="div"
        class={[
          'sp-msgs',
          textColorClasses.value,
          props.class,
        ]}
        style={[
          textColorStyles.value,
          props.style,
        ]}
      >
        { props.active && (
          messages.value.map((message, i) => (
            <div
              class="sp-msgs__msgs"
              key={ `${i}-${messages.value}` }
            >
              { slots.message ? slots.message({ message }) : message }
            </div>
          ))
        )}
      </MaybeTransition>
    ))

    return {}
  },
})

export type SPMsgs = InstanceType<typeof SPMsgs>
