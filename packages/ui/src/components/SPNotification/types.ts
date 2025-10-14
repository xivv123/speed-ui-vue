// Types for SPNotification component

export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export type NotificationPosition = 
  | 'top-right'
  | 'top-left' 
  | 'bottom-right'
  | 'bottom-left'

export interface NotificationOptions {
  title?: string
  message?: string
  type?: NotificationType
  position?: NotificationPosition
  duration?: number
  showClose?: boolean
  offset?: number
  onClick?: () => void
  onClose?: () => void
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  icon?: string
}

export interface SPNotificationProps extends NotificationOptions {
  id?: string
  visible?: boolean
  zIndex?: number
}

export interface NotificationInstance {
  id: string
  close: () => void
}