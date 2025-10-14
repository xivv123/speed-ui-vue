// Types
import type { InjectionKey } from 'vue'
import type { OverlaySlots } from '../SPOverlay/SPOverlay'

/**
 * 菜单提供者接口
 */
export interface MenuProvide {
  /** 注册子菜单 */
  register(): void
  /** 注销子菜单 */
  unregister(): void
  /** 关闭父菜单 */
  closeParents(e?: MouseEvent): void
}

/**
 * 菜单注入键
 */
export const SPMenuSymbol: InjectionKey<MenuProvide> =
  Symbol.for('speed:sp-menu')

/**
 * SPMenu组件的插槽类型定义
 */
export type SPMenuSlots = OverlaySlots
