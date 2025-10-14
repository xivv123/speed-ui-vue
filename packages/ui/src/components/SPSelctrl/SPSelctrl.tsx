// Styles
import './SPSelctrl.scss'

// Components
import SpIcon from '../icon/Icon' 
import { SPLabel } from '../SPLabel'
import {
  makeSelctrlGroupProps,
  SPSelctrlGroupSymbol,
} from '../SPSelctrlGroup/SPSelctrlGroup'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useDensity } from '@/composables/density'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
// import vRipple from '@/directives/ripple'

// Utilities
import { computed, inject, nextTick, ref, shallowRef, toRef, useId } from 'vue'
import {
  filterInputAttrs,
  genericComponent,
  matchesSelector,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/utils'

// Types
import type {
  CSSProperties,
  ExtractPropTypes,
  Ref,
  VNode,
  WritableComputedRef,
} from 'vue'
import type { IconValue } from '@/composables/icons'
import type { EventProp, GenericProps } from '@/utils'

export type SelctrlSlot = {
  model: WritableComputedRef<boolean>
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
  inputNode: VNode
  icon: IconValue | undefined
  props: {
    onBlur: (e: FocusEvent) => void
    onFocus: (e: FocusEvent) => void
    id: string
  }
}

export type SPSelctrlSlots = {
  default: {
    backgroundColorClasses: Ref<string[]>
    backgroundColorStyles: Ref<CSSProperties>
  }
  label: { label: string | undefined; props: Record<string, unknown> }
  input: SelctrlSlot
}

export const makeSPSelctrlProps = propsFactory(
  {
    label: String,
    baseColor: String,
    trueValue: null,
    falseValue: null,
    value: null,
    variant: {
      type: String,
      default: 'default',
      validator: (v: string) => ['default', 'outlined'].includes(v),
    },

    ...makeComponentProps(),
    ...makeSelctrlGroupProps(),
  },
  'SPSelctrl'
)

export function useSelctrl(
  props: ExtractPropTypes<ReturnType<typeof makeSPSelctrlProps>> & {
    'onUpdate:modelValue': EventProp | undefined
  }
) {
  const group = inject(SPSelctrlGroupSymbol, undefined)
  const { densityClasses } = useDensity(props, 'sp-selctrl')
  const modelValue = useProxiedModel(props, 'modelValue')
  const trueValue = computed(() =>
    props.trueValue !== undefined
      ? props.trueValue
      : props.value !== undefined
      ? props.value
      : true
  )
  const falseValue = computed(() =>
    props.falseValue !== undefined ? props.falseValue : false
  )
  const isMultiple = computed(
    () =>
      !!props.multiple ||
      (props.multiple == null && Array.isArray(modelValue.value))
  )
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value

      return isMultiple.value
        ? wrapInArray(val).some((v: any) =>
            props.valueComparator(v, trueValue.value)
          )
        : props.valueComparator(val, trueValue.value)
    },
    set(val: boolean) {
      if (props.readonly) return

      const currentValue = val ? trueValue.value : falseValue.value

      let newVal = currentValue

      if (isMultiple.value) {
        newVal = val
          ? [...wrapInArray(modelValue.value), currentValue]
          : wrapInArray(modelValue.value).filter(
              (item: any) => !props.valueComparator(item, trueValue.value)
            )
      }

      if (group) {
        group.modelValue.value = newVal
      } else {
        modelValue.value = newVal
      }
    },
  })
  const { textColorClasses, textColorStyles } = useTextColor(() => {
    if (props.disabled) return undefined
    if (props.error) return 'error'

    return model.value ? props.color || 'primary' : props.baseColor
  })
  const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(
    () => {
      if (props.disabled) return props.baseColor
      if (props.error) return 'error'

      return model.value ? props.color || 'primary' : props.baseColor
    }
  )
  const icon = computed(() => (model.value ? props.trueIcon : props.falseIcon))

  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon,
  }
}

