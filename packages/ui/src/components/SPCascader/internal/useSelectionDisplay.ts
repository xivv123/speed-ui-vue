// Utilities
import { computed } from 'vue'

// Types
import type { Ref } from 'vue'
import type { ListItem } from '@/composables/list-items'

export interface UseSelectionDisplayProps {
  counterValue?: number | ((value: any[]) => number)
  showAllLevels?: boolean
  separator?: string
  multiple?: boolean
}

export interface UseSelectionDisplayOptions {
  model: Ref<readonly ListItem[]>
  getFullPath?: (node: ListItem) => ListItem[]
}

export function useSelectionDisplay(
  props: UseSelectionDisplayProps,
  options: UseSelectionDisplayOptions
) {
  // 计数值
  const counterValue = computed(() => {
    return typeof props.counterValue === 'function'
      ? props.counterValue(options.model.value as any)
      : typeof props.counterValue === 'number'
      ? props.counterValue
      : options.model.value.length
  })

  // 显示文本
  const displayText = computed(() => {
    if (!options.model.value.length) return ''

    return options.model.value
      .map(item => {
        if (props.showAllLevels && options.getFullPath) {
          const path = options.getFullPath(item)
          return path.map(p => p.title).join(props.separator || ' / ')
        }
        return item.title
      })
      .join(', ')
  })

  // 是否有数据
  const isDirty = computed(() => options.model.value.length > 0)

  return {
    counterValue,
    displayText,
    isDirty,
  }
}
