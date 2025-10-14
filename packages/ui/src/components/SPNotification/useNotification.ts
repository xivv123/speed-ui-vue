// Notification service for programmatic usage
import { createApp, App as VueApp, ref, nextTick, getCurrentInstance } from 'vue'
import { SPNotification } from './SPNotification'
import type { NotificationOptions, NotificationInstance, NotificationType } from './types'

// 导入必要的provider
import { createDefaults, DefaultsSymbol } from '@/composables/defaults'
import { createTheme, ThemeSymbol } from '@/composables/theme'
import { createLocale, LocaleSymbol } from '@/composables/locale'
import { createIcons, IconSymbol } from '@/composables/icons'
import { createDisplay, DisplaySymbol } from '@/composables/display'

// 全局通知实例管理
const notifications = ref<Map<string, NotificationInstance>>(new Map())
let seed = 1

// 生成唯一 ID
function generateId(): string {
  return `notification_${seed++}`
}

// 获取当前应用实例的providers（如果存在）
function getAppProviders() {
  try {
    const instance = getCurrentInstance()
    if (instance && instance.appContext) {
      return instance.appContext
    }
  } catch (e) {
    // 忽略错误，使用默认配置
  }
  return null
}

// 创建带有完整providers的Vue应用
function createNotificationApp(component: any, props: any) {
  const app = createApp(component, props)
  
  // 尝试从当前实例获取providers，否则使用默认配置
  const appContext = getAppProviders()
  
  if (appContext) {
    // 复用现有的providers
    app._context.provides = { ...appContext.provides }
  } else {
    // 创建默认的providers
    const defaults = createDefaults({
      global: {},
    })
    app.provide(DefaultsSymbol, defaults)

    const theme = createTheme({
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            background: '#FFFFFF',
            surface: '#FFFFFF',
            primary: '#2196F3',
            secondary: '#54B6B2',
            error: '#F44336',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
          },
        },
        dark: {
          dark: true,
          colors: {
            background: '#121212',
            surface: '#212121',
            primary: '#2196F3',
            secondary: '#54B6B2',
            error: '#CF6679',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          },
        },
      },
    })
    app.provide(ThemeSymbol, theme)

    const locale = createLocale({
      locale: 'zh-CN',
      fallback: 'en',
      messages: {},
      rtl: {
        'zh-CN': false,
        en: false,
      },
    })
    app.provide(LocaleSymbol, locale)

    const icons = createIcons({
      defaultSet: 'mdi',
      sets: {},
      aliases: {},
    })
    app.provide(IconSymbol, icons)

    const display = createDisplay({
      mobileBreakpoint: 'lg',
      thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        xxl: 2560,
      },
    })
    app.provide(DisplaySymbol, display)
  }
  
  return app
}

// 计算通知的垂直偏移量
function getVerticalOffset(position: string, currentId: string): number {
  let offset = 16
  const isTop = position.includes('top')
  
  for (const [id, instance] of notifications.value) {
    if (id === currentId) break
    
    const element = document.getElementById(`sp-notification-${id}`)
    if (element && element.dataset.position === position) {
      // 使用固定高度，因为此时元素可能还没完全渲染
      const notificationHeight = element.offsetHeight || 80 // 默认高度80px
      offset += notificationHeight + 16
    }
  }
  
  return offset
}

