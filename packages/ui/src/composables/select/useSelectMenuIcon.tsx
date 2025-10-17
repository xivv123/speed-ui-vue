// Components
import SpIcon from '@/components/icon/Icon'

// Utilities
import { computed } from 'vue'

// Types
import type { Ref, Slots } from 'vue'
import type { SPTextField } from '@/components/SPTextField'
import type { IconValue } from '@/composables/icons'

export interface UseSelectMenuIconOptions {
  componentName: string
  /**
   * 菜单图标名称
   */
  menuIcon?: IconValue

  /**
   * SPTextField 引用，用于获取 fieldIconColor
   */
  textFieldRef: Ref<SPTextField | undefined>

  /**
   * 用户传入的 slots
   */
  slots: Slots

  /**
   * 可选的 label，用于 aria-label
   */
  label?: Ref<string>

  /**
   * 可选的额外条件判断，用于控制图标是否显示
   * 例如 SPCombo 的 `(!props.hideNoData || props.items.length)`
   */
  showCondition?: Ref<boolean>

  /**
   * 可选的点击事件处理
   */
  onClick?: (e: MouseEvent) => void

  /**
   * 图标大小
   */
  size?: number
}

/**
 * 选择类组件的 append-inner 菜单图标封装
 * 统一处理 SPSelect, SPCombo, SPInputSuggest, SPCascader 的菜单图标渲染
 */
export function useSelectMenuIcon(options: UseSelectMenuIconOptions) {
  const {
    componentName,
    menuIcon,
    textFieldRef,
    slots,
    label,
    showCondition,
    onClick,
    size,
  } = options

  // 图标是否应该显示
  const shouldShowIcon = computed(() => {
    if (!menuIcon) return false
    if (showCondition !== undefined) {
      return showCondition.value
    }
    return true
  })

  /**
   * 渲染 append-inner slot
   */
  const renderAppendInner = (slotProps: any) => {
    return (
      <>
        {slots['append-inner']?.(slotProps)}
        {shouldShowIcon.value ? (
          <SpIcon
            class={`${componentName}__menu-icon`}
            color={textFieldRef.value?.fieldIconColor}
            name={menuIcon as string}
            size={size || 24}
            onClick={onClick}
            aria-label={label?.value}
          />
        ) : undefined}
      </>
    )
  }

  return {
    renderAppendInner,
  }
}
