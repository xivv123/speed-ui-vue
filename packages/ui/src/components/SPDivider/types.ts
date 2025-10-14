export type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'height' | 'width'

export type DividerStyles = Partial<Record<DividerKey, string>>

export interface SPDividerSlots {
  default?: () => any
}

export interface SPDividerEvents {
  // 可以在这里添加事件类型定义
}