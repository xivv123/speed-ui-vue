/**
 * 在 setup 中覆盖组件的渲染函数（支持 TSX/JSX）
 *
 * 改进点：
 * - 入参更宽松：支持直接传 VNodeChild、函数或 Ref 形式
 * - 作用域清理：onScopeDispose 时恢复原 render，避免泄漏
 * - 重复调用检查：多次设置会给出警告（除非传入同一个函数引用）
 */

// Utilities
import { useCurrentComp } from './useCurrentComp'
import { isRef, onScopeDispose } from 'vue'
import { consoleWarn } from './console'

// Types
import type { Ref, VNodeChild } from 'vue'

export type RenderFn = () => VNodeChild

type RenderLike = VNodeChild | RenderFn
type RenderLikeRef = Ref<RenderLike>

export function useVNodeRender(
  render: RenderLike | RenderLikeRef,
  debugName?: string
): void {
  const vm = useCurrentComp('useVNodeRender') as any

  const normalized: RenderFn = isRef(render)
    ? () => {
        const v = (render as RenderLikeRef).value
        return typeof v === 'function' ? (v as RenderFn)() : v
      }
    : typeof render === 'function'
    ? (render as RenderFn)
    : () => render

  const prev = vm.render

  if ((vm as any).__useVNodeRenderSet && prev !== normalized) {
    const comp = (vm.type && (vm.type as any).name) || 'AnonymousComponent'
    consoleWarn(`useVNodeRender called multiple times in ${debugName || comp}`)
  }
  ;(vm as any).__useVNodeRenderSet = true

  vm.render = normalized as any

  // 自动清理：离开作用域时还原
  onScopeDispose(() => {
    if (vm && vm.render === normalized) {
      vm.render = prev
      ;(vm as any).__useVNodeRenderSet = false
    }
  })
}

