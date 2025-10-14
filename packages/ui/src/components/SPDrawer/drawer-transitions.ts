// Utilities
import { createCssTransition } from '@/components/transitions/createTransition'

// 创建专用的滑入动画
export const VDrawerLeftTransition = createCssTransition('drawer-left-transition')
export const VDrawerRightTransition = createCssTransition('drawer-right-transition')
export const VDrawerTopTransition = createCssTransition('drawer-top-transition')
export const VDrawerBottomTransition = createCssTransition('drawer-bottom-transition')

export type VDrawerLeftTransition = InstanceType<typeof VDrawerLeftTransition>
export type VDrawerRightTransition = InstanceType<typeof VDrawerRightTransition>
export type VDrawerTopTransition = InstanceType<typeof VDrawerTopTransition>
export type VDrawerBottomTransition = InstanceType<typeof VDrawerBottomTransition>
