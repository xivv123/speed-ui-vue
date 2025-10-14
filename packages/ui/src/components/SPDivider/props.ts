// Composables
import { makeComponentProps } from '../../composables/component'
import { makeThemeProps } from '../../composables/theme'

// Utilities
import { propsFactory } from '../../utils'

export const makeSPDividerProps = propsFactory(
  {
    color: String,
    inset: Boolean,
    length: [Number, String],
    opacity: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,

    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPDivider'
)

export type SPDividerProps = ReturnType<typeof makeSPDividerProps>