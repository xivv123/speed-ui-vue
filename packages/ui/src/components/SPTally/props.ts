import { propsFactory } from '@/utils'
import { makeComponentProps } from '@/composables/component'

export const makeSPTallyProps = propsFactory(
  {
    active: Boolean,
    disabled: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0,
    },
    shaking: {
      type: Boolean,
      default: false,
    },

    ...makeComponentProps(),
  },
  'SPTally'
)
