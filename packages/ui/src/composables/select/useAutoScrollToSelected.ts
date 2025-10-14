// Utilities
import { watch } from 'vue'
import { IN_BROWSER } from '@/utils'

// Types
import type { Ref } from 'vue'
import type { SPVirtualScroll } from '@/components/SPVirtualScroll'
import type { ListItem } from '@/composables/list-items'

export interface UseAutoScrollToSelectedOptions {
  menu: Ref<boolean>
  model: Ref<readonly ListItem[] | ListItem[]>
  displayItems: Ref<readonly ListItem[] | ListItem[]>
  hideSelected?: boolean
  virtualScrollRef: Ref<SPVirtualScroll | undefined>
  valueComparator?: (a: any, b: any) => boolean
  noAutoScroll?: boolean
}

/**
 * 自动滚动到选中项的 composable
 * 当菜单打开时，自动将选中的项滚动到可视区域
 */
export function useAutoScrollToSelected(options: UseAutoScrollToSelectedOptions) {
  const {
    menu,
    model,
    displayItems,
    hideSelected,
    virtualScrollRef,
    valueComparator,
    noAutoScroll,
  } = options

  watch(menu, () => {
    if (!hideSelected && menu.value && model.value.length) {
      const index = displayItems.value.findIndex(item =>
        model.value.some(s => {
          if (valueComparator) {
            return valueComparator(s.value, item.value)
          }
          // 默认使用值比较
          return s.value === item.value
        })
      )

      if (IN_BROWSER && !noAutoScroll && index >= 0) {
        window.requestAnimationFrame(() => {
          virtualScrollRef.value?.scrollToIndex(index)
        })
      }
    }
  })
}
