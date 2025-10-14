// Styles
import './SPTextSuper.scss'

// Components
import { useAutofocus } from '@/composables/autofocus'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import vIntersect from '@/directives/intersect'
import { SPField } from '../SPField/SPField'
import { makeSPFieldProps } from '../SPField/props'
import { makeSPInputinnerProps, SPInputinner, SPInputinnerSlot } from '../SPInputinner/SPInputinner'
import { SPTextSuperFooter } from './SPTextSuperFooter'
import { useAutosizeTextarea } from '../SPTextarea/useAutosizeTextarea'

// Utils
import {
  callEvent,
  clamp,
  convertToUnit,
  filterInputAttrs,
  genericComponent,
  useRender,
} from '@/utils'

// Vue
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'

// Props & Types
import { makeSPTextSuperProps } from './props'
import type { SPFieldSlots } from '../SPField'
import type { SPInputinnerSlots } from '../SPInputinner/SPInputinner'

export type SPTextSuperSlots = Omit<SPInputinnerSlots & SPFieldSlots, 'default'> & {
  footer: void
  'footer-left': void
  'footer-right': void
}

export const SPTextSuper = genericComponent<SPTextSuperSlots>()({
  name: 'SPTextSuper',

  directives: { vIntersect },

  inheritAttrs: false,

  props: makeSPTextSuperProps(),

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

    const spInputRef = ref<SPInputinner>()
    const spFieldRef = ref<SPField>()
    // controlHeight managed by autosize composable when autoGrow is enabled
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
    function onFooterMousedown(e: MouseEvent) {
      // Keep textarea focused when interacting with footer
      e.preventDefault()
      onFocus()
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

    // Autosize: sizer element is observed via useResizeObserver
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

    // useResizeObserver is used inside useAutosizeTextarea

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const { modelValue: _, ...inputProps } = SPInputinner.filterProps(props)
      const fieldProps = SPField.filterProps(props)

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
            'sp-text-super sp-text-field',
            {
              'sp-text-field--prefixed': props.prefix,
              'sp-text-field--suffixed': props.suffix,
              'sp-text-super--auto-grow': props.autoGrow,
              'sp-text-super--no-resize': props.noResize || props.autoGrow,
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
                    <div class={fieldClass}>
                      <div class="sp-text-super__body">
                        {props.prefix && (
                          <span class="sp-text-field__prefix">
                            <span class="sp-text-field__prefix__text">
                              {props.prefix}
                            </span>
                          </span>
                        )}

                        <textarea
                          ref={textareaRef}
                          class="sp-text-super__textarea"
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
                            class="sp-text-super__sizer"
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

                        <SPTextSuperFooter
                          onMousedown={onFooterMousedown}
                          v-slots={{
                          left: slots['footer-left']
                            ? () => slots['footer-left']!()
                            : undefined,
                          default: slots.footer ? () => slots.footer!() : undefined,
                          right: slots['footer-right']
                            ? () => slots['footer-right']!()
                            : undefined,
                        }} />
                      </div>
                    </div>
                  ),
                }}
              </SPField>
            ),
          }}
        </SPInputinner>
      )
    })

    return forwardRefs({}, spInputRef, spFieldRef, textareaRef)
  },
})

export type SPTextSuper = InstanceType<typeof SPTextSuper>
