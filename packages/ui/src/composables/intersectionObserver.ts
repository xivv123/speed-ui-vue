// Utilities
import { onScopeDispose, ref, shallowRef, watch } from 'vue'
import { SUPPORTS_INTERSECTION } from '../utils'

export function useIntersectionObserver(
  callback?: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const intersectionRef = ref<HTMLElement>()
  const isIntersecting = shallowRef(false)

  if (SUPPORTS_INTERSECTION) {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // 如果有自定义回调，调用它
        if (callback) {
          callback(entries, observer)
        }

        // 默认行为：更新 isIntersecting 状态
        isIntersecting.value = !!entries.find(entry => entry.isIntersecting)
      },
      options
    )

    onScopeDispose(() => {
      observer.disconnect()
    })

    watch(
      intersectionRef,
      (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue)
          isIntersecting.value = false
        }

        if (newValue) observer.observe(newValue)
      },
      {
        flush: 'post',
      }
    )
  }

  return { intersectionRef, isIntersecting }
}
