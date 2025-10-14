import type { Component } from 'vue'

/**
 * 获取渲染标签
 * 
 * 用于处理动态标签渲染，统一类型转换
 * 
 * @param tag - 标签名称或组件
 * @returns 可渲染的标签
 * 
 * @example
 * ```tsx
 * const Tag = getRenderTag(props.tag)
 * return <Tag>content</Tag>
 * ```
 */
export function getRenderTag(tag: string | Component): any {
  return tag as any
}

/**
 * 创建标签 getter
 * 
 * 用于在 setup 中创建一个 computed 或直接返回标签
 * 
 * @param tagGetter - 获取标签的函数
 * @returns 可渲染的标签
 * 
 * @example
 * ```tsx
 * const Tag = createTagGetter(() => props.tag)
 * return () => <Tag>content</Tag>
 * ```
 */
export function createTagGetter(tagGetter: () => string | Component): any {
  return getRenderTag(tagGetter())
}
