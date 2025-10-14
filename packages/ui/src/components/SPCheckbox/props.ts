// Components
import { makeSPCheckboxBtnProps } from './SPCheckboxBtn'
import { makeSPInputinnerProps } from '../SPInputinner/SPInputinner'

// Utilities
import { omit, propsFactory } from '../../utils'

export const makeSPCheckboxProps = propsFactory(
  {
    ...makeSPInputinnerProps(),
    ...omit(makeSPCheckboxBtnProps(), ['inline']),
  },
  'SPCheckbox'
)
