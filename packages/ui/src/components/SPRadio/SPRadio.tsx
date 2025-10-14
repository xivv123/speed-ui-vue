import './SPRadio.scss'
// import './SPRadioElement.scss'

// Components
import { SPSelctrl } from '../SPSelctrl/SPSelctrl'

// Utilities
import { genericComponent, useRender } from '@/utils'

// Local
import { makeSPRadioProps } from './props'

// Types
import type { SPRadioSlots } from './types'

export const SPRadio = genericComponent<SPRadioSlots>()({
  name: 'SPRadio',

  props: makeSPRadioProps(),

  setup(props, { slots }) {
    useRender(() => {
      const controlProps = SPSelctrl.filterProps(props)
      return (
        <SPSelctrl
          {...controlProps}
          class={['sp-radio', props.class]}
          style={props.style}
          type="radio"
          v-slots={slots}
        />
      )
    })

    return {}
  },
})

export type SPRadio = InstanceType<typeof SPRadio>
