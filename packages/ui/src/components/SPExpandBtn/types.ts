// Types
export type SPExpandBtnSlots = {
  collapsed: never
  expanded: never
}

export interface SPExpandBtnProps {
  collapsedWidth?: number | string
  expandedWidth?: number | string
  duration?: number
  disabled?: boolean
  shape?: 'circle' | 'rectangle'
}

export type SPExpandBtnShape = 'circle' | 'rectangle'
