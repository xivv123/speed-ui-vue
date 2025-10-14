# radiogroup 单选组

单选组组件用于在一组互斥的选项中选择一个，基于 SPSelctrlGroup 实现。

## 基本用法

使用 `v-model` 控制选中的值，通过 SPRadio 组件定义选项。

:::radiogroup/basic

## 禁用状态

通过 `disabled` 属性禁用单个或全部选项。

:::radiogroup/disabled

## 布局方向

使用 `inline` 属性控制水平或垂直布局。

:::radiogroup/layout

## 自定义颜色

通过 `color` 属性自定义单选按钮的颜色。

:::radiogroup/color

<!-- ## 实际应用

结合实际场景使用单选组。

:::radiogroup/practical -->

## API

### SPRadioGroup Props
:::api/radiogroup/props

### SPRadioGroup Events
:::api/radiogroup/events

### SPRadioGroup Slots
:::api/radiogroup/slots

### SPRadio Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选按钮的值 | `any` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| color | 选中颜色 | `string` | - |
| label | 标签文本 | `string` | - |
| error | 是否为错误状态 | `boolean` | `false` |
| loading | 是否显示加载状态 | `boolean` | `false` |

### SPRadio Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 自定义标签内容 | - |

