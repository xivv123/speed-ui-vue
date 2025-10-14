# list 列表

列表组件用于显示一系列有序或无序的数据项，支持多种样式和交互模式。

## 基本用法

通过 `items` 属性传入数据数组快速创建列表。

:::list/basic

## 带图标

通过 `prepend-icon` 和 `append-icon` 属性为列表项添加前置和后置图标。

:::list/icons

## 行数控制

使用 `lines` 属性控制列表项的行数显示，支持单行、双行、三行模式。

:::list/lines

## 可选择列表

使用 `v-model:selected` 实现列表项的选择功能。

:::list/selectable

## 导航列表

使用 `nav` 属性创建导航样式的列表，带有圆角和高亮效果。

:::list/nav

## API

### SPList Props
:::api/list/props

### SPList Events
:::api/list/events

### SPList Slots
:::api/list/slots

### SPListItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | `''` |
| subtitle | 副标题 | `string` | `''` |
| value | 列表项的值 | `any` | - |
| prepend-icon | 前置图标 | `string` | - |
| append-icon | 后置图标 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| active | 是否激活状态 | `boolean` | `false` |

### SPListItem Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 自定义内容 | - |
| prepend | 前置内容 | - |
| append | 后置内容 | - |
| title | 标题内容 | - |
| subtitle | 副标题内容 | - |
