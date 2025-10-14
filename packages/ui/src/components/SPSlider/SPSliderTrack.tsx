// Styles
import './SPSliderTrack.scss'

// Components
import { SPSliderSymbol } from './slider'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useRounded } from '@/composables/rounded'

// Utilities
import { computed, inject } from 'vue'
import {
  convertToUnit,
  genericComponent,
  propsFactory,
  useRender,
} from '@/utils'

// Types
import type { Tick } from './slider'

export type SPSliderTrackSlots = {
  'tick-label': { tick: Tick; index: number }
}

export const makeSPSliderTrackProps = propsFactory(
  {
    start: {
      type: Number,
      required: true,
    },
    stop: {
      type: Number,
      required: true,
    },

    ...makeComponentProps(),
  },
  'SPSliderTrack'
)

export const SPSliderTrack = genericComponent<SPSliderTrackSlots>()({
  name: 'SPSliderTrack',

  props: makeSPSliderTrackProps(),

  emits: {},

  setup(props, { slots }) {
    const slider = inject(SPSliderSymbol)

    if (!slider)
      throw new Error(
        '[Speed] sp-slider-track must be inside sp-slider or v-range-slider'
      )

    const {
      color,
      parsedTicks,
      rounded,
      showTicks,
      tickSize,
      trackColor,
      trackFillColor,
      trackSize,
      vertical,
      min,
      max,
      indexFromEnd,
    } = slider

    const { roundedClasses } = useRounded(rounded)

    const {
      backgroundColorClasses: trackFillColorClasses,
      backgroundColorStyles: trackFillColorStyles,
    } = useBackgroundColor(trackFillColor)

    const {
      backgroundColorClasses: trackColorClasses,
      backgroundColorStyles: trackColorStyles,
    } = useBackgroundColor(trackColor)

    const startDir = computed(
      () =>
        `inset-${vertical.value ? 'block' : 'inline'}-${
          indexFromEnd.value ? 'end' : 'start'
        }`
    )
    const endDir = computed(() => (vertical.value ? 'height' : 'width'))

    const backgroundStyles = computed(() => {
      return {
        [startDir.value]: '0%',
        [endDir.value]: '100%',
      }
    })

    const trackFillWidth = computed(() => props.stop - props.start)

    const trackFillStyles = computed(() => {
      return {
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%'),
      }
    })

    const computedTicks = computed(() => {
      if (!showTicks.value) return []

      const ticks = vertical.value
        ? parsedTicks.value.slice().reverse()
        : parsedTicks.value

      return ticks.map((tick, index) => {
        const directionValue =
          tick.value !== min.value && tick.value !== max.value
            ? convertToUnit(tick.position, '%')
            : undefined

        return (
          <div
            key={tick.value}
            class={[
              'sp-slider-track__tick',
              {
                'sp-slider-track__tick--filled':
                  tick.position >= props.start && tick.position <= props.stop,
                'sp-slider-track__tick--first': tick.value === min.value,
                'sp-slider-track__tick--last': tick.value === max.value,
              },
            ]}
            style={{ [startDir.value]: directionValue }}
          >
            {(tick.label || slots['tick-label']) && (
              <div class="sp-slider-track__tick-label">
                {slots['tick-label']?.({ tick, index }) ?? tick.label}
              </div>
            )}
          </div>
        )
      })
    })

    useRender(() => {
      return (
        <div
          class={['sp-slider-track', roundedClasses.value, props.class]}
          style={[
            {
              '--sp-slider-track-size': convertToUnit(trackSize.value),
              '--sp-slider-tick-size': convertToUnit(tickSize.value),
            },
            props.style,
          ]}
        >
          <div
            class={[
              'sp-slider-track__background',
              trackColorClasses.value,
              {
                'sp-slider-track__background--opacity':
                  !!color.value || !trackFillColor.value,
              },
            ]}
            style={{
              ...backgroundStyles.value,
              ...trackColorStyles.value,
            }}
          />
          <div
            class={['sp-slider-track__fill', trackFillColorClasses.value]}
            style={{
              ...trackFillStyles.value,
              ...trackFillColorStyles.value,
            }}
          />

          {showTicks.value && (
            <div
              class={[
                'sp-slider-track__ticks',
                {
                  'sp-slider-track__ticks--always-show':
                    showTicks.value === 'always',
                },
              ]}
            >
              {computedTicks.value}
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type SPSliderTrack = InstanceType<typeof SPSliderTrack>
