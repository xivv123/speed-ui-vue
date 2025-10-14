// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'

export interface UseTallyOptions {
  modelValue: Ref<any>
  counter?: boolean | number | string
  counterValue?: number | ((value: any) => number)
  showInlineCounter?: boolean
  persistentCounter?: boolean
  attrsMaxlength?: string | number
}

export function useTally(options: UseTallyOptions) {
  const counterValue = computed(() => {
    const cv = options.counterValue
    if (typeof cv === 'function') return cv(options.modelValue.value)
    if (typeof cv === 'number') return cv
    const v = options.modelValue.value ?? ''
    return (v as any).toString().length
  })

  const max = computed<string | number | undefined>(() => {
    if (options.attrsMaxlength != null) return options.attrsMaxlength

    const c = options.counter
    if (c === false || c == null) return undefined

    if (typeof c === 'string') {
      // 保留字符串类型，避免下游类型不匹配
      return c
    }
    if (typeof c === 'number') return c
    return undefined
  })

  const hasInlineCounter = computed(() => {
    return !!(
      options.showInlineCounter &&
      options.counter !== false &&
      options.counter != null
    )
  })

  const maxNumber = computed<number | undefined>(() => {
    const m = max.value
    if (typeof m === 'number') return m
    if (typeof m === 'string') {
      const n = Number(m)
      return isNaN(n) ? undefined : n
    }
    return undefined
  })

  return { counterValue, max, maxNumber, hasInlineCounter }
}
