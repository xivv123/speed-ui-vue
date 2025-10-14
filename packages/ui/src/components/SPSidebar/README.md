# SPSidebar 推挤式侧边栏

## 概述

SPSidebar 是一个推挤式侧边栏组件，与 SPDrawer 不同，它不会覆盖在内容上方，而是与内容同层，展开/收起时会平滑地推挤主内容区域。

## 特性

- ✅ 平滑推挤动画
- ✅ 支持左侧/右侧位置
- ✅ Mini 模式（Rail）
- ✅ 永久显示模式
- ✅ 浮动模式（类似 Drawer）
- ✅ 响应式宽度
- ✅ 主题支持
- ✅ 插槽支持

## 基础用法

```vue
<template>
  <div class="app-layout">
    <SPSidebar v-model="isOpen" width="256">
      <template #prepend>
        <div class="logo">Logo</div>
      </template>
      
      <div class="menu">
        <div class="menu-item">首页</div>
        <div class="menu-item">设置</div>
      </div>
      
      <template #append>
        <button @click="isOpen = !isOpen">切换</button>
      </template>
    </SPSidebar>
    
    <div class="main-content">
      主内容区域
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SPSidebar } from '@speed-ui/ui'

const isOpen = ref(true)
</script>
```

## Mini 模式

```vue
<SPSidebar 
  v-model="isOpen" 
  rail 
  :rail-width="72" 
  :width="256"
>
  <!-- 内容 -->
</SPSidebar>
```

## 右侧侧边栏

```vue
<SPSidebar 
  v-model="isOpen" 
  location="right" 
  width="300"
>
  <!-- 内容 -->
</SPSidebar>
```

## 永久显示

```vue
<SPSidebar 
  :model-value="true" 
  permanent 
  width="200"
>
  <!-- 内容 -->
</SPSidebar>
```

## 浮动模式

```vue
<SPSidebar 
  v-model="isOpen" 
  floating 
  elevation="8"
>
  <!-- 内容 -->
</SPSidebar>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modelValue | boolean | true | 是否展开 |
| location | 'left' \| 'right' | 'left' | 位置 |
| rail | boolean | false | 是否启用 Mini 模式 |
| width | number \| string | 256 | 展开时宽度 |
| railWidth | number \| string | 56 | Mini 模式宽度 |
| permanent | boolean | false | 是否永久显示 |
| floating | boolean | false | 是否浮动模式 |
| color | string | - | 文字颜色 |
| bgColor | string | - | 背景颜色 |
| elevation | number | 0 | 阴影等级 |
| rounded | boolean | false | 是否圆角 |
| border | boolean \| string | false | 边框 |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 主要内容 |
| prepend | 顶部内容 |
| append | 底部内容 |

## Events

| 事件 | 参数 | 说明 |
|------|------|------|
| update:modelValue | (value: boolean) | 展开状态变化 |

## 与 SPDrawer 的区别

| 特性 | SPDrawer | SPSidebar |
|------|----------|-----------|
| 层级 | 覆盖层 | 同层 |
| 遮罩 | 有 | 无 |
| 内容行为 | 被遮挡 | 被推挤 |
| 使用场景 | 临时面板 | 持久导航 |
