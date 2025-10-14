import type { ExtractPropTypes } from 'vue'

// 翻转方向类型
export type FlipDirection = 'flip-up' | 'flip-down' | 'flip-left' | 'flip-right'

// 翻转动画缓动函数类型
export type FlipEasing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'

// 翻转触发方式
export type FlipTrigger = 'auto' | 'manual' | 'hover' | 'click'

// 组件插槽类型
export interface SPFlipTextSlots {
  /**
   * 正面内容（默认展示）
   */
  front?: () => any
  /**
   * 背面内容（翻到背面时展示）
   */
  back?: () => any
  /**
   * 顶面内容（向上翻转时显示）
   */
  top?: () => any
  /**
   * 底面内容（向下翻转时显示）
   */
  bottom?: () => any
  /**
   * 左面内容（向左翻转时显示）
   */
  left?: () => any
  /**
   * 右面内容（向右翻转时显示）
   */
  right?: () => any
  /**
   * 默认内容（当对应方向的面没有内容时使用）
   */
  default?: () => any
}

// 翻转事件回调类型
export interface SPFlipTextEvents {
  onFlipStart?: () => void
  onFlipEnd?: () => void
  onFlipComplete?: () => void
}