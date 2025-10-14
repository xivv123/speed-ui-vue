// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { genericComponent, useRender } from '@/utils'

export const SPCardActions = genericComponent()({
  name: 'SPCardActions',

  props: makeComponentProps(),

  setup(props, { slots }) {
    provideDefaults({
      SPBtn: {
        slim: true,
        variant: 'text',
      },
    })

    useRender(() => (
      <div
        class={['sp-card-actions', props.class]}
        style={props.style}
      >
        {slots.default?.()}
      </div>
    ))

    return {}
  },
})

export type SPCardActions = InstanceType<typeof SPCardActions>
