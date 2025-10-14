// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps } from '@/composables/theme'

// Types
import type { FlipDirection, FlipEasing, FlipTrigger } from './types'
import type { PropType } from 'vue'

// Utilities
import { propsFactory } from '@/utils'

export const makeSPFlipTextProps = propsFactory(
  {
    // 翻转方向
    direction: {
      type: String as PropType<FlipDirection>,
      default: 'flip-up' as FlipDirection,
      validator: (value: FlipDirection) => ['flip-up', 'flip-down', 'flip-left', 'flip-right'].includes(value),
    },
    // 翻转动画持续时间（毫秒）
    duration: {
      type: Number,
      default: 800,
    },
    // 翻转动画缓动函数
    easing: {
      type: String as PropType<FlipEasing>,
      default: 'ease-in-out' as FlipEasing,
      validator: (value: FlipEasing) => ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'].includes(value),
    },
    // 翻转触发方式
    trigger: {
      type: String as PropType<FlipTrigger>,
      default: 'auto' as FlipTrigger,
      validator: (value: FlipTrigger) => ['auto', 'manual', 'hover', 'click'].includes(value),
    },
    // 是否循环翻转
    loop: {
      type: Boolean,
      default: true,
    },
    // 循环间隔时间（毫秒）
    interval: {
      type: Number,
      default: 3000,
    },
    // 翻转延迟（毫秒）
    delay: {
      type: Number,
      default: 0,
    },
    // 是否暂停翻转
    paused: {
      type: Boolean,
      default: false,
    },
    // 翻转开始时的回调
    onFlipStart: Function,
    // 翻转结束时的回调
    onFlipEnd: Function,
    // 翻转完成时的回调
    onFlipComplete: Function,

    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPFlipText'
)

export type SPFlipTextProps = ReturnType<typeof makeSPFlipTextProps>