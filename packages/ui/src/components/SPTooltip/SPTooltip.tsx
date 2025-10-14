// Styles
import './SPTooltip.scss'

// Components
import { SPOverlay } from '@/components/SPOverlay'
import { makeSPTooltipProps } from './props'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { useTextColor, useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, mergeProps, ref, toRef, useId } from 'vue'
import { genericComponent, useRender } from '@/utils'

// Types
import type { StrategyProps } from '@/components/SPOverlay/locationStrategies'
import type { OverlaySlots } from '@/components/SPOverlay/SPOverlay'

// Constants
const DEFAULT_TOOLTIP_BG = 'rgba(0, 0, 0, 0.87)'

const ARROW_DIRECTION_MAP = {
  bottom: 'sp-tooltip--arrow-up',
  top: 'sp-tooltip--arrow-down',
  left: 'sp-tooltip--arrow-right',
  right: 'sp-tooltip--arrow-left',
  start: 'sp-tooltip--arrow-right',
  end: 'sp-tooltip--arrow-left',
} as const

// Helpers
function getArrowDirection(location: string): string {
  const locationLower = location.toLowerCase()

  for (const [key, className] of Object.entries(ARROW_DIRECTION_MAP)) {
    if (locationLower.includes(key)) {
      return className
    }
  }

  return 'sp-tooltip--arrow-up'
}

export const SPTooltip = genericComponent<OverlaySlots>()({
  name: 'SPTooltip',

  props: makeSPTooltipProps(),

  emits: {
    'update:modelValue': (_value: boolean) => true,
  },

  setup(props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const uid = useId()
    const id = toRef(() => props.id || `sp-tooltip-${uid}`)

    const overlay = ref<InstanceType<typeof SPOverlay>>()

    const { backgroundColorClasses, backgroundColorStyles } =
      useBackgroundColor(() => props.color)
    const { textColorClasses, textColorStyles } = useTextColor(
      () => props.textColor
    )

    const location = computed(() => {
      return props.location.split(' ').length > 1
        ? props.location
        : ((props.location + ' center') as StrategyProps['location'])
    })

    const origin = computed(() => {
      return props.origin === 'auto' ||
        props.origin === 'overlap' ||
        props.origin.split(' ').length > 1 ||
        props.location.split(' ').length > 1
        ? props.origin
        : ((props.origin + ' center') as StrategyProps['origin'])
    })

    const transition = computed(() => {
      if (props.transition != null) return props.transition
      return isActive.value ? 'scale-transition' : 'fade-transition'
    })

    const activatorProps = computed(() =>
      mergeProps(
        {
          'aria-describedby': id.value,
        },
        props.activatorProps
      )
    )

    const arrowClasses = computed(() =>
      props.arrow ? getArrowDirection(location.value) : null
    )

    const tooltipStyles = computed(() => ({
      ...backgroundColorStyles.value,
      ...textColorStyles.value,
      '--sp-tooltip-bg':
        backgroundColorStyles.value?.backgroundColor || DEFAULT_TOOLTIP_BG,
    }))

    useRender(() => {
      const overlayProps = SPOverlay.filterProps(props)

      return (
        <SPOverlay
          ref={overlay}
          class={['sp-tooltip', arrowClasses.value, props.class]}
          style={props.style}
          id={id.value}
          {...overlayProps}
          v-model={isActive.value}
          transition={transition.value}
          absolute
          location={location.value}
          origin={origin.value}
          persistent
          role="tooltip"
          activatorProps={activatorProps.value}
          _disableGlobalStack
          {...scopeId}
        >
          {{
            activator: slots.activator,
            default: (...args: unknown[]) => (
              <div
                class={[
                  'sp-tooltip__content',
                  backgroundColorClasses.value,
                  textColorClasses.value,
                ]}
                style={tooltipStyles.value}
              >
                {slots.default?.(
                  ...(args as Parameters<NonNullable<typeof slots.default>>)
                ) ?? props.text}
              </div>
            ),
          }}
        </SPOverlay>
      )
    })

    return forwardRefs({}, overlay)
  },
})

export type SPTooltip = InstanceType<typeof SPTooltip>
