import { inject, provide, type InjectionKey, type Ref } from 'vue'
import type { TourStep } from './types'

export interface TourContext {
  currentStep: Ref<number>
  isActive: Ref<boolean>
  steps: Ref<TourStep[]>
  next: () => void
  prev: () => void
  finish: () => void
  skip: () => void
  close: () => void
  goTo: (step: number) => void
}

export const TourContextKey: InjectionKey<TourContext> = Symbol('sp-tour-context')

export function provideTour(context: TourContext) {
  provide(TourContextKey, context)
  return context
}

export function useTour() {
  const context = inject(TourContextKey)
  
  if (!context) {
    throw new Error('useTour must be used within a SPTour component')
  }
  
  return context
}

// 工具函数：滚动到目标元素
export function scrollToTarget(target: HTMLElement, options?: ScrollIntoViewOptions) {
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center',
    ...options,
  }
  
  target.scrollIntoView(defaultOptions)
}

// 工具函数：高亮目标元素
export function highlightElement(element: HTMLElement, className = 'sp-tour-target') {
  // 移除之前的高亮
  document.querySelectorAll(`.${className}`).forEach(el => {
    el.classList.remove(className)
  })
  
  // 添加新的高亮
  element.classList.add(className)
  
  return () => {
    element.classList.remove(className)
  }
}