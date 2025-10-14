# menu 菜单

菜单组件用于显示上下文相关的操作列表，可以通过点击或悬停触发。

## 基本用法

通过 `activator` 插槽定义触发器，菜单内容放在默认插槽中。

:::menu/basic

## 触发方式

支持点击触发和悬停触发两种方式。

:::menu/trigger

## 弹出位置

使用 `location` 属性控制菜单的弹出位置。

:::menu/location

## 嵌套菜单

通过嵌套 SPMenu 组件实现多级菜单，子菜单需要设置 `submenu` 属性。

:::menu/nested

## 复杂内容

菜单内容可以包含任意自定义内容，如用户信息、图标等。

:::menu/complex

## API

### Props
:::api/menu/props

### Events
:::api/menu/events

### Slots
:::api/menu/slots
