// Styles
import './SPGlobalBanner.sass'

// Components
import { SPBtn } from '@/components/SPBtn'

// Composables
import { useDimension } from '@/composables/dimensions'
import { useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { usePosition } from '@/composables/position'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRounded } from '@/composables/rounded'
import { provideTheme } from '@/composables/theme'
import { useVariant, genOverlays } from '@/composables/variant'

// Utilities
import { toRef, Transition } from 'vue'
import { genericComponent } from '@/utils'

// Local
import { makeSPGlobalBannerProps } from './props'
import type { SPGlobalBannerSlots } from './types'

// Transition Hooks
function useTransitionHooks() {
  function onBeforeLeave(el: Element) {
    const element = el as HTMLElement
    const height = element.offsetHeight
    element.style.height = `${height}px`
    element.style.overflow = 'hidden'
  }

  function onLeave(el: Element, done: () => void) {
    const element = el as HTMLElement
    const height = element.offsetHeight

    // 使用 requestAnimationFrame 避免强制重排
    requestAnimationFrame(() => {
      element.style.marginTop = `-${height}px`
      element.style.opacity = '0'
    })

    // 使用 setTimeout 作为后备，防止事件监听器泄漏
    const timeoutId = setTimeout(done, 500)
    const handleTransitionEnd = () => {
      clearTimeout(timeoutId)
      done()
    }
    element.addEventListener('transitionend', handleTransitionEnd, {
      once: true,
    })
  }

  function onAfterLeave(el: Element) {
    const element = el as HTMLElement
    element.style.height = ''
    element.style.marginTop = ''
    element.style.opacity = ''
    element.style.overflow = ''
  }

  function onBeforeEnter(el: Element) {
    const element = el as HTMLElement
    const height = element.scrollHeight
    element.style.height = `${height}px`
    element.style.marginTop = `-${height}px`
    element.style.opacity = '0'
    element.style.overflow = 'hidden'
  }

  function onEnter(el: Element, done: () => void) {
    const element = el as HTMLElement

    // 使用 requestAnimationFrame 避免强制重排
    requestAnimationFrame(() => {
      element.style.marginTop = '0'
      element.style.opacity = '1'
    })

    // 使用 setTimeout 作为后备，防止事件监听器泄漏
    const timeoutId = setTimeout(done, 500)
    const handleTransitionEnd = () => {
      clearTimeout(timeoutId)
      done()
    }
    element.addEventListener('transitionend', handleTransitionEnd, {
      once: true,
    })
  }

  function onAfterEnter(el: Element) {
    const element = el as HTMLElement
    element.style.height = ''
    element.style.marginTop = ''
    element.style.opacity = ''
    element.style.overflow = ''
  }

  return {
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
  }
}

export const SPGlobalBanner = genericComponent<SPGlobalBannerSlots>()({
  name: 'SPGlobalBanner',

  props: makeSPGlobalBannerProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup(props, { emit, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(
      () => ({
        color: props.bgColor ?? props.color,
        variant: props.variant,
      }),
      'sp-global-banner'
    )
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses } = usePosition(props, 'sp-global-banner')
    const { roundedClasses } = useRounded(props, 'sp-global-banner')
    const { t } = useLocale()

    const closeProps = toRef(() => ({
      'aria-label': t(props.closeLabel),
      onClick(e: MouseEvent) {
        isActive.value = false
        emit('click:close', e)
      },
    }))

    const {
      onBeforeEnter,
      onEnter,
      onAfterEnter,
      onBeforeLeave,
      onLeave,
      onAfterLeave,
    } = useTransitionHooks()

    return () => {
      const hasLeft = !!(slots.left || slots.default)
      const hasCenter = !!slots.center
      const hasRight = !!slots.right
      const hasClose = !!(slots.close || props.closable)

      return (
        <Transition
          name="sp-global-banner"
          onBeforeEnter={onBeforeEnter}
          onEnter={onEnter}
          onAfterEnter={onAfterEnter}
          onBeforeLeave={onBeforeLeave}
          onLeave={onLeave}
          onAfterLeave={onAfterLeave}
        >
          {isActive.value && (
            <div
              class={[
                'sp-global-banner',
                {
                  'sp-global-banner--sticky': props.sticky,
                },
                themeClasses.value,
                colorClasses.value,
                elevationClasses.value,
                positionClasses.value,
                roundedClasses.value,
                variantClasses.value,
                props.class,
              ]}
              style={[colorStyles.value, dimensionStyles.value, props.style]}
              role="banner"
            >
              {genOverlays(false, 'sp-global-banner')}

              <div class="sp-global-banner__container">
                {hasLeft && (
                  <div class="sp-global-banner__left">
                    {slots.left?.() ?? slots.default?.()}
                  </div>
                )}

                {hasCenter && (
                  <div class="sp-global-banner__center">{slots.center?.()}</div>
                )}

                {hasRight && (
                  <div class="sp-global-banner__right">{slots.right?.()}</div>
                )}

                {hasClose && (
                  <div class="sp-global-banner__close">
                    {!slots.close ? (
                      <SPBtn
                        icon={props.closeIcon}
                        size="small"
                        variant="text"
                        {...closeProps.value}
                      />
                    ) : (
                      slots.close?.({ props: closeProps.value })
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Transition>
      )
    }
  },
})

export type SPGlobalBanner = InstanceType<typeof SPGlobalBanner>
