// Utilities
import { computed, type Ref } from 'vue'

// Types
import type { Slots } from 'vue'
import type { TourStep } from './types'

export function useTourSteps(slots: Slots, stepsRef: Ref<TourStep[]>) {
  const stepsFromSlots = computed(() => {
    const slotSteps: TourStep[] = []
    if (slots.default) {
      try {
        const vnodes = slots.default()
        vnodes.forEach(vnode => {
          const isStepComponent =
            vnode.type &&
            ((typeof vnode.type === 'object' && (vnode.type as any).name === 'SPTourStep') ||
              (typeof vnode.type === 'string' && vnode.type === 'sp-tour-step') ||
              vnode.type === 'SPTourStep')
          if (isStepComponent) {
            const stepProps = vnode.props || {}
            const getPropsValue = (key: string) => {
              return (
                (stepProps as any)[key] ||
                (stepProps as any)[key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())] ||
                (stepProps as any)[key.replace(/-([a-z])/g, g => g[1].toUpperCase())]
              )
            }
            slotSteps.push({
              title: getPropsValue('title'),
              description: getPropsValue('description'),
              target: getPropsValue('target'),
              placement: getPropsValue('placement') || 'bottom',
              mask: getPropsValue('mask'),
              showArrow: getPropsValue('showArrow'),
              nextText: getPropsValue('nextText') || getPropsValue('next-text'),
              prevText: getPropsValue('prevText') || getPropsValue('prev-text'),
              closable: getPropsValue('closable'),
              scrollIntoView:
                getPropsValue('scrollIntoView') !== false && getPropsValue('scroll-into-view') !== false,
              scrollOptions: getPropsValue('scrollOptions') || getPropsValue('scroll-options'),
              onEnter: getPropsValue('onEnter') || getPropsValue('on-enter'),
              onLeave: getPropsValue('onLeave') || getPropsValue('on-leave'),
            })
          }
        })
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error processing tour steps from slots:', error)
        }
      }
    }
    return slotSteps
  })

  const allSteps = computed(() => {
    const fromSlots = stepsFromSlots.value
    const fromProps = stepsRef.value || []
    return fromSlots.length > 0 ? fromSlots : fromProps
  })

  const currentStepData = (currentRef: { value: number }) =>
    computed(() => allSteps.value[currentRef.value] || null)

  return { stepsFromSlots, allSteps, currentStepData }
}