export const SPSelctrl = genericComponent<
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: SPSelctrlSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPSelctrl',

  // directives: { vRipple },

  inheritAttrs: false,

  props: makeSPSelctrlProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    focus: (e: FocusEvent) => true,
    blur: (e: FocusEvent) => true,
  },

  setup(props, { attrs, slots, emit }) {
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue,
    } = useSelctrl(props)
    const uid = useId()
    const isFocused = shallowRef(false)
    const isFocusVisible = shallowRef(false)
    const input = ref<HTMLInputElement>()
    const id = toRef(() => props.id || `input-${uid}`)
    const isInteractive = toRef(() => !props.disabled && !props.readonly)

    group?.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value
      }
    })

    function onFocus(e: FocusEvent) {
      if (!isInteractive.value) return

      isFocused.value = true
      if (
        matchesSelector(e.target as HTMLElement, ':focus-visible') !== false
      ) {
        isFocusVisible.value = true
      }
      emit('focus', e)
    }

    function onBlur(e: FocusEvent) {
      isFocused.value = false
      isFocusVisible.value = false
      emit('blur', e)
    }

    function onClickLabel(e: Event) {
      e.stopPropagation()
    }

    function onInput(e: Event) {
      if (!isInteractive.value) {
        if (input.value) {
          // model value is not updated when input is not interactive
          // but the internal checked state of the input is still updated,
          // so here it's value is restored
          input.value.checked = model.value
        }

        return
      }

      if (props.readonly && group) {
        nextTick(() => group.forceUpdate())
      }
      model.value = (e.target as HTMLInputElement).checked
    }

    useRender(() => {
      const label = slots.label
        ? slots.label({
            label: props.label,
            props: { for: id.value },
          })
        : props.label
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      const inputNode = (
        <input
          ref={input}
          checked={model.value}
          disabled={!!props.disabled}
          id={id.value}
          onBlur={onBlur}
          onFocus={onFocus}
          onInput={onInput}
          aria-disabled={!!props.disabled}
          aria-label={props.label}
          type={props.type}
          value={trueValue.value}
          name={props.name}
          aria-checked={props.type === 'checkbox' ? model.value : undefined}
          {...inputAttrs}
        />
      )

      return (
        <div
          class={[
            'sp-selctrl',
            `sp-selctrl--${props.variant}`,
            {
              'sp-selctrl--dirty': model.value,
              'sp-selctrl--disabled': props.disabled,
              'sp-selctrl--error': props.error,
              'sp-selctrl--focused': isFocused.value,
              'sp-selctrl--focus-visible': isFocusVisible.value,
              'sp-selctrl--inline': props.inline,
            },
            densityClasses.value,
            props.class,
          ]}
          data-type={props.type}
          {...rootAttrs}
          style={props.style}
        >
          <div
            class={['sp-selctrl__wrapper', textColorClasses.value]}
            style={textColorStyles.value}
          >
            {slots.default?.({
              backgroundColorClasses,
              backgroundColorStyles,
            })}

            <div
              class={['sp-selctrl__input']}
              // v-ripple={[
              //   !props.disabled && !props.readonly && props.ripple,
              //   null,
              //   ['center', 'circle'],
              // ]}
            >
              {slots.input?.({
                model,
                textColorClasses,
                textColorStyles,
                backgroundColorClasses,
                backgroundColorStyles,
                inputNode,
                icon: icon.value,
                props: {
                  onFocus,
                  onBlur,
                  id: id.value,
                },
              } satisfies SelctrlSlot) ?? (
                <>
                  {icon.value && (
                    <SpIcon
                      key="icon"
                      size={24}
                      name={
                        typeof icon.value === 'string'
                          ? icon.value
                          : String(icon.value)
                      }
                      style={{
                        color: 'inherit',
                        ...textColorStyles.value,
                      }}
                    />
                  )}

                  {inputNode}
                </>
              )}
            </div>
          </div>

          {label && (
            <SPLabel
              for={id.value}
              onClick={onClickLabel}
              class={props.error || model.value ? textColorClasses.value : undefined}
              style={props.error || model.value ? textColorStyles.value : undefined}
            >
              {label}
            </SPLabel>
          )}
        </div>
      )
    })

    return {
      isFocused,
      input,
    }
  },
})

export type SPSelctrl = InstanceType<typeof SPSelctrl>
