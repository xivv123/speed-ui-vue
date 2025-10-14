import { propsFactory, omit } from '@/utils'
import { makeSPInputProps } from '../SPInput/SPInput'
import { makeSelctrlGroupProps } from '../SPSelctrlGroup/SPSelctrlGroup'
import { IconValue } from '@/composables/icons'

export const makeSPRadioGroupProps = propsFactory(
  {
    height: {
      type: [Number, String],
      default: 'auto',
    },

    ...makeSPInputProps(),
    ...omit(makeSelctrlGroupProps(), ['multiple']),

    trueIcon: {
      type: IconValue,
      default: '$radioOn',
    },
    falseIcon: {
      type: IconValue,
      default: '$radioOff',
    },
    type: {
      type: String,
      default: 'radio',
    },
  },
  'SPRadioGroup'
)
