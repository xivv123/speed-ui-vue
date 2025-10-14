// Utilities
import { ref, watch, nextTick } from 'vue'
import { deepEqual, wrapInArray } from '@/utils'

// Types
import type { Ref } from 'vue'
import type { ListItem } from '@/composables/list-items'
import type { CascaderOption } from '../types'

export interface UseCascaderPanelsProps {
  multiple?: boolean
  expandTrigger?: 'click' | 'hover'
  valueComparator?: (a: any, b: any) => boolean
  emitPath?: boolean
  returnObject?: boolean
}

export interface UseCascaderPanelsOptions {
  items: Ref<readonly ListItem[]>
  model: Ref<readonly ListItem[]>
  menu: Ref<boolean | undefined>
  emit: (event: 'expand-change', value: any[]) => void
  setModel: (value: ListItem[]) => void
}

export function useCascaderPanels(
  props: UseCascaderPanelsProps,
  options: UseCascaderPanelsOptions
) {
  // 级联面板状态
  const panels = ref<ListItem[][]>([])
  const selectedPath = ref<ListItem[]>([])
  const expandedValues = ref<any[]>([])
  // 存储每个选中项目的完整路径
  const itemPaths = ref<Map<any, ListItem[]>>(new Map())

  // 初始化面板
  function initPanels() {
    panels.value = [options.items.value as any]
    selectedPath.value = []
    expandedValues.value = []

    // 如果有已选中的项目，恢复其路径状态
    if (options.model.value.length > 0) {
      // 取第一个选中项来恢复路径（对于单选模式）
      // 对于多选模式，可以选择最后一个选中的项
      const selectedItem = options.model.value[options.model.value.length - 1]
      const storedPath = itemPaths.value.get(selectedItem.value)

      if (storedPath && storedPath.length > 0) {
        // 恢复选中路径
        selectedPath.value = [...storedPath]

        // 恢复面板状态
        let currentItems = options.items.value
        for (let i = 0; i < storedPath.length - 1; i++) {
          const pathItem = storedPath[i]
          expandedValues.value[i] = pathItem.value

          // 找到对应的子项并添加到面板
          const foundItem = currentItems.find(item =>
            (props.valueComparator || deepEqual)(item.value, pathItem.value)
          )
          if (foundItem && foundItem.children) {
            panels.value[i + 1] = foundItem.children
            currentItems = foundItem.children
          }
        }
      }
    }

    // 不清空itemPaths，保持已选择项的路径信息
  }

  // 处理节点点击
  function onNodeClick(item: ListItem, level: number) {
    if (item.props.disabled) return

    selectedPath.value[level] = item
    selectedPath.value = selectedPath.value.slice(0, level + 1)

    if (item.children && item.children.length > 0) {
      // 有子级的情况
      if (props.expandTrigger === 'click') {
        // click 模式：点击展开子级
        panels.value[level + 1] = item.children
        panels.value = panels.value.slice(0, level + 2)
        expandedValues.value[level] = item.value
        options.emit('expand-change', expandedValues.value.slice())
      } else {
        // hover 模式：点击也可以展开子级
        panels.value[level + 1] = item.children
        panels.value = panels.value.slice(0, level + 2)
        expandedValues.value[level] = item.value
        options.emit('expand-change', expandedValues.value.slice())
      }
    } else {
      // 叶子节点，进行选择
      if (props.multiple) {
        const index = options.model.value.findIndex(selection =>
          (props.valueComparator || deepEqual)(selection.value, item.value)
        )
        if (index === -1) {
          // 添加选择项，同时保存其完整路径
          const fullPath = [...selectedPath.value.slice(0, level + 1)]
          itemPaths.value.set(item.value, fullPath)
          options.setModel([...options.model.value, item])
        } else {
          // 移除选择项，同时清除其路径
          itemPaths.value.delete(item.value)
          const newValue = [...options.model.value]
          newValue.splice(index, 1)
          options.setModel(newValue)
        }
      } else {
        // 单选模式，保存路径
        const fullPath = [...selectedPath.value.slice(0, level + 1)]
        itemPaths.value.clear()
        itemPaths.value.set(item.value, fullPath)
        options.setModel([item])
        nextTick(() => {
          options.menu.value = false
        })
      }
    }
  }

  // 处理悬停展开
  function onNodeHover(item: ListItem, level: number) {
    if (props.expandTrigger !== 'hover' || item.props.disabled) return

    if (item.children && item.children.length > 0) {
      selectedPath.value[level] = item
      selectedPath.value = selectedPath.value.slice(0, level + 1)
      panels.value[level + 1] = item.children
      panels.value = panels.value.slice(0, level + 2)
      expandedValues.value[level] = item.value
      options.emit('expand-change', expandedValues.value.slice())
    }
  }

  // 获取节点完整路径
  function getFullPath(node: ListItem): ListItem[] {
    // 从存储的路径映射中获取完整路径
    const storedPath = itemPaths.value.get(node.value)
    if (storedPath && storedPath.length > 0) {
      return storedPath
    }

    // 如果没有存储的路径，返回节点本身
    return [node]
  }

  // 获取节点路径值数组
  function getNodePath(node: ListItem): any[] {
    // 从存储的路径映射中获取完整路径
    const storedPath = itemPaths.value.get(node.value)
    if (storedPath && storedPath.length > 0) {
      return storedPath.map(item => item.value)
    }

    // 如果没有存储的路径，返回节点本身的值
    return [node.value]
  }

  // 根据路径数组查找项目
  function findItemByPath(path: any[], itemList: ListItem[]): ListItem | null {
    if (path.length === 0) return null

    let currentItems = itemList
    let currentItem: ListItem | null = null

    for (const value of path) {
      currentItem = findItemByValue(value, currentItems)
      if (!currentItem) return null

      if (currentItem.children && currentItem.children.length > 0) {
        currentItems = currentItem.children
      }
    }

    return currentItem
  }

  // 根据值查找项目
  function findItemByValue(value: any, itemList: ListItem[]): ListItem | null {
    for (const item of itemList) {
      if (
        props.valueComparator
          ? props.valueComparator(item.value, value)
          : deepEqual(item.value, value)
      ) {
        return item
      }
      if (item.children) {
        const found = findItemByValue(value, item.children)
        if (found) return found
      }
    }
    return null
  }

  // 构建完整路径为ListItem数组
  function buildFullPath(path: any[], itemList: ListItem[]): ListItem[] {
    const result: ListItem[] = []
    let currentItems = itemList

    for (const value of path) {
      const item = findItemByValue(value, currentItems)
      if (!item) break

      result.push(item)

      if (item.children && item.children.length > 0) {
        currentItems = item.children
      }
    }

    return result
  }

  // 点击selection展开对应层级
  function onSelectionClick(item: ListItem) {
    if (!props.multiple) return // 单选模式不需要此功能

    // 获取该项的完整路径
    const storedPath = itemPaths.value.get(item.value)
    if (!storedPath || storedPath.length === 0) return

    // 恢复选中路径和面板状态
    selectedPath.value = [...storedPath]

    // 重建面板
    panels.value = [options.items.value as any]
    let currentItems = options.items.value

    for (let i = 0; i < storedPath.length - 1; i++) {
      const pathItem = storedPath[i]
      expandedValues.value[i] = pathItem.value

      // 找到对应的子项并添加到面板
      const foundItem = currentItems.find(listItem =>
        (props.valueComparator || deepEqual)(listItem.value, pathItem.value)
      )
      if (foundItem && foundItem.children) {
        panels.value[i + 1] = foundItem.children
        currentItems = foundItem.children
      }
    }

    // 确保菜单打开
    if (!options.menu.value) {
      options.menu.value = true
    }
  }

  // 监听菜单状态
  watch(options.menu, newVal => {
    if (newVal) {
      initPanels()
    }
  })

  return {
    // State
    panels,
    selectedPath,
    expandedValues,
    itemPaths,

    // Methods
    initPanels,
    onNodeClick,
    onNodeHover,
    getFullPath,
    getNodePath,
    findItemByPath,
    findItemByValue,
    buildFullPath,
    onSelectionClick,
  }
}
