# Tour 引导漫游组件

SPTour 组件是一个强大的用户引导功能组件，可以帮助新用户快速了解应用的各项功能，提供直观的步骤式引导体验。

## 基础用法

最简单的引导用法，通过按钮触发引导流程。

:::tour/basic

## 子组件方式

使用 `sp-tour-step` 子组件的方式，提供更直观的声明式写法。

:::tour/steps

<!-- ## 配置选项

丰富的配置选项，支持自定义引导的各种行为和样式。

:::tour/config

## 位置配置

支持多种位置配置，灵活控制引导气泡的显示位置。

:::tour/placement

## 事件监听

完整的事件系统，可以监听引导过程中的各种状态变化。

:::tour/events -->

## API

### Props

:::api/tour/props

### TourStep 类型

| 参数           | 说明               | 类型                                                 | 默认值     |
| -------------- | ------------------ | ---------------------------------------------------- | ---------- |
| title          | 步骤标题           | `string`                                             | -          |
| description    | 步骤描述           | `string`                                             | -          |
| target         | 目标元素选择器     | `string \| Element`                                  | -          |
| placement      | 气泡位置           | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| scrollIntoView | 是否滚动到目标元素 | `boolean`                                            | `true`     |
| nextText       | 下一步按钮文本     | `string`                                             | -          |
| prevText       | 上一步按钮文本     | `string`                                             | -          |
| closable       | 是否可关闭         | `boolean`                                            | -          |
| mask           | 是否显示遮罩       | `boolean`                                            | -          |
| arrow          | 是否显示箭头       | `boolean`                                            | -          |

### Events

:::api/tour/events

### Slots

:::api/tour/slots

## sp-tour-step 子组件

### Props

| 参数           | 说明               | 类型                                                 | 默认值     |
| -------------- | ------------------ | ---------------------------------------------------- | ---------- |
| title          | 步骤标题           | `string`                                             | -          |
| description    | 步骤描述           | `string`                                             | -          |
| target         | 目标元素选择器     | `string \| Element`                                  | -          |
| placement      | 气泡位置           | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| scrollIntoView | 是否滚动到目标元素 | `boolean`                                            | `true`     |
| nextText       | 下一步按钮文本     | `string`                                             | -          |
| prevText       | 上一步按钮文本     | `string`                                             | -          |
| closable       | 是否可关闭         | `boolean`                                            | -          |

### Slots

| 插槽名  | 说明     | 参数 |
| ------- | -------- | ---- |
| default | 步骤内容 | -    |
