// Styles
import './SPProgressLinear.sass'

// Composables
import { useBackgroundColor, useTextColor } from '../../composables/color'
import { makeComponentProps } from '../../composables/component'
import { useIntersectionObserver } from '../../composables/intersectionObserver'
import { useRtl } from '../../composables/locale'
import { makeLocationProps, useLocation } from '../../composables/location'
import { useProxiedModel } from '../../composables/proxiedModel'
import { makeRoundedProps, useRounded } from '../../composables/rounded'
import { makeTagProps } from '../../composables/tag'
import { makeThemeProps, provideTheme } from '../../composables/theme'

// Utilities
import { computed, Transition } from 'vue'
import {
  clamp,
  convertToUnit,
  genericComponent,
  IN_BROWSER,
  propsFactory,
  useRender,
} from '../../utils'

type SPProgressLinearSlots = {
  default: { value: number; buffer: number }
}

export const makeSPProgressLinearProps = propsFactory(
  {
    absolute: Boolean,
    active: {
      type: Boolean,
      default: true,
    },
    bgColor: String,
    bgOpacity: [Number, String],
    bufferValue: {
      type: [Number, String],
      default: 0,
    },
    bufferColor: String,
    bufferOpacity: [Number, String],
    clickable: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 4,
    },
    indeterminate: Boolean,
    max: {
      type: [Number, String],
      default: 100,
    },
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    opacity: [Number, String],
    reverse: Boolean,
    stream: Boolean,
    striped: Boolean,
    roundedBar: Boolean,

    ...makeComponentProps(),
    ...makeLocationProps({ location: 'top' } as const),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },
  'SPProgressLinear'
)

export const SPProgressLinear = genericComponent<SPProgressLinearSlots>()({
  name: 'SPProgressLinear',

  props: makeSPProgressLinearProps(),

  emits: {
    'update:modelValue': (value: number) => true,
  },

  setup(props, { slots }) {
    const progress = useProxiedModel(props, 'modelValue')
    const { isRtl, rtlClasses } = useRtl()
    const { themeClasses } = provideTheme(props)
    const { locationStyles } = useLocation(props)
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.color
    )
    const { backgroundColorClasses, backgroundColorStyles } =
      useBackgroundColor(() => props.bgColor || props.color)
    const {
      backgroundColorClasses: bufferColorClasses,
      backgroundColorStyles: bufferColorStyles,
    } = useBackgroundColor(
      () => props.bufferColor || props.bgColor || props.color
    )
    const {
      backgroundColorClasses: barColorClasses,
      backgroundColorStyles: barColorStyles,
    } = useBackgroundColor(() => props.color)
    const { roundedClasses } = useRounded(props)
    const { intersectionRef, isIntersecting } = useIntersectionObserver()

    const max = computed(() => parseFloat(String(props.max)))
    const height = computed(() => parseFloat(String(props.height)))
    const normalizedBuffer = computed(() =>
      clamp((parseFloat(String(props.bufferValue)) / max.value) * 100, 0, 100)
    )
    const normalizedValue = computed(() =>
      clamp((parseFloat(String(progress.value)) / max.value) * 100, 0, 100)
    )
    const isReversed = computed(() => isRtl.value !== props.reverse)
    const transition = computed(() =>
      props.indeterminate ? 'fade-transition' : 'slide-x-transition'
    )
    const isForcedColorsModeActive =
      IN_BROWSER && window.matchMedia?.('(forced-colors: active)').matches

    function handleClick(e: MouseEvent) {
      if (!intersectionRef.value) return

      const { left, right, width } =
        intersectionRef.value.getBoundingClientRect()
      const value = isReversed.value
        ? width - e.clientX + (right - width)
        : e.clientX - left

      progress.value = Math.round((value / width) * max.value)
    }

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag
          ref={intersectionRef}
          class={[
            'sp-progress-linear',
            {
              'sp-progress-linear--absolute': props.absolute,
              'sp-progress-linear--active':
                props.active && isIntersecting.value,
              'sp-progress-linear--reverse': isReversed.value,
              'sp-progress-linear--rounded': props.rounded,
              'sp-progress-linear--rounded-bar': props.roundedBar,
              'sp-progress-linear--striped': props.striped,
              'sp-progress-linear--clickable': props.clickable,
            },
            roundedClasses.value,
            themeClasses.value,
            rtlClasses.value,
            props.class,
          ]}
          style={[
            {
              bottom: props.location === 'bottom' ? 0 : undefined,
              top: props.location === 'top' ? 0 : undefined,
              height: props.active ? convertToUnit(height.value) : 0,
              '--sp-progress-linear-height': convertToUnit(height.value),
              ...(props.absolute ? locationStyles.value : {}),
            },
            props.style,
          ]}
          role="progressbar"
          aria-hidden={props.active ? 'false' : 'true'}
          aria-valuemin="0"
          aria-valuemax={props.max}
          aria-valuenow={
            props.indeterminate
              ? undefined
              : Math.min(parseFloat(String(progress.value)), max.value)
          }
          onClick={props.clickable && handleClick}
        >
          {props.stream && (
            <div
              key="stream"
              class={['sp-progress-linear__stream', textColorClasses.value]}
              style={{
                ...textColorStyles.value,
                [isReversed.value ? 'left' : 'right']: convertToUnit(
                  -height.value
                ),
                borderTop: `${convertToUnit(height.value / 2)} dotted`,
                opacity: parseFloat(String(props.bufferOpacity!)),
                top: `calc(50% - ${convertToUnit(height.value / 4)})`,
                width: convertToUnit(100 - normalizedBuffer.value, '%'),
                '--sp-progress-linear-stream-to': convertToUnit(
                  height.value * (isReversed.value ? 1 : -1)
                ),
              }}
            />
          )}

          <div
            class={[
              'sp-progress-linear__background',
              !isForcedColorsModeActive
                ? backgroundColorClasses.value
                : undefined,
            ]}
            style={[
              backgroundColorStyles.value,
              {
                opacity: parseFloat(String(props.bgOpacity!)),
                width: props.stream ? 0 : undefined,
              },
            ]}
          />

          <div
            class={[
              'sp-progress-linear__buffer',
              !isForcedColorsModeActive ? bufferColorClasses.value : undefined,
            ]}
            style={[
              bufferColorStyles.value,
              {
                opacity: parseFloat(String(props.bufferOpacity!)),
                width: convertToUnit(normalizedBuffer.value, '%'),
              },
            ]}
          />

          <Transition name={transition.value}>
            {!props.indeterminate ? (
              <div
                class={[
                  'sp-progress-linear__determinate',
                  !isForcedColorsModeActive ? barColorClasses.value : undefined,
                ]}
                style={[
                  barColorStyles.value,
                  { width: convertToUnit(normalizedValue.value, '%') },
                ]}
              />
            ) : (
              <div class="sp-progress-linear__indeterminate">
                {['long', 'short'].map(bar => (
                  <div
                    key={bar}
                    class={[
                      'sp-progress-linear__indeterminate',
                      bar,
                      !isForcedColorsModeActive
                        ? barColorClasses.value
                        : undefined,
                    ]}
                    style={barColorStyles.value}
                  />
                ))}
              </div>
            )}
          </Transition>

          {slots.default && (
            <div class="sp-progress-linear__content">
              {slots.default({
                value: normalizedValue.value,
                buffer: normalizedBuffer.value,
              })}
            </div>
          )}
        </Tag>
      )
    })

    return {}
  },
})

export type SPProgressLinear = InstanceType<typeof SPProgressLinear>
