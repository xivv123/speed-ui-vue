import { h, mergeProps, render, resolveComponent } from 'vue'
import { consoleError, isObject } from '@/utils'
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

type ExcludedDirectiveProps =
  | 'v-slots'
  | `v-slot:${string}`
  | `on${Uppercase<string>}${string}`
  | 'key'
  | 'ref'
  | 'ref_for'
  | 'ref_key'
  | '$children'

declare const DirectiveSymbol: unique symbol

type SPDirectiveHook<T extends DirectiveBinding = DirectiveBinding> = (
  element: HTMLElement,
  binding: T,
  vnode: VNode,
  prevVNode?: VNode
) => void

export interface SPCustomDirective<
  T extends DirectiveBinding = DirectiveBinding
> {
  created?: SPDirectiveHook<T>
  beforeMount?: SPDirectiveHook<T>
  mounted?: SPDirectiveHook<T>
  beforeUpdate?: SPDirectiveHook<T>
  updated?: SPDirectiveHook<T>
  beforeUnmount?: SPDirectiveHook<T>
  unmounted?: SPDirectiveHook<T>
  [DirectiveSymbol]: true
}

export function createCDirective<T extends DirectiveBinding>(
  component: string | Component,
  propsFn?: (binding: T) => Record<string, any>
): SPCustomDirective<T>
export function createCDirective<
  C extends Component,
  Props = Omit<ComponentInstance<C>['$props'], ExcludedDirectiveProps>
>(
  component: string | C,
  staticProps?: Record<string, any>
): ObjectDirective<any, Props>
export function createCDirective(
  component: string | Component,
  propsConfig?:
    | Record<string, any>
    | ((binding: DirectiveBinding) => Record<string, any>)
): ObjectDirective | SPCustomDirective {
  const resolvedComponent = (
    typeof component === 'string' ? resolveComponent(component) : component
  ) as ConcreteComponent

  const mountHandler = createMountHandler(resolvedComponent, propsConfig)

  return {
    mounted: mountHandler,
    updated: mountHandler,
    unmounted(element: HTMLElement) {
      render(null, element)
    },
  }
}

function createMountHandler(
  component: ConcreteComponent,
  propsConfig?:
    | Record<string, any>
    | ((binding: DirectiveBinding) => Record<string, any>)
) {
  return function mountHandler(
    element: HTMLElement,
    binding: DirectiveBinding,
    vnode: VNode
  ) {
    if (shouldUnmountComponent(binding.value)) {
      render(null, element)
      return
    }

    const computedProps =
      typeof propsConfig === 'function' ? propsConfig(binding) : propsConfig
    const textContent = extractTextContent(binding, computedProps)
    const bindingValue = isObject(binding.value) ? binding.value : {}

    const children = shouldCreateChildren(component)
      ? () => textContent ?? element.textContent
      : undefined

    const providesContext = getComponentProvides(vnode, binding)

    const componentNode = h(
      component,
      mergeProps(computedProps, bindingValue),
      children
    )
    componentNode.appContext = Object.assign(
      Object.create(null),
      (binding.instance as ComponentPublicInstance).$.appContext,
      { provides: providesContext }
    )

    render(componentNode, element)
  }
}

function shouldUnmountComponent(value: any): boolean {
  return value === false || (isObject(value) && value.modelValue === false)
}

function extractTextContent(binding: DirectiveBinding, props: any): string {
  return binding.value?.text ?? binding.value ?? props?.text
}

function shouldCreateChildren(component: ConcreteComponent): boolean {
  return component.name !== 'SPLoading'
}

function getComponentProvides(vnode: VNode, binding: DirectiveBinding) {
  const vnodeContext = (vnode as any).ctx
  const instanceContext = binding.instance!.$

  const parentProvides =
    vnodeContext === instanceContext
      ? (findParentComponent(vnode, instanceContext) as any)?.provides
      : vnodeContext?.provides

  return parentProvides ?? (instanceContext as any).provides
}

function findParentComponent(
  targetVnode: VNode,
  rootInstance: ComponentInternalInstance
): ComponentInternalInstance | null {
  const visitedNodes = new Set<VNode>()

  const traverseNodes = (nodeList: VNode[]): boolean => {
    for (const currentNode of nodeList) {
      if (!currentNode) continue

      if (isTargetNode(currentNode, targetVnode)) {
        return true
      }

      visitedNodes.add(currentNode)

      const foundTarget = traverseChildNodes(currentNode, traverseNodes)
      if (foundTarget) {
        return true
      }

      visitedNodes.delete(currentNode)
    }

    return false
  }
  if (!traverseNodes([rootInstance.subTree])) {
    consoleError('无法找到目标节点，组件将无法继承 provides')
    return rootInstance
  }

  return findComponentInPath(Array.from(visitedNodes)) ?? rootInstance
}

function isTargetNode(currentNode: VNode, targetVnode: VNode): boolean {
  return (
    currentNode === targetVnode ||
    !!(currentNode.el && targetVnode.el && currentNode.el === targetVnode.el)
  )
}

function traverseChildNodes(
  node: VNode,
  traverseCallback: (nodes: VNode[]) => boolean
): boolean {
  if (node.suspense) {
    return traverseCallback([(node as any).ssContent!])
  } else if (Array.isArray(node.children)) {
    return traverseCallback(node.children as VNode[])
  } else if (node.component?.subTree) {
    return traverseCallback([node.component.subTree])
  }
  return false
}

function findComponentInPath(
  nodePath: VNode[]
): ComponentInternalInstance | null {
  const reversedPath = nodePath.reverse()
  for (const node of reversedPath) {
    if (node.component) {
      return node.component
    }
  }
  return null
}
