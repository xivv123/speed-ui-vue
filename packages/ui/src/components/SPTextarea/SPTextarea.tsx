// Styles
import './style/SPTextarea.sass'

// Components
import { useAutofocus } from '@/composables/autofocus'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import vIntersect from '@/directives/intersect'
import { SPField } from '../SPField/SPField'
import { SPInputinner, SPInputinnerSlot } from '../SPInputinner/SPInputinner'
import { useAutosizeTextarea } from './useAutosizeTextarea'
import { SPTally } from '../SPTally/SPTally'
import {
  callEvent,
  filterInputAttrs,
  genericComponent,
  useRender,
} from '@/utils'

// Utilities
import { computed, nextTick, onMounted, ref, watch } from 'vue'

// Types & Props
import { makeSPTextareaProps } from './props'
import type { SPTextareaSlots } from './types'

export const SPTextarea = genericComponent<SPTextareaSlots>()(({
  name: 'SPTextarea',

  directives: { vIntersect },

  inheritAttrs: false,

  props: makeSPTextareaProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: string) => true,
    'update:rows': (rows: number) => true,
  },

  setup(props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)
    const { onIntersect } = useAutofocus(props)
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(model.value)
        : (model.value || '').toString().length
    })
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength as string | number

      if (
        !props.counter ||
        (typeof props.counter !== 'number' && typeof props.counter !== 'string')
      )
        return undefined

      return props.counter
    })

    const spInputRef = ref<SPInputinner>()
    const spFieldRef = ref<SPField>()
    const textareaRef = ref<HTMLTextAreaElement>()
    const isActive = computed(
      () => props.persistentPlaceholder || isFocused.value || props.active
    )

    function onFocus() {
      if (textareaRef.value !== document.activeElement) {
        textareaRef.value?.focus()
      }

      if (!isFocused.value) focus()
    }
    function onControlClick(e: MouseEvent) {
      onFocus()

      emit('click:control', e)
    }
    function onControlMousedown(e: MouseEvent) {
      emit('mousedown:control', e)
    }
    function onClear(e: MouseEvent, reset: () => void) {
      e.stopPropagation()

      onFocus()

      nextTick(() => {
        model.value = ''
        reset()

        callEvent(props['onClick:clear'], e)
      })
    }
    function onInput(e: Event) {
      const el = e.target as HTMLTextAreaElement
      model.value = el.value
      if (props.modelModifiers?.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd]
        nextTick(() => {
          el.selectionStart = caretPosition[0]
          el.selectionEnd = caretPosition[1]
        })
      }
    }

    const {
      sizerRef,
      rows,
      controlHeight,
      calculate: autoCalculate,
    } = useAutosizeTextarea({
      autoGrow: computed(() => props.autoGrow),
      rowsProp: computed(() => props.rows),
      maxRowsProp: computed(() => props.maxRows),
      fieldEl: spFieldRef,
    })
    const isPlainOrUnderlined = computed(() =>
      ['plain', 'underlined'].includes(props.variant)
    )
    function calculateInputHeight() {
      autoCalculate()
    }

    onMounted(calculateInputHeight)
    watch(model, calculateInputHeight)
    watch(() => props.rows, calculateInputHeight)
    watch(() => props.maxRows, calculateInputHeight)
    watch(() => props.density, calculateInputHeight)
    watch(rows, val => {
      emit('update:rows', val)
    })

    // Resize observation handled inside useAutosizeTextarea

    useRender(() => {
      const hasCounter = !!(
        slots.counter ||
        props.counter ||
        props.counterValue
      )
      const hasDetails = !!(hasCounter || slots.details)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const { modelValue: _, ...inputProps } = SPInputinner.filterProps(props)
      const fieldProps = SPField.filterProps(props)

      // 检测是否有图标（prepend 或 append）
      const hasIcons = !!(
        slots.prepend ||
        slots.append ||
        inputProps.prependIcon ||
        inputProps.appendIcon
      )

      return (
        <SPInputinner
          ref={spInputRef}
          v-model={model.value}
          class={[
            'sp-textarea sp-text-field',
            {
              'sp-textarea--prefixed': props.prefix,
              'sp-textarea--suffixed': props.suffix,
              'sp-text-field--prefixed': props.prefix,
              'sp-text-field--suffixed': props.suffix,
              'sp-textarea--auto-grow': props.autoGrow,
              'sp-textarea--no-resize': props.noResize || props.autoGrow,
              'sp-inputinner--plain-underlined': isPlainOrUnderlined.value,
            },
            props.class,
          ]}
          style={props.style}
          {...rootAttrs}
          {...inputProps}
          centerAffix={hasIcons}
          focused={isFocused.value}
        >
          {{
            ...slots,
            default: ({
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid,
              hasDetails,
              reset,
            }: SPInputinnerSlot) => (
              <SPField
                ref={spFieldRef}
                style={{
                  '--sp-textarea-control-height': controlHeight.value,
                }}
                onClick={onControlClick}
                onMousedown={onControlMousedown}
                onClick:clear={(e: MouseEvent) => onClear(e, reset)}
                onClick:prependInner={props['onClick:prependInner']}
                onClick:appendInner={props['onClick:appendInner']}
                {...fieldProps}
                id={id.value}
                active={isActive.value || isDirty.value}
                centerAffix={hasIcons}
                dirty={isDirty.value || props.dirty}
                disabled={isDisabled.value}
                focused={isFocused.value}
                details={hasDetails.value}
                error={isValid.value === false}
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                  }: {
                    props: { class: any; [key: string]: any }
                  }) => (
                    <>
                      {props.prefix && (
                        <span class="sp-text-field__prefix">
                          <span class="sp-text-field__prefix__text">
                            {props.prefix}
                          </span>
                        </span>
                      )}

                      <textarea
                        ref={textareaRef}
                        class={fieldClass}
                        value={model.value}
                        onInput={onInput}
                        v-intersect={[
                          {
                            handler: onIntersect,
                          },
                          null,
                          ['once'],
                        ]}
                        autofocus={props.autofocus}
                        readonly={isReadonly.value}
                        disabled={isDisabled.value}
                        placeholder={props.placeholder}
                        rows={props.rows}
                        name={props.name}
                        onFocus={onFocus}
                        onBlur={blur}
                        {...slotProps}
                        {...inputAttrs}
                      />

                      {props.autoGrow && (
                        <textarea
                          class={[fieldClass, 'sp-textarea__sizer']}
                          id={`${slotProps.id}-sizer`}
                          v-model={model.value}
                          ref={sizerRef}
                          readonly
                          aria-hidden="true"
                        />
                      )}

                      {props.suffix && (
                        <span class="sp-text-field__suffix">
                          <span class="sp-text-field__suffix__text">
                            {props.suffix}
                          </span>
                        </span>
                      )}
                    </>
                  ),
                }}
              </SPField>
            ),
            details: hasDetails
              ? (slotProps: any) => (
                  <>
                    {slots.details?.(slotProps)}
                    { hasCounter && (
                    <>
                      <span />

                      <SPTally
                        active={ props.persistentCounter || isFocused.value }
                        value={ counterValue.value }
                        max={ max.value }
                        disabled={ props.disabled }
                        v-slots:default={ slots.counter }
                      />
                    </>
                  )}
                  </>
                )
              : undefined,
          }}
        </SPInputinner>
      )
    })

    return forwardRefs({}, spInputRef, spFieldRef, textareaRef)
  },
}))

export type SPTextarea = InstanceType<typeof SPTextarea>
