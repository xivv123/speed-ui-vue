import type { ComputedRef, Ref, InjectionKey } from 'vue'

/**
 * SPFormItem 上下文类型
 * 提供给子组件的表单项验证状态和方法
 */
export interface FormItemContext {
  /** 标识这是一个表单项上下文 */
  isFormItem: true
  /** 验证表单项 */
  validate: () => Promise<string[]>
  /** 重置表单项 */
  reset: () => void
  /** 重置验证状态 */
  resetValidation: () => void
  /** 验证状态 */
  isValid: ComputedRef<boolean | null>
  /** 错误消息 */
  errorMessages: ComputedRef<string[]>
}

/**
 * SPFormItem 注入键
 * 用于在子组件中注入表单项上下文
 */
export const FormItemKey: InjectionKey<FormItemContext> = Symbol.for('speed:form-item')