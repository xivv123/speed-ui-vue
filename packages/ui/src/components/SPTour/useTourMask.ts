// Utilities
import { ref } from 'vue'
import { highlightElement, scrollToTarget } from './composables'

// Types
import type { Ref } from 'vue'
import type { TourStep } from './types'

export function useTourMask(options: {
  isActive: Ref<boolean>
  targetPadding: () => number
  targetRadius: () => number
  highlightTarget: () => boolean
  targetClass: () => string
  scrollSmooth: () => boolean
  smoothWait: () => number
}) {
  const targetEl = ref<HTMLElement | null>(null)
  const maskPath = ref('')
  const cleanupHighlight = ref<(() => void) | null>(null)
  const positionUpdateTrigger = ref(0)
  const isPositioning = ref(false)
  const frozenPosition = ref<{ top: string; left: string; transform: string } | null>(null)

  const buildMaskPath = (rect: DOMRect, padding: number, radius: number) => {
    const x = rect.left - padding
    const y = rect.top - padding
    const width = rect.width + padding * 2
    const height = rect.height + padding * 2
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    return `
      M 0 0 
      L ${windowWidth} 0 
      L ${windowWidth} ${windowHeight} 
      L 0 ${windowHeight} 
      Z
      M ${x + radius} ${y}
      L ${x + width - radius} ${y}
      Q ${x + width} ${y} ${x + width} ${y + radius}
      L ${x + width} ${y + height - radius}
      Q ${x + width} ${y + height} ${x + width - radius} ${y + height}
      L ${x + radius} ${y + height}
      Q ${x} ${y + height} ${x} ${y + height - radius}
      L ${x} ${y + radius}
      Q ${x} ${y} ${x + radius} ${y}
      Z
    `
  }

  let __rafId: number | null = null
  const scheduleUpdate = () => {
    if (!options.isActive.value) return
    if (__rafId != null) return
    __rafId = requestAnimationFrame(() => {
      __rafId = null
      try {
        if (targetEl.value) {
          const r = targetEl.value.getBoundingClientRect()
          maskPath.value = buildMaskPath(r, options.targetPadding(), options.targetRadius())
        }
      } catch (error) {
        // Ignore errors from getBoundingClientRect if element is detached
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to get target element bounds:', error)
        }
      }
      positionUpdateTrigger.value++
    })
  }

  const getTargetElement = (target: TourStep['target']) => {
    if (typeof target === 'string') return document.querySelector(target) as HTMLElement
    if (typeof target === 'function') return target()
    return target
  }

  const updateMask = (step: TourStep | null) => {
    if (!step) return
    const target = getTargetElement(step.target)
    targetEl.value = target
    if (!target) {
      maskPath.value = ''
      return
    }
    const rect = target.getBoundingClientRect()
    maskPath.value = buildMaskPath(rect, options.targetPadding(), options.targetRadius())

    if (options.highlightTarget()) {
      cleanupHighlight.value?.()
      cleanupHighlight.value = highlightElement(target, options.targetClass())
    }

    if (step.scrollIntoView !== false) {
      isPositioning.value = true
      const behavior = (step.scrollOptions?.behavior as ScrollBehavior) ?? (options.scrollSmooth() ? 'smooth' : 'auto')
      isPositioning.value = behavior === 'smooth'
      const mergedScrollOptions: ScrollIntoViewOptions = {
        behavior,
        block: step.scrollOptions?.block ?? 'center',
        inline: step.scrollOptions?.inline ?? 'center',
      }
      scrollToTarget(target, mergedScrollOptions)

      const waitMs = behavior === 'smooth' ? options.smoothWait() : 0
      setTimeout(() => {
        if (options.isActive.value) {
          frozenPosition.value = null
          positionUpdateTrigger.value++
          requestAnimationFrame(() => {
            isPositioning.value = false
          })
        }
      }, waitMs)
    } else {
      isPositioning.value = false
    }
  }

  const api = {
    targetEl,
    maskPath,
    cleanupHighlight,
    positionUpdateTrigger,
    isPositioning,
    frozenPosition,
    scheduleUpdate,
    updateMask,
  }

  const cleanup = () => {
    cleanupHighlight.value?.()
    if (__rafId != null) cancelAnimationFrame(__rafId)
  }

  return { ...api, cleanup }
}

