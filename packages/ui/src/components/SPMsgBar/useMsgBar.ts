// Utilities
import { reactive, computed } from 'vue'
import { generateId } from '@/utils'

// Types
import type { App } from 'vue'

export interface MsgBarOptions {
  text?: string
  color?: string
  variant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  location?: string
  timeout?: number
  timer?: boolean | string
  multiLine?: boolean
  vertical?: boolean
  rounded?: string
  actions?: Array<{
    text: string
    color?: string
    variant?: string
    onClick: () => void
  }>
}

export interface MsgBarItem extends Required<MsgBarOptions> {
  id: string
  visible: boolean
}

class MsgBarService {
  private items = reactive<MsgBarItem[]>([])

  show(options: MsgBarOptions): string {
    const id = generateId()
    const item: MsgBarItem = {
      id,
      text: options.text || '',
      color: options.color || 'primary',
      variant: options.variant || 'elevated',
      location: options.location || 'top',
      timeout: options.timeout ?? 5000,
      timer: options.timer ?? false,
      multiLine: options.multiLine ?? false,
      vertical: options.vertical ?? false,
      rounded: options.rounded || '',
      actions: options.actions || [],
      visible: true,
    }

    this.items.push(item)
    return id
  }

  hide(id: string) {
    const item = this.items.find(item => item.id === id)
    if (item) {
      item.visible = false
      // Remove item after animation
      setTimeout(() => {
        const index = this.items.findIndex(item => item.id === id)
        if (index > -1) {
          this.items.splice(index, 1)
        }
      }, 300)
    }
  }

  clear() {
    this.items.forEach(item => {
      item.visible = false
    })
    setTimeout(() => {
      this.items.splice(0)
    }, 300)
  }

  // Convenience methods
  success(text: string, options: Partial<MsgBarOptions> = {}) {
    return this.show({ ...options, text, color: 'success' })
  }

  error(text: string, options: Partial<MsgBarOptions> = {}) {
    return this.show({ ...options, text, color: 'error' })
  }

  warning(text: string, options: Partial<MsgBarOptions> = {}) {
    return this.show({ ...options, text, color: 'warning' })
  }

  info(text: string, options: Partial<MsgBarOptions> = {}) {
    return this.show({ ...options, text, color: 'info' })
  }

  get list() {
    return computed(() => this.items)
  }
}

// Global instance
const msgBar = new MsgBarService()

// Composable
export function useMsgBar() {
  return msgBar
}

// Plugin
export const MsgBarPlugin = {
  install(app: App) {
    app.config.globalProperties.$msgBar = msgBar
    app.provide('msgBar', msgBar)
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $msgBar: MsgBarService
  }
}

export { msgBar }
