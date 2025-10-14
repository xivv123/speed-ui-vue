// Composables
import { useForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, shallowRef, toRef } from 'vue'

// Types
import type { Ref } from 'vue'
import type { SPMenu } from '@/components/SPMenu'

export interface UseSelectBaseProps {
  hideNoData?: boolean
  openText?: string
  closeText?: string
  openOnClear?: boolean
  menu?: boolean
  readonly: boolean | null
  disabled: boolean | null
  'onUpdate:menu': ((value: boolean) => void) | undefined
}

export function useSelectBase(
  props: UseSelectBaseProps,
  options: {
    itemsLength: Ref<number>
    spMenuRef: Ref<SPMenu | undefined>
  }
) {
  const { t } = useLocale()
  const form = useForm(props)
  const isFocused = shallowRef(false)

  // 菜单状态管理
  const menuDisabled = computed(
    () =>
      (props.hideNoData && !options.itemsLength.value) ||
      form.isReadonly.value ||
      form.isDisabled.value
  )

  const _menu = useProxiedModel(props, 'menu')
  const menu = computed({
    get: () => _menu.value,
    set: v => {
      if (_menu.value && !v && options.spMenuRef.value?.ΨopenChildren.size)
        return
      if (v && menuDisabled.value) return
      _menu.value = v
    },
  })

  const label = toRef(
    () => (menu.value ? props.closeText : props.openText) || ''
  )

  // 事件处理
  function onClear(_e: MouseEvent) {
    if (props.openOnClear) {
      menu.value = true
    }
  }

  function onMousedownControl(_e: MouseEvent) {
    if (menuDisabled.value) return
    menu.value = !menu.value
  }

  function onFocusin(_e: FocusEvent) {
    isFocused.value = true
  }

  return {
    // State
    form,
    isFocused,
    menu,
    menuDisabled,
    label,
    t,

    // Methods
    onClear,
    onMousedownControl,
    onFocusin,
  }
}
