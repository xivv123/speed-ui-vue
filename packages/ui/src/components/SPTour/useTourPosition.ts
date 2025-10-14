// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'
import type { TourStep } from './types'

export function useTourPosition(opts: {
  tourRef: Ref<HTMLElement | undefined>
  targetEl: Ref<HTMLElement | null>
  currentStepData: Ref<TourStep | null>
  positionUpdateTrigger: Ref<number>
  frozenPosition: Ref<{ top: string; left: string; transform: string } | null>
}) {
  const cardPosition = computed(() => {
    if (opts.frozenPosition.value) return opts.frozenPosition.value
    opts.positionUpdateTrigger.value
    if (!opts.targetEl.value || !opts.currentStepData.value) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    }
    const rect = opts.targetEl.value.getBoundingClientRect()
    const placement = opts.currentStepData.value.placement || 'bottom'
    let cardWidth = 400
    let cardHeight = 200
    if (opts.tourRef.value) {
      const cardRect = opts.tourRef.value.getBoundingClientRect()
      if (cardRect.width > 0 && cardRect.height > 0) {
        cardWidth = cardRect.width
        cardHeight = cardRect.height
      }
    }
    const gap = 20
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    let top = '50%'
    let left = '50%'
    let transform = 'translate(-50%, -50%)'
    switch (placement) {
      case 'top': {
        const topPosition = rect.top - cardHeight - gap
        if (topPosition < 20) {
          top = `${Math.min(rect.bottom + gap, viewportHeight - cardHeight - 20)}px`
        } else {
          top = `${topPosition}px`
        }
        const centerX = rect.left + rect.width / 2
        left = `${Math.max(cardWidth / 2, Math.min(centerX, viewportWidth - cardWidth / 2))}px`
        transform = 'translateX(-50%)'
        break
      }
      case 'bottom': {
        const bottomPosition = rect.bottom + gap
        if (bottomPosition + cardHeight > viewportHeight - 20) {
          top = `${Math.max(rect.top - cardHeight - gap, 20)}px`
        } else {
          top = `${bottomPosition}px`
        }
        const centerXBottom = rect.left + rect.width / 2
        left = `${Math.max(cardWidth / 2, Math.min(centerXBottom, viewportWidth - cardWidth / 2))}px`
        transform = 'translateX(-50%)'
        break
      }
      case 'left': {
        const leftPosition = rect.left - cardWidth - gap
        if (leftPosition < 20) {
          left = `${Math.min(rect.right + gap, viewportWidth - cardWidth - 20)}px`
        } else {
          left = `${leftPosition}px`
        }
        const centerY = rect.top + rect.height / 2
        top = `${Math.max(cardHeight / 2, Math.min(centerY, viewportHeight - cardHeight / 2))}px`
        transform = 'translateY(-50%)'
        break
      }
      case 'right': {
        const rightPosition = rect.right + gap
        if (rightPosition + cardWidth > viewportWidth - 20) {
          left = `${Math.max(rect.left - cardWidth - gap, 20)}px`
        } else {
          left = `${rightPosition}px`
        }
        const centerYRight = rect.top + rect.height / 2
        top = `${Math.max(cardHeight / 2, Math.min(centerYRight, viewportHeight - cardHeight / 2))}px`
        transform = 'translateY(-50%)'
        break
      }
      case 'center':
      default:
        top = '50%'
        left = '50%'
        transform = 'translate(-50%, -50%)'
        break
    }
    return { top, left, transform }
  })

  return { cardPosition }
}

