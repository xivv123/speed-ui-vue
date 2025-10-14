// Styles
import './SPRadioGroup.scss'

// Components
import { SPInput } from '../SPInput/SPInput'
import { SPLabel } from '../SPLabel'
import { SPSelctrlGroup } from '../SPSelctrlGroup/SPSelctrlGroup'
import { makeSPRadioGroupProps } from './props'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, useId, inject } from 'vue'
import { filterInputAttrs, genericComponent, useRender } from '@/utils'

// Types
import type { SPInputSlots } from '../SPInput/SPInput'
import type { GenericProps } from '@/utils'
import type { FormItemContext } from '../SPFormItem/types'
import { FormItemKey } from '../SPFormItem/types'

export type SPRadioGroupSlots = Omit<SPInputSlots, 'default'> & {
  default: never
  label: {
    label: string | undefined
    props: Record<string, any>
  }
}

export const SPRadioGroup = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: SPRadioGroupSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPRadioGroup',

  inheritAttrs: false,

  props: makeSPRadioGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup(props, { attrs, slots }) {
    const uid = useId()
    const id = computed(() => props.id || `radio-group-${uid}`)
    const model = useProxiedModel(props, 'modelValue')

    // 获取来自 SPFormItem 的验证状态
    const formItem = inject<FormItemContext | null>(FormItemKey, null)

    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
      const inputProps = SPInput.filterProps(props)
      const controlProps = SPSelctrlGroup.filterProps
        ? SPSelctrlGroup.filterProps(props)
        : props
      const label = slots.label
        ? slots.label({
            label: props.label,
            props: { for: id.value },
          })
        : props.label

      return (
        <SPInput
          class={['sp-radio-group', props.class]}
          style={props.style}
          {...rootAttrs}
          {...inputProps}
          hideDetails={formItem ? true : inputProps.hideDetails}
          v-model={model.value}
          id={id.value}
        >
          {{
            ...slots,
            default: ({
              id: inputId,
              messagesId,
              isDisabled,
              isReadonly,
              isValid,
            }: any) => (
              <>
                {label && <SPLabel for={inputId.value}>{label}</SPLabel>}

                <SPSelctrlGroup
                  {...controlProps}
                  id={id.value}
                  aria-describedby={messagesId.value}
                  defaultsTarget="SPRadio"
                  trueIcon={props.trueIcon}
                  falseIcon={props.falseIcon}
                  type={props.type}
                  disabled={isDisabled.value}
                  readonly={isReadonly.value}
                  error={formItem ? formItem.isValid.value === false : isValid.value === false}
                  aria-labelledby={label ? id.value : undefined}
                  multiple={false}
                  {...controlAttrs}
                  v-model={model.value}
                  v-slots={slots}
                />
              </>
            ),
          }}
        </SPInput>
      )
    })

    return {}
  },
})

export type SPRadioGroup = InstanceType<typeof SPRadioGroup>
