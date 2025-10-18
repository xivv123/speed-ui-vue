// Styles
import './style/SPCheckbox.sass'

// Props & Types
import { makeSPCheckboxProps } from './props'
import type { SPCheckboxSlots } from './types'

// Components
import { SPCheckboxBtn } from './SPCheckboxBtn'
import { SPInputinner } from '../SPInputinner/SPInputinner'

// Composables
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, useId, inject } from 'vue'
import { filterInputAttrs, genericComponent, useRender } from '@/utils'

// Types
import type { SPInputinnerSlot } from '../SPInputinner/SPInputinner'
import type { GenericProps } from '@/utils'
import type { FormItemContext } from '../SPFormItem/types'
import { FormItemKey } from '../SPFormItem/types'

export const SPCheckbox = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: SPCheckboxSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPCheckbox',

  inheritAttrs: false,

  props: makeSPCheckboxProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:focused': (focused: boolean) => true,
    focus: (e: FocusEvent) => true,
    blur: (e: FocusEvent) => true,
  },

  setup(props, { attrs, slots, emit }) {
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)
    const inputRef = ref<SPInputinner>()

    // 获取来自 SPFormItem 的验证状态
    const formItem = inject<FormItemContext | null>(FormItemKey, null)

    const uid = useId()

    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
      const inputProps = SPInputinner.filterProps(props)
      const checkboxProps = SPCheckboxBtn.filterProps(props)

      return (
        <SPInputinner
          ref={inputRef}
          class={['sp-checkbox', props.class]}
          {...rootAttrs}
          {...inputProps}
          hideDetails={formItem ? true : inputProps.hideDetails}
          v-model={model.value}
          id={props.id || `checkbox-${uid}`}
          focused={isFocused.value}
          style={props.style}
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
              isValid,
            }: SPInputinnerSlot) => (
              <SPCheckboxBtn
                {...checkboxProps}
                id={id.value}
                aria-describedby={messagesId.value}
                disabled={isDisabled.value}
                readonly={isReadonly.value}
                {...controlAttrs}
                error={
                  formItem
                    ? formItem.isValid.value === false
                    : isValid.value === false
                }
                v-model={model.value}
                onFocus={(e: FocusEvent) => {
                  focus()
                  emit('focus', e)
                }}
                onBlur={(e: FocusEvent) => {
                  blur()
                  emit('blur', e)
                }}
                v-slots={slots}
              />
            ),
          }}
        </SPInputinner>
      )
    })

    return forwardRefs({}, inputRef)
  },
})

export type SPCheckbox = InstanceType<typeof SPCheckbox>
