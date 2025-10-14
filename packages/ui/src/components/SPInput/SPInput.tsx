// Styles
import './SPInput.scss'

// Components
import { makeDimensionProps, useDimension } from '../../composables/dimensions'
import { IconValue } from '../../composables/icons'
import { useInputIcon } from '../../composables/InputIcon'
import { useRtl } from '../../composables/locale'
import { makeComponentProps } from '../../composables/component'
import { makeDensityProps, useDensity } from '../../composables/density'
import { makeThemeProps, provideTheme } from '../../composables/theme'
import {
  makeValidationProps,
  useValidation,
} from '../../composables/validation'
import { SPMsgs } from '../SPMsgs/SPMsgs'

// Composables

// Utilities
import { computed, toRef, useId } from 'vue'
import {
  EventProp,
  genericComponent,
  pick,
  propsFactory,
  useRender,
} from '../../utils'

// Types
import type { ComputedRef, PropType, Ref } from 'vue'
import type { SPMsgslot } from '../SPMsgs/SPMsgs'
import type { GenericProps } from '../../utils'

export interface SPInputSlot {
  id: ComputedRef<string>
  messagesId: ComputedRef<string | undefined>
  isDirty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: Ref<boolean>
  isValid: ComputedRef<boolean | null>
  isValidating: Ref<boolean>
  hasDetails: Ref<boolean>
  reset: () => void
  resetValidation: () => void
  validate: () => void
}

export const makeSPInputProps = propsFactory(
  {
    id: String,
    baseColor: String,
    centerAffix: {
      type: Boolean,
      default: true,
    },
    color: String,
    glow: Boolean,
    iconColor: [Boolean, String],
    prependIcon: IconValue,
    appendIcon: IconValue,
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hideSpinButtons: Boolean,
    hint: String,
    persistentHint: Boolean,
    messages: {
      type: [Array, String] as PropType<string | readonly string[]>,
      default: () => [],
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal',
      validator: (v: any) => ['horizontal', 'vertical'].includes(v),
    },

    'onClick:prepend': Function as PropType<EventProp<[MouseEvent]>>,
    'onClick:append': Function as PropType<EventProp<[MouseEvent]>>,

    ...makeComponentProps(),
    ...makeDensityProps(),
    ...pick(makeDimensionProps(), ['maxWidth', 'minWidth', 'width']),
    ...makeThemeProps(),
    ...makeValidationProps(),
  },
  'SPInput'
)

export type SPInputSlots = {
  default: SPInputSlot
  prepend: SPInputSlot
  append: SPInputSlot
  details: SPInputSlot
  message: SPMsgslot
}

export const SPInput = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: SPInputSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPInput',

  props: {
    ...makeSPInputProps(),
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup(props, { attrs, slots, emit }) {
    const { densityClasses } = useDensity(props, 'sp-input')
    const { dimensionStyles } = useDimension(props)
    const { themeClasses } = provideTheme(props)
    const { rtlClasses } = useRtl()
    const { InputIcon } = useInputIcon(props)

    const uid = useId()
    const id = computed(() => props.id || `input-${uid}`)

    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses,
    } = useValidation(props, 'sp-input', id)

    const messages = computed(() => {
      if (
        props.errorMessages?.length ||
        (!isPristine.value && errorMessages.value.length)
      ) {
        return errorMessages.value
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint
      } else {
        return props.messages
      }
    })

    const hasMessages = toRef(() => messages.value.length > 0)

    const hasDetails = toRef(
      () =>
        !props.hideDetails ||
        (props.hideDetails === 'auto' && (hasMessages.value || !!slots.details))
    )

    const messagesId = computed(() =>
      hasDetails.value ? `${id.value}-messages` : undefined
    )

    const slotProps = computed<SPInputSlot>(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      hasDetails,
      reset,
      resetValidation,
      validate,
    }))

    const color = toRef(() => {
      return props.error || props.disabled
        ? undefined
        : props.focused
        ? props.color
        : props.baseColor
    })

    const iconColor = toRef(() => {
      if (!props.iconColor) return undefined

      return props.iconColor === true ? color.value : props.iconColor
    })

    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.prependIcon)
      const hasAppend = !!(slots.append || props.appendIcon)

      return (
        <div
          class={[
            'sp-input',
            `sp-input--${props.direction}`,
            {
              'sp-input--center-affix': props.centerAffix,
              'sp-input--focused': props.focused,
              'sp-input--glow': props.glow,
              'sp-input--hide-spin-buttons': props.hideSpinButtons,
            },
            densityClasses.value,
            themeClasses.value,
            rtlClasses.value,
            validationClasses.value,
            props.class,
          ]}
          style={[dimensionStyles.value, props.style]}
        >
          {hasPrepend && (
            <div
              key="prepend"
              class="sp-input__prepend"
            >
              {slots.prepend?.(slotProps.value)}

              {props.prependIcon && (
                <InputIcon
                  key="prepend-icon"
                  name="prepend"
                  color={iconColor.value}
                />
              )}
            </div>
          )}

          {slots.default && (
            <div class="sp-input__control">
              {slots.default?.(slotProps.value)}
            </div>
          )}

          {hasAppend && (
            <div
              key="append"
              class="sp-input__append"
            >
              {props.appendIcon && (
                <InputIcon
                  key="append-icon"
                  name="append"
                  color={iconColor.value}
                />
              )}

              {slots.append?.(slotProps.value)}
            </div>
          )}

          {hasDetails.value && (
            <div
              id={messagesId.value}
              class="sp-input__details"
              role="alert"
              aria-live="polite"
            >
              <SPMsgs
                active={hasMessages.value}
                messages={messages.value}
                v-slots={{ message: slots.message }}
              />

              {slots.details?.(slotProps.value)}
            </div>
          )}
        </div>
      )
    })

    return {
      reset,
      resetValidation,
      validate,
      isValid,
      errorMessages,
    }
  },
})

export type SPInput = InstanceType<typeof SPInput>
