// Styles
import './SPSliderThumb.scss'

// Components
import { SPSliderSymbol } from './slider'
// import { VScaleTransition } from '../transitions'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useElevation } from '@/composables/elevation'
import { useRtl } from '@/composables/locale'

// Directives
// import vRipple from '@/directives/ripple'

// Utilities
import { computed, inject } from 'vue'
import {
  convertToUnit,
  genericComponent,
  keyValues,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { PropType } from 'vue'
// import type { RippleDirectiveBinding } from '@/directives/ripple'

export type SPSliderThumbSlots = {
  'thumb-label': { modelValue: number }
}

export const makeSPSliderThumbProps = propsFactory(
  {
    focused: Boolean,
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    // ripple: {
    //   type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    //   default: true,
    // },
    name: String,
    noKeyboard: Boolean,

    ...makeComponentProps(),
  },
  'SPSliderThumb'
)

export const SPSliderThumb = genericComponent<SPSliderThumbSlots>()({
  name: 'SPSliderThumb',

  // directives: { vRipple },

  props: makeSPSliderThumbProps(),

  emits: {
    'update:modelValue': (v: number) => true,
  },

  setup(props, { slots, emit }) {
    const slider = inject(SPSliderSymbol)
    const { isRtl, rtlClasses } = useRtl()
    if (!slider)
      throw new Error(
        '[Speed] sp-slider-thumb must be used inside sp-slider or v-range-slider'
      )

    const {
      min,
      max,
      thumbColor,
      step,
      disabled,
      thumbSize,
      thumbLabel,
      direction,
      isReversed,
      vertical,
      readonly,
      elevation,
      mousePressed,
      decimals,
      indexFromEnd,
    } = slider

    const elevationProps = computed(() =>
      !disabled.value ? elevation.value : undefined
    )
    const { elevationClasses } = useElevation(elevationProps)
    const { textColorClasses, textColorStyles } = useTextColor(thumbColor)

    const { pageup, pagedown, end, home, left, right, down, up } = keyValues
    const relevantKeys = [pageup, pagedown, end, home, left, right, down, up]

    const multipliers = computed(() => {
      if (step.value) return [1, 2, 3]
      else return [1, 5, 10]
    })

    function parseKeydown(e: KeyboardEvent, value: number) {
      if (props.noKeyboard) return
      if (!relevantKeys.includes(e.key)) return

      e.preventDefault()

      const _step = step.value || 0.1
      const steps = (max.value - min.value) / _step
      if ([left, right, down, up].includes(e.key)) {
        const increase = vertical.value
          ? [isRtl.value ? left : right, isReversed.value ? down : up]
          : indexFromEnd.value !== isRtl.value
          ? [left, up]
          : [right, up]
        const direction = increase.includes(e.key) ? 1 : -1
        const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0

        if (
          direction === -1 &&
          value === max.value &&
          !multiplier &&
          !Number.isInteger(steps)
        ) {
          value = value - (steps % 1) * _step
        } else {
          value = value + direction * _step * multipliers.value[multiplier]
        }
      } else if (e.key === home) {
        value = min.value
      } else if (e.key === end) {
        value = max.value
      } else {
        const direction = e.key === pagedown ? 1 : -1
        value = value - direction * _step * (steps > 100 ? steps / 10 : 10)
      }

      return Math.max(props.min, Math.min(props.max, value))
    }

    function onKeydown(e: KeyboardEvent) {
      const newValue = parseKeydown(e, props.modelValue)

      newValue != null && emit('update:modelValue', newValue)
    }

    useRender(() => {
      const positionPercentage = convertToUnit(
        indexFromEnd.value ? 100 - props.position : props.position,
        '%'
      )

      return (
        <div
          class={[
            'sp-slider-thumb',
            {
              'sp-slider-thumb--focused': props.focused,
              'sp-slider-thumb--pressed': mousePressed.value, // 使用全局的 mousePressed 状态
            },
            props.class,
            rtlClasses.value,
          ]}
          style={[
            {
              '--sp-slider-thumb-position': positionPercentage,
              '--sp-slider-thumb-size': convertToUnit(thumbSize.value),
            },
            props.style,
          ]}
          role="slider"
          tabindex={disabled.value ? -1 : 0}
          aria-label={props.name}
          aria-valuemin={min.value}
          aria-valuemax={max.value}
          aria-valuenow={props.modelValue}
          aria-readonly={!!readonly.value}
          aria-orientation={direction.value}
          onKeydown={!readonly.value ? onKeydown : undefined}
        >
          <div
            class={[
              'sp-slider-thumb__surface',
              textColorClasses.value,
              elevationClasses.value,
            ]}
            style={{
              ...textColorStyles.value,
            }}
          />
          <div
            class={['sp-slider-thumb__ripple', textColorClasses.value]}
            style={textColorStyles.value}
            // v-ripple={[props.ripple, null, ['circle', 'center']]}
          />
          {/* <VScaleTransition origin="bottom center"> */}
          <div
            class="sp-slider-thumb__label-container"
            v-show={
              (thumbLabel.value && props.focused) ||
              thumbLabel.value === 'always'
            }
          >
            <div class={['sp-slider-thumb__label', textColorClasses.value]}>
              <div>
                {slots['thumb-label']?.({ modelValue: props.modelValue }) ??
                  props.modelValue.toFixed(step.value ? decimals.value : 1)}
              </div>
            </div>
          </div>
          {/* </VScaleTransition> */}
        </div>
      )
    })

    return {}
  },
})

export type SPSliderThumb = InstanceType<typeof SPSliderThumb>
