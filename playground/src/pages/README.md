# 组件演示框架使用指南

这个文件夹包含了用于展示组件演示的框架组件，可以帮助您创建美观、一致的组件演示页面。

## 组件结构

### 1. ComponentShowcase.vue
页面级别的容器组件，提供统一的页面布局和样式。

**Props:**
- `pageTitle`: 页面标题
- `pageDescription`: 页面描述（可选）

**使用示例:**
```vue
<template>
  <ComponentShowcase
    page-title="Button 按钮"
    page-description="常用的操作按钮组件"
  >
    <!-- 在这里放置您的演示内容 -->
  </ComponentShowcase>
</template>
```

### 2. DemoShowcase.vue
单个演示区块的容器组件，包含演示区域和代码展示功能。

**Props:**
- `title`: 演示区块标题
- `description`: 演示区块描述（可选）
- `codeContent`: 要展示的代码内容

**Slots:**
- `demo`: 演示内容插槽

**功能:**
- 可展开/折叠代码查看
- 一键复制代码到剪贴板
- 响应式布局

**使用示例:**
```vue
<template>
  <DemoShowcase
    title="基础用法"
    description="基本的按钮用法示例"
    :code-content="codeString"
  >
    <template #demo>
      <n-button type="primary">示例按钮</n-button>
    </template>
  </DemoShowcase>
</template>

<script setup>
const codeString = `<template>
  <n-button type="primary">示例按钮</n-button>
</template>`
</script>
```

## 如何创建新的演示页面

1. 在 `pages` 文件夹中创建新的 `.vue` 文件
2. 导入必要的组件：
   ```ts
   import ComponentShowcase from './ComponentShowcase.vue'
   import DemoShowcase from './DemoShowcase.vue'
   ```
3. 使用框架结构：
   ```vue
   <template>
     <ComponentShowcase
       page-title="您的组件名称"
       page-description="组件描述"
     >
       <DemoShowcase
         title="演示标题"
         description="演示描述"
         :code-content="您的代码字符串"
       >
         <template #demo>
           <!-- 您的演示组件 -->
         </template>
       </DemoShowcase>
     </ComponentShowcase>
   </template>
   ```

## 样式特性

- 现代化的设计风格
- 响应式布局，支持移动端
- 统一的配色方案
- 优雅的交互动画
- 代码高亮显示

## 示例页面

参考 `ButtonDemo.vue` 文件查看完整的使用示例。该文件展示了如何：
- 创建多个演示区块
- 处理交互逻辑
- 组织代码示例字符串
- 使用不同的组件状态展示

## 自定义样式

如果需要自定义样式，可以：
1. 在组件的 `<style scoped>` 中添加特定样式
2. 修改框架组件的 CSS 变量
3. 扩展现有的样式类

这个框架为您提供了一个稳定、美观的基础，让您可以专注于组件功能的展示，而不是演示页面的构建。 