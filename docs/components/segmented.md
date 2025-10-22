# segmented 分段控制器

分段控制器用于在多个选项之间进行切换，提供清晰的视觉反馈和流畅的选中动画效果。

## 基本用法
:::segmented/basic

## 不同样式
:::segmented/variants

## 禁用状态
:::segmented/disabled

## 自定义颜色
:::segmented/colors

## API

### Props
:::api/segmented/props

### SegmentedOption

```ts
type SegmentedOption = string | {
  label: string           // 显示文本
  value: any             // 选项值
  disabled?: boolean     // 是否禁用
  baseColor?: string     // 基础颜色
  color?: string         // 自定义颜色
  trueIcon?: any         // 选中时的图标
  falseIcon?: any        // 未选中时的图标
}
```

### Events
:::api/segmented/events