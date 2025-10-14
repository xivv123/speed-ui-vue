/**
 * 图标组件类型定义
 */

// 所有可用的图标名称
export type IconName = 
  // 基础图标
  | 'Search'
  | 'Close'
  | 'CloseOutline'
  | 'CloseCircle'
  | 'Checkmark'
  | 'CheckmarkOutline'
  | 'CheckmarkCircle'
  | 'Add'
  | 'AddOutline'
  | 'Remove'
  | 'RemoveOutline'
  
  // 眼睛图标
  | 'Eye'
  | 'EyeOutline'
  | 'EyeOff'
  | 'EyeOffOutline'
  
  // 箭头图标
  | 'ArrowForward'
  | 'ArrowBack'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ChevronForward'
  | 'ChevronBack'
  | 'ChevronUp'
  | 'ChevronDown'
  
  // 位置图标
  | 'Location'
  | 'LocationOutline'
  
  // 刷新图标
  | 'Refresh'
  | 'RefreshOutline'
  
  // 设置图标
  | 'Settings'
  | 'SettingsOutline'
  
  // 用户图标
  | 'Person'
  | 'PersonOutline'
  
  // 通知图标
  | 'Notifications'
  | 'NotificationsOutline'
  
  // 心形图标
  | 'Heart'
  | 'HeartOutline'
  
  // 星形图标
  | 'Star'
  | 'StarOutline'
  
  // 文件图标
  | 'Document'
  | 'DocumentOutline'
  | 'Folder'
  | 'FolderOutline'
  
  // 编辑图标
  | 'Create'
  | 'CreateOutline'
  | 'Trash'
  | 'TrashOutline'
  
  // 媒体图标
  | 'Play'
  | 'PlayOutline'
  | 'Pause'
  | 'PauseOutline'
  | 'Stop'
  | 'StopOutline'
  
  // 网络图标
  | 'Wifi'
  | 'WifiOutline'
  | 'Cloud'
  | 'CloudOutline'
  
  // 其他常用图标
  | 'Home'
  | 'HomeOutline'
  | 'Menu'
  | 'MenuOutline'
  | 'Grid'
  | 'GridOutline'
  | 'List'
  | 'ListOutline'
  | 'Calendar'
  | 'CalendarOutline'
  | 'Time'
  | 'TimeOutline'
  | 'Mail'
  | 'MailOutline'
  | 'Call'
  | 'CallOutline'
  | 'Camera'
  | 'CameraOutline'
  | 'Image'
  | 'ImageOutline'
  | 'Download'
  | 'DownloadOutline'
  | 'Share'
  | 'ShareOutline'
  | 'Copy'
  | 'CopyOutline'
  | 'Cut'
  | 'CutOutline'
  | 'Save'
  | 'SaveOutline'
  | 'Print'
  | 'PrintOutline'
  | 'Filter'
  | 'FilterOutline'
  | 'Warning'
  | 'WarningOutline'
  | 'Information'
  | 'InformationOutline'
  | 'Help'
  | 'HelpOutline'
  | 'Lock'
  | 'LockClosed'
  | 'LockOpen'
  | 'Key'
  | 'KeyOutline';

// 图标组件属性接口
export interface IconProps {
  // 图标名称
  name: IconName
  // 图标大小
  size?: string | number
  // 图标颜色
  color?: string
  // 是否可点击
  clickable?: boolean
  // 是否禁用
  disabled?: boolean
  // 自定义类名
  class?: string | string[] | Record<string, boolean>
  // 自定义样式
  style?: string | Record<string, any>
}

// 图标组件事件接口
export interface IconEmits {
  (e: 'click', event: MouseEvent): void
}

// 图标尺寸预设
export const IconSizes = {
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
} as const

export type IconSize = keyof typeof IconSizes

// 图标颜色预设
export const IconColors = {
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
  default: '#666666',
} as const

export type IconColor = keyof typeof IconColors
