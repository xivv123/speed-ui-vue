// Composables
import { makeComponentProps } from '../../composables/component'
import { makeDimensionProps } from '../../composables/dimensions'
import { makeRoundedProps } from '../../composables/rounded'
import { makeSizeProps } from '../../composables/size'
import { makeTagProps } from '../../composables/tag'
import { makeThemeProps } from '../../composables/theme'
import { makeVariantProps } from '../../composables/variant'

// Utilities
import { propsFactory } from '../../utils'

// Types
import type { PropType } from 'vue'

export const makeSPMorphBtnProps = propsFactory(
  {
    /** 是否展开状态 */
    expanded: {
      type: Boolean,
      default: false,
    },
    /** 展开后的宽度 */
    expandedWidth: {
      type: [String, Number],
      default: 200,
    },
    /** 展开后的高度 */
    expandedHeight: {
      type: [String, Number],
      default: 48,
    },
    /** 动画持续时间（毫秒） */
    duration: {
      type: Number,
      default: 300,
    },
    /** 动画缓动函数 */
    easing: {
      type: String,
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    /** 是否禁用 */
    disabled: Boolean,
    /** 按钮颜色 */
    color: String,
    /** 按钮变体 */
    variant: {
      type: String as PropType<'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'>,
      default: 'elevated',
    },

    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'button' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'elevated' } as const),
  },
  'SPMorphBtn'
)