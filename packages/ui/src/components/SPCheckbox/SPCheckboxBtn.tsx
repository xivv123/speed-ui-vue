// Components
import {
  makeSPSelctrlProps,
  SPSelctrl,
} from '../SPSelctrl/SPSelctrl'

// Composables
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { toRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/utils'

// Types
import type { SPSelctrlSlots } from '../SPSelctrl/SPSelctrl'
import type { GenericProps } from '@/utils'

export const makeSPCheckboxBtnProps = propsFactory(
  {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: IconValue,
      default: '$checkboxIndeterminate',
    },

    ...makeSPSelctrlProps({
      falseIcon: '$checkboxOff',
      trueIcon: '$checkboxOn',
    }),
  },
  'SPCheckboxBtn'
)

export const SPCheckboxBtn = genericComponent<
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: SPSelctrlSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPCheckboxBtn',

  props: makeSPCheckboxBtnProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
    focus: (e: FocusEvent) => true,
    blur: (e: FocusEvent) => true,
  },

  setup(props, { slots, emit }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const model = useProxiedModel(props, 'modelValue')

    function onChange(v: any) {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    const falseIcon = toRef(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon
    })

    const trueIcon = toRef(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon
    })

    useRender(() => {
      const controlProps = omit(SPSelctrl.filterProps(props), [
        'modelValue',
      ])
      return (
        <SPSelctrl
          {...controlProps}
          v-model={model.value}
          class={['sp-checkbox-btn', props.class]}
          style={props.style}
          type="checkbox"
          onUpdate:modelValue={onChange}
          onFocus={(e: FocusEvent) => emit('focus', e)}
          onBlur={(e: FocusEvent) => emit('blur', e)}
          falseIcon={falseIcon.value}
          trueIcon={trueIcon.value}
          aria-checked={indeterminate.value ? 'mixed' : undefined}
          v-slots={slots}
        />
      )
    })

    return {}
  },
})

export type SPCheckboxBtn = InstanceType<typeof SPCheckboxBtn>
