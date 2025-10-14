// Styles
import './SPSlider.scss'

// Components
import { SPSliderThumb } from './SPSliderThumb'
import { SPSliderTrack } from './SPSliderTrack'
import { makeSPInputinnerProps, SPInputinner, SPInputinnerSlot } from '../SPInputinner/SPInputinner'
import { SPLabel } from '@/components/SPLabel'

// Composables
import { makeSliderProps, useSlider, useSteps } from './slider'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useForm } from '@/composables/form'

// Utilities
import { computed, ref, inject } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/utils'

// Types
import type { SPSliderThumbSlots } from './SPSliderThumb'
import type { SPSliderTrackSlots } from './SPSliderTrack'
import type { SPInputinnerSlots } from '../SPInputinner/SPInputinner'
import type { FormItemContext } from '@/components/SPFormItem/types'
import { FormItemKey } from '@/components/SPFormItem/types'

export type SPSliderSlots = SPInputinnerSlots &
  SPSliderThumbSlots &
  SPSliderTrackSlots & {
    label: SPInputinnerSlot
  }

export const makeSPSliderProps = propsFactory(
  {
    ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeSPInputinnerProps(),

    modelValue: {
      type: [Number, String],
      default: 0,
    },
    label: String,
  },
  'SPSlider'
)

export const SPSlider = genericComponent<SPSliderSlots>()({
  name: 'SPSlider',

  props: makeSPSliderProps(),

  emits: {
    'update:focused': (value: boolean) => true,
    'update:modelValue': (v: number) => true,
    start: (value: number) => true,
    end: (value: number) => true,
  },

  setup(props, { slots, emit }) {
    const thumbContainerRef = ref<SPSliderThumb>()
    const inputRef = ref<SPInputinner>()
    const { rtlClasses } = useRtl()
    
    // 获取来自 SPFormItem 的验证状态
    const formItem = inject<FormItemContext | null>(FormItemKey, null)
    // const form = useForm(props)

    const steps = useSteps(props)

    const model = useProxiedModel(props, 'modelValue', undefined, value => {
      return steps.roundValue(value == null ? steps.min.value : value)
    })

    const {
      min,
      max,
      mousePressed,
      roundValue,
      onSliderMousedown,
      onSliderTouchstart,
      trackContainerRef,
      position,
      hasLabels,
      readonly,
      noKeyboard,
    } = useSlider({
      props,
      steps,
      onSliderStart: () => {
        emit('start', model.value)
      },
      onSliderEnd: ({ value }) => {
        const roundedValue = roundValue(value)
        model.value = roundedValue
        emit('end', roundedValue)
      },
      onSliderMove: ({ value }) => (model.value = roundValue(value)),
      getActiveThumb: () => thumbContainerRef.value?.$el,
    })

    const { isFocused, focus, blur } = useFocus(props)
    const trackStop = computed(() => position(model.value))

    useRender(() => {
      const inputProps = SPInputinner.filterProps(props)
      const hasPrepend = !!(props.label || slots.label || slots.prepend)

      return (
        <SPInputinner
          ref={inputRef}
          v-model={model.value}
          class={[
            'sp-slider',
            {
              'sp-slider--has-labels': !!slots['tick-label'] || hasLabels.value,
              'sp-slider--focused': isFocused.value,
              'sp-slider--pressed': mousePressed.value,
              'sp-slider--disabled': props.disabled,
            },
            rtlClasses.value,
            props.class,
          ]}
          style={props.style}
          {...inputProps}
          hideDetails={formItem ? true : inputProps.hideDetails}
          focused={isFocused.value}
        >
          {{
            ...slots,
            prepend: hasPrepend
              ? (slotProps: SPInputinnerSlot) => (
                  <>
                    {slots.label?.(slotProps) ??
                      (props.label ? (
                        <SPLabel
                          class="sp-slider__label"
                          text={props.label}
                        />
                      ) : undefined)}

                    {slots.prepend?.(slotProps)}
                  </>
                )
              : undefined,
            default: ({ id, messagesId }: SPInputinnerSlot) => (
              <div
                class="sp-slider__container"
                onMousedown={!readonly.value ? onSliderMousedown : undefined}
                onTouchstart={
                  !readonly.value ? onSliderTouchstart : undefined
                }
              >
                <input
                  id={id.value}
                  name={props.name || id.value}
                  disabled={!!props.disabled}
                  readonly={!!props.readonly}
                  tabindex="-1"
                  value={model.value}
                />

                <SPSliderTrack
                  ref={trackContainerRef}
                  start={0}
                  stop={trackStop.value}
                >
                  {{ 'tick-label': slots['tick-label'] }}
                </SPSliderTrack>

                <SPSliderThumb
                  ref={thumbContainerRef}
                  aria-describedby={messagesId.value}
                  focused={isFocused.value}
                  noKeyboard={noKeyboard.value}
                  min={min.value}
                  max={max.value}
                  modelValue={model.value}
                  onUpdate:modelValue={(v: number) => (model.value = v)}
                  position={trackStop.value}
                  name={props.name}
                >
                  {{ 'thumb-label': slots['thumb-label'] }}
                </SPSliderThumb>
              </div>
            ),
          }}
        </SPInputinner>
      )
    })

    return forwardRefs(
      {
        focus: () => thumbContainerRef.value?.$el.focus(),
      },
      inputRef
    )
  },
})

export type SPSlider = InstanceType<typeof SPSlider>
