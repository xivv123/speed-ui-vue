// Styles
import './SPSelctrlGroup.scss'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { onScopeDispose, provide, toRef, useId } from 'vue'
import {
  deepEqual,
  genericComponent,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { GenericProps } from '@/utils'

export interface SPSelectionGroupContext {
  modelValue: Ref<any>
  forceUpdate: () => void
  onForceUpdate: (fn: () => void) => void
}

export const SPSelctrlGroupSymbol: InjectionKey<SPSelectionGroupContext> =
  Symbol.for('speed:selection-control-group')

export const makeSelctrlGroupProps = propsFactory(
  {
    color: String,
    disabled: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
    defaultsTarget: String,
    error: Boolean,
    id: String,
    inline: Boolean,
    falseIcon: IconValue,
    trueIcon: IconValue,
    multiple: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
    name: String,
    readonly: {
      type: Boolean as PropType<boolean | null>,
      default: null,
    },
    modelValue: null,
    type: String,
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },

    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeThemeProps(),
  },
  'SelctrlGroup'
)

export const makeSPSelctrlGroupProps = propsFactory(
  {
    ...makeSelctrlGroupProps({
      defaultsTarget: 'SPSelctrl',
    }),
  },
  'SPSelctrlGroup'
)

export const SPSelctrlGroup = genericComponent<
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: { default: never }
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPSelctrlGroup',

  props: makeSPSelctrlGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup(props, { slots }) {
    const modelValue = useProxiedModel(props, 'modelValue')
    const uid = useId()
    const id = toRef(() => props.id || `sp-selctrl-group-${uid}`)
    const name = toRef(() => props.name || id.value)

    const updateHandlers = new Set<() => void>()
    provide(SPSelctrlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach(fn => fn())
      },
      onForceUpdate: cb => {
        updateHandlers.add(cb)
        onScopeDispose(() => {
          updateHandlers.delete(cb)
        })
      },
    })

    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(() => props.color),
        disabled: toRef(() => props.disabled),
        density: toRef(() => props.density),
        error: toRef(() => props.error),
        inline: toRef(() => props.inline),
        modelValue,
        multiple: toRef(
          () =>
            !!props.multiple ||
            (props.multiple == null && Array.isArray(modelValue.value))
        ),
        name,
        falseIcon: toRef(() => props.falseIcon),
        trueIcon: toRef(() => props.trueIcon),
        readonly: toRef(() => props.readonly),
        type: toRef(() => props.type),
        valueComparator: toRef(() => props.valueComparator),
      },
    })

    useRender(() => (
      <div
        class={[
          'sp-selctrl-group',
          { 'sp-selctrl-group--inline': props.inline },
          props.class,
        ]}
        style={props.style}
        role={props.type === 'radio' ? 'radiogroup' : undefined}
      >
        {slots.default?.()}
      </div>
    ))

    return {}
  },
})

export type SPSelctrlGroup = InstanceType<
  typeof SPSelctrlGroup
>
