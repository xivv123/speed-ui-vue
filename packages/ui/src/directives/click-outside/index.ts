// Utilities
import { attachedRoot } from '@/utils'

// Types
import type { DirectiveBinding } from 'vue'

interface ClickOutsideBindingArgs {
  handler: (e: MouseEvent) => void
  closeConditional?: (e: Event) => boolean
  include?: () => HTMLElement[]
}

interface ClickOutsideData {
  onClick: (e: Event) => void
  onMousedown: (e: Event) => void
  // 新增：右键菜单也算 outside 触发
  onContextmenu: (e: Event) => void
}

declare global {
  interface HTMLElement {
    _clickOutside?: {
      lastMousedownWasOutside: boolean
      [key: number]: ClickOutsideData
    }
  }
  
  interface MouseEvent {
    shadowTarget?: EventTarget | null
  }
}

interface ClickOutsideDirectiveBinding extends DirectiveBinding {
  value: ((e: MouseEvent) => void) | ClickOutsideBindingArgs
}

function defaultConditional() {
  return true
}

function checkEvent(
  e: MouseEvent,
  el: HTMLElement,
  binding: ClickOutsideDirectiveBinding
): boolean {
  if (!e || checkIsActive(e, binding) === false) return false

  const root = attachedRoot(el)
  if (
    typeof ShadowRoot !== 'undefined' &&
    root instanceof ShadowRoot &&
    root.host === e.target
  )
    return false

  const elements = (
    (typeof binding.value === 'object' && binding.value.include) ||
    (() => [])
  )()
  elements.push(el)

  return !elements.some(el => el?.contains(e.target as Node))
}

function checkIsActive(
  e: MouseEvent,
  binding: ClickOutsideDirectiveBinding
): boolean | void {
  const isActive =
    (typeof binding.value === 'object' && binding.value.closeConditional) ||
    defaultConditional

  return isActive(e)
}

function directive(
  e: MouseEvent,
  el: HTMLElement,
  binding: ClickOutsideDirectiveBinding
) {
  const handler =
    typeof binding.value === 'function' ? binding.value : binding.value.handler

  // Clicks in the Shadow DOM change their target while using setTimeout, so the original target is saved here
  e.shadowTarget = e.target

  if (
    el._clickOutside!.lastMousedownWasOutside &&
    checkEvent(e, el, binding)
  ) {
    const invoke = () => {
      checkIsActive(e, binding) && handler && handler(e)
    }
    // 关键改动：contextmenu 同步触发 outside，避免与同一次右键的“打开”产生竞态导致立刻被关闭
    if (e.type === 'contextmenu') invoke()
    else setTimeout(invoke, 0)
  }
}

function handleShadow(el: HTMLElement, callback: Function): void {
  const root = attachedRoot(el)

  callback(document)

  if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
    callback(root)
  }
}

export const ClickOutside = {
  mounted(el: HTMLElement, binding: ClickOutsideDirectiveBinding) {
    const onClick = (e: Event) => directive(e as MouseEvent, el, binding)
    const onMousedown = (e: Event) => {
      el._clickOutside!.lastMousedownWasOutside = checkEvent(
        e as MouseEvent,
        el,
        binding
      )
    }
    // 新增：监听 contextmenu，把右键也纳入 outside 关闭判定
    const onContextmenu = (e: Event) => directive(e as MouseEvent, el, binding)

    handleShadow(el, (app: HTMLElement) => {
      app.addEventListener('click', onClick, true)
      app.addEventListener('mousedown', onMousedown, true)
      app.addEventListener('contextmenu', onContextmenu, true)
    })
    if (!el._clickOutside) {
      el._clickOutside = {
        lastMousedownWasOutside: false,
      }
    }

    el._clickOutside[binding.instance!.$.uid] = {
      onClick,
      onMousedown,
      onContextmenu,
    }
  },

  beforeUnmount(el: HTMLElement, binding: ClickOutsideDirectiveBinding) {
    if (!el._clickOutside) return

    handleShadow(el, (app: HTMLElement) => {
      if (!app || !el._clickOutside?.[binding.instance!.$.uid]) return

      const { onClick, onMousedown, onContextmenu } =
        el._clickOutside[binding.instance!.$.uid]!

      app.removeEventListener('click', onClick, true)
      app.removeEventListener('mousedown', onMousedown, true)
      app.removeEventListener('contextmenu', onContextmenu, true)
    })

    delete el._clickOutside[binding.instance!.$.uid]
  },
}

export default ClickOutside
