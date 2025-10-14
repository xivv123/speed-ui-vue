// Utilities
import { useVNodeRender } from './useVNodeRender'

// Types
import type { VNode } from 'vue'

/**
 * 兼容封装：保持原 useRender API，但内部复用 useVNodeRender
 * - 好处：获得重复调用检查与作用域清理
 * - 依然要求在 setup 内调用
 */
export function useRender(render: () => VNode): void {
  // 直接委托给更通用的 useVNodeRender
  useVNodeRender(render, 'useRender')
}
