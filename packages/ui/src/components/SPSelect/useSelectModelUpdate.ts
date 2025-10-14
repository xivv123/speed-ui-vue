import type { Ref } from 'vue'
import { matchesSelector } from '@/utils'

/**
 * 通用的 Select 类型组件的 model 更新处理逻辑
 */
export interface UseSelectModelUpdateOptions<T = any> {
  /** 输入框引用 */
  textFieldRef: Ref<{ value: string } | undefined>
  /** model 值引用 */
  model: Ref<T>
  /** 是否支持自动填充匹配 */
  enableAutofill?: boolean
  /** 自动填充时的匹配函数 */
  onAutofillMatch?: (value: string) => void
  /** 清空时的默认值 */
  emptyValue?: T
}

/**
 * 创建 onModelUpdate 处理函数
 * 
 * 处理以下场景：
 * 1. 值为 null 时重置为默认值
 * 2. 浏览器自动填充时匹配选项
 * 3. 清空输入框
 */
export function useSelectModelUpdate<T = any>(
  options: UseSelectModelUpdateOptions<T>
) {
  const {
    textFieldRef,
    model,
    enableAutofill = false,
    onAutofillMatch,
    emptyValue,
  } = options

  return function onModelUpdate(v: any) {
    // 处理清空
    if (v == null) {
      model.value = emptyValue as T
      return
    }

    // 处理浏览器自动填充
    if (
      enableAutofill &&
      textFieldRef.value &&
      (matchesSelector(textFieldRef.value as any, ':autofill') ||
        matchesSelector(textFieldRef.value as any, ':-webkit-autofill'))
    ) {
      onAutofillMatch?.(v)
      return
    }

    // 清空输入框
    if (textFieldRef.value) {
      textFieldRef.value.value = ''
    }
  }
}
