// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { propsFactory } from '@/utils'

// Types
import type { PropType } from 'vue'

/**
 * SPLoading组件的属性定义
 */
export const makeSPLoadingProps = propsFactory(
  {
    /** 是否显示加载状态 */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /** 加载文本提示 */
    text: String,
    /** 进度值，范围0-100 */
    progress: {
      type: [Number, String],
      default: 0,
    },

    // 从SPOverlay继承的props
    /** 是否为绝对定位（局部加载） */
    absolute: Boolean,
    /** 是否包含在父元素内 */
    contained: Boolean,
    /** 是否持久化显示（不可通过点击关闭） */
    persistent: {
      type: Boolean,
      default: true,
    },
    /** 遮罩背景颜色或是否显示遮罩 */
    scrim: {
      type: [Boolean, String],
      default: true,
    },
    /** 遮罩透明度 */
    opacity: [Number, String],
    /** z-index 层级 */
    zIndex: {
      type: [Number, String],
      default: 2001,
    },
    /** 是否禁用点击动画 */
    noClickAnimation: Boolean,
    /** 是否禁用组件 */
    disabled: Boolean,

    // 从SPProgCir继承的props
    /** 进度条颜色 */
    color: String,
    /** 进度条背景色 */
    bgColor: String,
    /** 是否为不确定进度模式 */
    indeterminate: {
      type: [Boolean, String] as PropType<boolean | 'disable-shrink'>,
      default: true,
    },
    /** 进度条大小 */
    size: {
      type: [Number, String],
      default: 48,
    },
    /** 进度条线条宽度 */
    width: {
      type: [Number, String],
      default: 4,
    },
    /** 进度条旋转角度 */
    rotate: {
      type: [Number, String],
      default: 0,
    },

    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPLoading'
)
