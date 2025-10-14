import { ref, onUnmounted } from 'vue'

export interface DebounceOptions {
  /** 延迟时间（毫秒） */
  delay?: number
}

/**
 * 创建一个防抖函数的 composable
 * @param options 配置选项
 * @returns 防抖函数和取消函数
 */
export function useDebounce(options: DebounceOptions = {}) {
  const { delay = 300 } = options
  const timer = ref<number | null>(null)

  const debounce = (callback: () => void, customDelay?: number) => {
    if (timer.value !== null) {
      clearTimeout(timer.value)
    }
    timer.value = window.setTimeout(() => {
      callback()
      timer.value = null
    }, customDelay ?? delay)
  }

  const cancel = () => {
    if (timer.value !== null) {
      clearTimeout(timer.value)
      timer.value = null
    }
  }

  onUnmounted(() => {
    cancel()
  })

  return {
    debounce,
    cancel,
  }
}
