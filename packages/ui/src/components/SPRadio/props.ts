// Composables
import { makeSPSelctrlProps } from '../SPSelctrl/SPSelctrl'

// Utilities
import { propsFactory } from '@/utils'

export const makeSPRadioProps = propsFactory(
  {
    ...makeSPSelctrlProps({
      falseIcon: '$radioOff',
      trueIcon: '$radioOn',
    }),
  },
  'SPRadio'
)
