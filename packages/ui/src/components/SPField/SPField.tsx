import './style/SPField.sass'

// Components
import { SPFieldAffix, SPFieldOutline, SPFloatLabel } from './internal'
import { SPDefaultsProvider } from '../SPDefaultsProvider'
import { useInputIcon } from '@/composables/InputIcon'
import { SPTally } from '../SPTally/SPTally'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeFocusProps, useFocus } from '@/composables/focus'
import {
  LoaderSlot,
  useLoader,
} from '@/composables/loader'
import { useRtl } from '@/composables/locale'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'
import { useTally } from '@/composables/tally'

// Utilities
import { computed, ref, toRef, useId } from 'vue'
import {
  genericComponent,
  useRender,
} from '@/utils'
import { useFloatingLabelAnimation } from './internal/composables/useFloatingLabelAnimation'

// Props & Types
import { makeSPFieldProps, type Variant } from './props'
import type { GenericProps } from '@/utils'
import type { SPFieldSlots, SPFieldSlot, DefaultInputSlot } from './types'
// Note: SPFloatLabel type is imported via component ref type from internal file; not re-exported.

export const SPField = genericComponent<
  new <T>(
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
    },
    slots: SPFieldSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPField',

  inheritAttrs: false,

  props: {
    id: String,

    ...makeFocusProps(),
    ...makeSPFieldProps(),
  },

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    // keydown: (e: KeyboardEvent) => true,
    // blur: (e: FocusEvent) => true,
    // focus: (e: FocusEvent) => true,
  },

  setup(props, { attrs, emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { loaderClasses } = useLoader(props)
    const { focusClasses, isFocused, focus, blur } = useFocus(props, 'sp-field')
    const { InputIcon } = useInputIcon(props)
    const { roundedClasses } = useRounded(props)
    const { rtlClasses } = useRtl()

    const isActive = toRef(() => props.dirty || props.active)
    const hasLabel = toRef(() => !!(props.label || slots.label))
    const hasFloatingLabel = toRef(() => !props.singleLine && hasLabel.value)

    const uid = useId()
    const id = computed(() => props.id || `input-${uid}`)
    const messagesId = toRef(() =>
      !props.details ? undefined : `${id.value}-messages`
    )

    const labelRef = ref<SPFloatLabel>()
    const floatingLabelRef = ref<SPFloatLabel>()
    const controlRef = ref<HTMLElement>()
    const isPlainOrUnderlined = computed(() =>
      ['plain', 'underlined'].includes(props.variant)
    )
    const color = computed(() => {
      // 错误或禁用状态优先
      if (props.error) return 'var(--sp-color-error)'
      if (props.disabled) return undefined

      // 颜色优先级：props.color > props.baseColor > 根据激活态的默认色
      const rawColor: string =
        props.color ||
        props.baseColor ||
        (isActive.value ? 'on-surface-medium' : 'surface-variant')

      // 将主题色名称映射为 CSS 变量
      if (rawColor === 'primary') return 'var(--sp-color-primary)'
      if (rawColor === 'secondary') return 'var(--sp-color-secondary)'
      if (rawColor === 'success') return 'var(--sp-color-success)'
      if (rawColor === 'warning') return 'var(--sp-color-warning)'
      if (rawColor === 'error') return 'var(--sp-color-error)'
      if (rawColor === 'info') return 'var(--sp-color-info)'
      if (rawColor === 'surface-variant') return 'rgba(var(--sp-theme-on-surface), 0.23)'
      if (rawColor === 'on-surface-medium') return 'rgba(var(--sp-theme-on-surface), 0.6)'

      return rawColor
    })
    const iconColor = computed(() => {
      if (!props.iconColor || (props.glow && !isFocused.value)) return undefined

      return props.iconColor === true ? color.value : props.iconColor
    })

    const { backgroundColorClasses, backgroundColorStyles } =
      useBackgroundColor(() => props.bgColor)
    const { textColorClasses, textColorStyles } = useTextColor(color)

    // 用于 hover/激活态时为 overlay 提供“当前组件颜色”，默认不影响未激活态
    const hoverFocusColor = computed(() => {
      if (props.disabled) return undefined
      const c = props.color
      if (!c) return undefined
      if (c === 'primary') return 'var(--sp-color-primary)'
      if (c === 'secondary') return 'var(--sp-color-secondary)'
      if (c === 'success') return 'var(--sp-color-success)'
      if (c === 'warning') return 'var(--sp-color-warning)'
      if (c === 'error') return 'var(--sp-color-error)'
      if (c === 'info') return 'var(--sp-color-info)'
      return c
    })

    const overlayColorVarStyle = computed(() =>
      hoverFocusColor.value ? ({ '--sp-field-current-color': hoverFocusColor.value } as any) : ({})
    )

    useFloatingLabelAnimation(hasFloatingLabel, labelRef, floatingLabelRef, isActive)

    const slotProps = computed<DefaultInputSlot>(() => ({
      isActive,
      isFocused,
      controlRef,
      blur,
      focus,
    }))

    const { counterValue, max, maxNumber, hasInlineCounter } = useTally({
      modelValue: toRef(props, 'modelValue'),
      counter: props.counter as any,
      counterValue: props.counterValue as any,
      showInlineCounter: props.showInlineCounter,
    })

    function onClick(e: MouseEvent) {
      if (e.target !== document.activeElement) {
        e.preventDefault()
      }
    }

    useRender(() => {
      const isOutlined = props.variant === 'outlined'
      const hasPrepend = !!(slots['prepend-inner'] || props.prependInnerIcon)
      const hasClear = !!(props.clearable || slots.clear) && !props.disabled
      const hasAppend = !!(
        slots['append-inner'] ||
        props.appendInnerIcon ||
        hasClear ||
        hasInlineCounter.value
      )
      const label = () =>
        slots.label
          ? slots.label({
              ...slotProps.value,
              label: props.label,
              props: { for: id.value },
            })
          : props.label

      return (
        <div
          class={[
            'sp-field',
            {
              'sp-field--active': isActive.value,
              'sp-field--appended': hasAppend,
              'sp-field--center-affix':
                props.centerAffix ?? !isPlainOrUnderlined.value,
              'sp-field--disabled': props.disabled,
              'sp-field--dirty': props.dirty,
              'sp-field--error': props.error,
              'sp-field--glow': props.glow,
              'sp-field--flat': props.flat,
              'sp-field--has-background': !!props.bgColor,
              'sp-field--persistent-clear': props.persistentClear,
              'sp-field--prepended': hasPrepend,
              'sp-field--reverse': props.reverse,
              'sp-field--single-line': props.singleLine,
              'sp-field--no-label': !label(),
              [`sp-field--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            focusClasses.value,
            loaderClasses.value,
            roundedClasses.value,
            rtlClasses.value,
            props.class,
          ]}
          style={[overlayColorVarStyle.value, backgroundColorStyles.value, props.style]}
          onClick={(e: MouseEvent) => { onClick(e); props.onClick?.(e) }}
          onMousedown={ props.onMousedown }
          {...attrs}
        >
          <div class="sp-field__overlay" />

          {props.loading ? (
            <LoaderSlot
              name="sp-field"
              active={!!props.loading}
              color={
                props.error
                  ? 'error'
                  : typeof props.loading === 'string'
                  ? props.loading
                  : props.color
              }
              v-slots={{ default: slots.loader }}
            />
          ) : null}

          {hasPrepend && (
            <SPFieldAffix key="prepend" position="prepend">
              {props.prependInnerIcon && (
                <InputIcon
                  key="prepend-icon"
                  name="prependInner"
                  color={iconColor.value as string}
                />
              )}
              {slots['prepend-inner']?.(slotProps.value)}
            </SPFieldAffix>
          )}

          <div
            class="sp-field__field"
            data-no-activator=""
          >
            {['filled', 'solo', 'solo-inverted', 'solo-filled'].includes(
              props.variant
            ) &&
              hasFloatingLabel.value && (
                <SPFloatLabel
                  key="floating-label"
                  ref={floatingLabelRef}
                  class={[textColorClasses.value]}
                  floating
                  for={id.value}
                  aria-hidden={!isActive.value}
                  style={textColorStyles.value}
                >
                  {label()}
                </SPFloatLabel>
              )}

            {hasLabel.value && (
              <SPFloatLabel
                key="label"
                ref={labelRef}
                for={id.value}
              >
                {label()}
              </SPFloatLabel>
            )}

            {slots.default?.({
              ...slotProps.value,
              props: {
                id: id.value,
                class: 'sp-field__input',
                'aria-describedby': messagesId.value,
              },
              focus,
              blur,
            } as SPFieldSlot) ?? (
              <div
                id={id.value}
                class="sp-field__input"
                aria-describedby={messagesId.value}
              />
            )}
          </div>

          {hasClear && (
            <div
              key="clear"
              class="sp-field__clearable"
              v-show={props.dirty}
              onMousedown={(e: MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <SPDefaultsProvider
                defaults={{
                  VIcon: {
                    icon: props.clearIcon,
                  },
                }}
              >
                {slots.clear ? (
                  slots.clear({
                    ...slotProps.value,
                    props: {
                      onFocus: focus,
                      onBlur: blur,
                      onClick: props['onClick:clear'],
                      tabindex: -1,
                    },
                  })
                ) : (
                  <InputIcon
                    name="clear"
                    onFocus={focus}
                    onBlur={blur}
                    tabindex={-1}
                    size={props.clearIconSize}
                  />
                )}
              </SPDefaultsProvider>
            </div>
          )}

          {hasInlineCounter.value && (
            <div
              key="inline-counter"
              class="sp-field__counter"
              style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center' }}
            >
              {slots.counter ? (
                slots.counter({
                  ...slotProps.value,
                  value: counterValue.value,
                  max: maxNumber.value,
                  active: props.persistentCounter || isFocused.value,
                })
              ) : (
                <SPTally
                  active={props.persistentCounter || isFocused.value}
                  value={counterValue.value}
                  max={max.value}
                  disabled={props.disabled}
                />
              )}
            </div>
          )}

          {hasAppend && (
            <SPFieldAffix key="append" position="append">
              {slots['append-inner']?.(slotProps.value)}
              {props.appendInnerIcon && (
                <InputIcon
                  key="append-icon"
                  name="appendInner"
                  color={iconColor.value as string}
                />
              )}
            </SPFieldAffix>
          )}

          <SPFieldOutline
            isOutlined={isOutlined}
            isPlainOrUnderlined={isPlainOrUnderlined.value}
            hasFloatingLabel={hasFloatingLabel.value}
            id={id.value}
            isActive={isActive.value}
            textColorClasses={textColorClasses.value}
            textColorStyles={textColorStyles.value}
            floatingLabelRef={floatingLabelRef}
          >
            {label()}
          </SPFieldOutline>
        </div>
      )
    })

    return {
      controlRef,
      fieldIconColor: iconColor,
    }
  },
})

export type SPField = InstanceType<typeof SPField>
