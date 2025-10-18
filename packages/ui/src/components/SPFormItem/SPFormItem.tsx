// Styles
import './SPFormItem.scss'

// Composables
import { useDimension } from '@/composables/dimensions'
import { useRtl } from '@/composables/locale'
import { useValidation } from '@/composables/validation'

import { SPMsgs } from '../SPMsgs/SPMsgs'
import { SPLabel } from '../SPLabel/SPLabel'
import SpIcon from '../icon/Icon'

// Utilities
import { computed, toRef, useId, provide, inject, watch, reactive, ref } from 'vue'
import {
  genericComponent,
  useRender,
  wrapInArray,
  convertToUnit,
} from '@/utils'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { SPMsgslot } from '../SPMsgs/SPMsgs'
import type { GenericProps } from '@/utils'
import type { FormDataProvider, FormConfigProvider } from '../SPForm/SPForm'
import { FormDataKey, FormConfigKey } from '../SPForm/SPForm'
import type { FormItemContext } from './types'
import { FormItemKey } from './types'
import { makeSPFormItemProps } from './props'

export interface SPFormItemSlot {
  id: ComputedRef<string>
  messagesId: ComputedRef<string | undefined>
  isDirty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: Ref<boolean>
  isValid: ComputedRef<boolean | null>
  isValidating: Ref<boolean>
  hasDetails: Ref<boolean>
  reset: () => void
  resetValidation: () => void
  validate: () => void
}

export type SPFormItemSlots = {
  default: SPFormItemSlot
  left: SPFormItemSlot
  right: SPFormItemSlot
  details: SPFormItemSlot
  message: SPMsgslot
}

