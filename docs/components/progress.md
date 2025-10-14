# Progress 进度条指令

`v-progress` 是一个 Vue 指令，用于在元素上显示进度条，支持确定和不确定的进度状态。

## 基础用法

最简单的用法是传递一个数字值作为进度百分比：

:::progress/basic

## 无限进度条

当需要显示不确定的加载状态时，可以传递 `true` 或使用 `indeterminate` 选项：

:::progress/indeterminate

## 自定义颜色和高度

可以通过配置对象自定义进度条的外观：

:::progress/colors

## 带文字提示

进度条可以显示文字提示，并支持自动消失功能：

:::progress/text

## API

### 指令用法

```vue
<!-- 基础用法 -->
<div v-progress="50">内容</div>

<!-- 无限进度条 -->
<div v-progress="true">内容</div>

<!-- 配置对象 -->
<div v-progress="{ value: 75, color: 'blue', height: 6 }">内容</div>
```

### 配置选项

| 属性             | 类型               | 默认值      | 说明                 |
| ---------------- | ------------------ | ----------- | -------------------- |
| `value`          | `number`           | `0`         | 进度值，0-100        |
| `indeterminate`  | `boolean`          | `false`     | 是否为无限进度条     |
| `color`          | `string`           | `'#1976d2'` | 进度条颜色           |
| `height`         | `number \| string` | `3`         | 进度条高度           |
| `text`           | `string`           | -           | 进度条文字提示       |
| `autoDisappear`  | `boolean`          | `true`      | 100%时是否自动消失   |
| `disappearDelay` | `number`           | `500`       | 消失延迟时间（毫秒） |

### 简化用法

```vue
<!-- 数字值 -->
<div v-progress="75">75% 进度</div>

<!-- 布尔值（无限进度条） -->
<div v-progress="true">加载中...</div>

<!-- 字符串（解析为数字） -->
<div v-progress="'50'">50% 进度</div>
```

### 编程式控制

指令还提供了一些方法用于编程式控制：

```javascript
import { SpProgress } from 'speed-ui-vue'

// 设置进度值
SpProgress.set(element, 75)

// 完成进度（设为100%）
SpProgress.finish(element)

// 隐藏进度条
SpProgress.hide(element)

// 显示进度条
SpProgress.show(element, { value: 50, color: 'green' })
```

## 注意事项

1. **定位要求**：使用 `v-progress` 的元素需要设置 `position: relative`，指令会自动处理这个样式。

2. **性能考虑**：进度条使用 CSS 动画，在大量元素上同时使用时请注意性能。

3. **响应式**：进度条会自动适应容器宽度，支持响应式布局。

4. **自动清理**：当组件卸载时，指令会自动清理相关的 DOM 元素和定时器。
