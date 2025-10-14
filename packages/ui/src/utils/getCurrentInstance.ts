// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue'
import { toKebabCase } from './helpers'

export function getCurrentInstance (name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    throw new Error(`[Speed] ${name} ${message || 'must be called from inside a setup function'}`)
  }

  return vm
}

export function getCurrentInstanceName (name = 'composables') {
  const vm = getCurrentInstance(name).type
  const componentName = (vm as any)?.aliasName || vm?.name
  
  // 特殊处理 SP 开头的组件，将 SPList 转换为 sp-list 而不是 s-p-list
  if (componentName && componentName.startsWith('SP')) {
    return componentName.replace(/^SP/, 'sp-').replace(/([A-Z])/g, '-$1').toLowerCase()
  }
  
  return toKebabCase(componentName)
}