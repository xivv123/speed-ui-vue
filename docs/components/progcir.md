# progcir 环形进度条

环形进度条组件用于显示任务或操作的完成进度，支持确定进度和不确定进度两种模式。

## 基本用法

通过 `model-value` 设置进度值（0-100），使用默认插槽显示百分比文字。

:::progcir/basic

## 不确定进度

设置 `indeterminate` 属性显示无限循环动画，适用于无法确定具体进度的场景。

:::progcir/indeterminate

## 尺寸

使用 `size` 属性控制进度条的大小。

:::progcir/size

## 线条宽度

通过 `width` 属性自定义圆环的线条宽度。

:::progcir/width

## 交互式进度

结合响应式数据实现动态进度更新。

:::progcir/interactive

## API

### Props
:::api/progcir/props

### Slots
:::api/progcir/slots