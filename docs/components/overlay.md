# overlay 遮罩层

遮罩层组件用于创建覆盖页面的浮层，常用于对话框、抽屉等组件的基础。

## 基本用法

通过 `v-model` 控制遮罩层的显示和隐藏。

:::overlay/basic

## 持久化

设置 `persistent` 属性后，点击遮罩外部不会关闭遮罩层。

:::overlay/persistent

## 自定义遮罩

通过 `scrim` 属性自定义遮罩颜色或禁用遮罩。

:::overlay/scrim

## Activator 触发器

使用 `activator` 插槽定义触发器元素。

:::overlay/activator

## 绝对定位

设置 `absolute` 和 `contained` 属性，遮罩层将相对于父容器定位。

:::overlay/absolute

## API

### Props
:::api/overlay/props

### Events
:::api/overlay/events

### Slots
:::api/overlay/slots