# loading 加载状态

加载状态组件用于显示页面或区域的加载状态，支持全屏和局部两种模式。

## 基本用法

通过 `v-model` 控制加载状态的显示
:::loading/basic

## 局部加载

通过 `absolute` 和 `contained` 属性限制在特定区域内
:::loading/local

## 确定进度

通过 `progress` 属性设置具体的进度值，需要设置 `indeterminate` 为 `false`
:::loading/progress

## 自定义样式

可以自定义加载指示器的颜色、大小、宽度等
:::loading/custom

## 遮罩样式

可以自定义遮罩的颜色和透明度
:::loading/overlay

## API

### Props
:::api/loading/props

### Events
:::api/loading/events

### Slots
:::api/loading/slots