# progresslinear 条形进度条

条形进度条组件用于显示任务的进度状态，支持确定进度和不确定进度两种模式。

## 基本用法

通过 `v-model` 设置进度值（0-100）。

:::progresslinear/basic

## 不确定进度

使用 `indeterminate` 属性显示不确定的加载状态。

:::progresslinear/indeterminate

## 不同高度

通过 `height` 属性自定义进度条高度。

:::progresslinear/height

## 缓冲区

使用 `buffer-value` 属性显示缓冲进度，适用于视频加载等场景。

:::progresslinear/buffer

## 交互式

动态调整进度值，支持条纹样式和圆角。

:::progresslinear/interactive

## API

### Props
:::api/progresslinear/props

### Events
:::api/progresslinear/events

### Slots
:::api/progresslinear/slots