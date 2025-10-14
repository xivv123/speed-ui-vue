// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps } from '@/composables/theme'

// Types
import type { ScrollDirection } from './types'
import type { PropType } from 'vue'

// Utilities
import { propsFactory } from '@/utils'

export const makeSPScrollTextProps = propsFactory(
  {
    // 滚动速度，单位为像素/秒
    speed: {
      type: Number,
      default: 50,
    },
    // 是否循环滚动
    loop: {
      type: Boolean,
      default: true,
    },
    // 滚动方向
    direction: {
      type: String as PropType<ScrollDirection>,
      default: 'left' as ScrollDirection,
      validator: (value: ScrollDirection) => ['left', 'right', 'up', 'down'].includes(value),
    },
    // 是否暂停滚动
    paused: {
      type: Boolean,
      default: false,
    },
    // 鼠标悬停时是否暂停滚动
    pauseOnHover: {
      type: Boolean,
      default: false,
    },
    // 滚动延迟（毫秒）
    delay: {
      type: Number,
      default: 0,
    },
    // 滚动完成后的回调
    onComplete: Function,

    ...makeComponentProps(),
    ...makeThemeProps(),
  },
  'SPScrollText'
)

export type SPScrollTextProps = ReturnType<typeof makeSPScrollTextProps>