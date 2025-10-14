// Composables
import { provideDefaults } from '../../composables/defaults'

// Utilities
import { toRefs } from 'vue'
import { genericComponent, propsFactory } from '../../utils'

// Types
import type { PropType } from 'vue'
import type { DefaultsOptions } from '../../composables/defaults'

export const makeSPDefaultsProviderProps = propsFactory(
  {
    defaults: Object as PropType<DefaultsOptions>,
    disabled: Boolean,
    reset: [Number, String],
    root: [Boolean, String],
    scoped: Boolean,
  },
  'SPDefaultsProvider'
)

export const SPDefaultsProvider = genericComponent(false)({
  name: 'SPDefaultsProvider',

  props: makeSPDefaultsProviderProps(),

  setup(props, { slots }) {
    const { defaults, disabled, reset, root, scoped } = toRefs(props)

    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled,
    })

    return () => slots.default?.()
  },
})

export type SPDefaultsProvider = InstanceType<typeof SPDefaultsProvider>
