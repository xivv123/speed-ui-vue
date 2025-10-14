// Utilities
import { computed, shallowRef, watch } from 'vue'

// Types
import type { Ref } from 'vue'
import type { ListItem } from '@/composables/list-items'

export interface UseSearchableSelectOptions {
  isFocused: Ref<boolean>
  multiple?: boolean
  hasSelectionSlot?: boolean
  model: Ref<readonly ListItem[] | ListItem[]>
  displayItems: Ref<readonly ListItem[] | ListItem[]>
}

/**
 * 搜索状态管理 composable
 * 统一处理 SPCombo 和 SPInputSuggest 的搜索逻辑
 */
export function useSearchableSelect(
  search: Ref<string>,
  options: UseSearchableSelectOptions
) {
  const { isFocused, multiple, hasSelectionSlot, model, displayItems } = options

  // pristine 状态：是否未输入过搜索内容
  const isPristine = shallowRef(true)

  // listHasFocus: 列表是否有焦点
  const listHasFocus = shallowRef(false)

  // 是否正在选择（用于避免触发不必要的 watch）
  const isSelecting = shallowRef(false)

  // 第一项高亮逻辑
  const highlightFirst = computed(() => {
    return (
      displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value
    )
  })

  // 监听焦点变化
  watch(isFocused, (val, oldVal) => {
    if (val === oldVal) return

    if (val) {
      // 获得焦点
      isSelecting.value = true
      // 如果是单选且没有 selection slot，显示当前选中项
      if (!multiple && !hasSelectionSlot) {
        search.value = String(model.value.at(-1)?.props.title ?? '')
      } else {
        search.value = ''
      }
      isPristine.value = !search.value

      // 重置 isSelecting 状态
      setTimeout(() => {
        isSelecting.value = false
      })
    } else {
      // 失去焦点
      if (!multiple && search.value == null) {
        ;(model as any).value = []
      }
      // 清空搜索（多选或有 selection slot 时）
      if (multiple || hasSelectionSlot) {
        search.value = ''
      }
    }
  })

  // 监听搜索内容变化
  watch(search, val => {
    if (!isFocused.value || isSelecting.value) return
    isPristine.value = !val
  })

  // 监听模型变化（单选模式下同步到搜索）
  // 注意：只在聚焦状态下同步，避免失焦时的逻辑冲突
  watch(model, () => {
    if (!multiple && !hasSelectionSlot && isFocused.value) {
      search.value = model.value[0]?.title ?? ''
    }
  })

  return {
    isPristine,
    listHasFocus,
    isSelecting,
    highlightFirst,
  }
}
