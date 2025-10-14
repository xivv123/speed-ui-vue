# SPGlobalBanner 全局横幅

用于在页面顶部展示全局通知、广告或重要信息的横幅组件，支持左中右三个区域的内容自定义。

## 基本用法

最简单的全局横幅，展示左中右三个区域的内容。
:::spglobalbanner/basic

## 粘性定位

使用 `sticky` 属性可以让横幅始终固定在页面顶部。
:::spglobalbanner/sticky

## 不同颜色

通过 `bg-color` 属性设置不同的背景颜色主题。
:::spglobalbanner/colors

## 自定义内容

可以在左中右三个区域放置任意内容，包括按钮、图标等。
:::spglobalbanner/custom

## 禁用关闭

设置 `closable` 为 `false` 可以隐藏关闭按钮，用于展示持续性通知。
:::spglobalbanner/noclosable

## API

### Props
:::api/spglobalbanner/props

### Events
:::api/spglobalbanner/events

### Slots
:::api/spglobalbanner/slots

## 使用说明

### 布局结构

SPGlobalBanner 组件提供了三个内容区域：

- **left (默认插槽)**: 左侧区域，通常用于放置 logo、品牌名称或重要标识
- **center**: 中间区域，自动居中，通常用于展示主要信息内容
- **right**: 右侧区域，通常用于放置操作按钮或链接

```vue
<SPGlobalBanner>
  <template #left>
    左侧内容
  </template>
  <template #center>
    中间内容（居中显示）
  </template>
  <template #right>
    右侧内容
  </template>
</SPGlobalBanner>
```

### 粘性定位

启用 `sticky` 属性后，横幅会使用 CSS `position: sticky` 固定在页面顶部，滚动时始终可见：

```vue
<SPGlobalBanner sticky>
  <!-- 内容 -->
</SPGlobalBanner>
```

### 关闭行为

默认情况下，横幅是可关闭的。用户点击关闭按钮后，横幅会隐藏。可以通过 `v-model` 控制显示状态：

```vue
<template>
  <SPGlobalBanner v-model="show">
    <!-- 内容 -->
  </SPGlobalBanner>
  <button @click="show = true">重新显示</button>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>
```

### 最佳实践

1. **内容简洁**: 横幅空间有限，信息应该简洁明了
2. **重要性**: 用于真正重要的全局信息，避免滥用
3. **可关闭性**: 对于非关键信息，应允许用户关闭
4. **颜色使用**: 根据信息类型选择合适的颜色（成功、警告、错误等）
5. **响应式**: 在移动端考虑内容的自适应布局
6. **粘性使用**: 仅在需要持续可见时使用粘性定位，避免遮挡过多内容
