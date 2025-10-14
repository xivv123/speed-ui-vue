import { propsFactory } from '../../utils'
import { makeSPInputinnerProps } from '../SPInputinner/SPInputinner'
import { makeSPSelctrlProps } from '../SPSelctrl/SPSelctrl'

export const makeSPSwitchProps = propsFactory(
  {
    indeterminate: Boolean,
    inset: Boolean,
    insetSquare: Boolean,
    flat: Boolean,
    loading: {
      type: [Boolean, String],
      default: false,
    },
    // Thumb 文字相关属性
    thumbText: String,
    thumbCheckedText: String,
    thumbUncheckedText: String,

    ...makeSPInputinnerProps(),
    ...makeSPSelctrlProps(),
  },
  'SPSwitch'
)