// 创建通知实例
function createNotification(options: NotificationOptions): NotificationInstance {
  const id = generateId()
  const position = options.position || 'top-right'
  
  // 创建容器元素
  const container = document.createElement('div')
  container.id = `sp-notification-${id}`
  container.dataset.position = position
  container.style.cssText = `
    position: fixed;
    z-index: 2001;
    pointer-events: none;
  `
  document.body.appendChild(container)

  // 创建 Vue 应用实例，包含完整的providers
  const app = createNotificationApp(SPNotification, {
    ...options,
    id,
    visible: true,
    offset: 16, // 初始偏移量，后面会重新计算
    onClose: () => {
      close()
      options.onClose?.()
    },
    onClick: () => {
      options.onClick?.()
    },
    'onUpdate:visible': (visible: boolean) => {
      // Visibility changed
    }
  })

  // 挂载组件
  const vm = app.mount(container)
  
  // 关闭函数
  function close() {
    if (notifications.value.has(id)) {
      notifications.value.delete(id)
      
      // 延迟销毁，等待动画完成
      setTimeout(() => {
        try {
          app.unmount()
          document.body.removeChild(container)
        } catch (e) {
          // 忽略重复移除的错误
        }
        
        // 重新计算其他通知的位置
        updatePositions(position)
      }, 300)
    }
  }

  // 创建实例对象
  const instance: NotificationInstance = {
    id,
    close
  }

  notifications.value.set(id, instance)
  
  // 立即更新位置，确保DOM已渲染
  nextTick(() => {
    updatePositions(position)
  })

  return instance
}

// 更新同位置通知的偏移量
function updatePositions(position: string) {
  let offset = 16
  const elementsToUpdate: { element: HTMLElement, notificationEl: HTMLElement, id: string }[] = []
  
  // 收集需要更新的元素
  for (const [id, instance] of notifications.value) {
    const element = document.getElementById(`sp-notification-${id}`)
    if (element && element.dataset.position === position) {
      const notificationEl = element.querySelector('.sp-notification') as HTMLElement
      if (notificationEl) {
        elementsToUpdate.push({ element, notificationEl, id })
      }
    }
  }
  
  // 逐个更新位置
  elementsToUpdate.forEach(({ element, notificationEl, id }, index) => {
    const [vertical] = position.split('-')
    notificationEl.style[vertical as 'top' | 'bottom'] = `${offset}px`
    
    // 使用固定高度或实际高度
    const height = element.offsetHeight || 80
    offset += height + 16
  })
}

// 主要的通知API函数
export function notify(options: NotificationOptions | string): NotificationInstance {
  if (typeof options === 'string') {
    options = { message: options }
  }
  
  return createNotification(options)
}

// 便捷方法
notify.success = (options: NotificationOptions | string): NotificationInstance => {
  const opts = typeof options === 'string' ? { message: options } : options
  return notify({ ...opts, type: 'success' })
}

notify.warning = (options: NotificationOptions | string): NotificationInstance => {
  const opts = typeof options === 'string' ? { message: options } : options
  return notify({ ...opts, type: 'warning' })
}

notify.info = (options: NotificationOptions | string): NotificationInstance => {
  const opts = typeof options === 'string' ? { message: options } : options
  return notify({ ...opts, type: 'info' })
}

notify.error = (options: NotificationOptions | string): NotificationInstance => {
  const opts = typeof options === 'string' ? { message: options } : options
  return notify({ ...opts, type: 'error' })
}

// 关闭所有通知
notify.closeAll = (): void => {
  for (const [id, instance] of notifications.value) {
    instance.close()
  }
}

// 关闭指定类型的通知
notify.closeAllOfType = (type: NotificationType): void => {
  for (const [id, instance] of notifications.value) {
    const element = document.getElementById(`sp-notification-${id}`)
    if (element && element.querySelector(`.sp-notification--${type}`)) {
      instance.close()
    }
  }
}

// 组合式函数
export function useNotification() {
  return {
    notify,
    success: notify.success,
    warning: notify.warning,
    info: notify.info,
    error: notify.error,
    closeAll: notify.closeAll,
    closeAllOfType: notify.closeAllOfType,
  }
}

// Vue 插件安装函数
export function install(app: VueApp) {
  // 添加全局属性
  app.config.globalProperties.$notify = notify
  app.config.globalProperties.$notification = {
    success: notify.success,
    warning: notify.warning,
    info: notify.info,  
    error: notify.error,
    closeAll: notify.closeAll,
  }
  
  // 提供注入
  app.provide('$notify', notify)
}

// 默认导出
export default {
  install,
  notify,
}