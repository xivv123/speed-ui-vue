// Utilities
import { h, mergeProps, render, resolveComponent } from 'vue'
import { consoleError, isObject } from '@/utils'

// Types
import type {
  Component,
  ComponentInternalInstance,
  ComponentPublicInstance,
  ConcreteComponent,
  DirectiveBinding,
  ObjectDirective,
  VNode,
} from 'vue'
import type { ComponentInstance } from '@/utils'

type ExcludeProps =
  | 'v-slots'
  | `v-slot:${string}`
  | `on${Uppercase<string>}${string}`
  | 'key'
  | 'ref'
  | 'ref_for'
  | 'ref_key'
  | '$children'

declare const CustomDirectiveSymbol: unique symbol
type DirectiveHook<B extends DirectiveBinding> = (
  el: any,
  binding: B,
  vnode: VNode<any, any>,
  prevVNode: VNode<any, any>
) => void
export interface CustomDirective<
  B extends DirectiveBinding = DirectiveBinding
> {
  created?: DirectiveHook<B>
  beforeMount?: DirectiveHook<B>
  mounted?: DirectiveHook<B>
  beforeUpdate?: DirectiveHook<B>
  updated?: DirectiveHook<B>
  beforeUnmount?: DirectiveHook<B>
  unmounted?: DirectiveHook<B>
  [CustomDirectiveSymbol]: true
}

export function useDirectiveComponent<Binding extends DirectiveBinding>(
  component: string | Component,
  props?: (binding: Binding) => Record<string, any>
): CustomDirective<Binding>
export function useDirectiveComponent<
  C extends Component,
  Props = Omit<ComponentInstance<C>['$props'], ExcludeProps>
>(
  component: string | C,
  props?: Record<string, any>
): ObjectDirective<any, Props>
export function useDirectiveComponent(
  component: string | Component,
  props?:
    | Record<string, any>
    | ((binding: DirectiveBinding) => Record<string, any>)
): ObjectDirective | CustomDirective {
  const concreteComponent = (
    typeof component === 'string' ? resolveComponent(component) : component
  ) as ConcreteComponent

  const hook = mountComponent(concreteComponent, props)

  return {
    mounted: hook,
    updated: hook,
    unmounted(el: HTMLElement) {
      render(null, el)
    },
  }
}

function mountComponent(
  component: ConcreteComponent,
  props?:
    | Record<string, any>
    | ((binding: DirectiveBinding) => Record<string, any>)
) {
  return function (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    // 如果值为 false，或者对象中的 modelValue 为 false，直接卸载组件
    if (
      binding.value === false ||
      (isObject(binding.value) && binding.value.modelValue === false)
    ) {
      render(null, el)
      return
    }

    const _props = typeof props === 'function' ? props(binding) : props
    const text = binding.value?.text ?? binding.value ?? _props?.text
    const value = isObject(binding.value) ? binding.value : {}

    // For SPLoading component, don't pass children as slots to avoid conflicts with default slot
    // Instead, text should be passed via props.text
    const shouldPassChildren = component.name !== 'SPLoading'
    const children = shouldPassChildren
      ? () => text ?? el.textContent
      : undefined

    // If vnode.ctx is the same as the instance, then we're bound to a plain element
    // and need to find the nearest parent component instance to inherit provides from
    const provides =
      ((vnode as any).ctx === binding.instance!.$
        ? (findComponentParent(vnode, binding.instance!.$) as any)?.provides
        : (vnode as any).ctx?.provides) ?? (binding.instance!.$ as any).provides

    const node = h(component, mergeProps(_props, value), children)
    node.appContext = Object.assign(
      Object.create(null),
      (binding.instance as ComponentPublicInstance).$.appContext,
      { provides }
    )

    render(node, el)
  }
}

function findComponentParent(
  vnode: VNode,
  root: ComponentInternalInstance
): ComponentInternalInstance | null {
  // Walk the tree from root until we find the child vnode
  const stack = new Set<VNode>()
  const walk = (children: VNode[]): boolean => {
    for (const child of children) {
      if (!child) continue

      if (child === vnode || (child.el && vnode.el && child.el === vnode.el)) {
        return true
      }

      stack.add(child)
      let result
      if (child.suspense) {
        result = walk([(child as any).ssContent!])
      } else if (Array.isArray(child.children)) {
        result = walk(child.children as VNode[])
      } else if (child.component?.vnode) {
        result = walk([child.component?.subTree])
      }
      if (result) {
        return result
      }
      stack.delete(child)
    }

    return false
  }
  if (!walk([root.subTree])) {
    consoleError(
      'Could not find original vnode, component will not inherit provides'
    )
    return root
  }

  // Return the first component parent
  const result = Array.from(stack).reverse()
  for (const child of result) {
    if (child.component) {
      return child.component
    }
  }
  return root
}
