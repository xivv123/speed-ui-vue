# cascader 级联选择器

用于多层级数据的选择，支持单选、多选等多种模式，适用于省市区、组织架构等场景。

## 基础用法

:::cascader/basic

## 多选模式

:::cascader/multiple

## 展开触发方式

:::cascader/trigger

## 尺寸变体

:::cascader/sizes

## 禁用状态

:::cascader/disabled

## API

### Props
:::api/cascader/props

### Events
:::api/cascader/events

### Slots
:::api/cascader/slots

### CascaderOption

```typescript
interface CascaderOption {
  label: string
  value: string | number
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
  [key: string]: any
}
```

### CascaderProps

```typescript
interface CascaderProps {
  expandTrigger?: 'click' | 'hover'
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: (node: any, resolve: (data: CascaderOption[]) => void) => void
  value?: string
  label?: string
  children?: string
  disabled?: string
  leaf?: string
}
```