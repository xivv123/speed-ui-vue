// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'
import type { TourStep } from './types'

// Slots 类型定义
export type SPTourStepSlots = {
  default: {
    step: TourStep
  }
}

export const makeSPTourStepProps = propsFactory(
  {
    /** 步骤标题 */
    title: String,
    /** 步骤描述 */
    description: String,
    /** 目标元素选择器或元素引用 */
    target: {
      type: [String, Object, Function] as PropType<TourStep['target']>,
      required: true,
    },
    /** 高亮区域的位置，默认为目标元素位置 */
    placement: {
      type: String as PropType<TourStep['placement']>,
      default: 'bottom',
    },
    /** 自定义遮罩样式 */
    mask: Object as PropType<TourStep['mask']>,
    /** 是否显示箭头 */
    showArrow: Boolean,
    /** 下一步按钮文字 */
    nextText: String,
    /** 上一步按钮文字 */
    prevText: String,
    /** 当前步骤是否可跳过 */
    closable: Boolean,
    /** 是否自动滚动到目标元素 */
    scrollIntoView: {
      type: Boolean,
      default: true,
    },
    /** 滚动配置 */
    scrollOptions: Object as PropType<ScrollIntoViewOptions>,
    /** 步骤进入前的钩子 */
    onEnter: Function as PropType<TourStep['onEnter']>,
    /** 步骤离开前的钩子 */
    onLeave: Function as PropType<TourStep['onLeave']>,
  },
  'SPTourStep'
)

export const SPTourStep = genericComponent<SPTourStepSlots>()({
  name: 'SPTourStep',

  props: makeSPTourStepProps(),

  setup(props, { slots }) {
    // 将当前步骤数据转换为 TourStep 格式
    const stepData = computed(
      (): TourStep => ({
        title: props.title,
        description: props.description,
        target: props.target,
        placement: props.placement,
        mask: props.mask,
        showArrow: props.showArrow,
        nextText: props.nextText,
        prevText: props.prevText,
        closable: props.closable,
        scrollIntoView: props.scrollIntoView,
        scrollOptions: props.scrollOptions,
        onEnter: props.onEnter,
        onLeave: props.onLeave,
      })
    )

    // SPTourStep 组件本身不渲染任何内容，只提供步骤数据
    // 实际的渲染由父级 SPTour 组件处理
    return () => {
      // 如果有插槽内容，可以在这里处理自定义内容
      if (slots.default) {
        return slots.default({
          step: stepData.value,
        })
      }
      return null
    }
  },
})

export type SPTourStep = InstanceType<typeof SPTourStep>