export const SPFormItem = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: SPFormItemSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'SPFormItem',

  props: {
    ...makeSPFormItemProps(),
  },

  setup(props, { attrs, slots }) {
    const { dimensionStyles } = useDimension(props)
    const { rtlClasses } = useRtl()
    // 简化 focus 相关逻辑，由子组件自己管理
    const isFocused = ref(false)

    // 获取表单数据提供者
    const formDataProvider = inject<FormDataProvider | null>(FormDataKey, null)
    
    // 获取表单配置提供者
    const formConfigProvider = inject<FormConfigProvider | null>(FormConfigKey, null)
    
    // 计算最终的标签配置，优先使用组件自身的 props，如果没有则使用表单级别的配置
    const finalLabelPosition = computed(() => {
      return props.labelPosition || formConfigProvider?.labelPosition || 'left'
    })
    
    const finalLabelWidth = computed(() => {
      return props.labelWidth || formConfigProvider?.labelWidth
    })
    
    const finalLabelAlign = computed(() => {
      return props.labelAlign || formConfigProvider?.labelAlign || 'left'
    })
    
    // 如果有 prop 属性，从表单数据中获取值作为校验值
    const validationValue = computed(() => {
      if (props.prop && formDataProvider) {
        // 直接访问响应式的 formData
        const value = formDataProvider.formData[props.prop]
        return value
      }
      // 如果没有 prop，SPFormItem 不管理值，由子组件自己管理
      return undefined
    })

    const uid = useId()
    const id = computed(() => props.id || `input-${uid}`)

    // 使用校验值调用 useValidation
    const validationProps = reactive({ 
      ...props, 
      validationValue: validationValue // 直接传递 computed ref
    }) as any
    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses,
    } = useValidation(validationProps, 'sp-form-item', id)

    // 只在有 prop 时监听表单字段值的变化
    if (props.prop && formDataProvider) {
      watch(
        () => formDataProvider.formData[props.prop!],
        async (newVal, oldVal) => {
          if (newVal !== oldVal) {
            isPristine.value = false
          }
          await validate()
        },
        { flush: 'post', immediate: true }
      )
    }

    const messages = computed(() => {
      const errorMsgs = errorMessages.value
      const userMessages = wrapInArray(props.messages)
      
      if (props.errorMessages?.length || (!isPristine.value && errorMsgs.length)) {
        return errorMsgs
      } else if (props.hint && (props.persistentHint || isFocused.value)) {
        return [props.hint]
      } else {
        return userMessages
      }
    })

    const hasMessages = toRef(() => messages.value.length > 0)

    const hasDetails = toRef(
      () =>
        !props.hideDetails ||
        (props.hideDetails === 'auto' && (hasMessages.value || !!slots.details))
    )

    const messagesId = computed(() =>
      hasDetails.value ? `${id.value}-messages` : undefined
    )

    const slotProps = computed<SPFormItemSlot>(() => ({
      id,
      messagesId,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      hasDetails,
      reset,
      resetValidation,
      validate,
    }))



    // 计算是否显示必填星号
    const shouldShowRequiredIcon = computed(() => {
      // 如果 requiredicon 明确设置为 false 或 'false'，则不显示
      if (props.requiredicon === false || props.requiredicon === 'false') {
        return false
      }
      
      // 如果有校验规则或者 required 为 true，则显示星号
      return props.rules?.length > 0 || props.required
    })

    // 渲染必填图标：三种状态 - 校验成功(绿色对号)、校验失败(红色叉号)、默认(红色星号)
    const renderRequiredIcon = () => {
      if (!shouldShowRequiredIcon.value) return null
      
      if (isValid.value === true) {
        // 校验成功：绿色对号
        return <SpIcon name="checkmarkCircle" size={12} class="sp-form-item__check-icon" />
      } else if (isValid.value === false) {
        // 校验失败：红色叉号
        return <SpIcon name="closeCircle" size={12} class="sp-form-item__error-icon" />
      } else {
        // 默认状态：红色星号
        return <span class="sp-form-item__required">*</span>
      }
    }

    // 提供 FormItem 上下文给子组件
    const formItemContext: FormItemContext = {
      isFormItem: true,
      validate,
      reset,
      resetValidation,
      isValid,
      errorMessages,
    }
    provide(FormItemKey, formItemContext)


    useRender(() => {
      const hasLeft = !!slots.left
      const hasRight = !!slots.right
      const hasLabel = !!props.label
      
      // 根据 labelPosition 决定标签位置
      const position = finalLabelPosition.value
      const showLabelInLeft = hasLabel && position === 'left'
      const showLabelInRight = hasLabel && position === 'right'
      const showLabelOnTop = hasLabel && position === 'top'

      // 计算标签样式  
      const labelStyles = computed(() => {
        const styles: Record<string, any> = {}
        
        // 使用 convertToUnit 优化尺寸单位转换
        if (finalLabelWidth.value && ['left', 'right'].includes(finalLabelPosition.value)) {
          styles.width = convertToUnit(finalLabelWidth.value)
        }
        
        // 对齐方式映射
        const alignMap = {
          center: 'center',
          right: 'flex-end',
          left: 'flex-start'
        }
        styles.justifyContent = alignMap[finalLabelAlign.value as keyof typeof alignMap] || 'flex-start'
        
        return styles
      })

      return (
        <div
          class={[
            'sp-form-item',
            {
              'sp-form-item--focused': isFocused.value,
              'sp-form-item--required': props.required,
              [`sp-form-item--label-${finalLabelPosition.value}`]: hasLabel,
            },
            rtlClasses.value,
            validationClasses.value,
            props.class,
          ]}
          style={[dimensionStyles.value, props.style]}
        >
          {/* 顶部标签 */}
          {showLabelOnTop && (
            <div class="sp-form-item__label-top">
              <span class="sp-form-item__label" style={labelStyles.value}>
                {renderRequiredIcon()}
                <SPLabel text={props.label} />
              </span>
            </div>
          )}
          
          <div class="sp-form-item__content">
            {(hasLeft || showLabelInLeft) && (
              <div
                key="left"
                class="sp-form-item__left"
              >
                {/* 左侧标签 */}
                {showLabelInLeft && (
                  <span class="sp-form-item__label" style={labelStyles.value}>
                    {renderRequiredIcon()}
                    <SPLabel text={props.label} />
                  </span>
                )}
                
                {/* 用户自定义 left 内容 */}
                {slots.left?.(slotProps.value)}
              </div>
            )}

            {slots.default && (
              <div class="sp-form-item__control">
                {slots.default?.(slotProps.value)}
              </div>
            )}

            {(hasRight || showLabelInRight) && (
              <div
                key="right"
                class="sp-form-item__right"
              >
                {/* 用户自定义 right 内容 */}
                {slots.right?.(slotProps.value)}
                
                {/* 右侧标签 */}
                {showLabelInRight && (
                  <span class="sp-form-item__label" style={labelStyles.value}>
                    {renderRequiredIcon()}
                    <SPLabel text={props.label} />
                  </span>
                )}
              </div>
            )}
            
            {/* 错误消息在 control 区域下方 */}
            {hasDetails.value && (
              <div
                id={messagesId.value}
                class="sp-form-item__details"
                role="alert"
                aria-live="polite"
              >
                <SPMsgs
                  active={hasMessages.value}
                  messages={messages.value}
                  color={isValid.value === false ? 'error' : undefined}
                  v-slots={{ message: slots.message }}
                />

                {slots.details?.(slotProps.value)}
              </div>
            )}
          </div>
        </div>
      )
    })

    return {
      reset,
      resetValidation,
      validate,
      isValid,
      errorMessages,
    }
  },
})

export type SPFormItem = InstanceType<typeof SPFormItem>