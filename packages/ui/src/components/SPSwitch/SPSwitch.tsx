// Styles
import './style/SPSwitch.sass'

// Components
import { SPDefaultsProvider } from '../SPDefaultsProvider'
import { SPInputinner } from '../SPInputinner/SPInputinner'
import { SPThumb } from '../SPThumb/SPThumb'
import { SPSelctrl } from '../SPSelctrl/SPSelctrl'

// Composables
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLoader } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, toRef, useId, inject } from 'vue'
import {
  filterInputAttrs,
  genericComponent,
  IN_BROWSER,
  useRender,
} from '@/utils'

// Types
import type { SPInputinnerSlot } from '../SPInputinner/SPInputinner'
import type { SelctrlSlot } from '../SPSelctrl/SPSelctrl'
import type { GenericProps } from '@/utils'
import type { FormItemContext } from '../SPFormItem/types'
import { FormItemKey } from '../SPFormItem/types'
import { makeSPSwitchProps } from './props'
import type { SPSwitchSlots } from './types'

export const SPSwitch = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: SPSwitchSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPSwitch',

  inheritAttrs: false,

  props: makeSPSwitchProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  setup(props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const model = useProxiedModel(props, 'modelValue')
    const { loaderClasses } = useLoader(props)
    const { isFocused, focus, blur } = useFocus(props)
    const control = ref<SPSelctrl>()
    const inputRef = ref<SPInputinner>()
    const isForcedColorsModeActive =
      IN_BROWSER && window.matchMedia('(forced-colors: active)').matches

    // 获取来自 SPFormItem 的验证状态
    const formItem = inject<FormItemContext | null>(FormItemKey, null)

    // 计算当前应该显示的 thumb 文字
    const thumbDisplayText = toRef(() => {
      if (props.thumbText) {
        return props.thumbText
      }
      if (model.value) {
        return props.thumbCheckedText || ''
      } else {
        return props.thumbUncheckedText || ''
      }
    })

    const uid = useId()
    const id = toRef(() => props.id || `switch-${uid}`)

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }
    function onTrackClick(e: Event) {
      e.stopPropagation()
      e.preventDefault()
      control.value?.input?.click()
    }

    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
      const inputProps = SPInputinner.filterProps(props)
      const controlProps = SPSelctrl.filterProps(props)

      return (
        <SPInputinner
          ref={inputRef}
          class={[
            'sp-switch',
            { 'sp-switch--flat': props.flat },
            { 'sp-switch--inset': props.inset },
            { 'sp-switch--inset-square': props.insetSquare },
            { 'sp-switch--indeterminate': indeterminate.value },
            loaderClasses.value,
            props.class,
          ]}
          {...rootAttrs}
          {...inputProps}
          v-model={model.value}
          id={id.value}
          focused={isFocused.value}
          style={props.style}
          hideDetails={formItem ? true : inputProps.hideDetails}
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
              isValid,
            }: SPInputinnerSlot) => {
              const slotProps = {
                model,
                isValid,
              }

              return (
                <SPSelctrl
                  ref={control}
                  {...controlProps}
                  v-model={model.value}
                  id={id.value}
                  aria-describedby={messagesId.value}
                  type="checkbox"
                  onUpdate:modelValue={onChange}
                  aria-checked={indeterminate.value ? 'mixed' : undefined}
                  disabled={isDisabled.value}
                  readonly={isReadonly.value}
                  error={formItem ? formItem.isValid.value === false : isValid.value === false}
                  onFocus={focus}
                  onBlur={blur}
                  {...controlAttrs}
                >
                  {{
                    ...slots,
                    default: ({
                      backgroundColorClasses,
                      backgroundColorStyles,
                    }: SelctrlSlot) => (
                      <div
                        class={[
                          'sp-switch__track',
                          !isForcedColorsModeActive
                            ? backgroundColorClasses.value
                            : undefined,
                        ]}
                        style={backgroundColorStyles.value}
                        onClick={onTrackClick}
                      >
                        {slots['track-true'] && (
                          <div
                            key="prepend"
                            class="sp-switch__track-true"
                          >
                            {slots['track-true'](slotProps)}
                          </div>
                        )}

                        {slots['track-false'] && (
                          <div
                            key="append"
                            class="sp-switch__track-false"
                          >
                            {slots['track-false'](slotProps)}
                          </div>
                        )}
                      </div>
                    ),
                    input: ({
                      inputNode,
                      icon,
                      backgroundColorClasses,
                      backgroundColorStyles,
                    }: SelctrlSlot) => (
                      <>
                        {inputNode}
                        <SPThumb
                          class="sp-switch__thumb"
                          icon={icon}
                          text={thumbDisplayText.value}
                          loading={props.loading}
                          checked={model.value}
                          filled={!!(icon || props.loading)}
                          inset={props.inset}
                          backgroundColorClasses={isForcedColorsModeActive ? undefined : backgroundColorClasses.value}
                          backgroundColorStyles={backgroundColorStyles.value}
                          isValid={isValid.value}
                          v-slots={{
                            default: slots.thumb ? (slotProps: any) => (
                              <SPDefaultsProvider
                                defaults={{
                                  SpIcon: {
                                    name: icon,
                                    size: 'x-small',
                                  },
                                }}
                              >
                                {slots.thumb?.({ ...slotProps, icon, model, isValid })}
                              </SPDefaultsProvider>
                            ) : undefined,
                            loader: slots.loader
                          }}
                        />
                      </>
                    ),
                  }}
                </SPSelctrl>
              )
            },
          }}
        </SPInputinner>
      )
    })

    return forwardRefs({}, inputRef)
  },
})

export type SPSwitch = InstanceType<typeof SPSwitch>
