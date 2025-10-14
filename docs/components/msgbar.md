# msgbar 消息条

消息条组件用于向用户显示简短的通知消息，通常显示在页面顶部或底部。

## 基本用法

通过 `v-model` 控制消息条的显示和隐藏，使用 `text` 属性设置消息内容。

:::msgbar/basic

## 不同颜色

使用 `color` 属性设置不同类型的消息。

:::msgbar/variants

## 倒计时显示

使用 `timer` 属性显示倒计时进度条，`timeout` 设置自动关闭时间。

:::msgbar/timer

## 操作按钮

通过 `actions` 插槽添加操作按钮，设置 `timeout="-1"` 禁用自动关闭。

:::msgbar/actions

## 多行文本

使用 `multi-line` 或 `vertical` 属性支持更长的消息内容。

:::msgbar/multiline

## API

### Props
:::api/msgbar/props

### Events
:::api/msgbar/events

### Slots
:::api/msgbar/slots
