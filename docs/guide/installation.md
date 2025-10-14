# 安装

本章节将指导你如何在项目中安装和配置 Speed UI。

## 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js**: >= 16.0.0
- **Vue**: >= 3.3.0
- **TypeScript**: >= 4.9.0 (可选，但推荐)

## 包管理器安装

### npm

```bash
npm install speed-ui-vue
```

### yarn

```bash
yarn add speed-ui-vue
```

### pnpm

```bash
pnpm add speed-ui-vue
```

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import SpeedUI from 'speed-ui-vue'
import 'speed-ui-vue/styles'
import App from './App.vue'

const app = createApp(App)
app.use(SpeedUI)
app.mount('#app')
```

## 按需引入

Speed UI 提供了基于 ES modules 的 tree shaking 功能。

### 手动按需引入

```vue
<template>
  <sp-button type="primary">主要按钮</sp-button>
  <sp-input
    v-model="value"
    placeholder="请输入内容"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { SpButton, SpInput } from 'speed-ui-vue'
  import 'speed-ui-vue/styles'

  const value = ref('')
</script>
```

### 自动按需引入

推荐使用 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现自动按需引入。

#### 安装插件

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

#### 配置 Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { SpeedUIResolver } from 'speed-ui-vue/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [SpeedUIResolver()],
    }),
    Components({
      resolvers: [SpeedUIResolver()],
    }),
  ],
})
```

#### 配置 Webpack

```javascript
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { SpeedUIResolver } = require('speed-ui-vue/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [SpeedUIResolver()],
    }),
    Components({
      resolvers: [SpeedUIResolver()],
    }),
  ],
}
```

## CDN 引入

你可以通过 CDN 的方式来使用 Speed UI，适合快速原型开发。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Speed UI CDN 示例</title>
    <!-- 引入样式 -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/speed-ui-vue/es/ui.css"
    />
  </head>
  <body>
    <div id="app">
      <sp-button type="primary">主要按钮</sp-button>
    </div>

    <!-- 引入 Vue 3 -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <!-- 引入 Speed UI -->
    <script src="https://unpkg.com/speed-ui-vue/lib/index.js"></script>

    <script>
      const { createApp } = Vue
      const { SpeedUI } = window.SpeedUI

      createApp({
        // 你的应用配置
      })
        .use(SpeedUI)
        .mount('#app')
    </script>
  </body>
</html>
```

## TypeScript 支持

Speed UI 使用 TypeScript 编写，提供了完整的类型定义。

### 全局组件类型

如果你使用 Volar，可以在 `tsconfig.json` 中配置全局组件类型：

```json
{
  "compilerOptions": {
    "types": ["speed-ui-vue/global"]
  }
}
```

### 组件类型导入

```typescript
import type { SpButtonProps, SpInputProps } from 'speed-ui-vue'

// 使用组件类型
const buttonProps: SpButtonProps = {
  type: 'primary',
  size: 'large',
}
```

## 开始使用

安装完成后，你就可以开始使用 Speed UI 了！

```vue
<template>
  <div class="demo">
    <sp-button
      type="primary"
      @click="handleClick"
    >
      点击我
    </sp-button>

    <sp-input
      v-model="inputValue"
      placeholder="请输入内容"
      clearable
    />

    <sp-card title="卡片标题">
      <p>这是卡片内容</p>
    </sp-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const inputValue = ref('')

  const handleClick = () => {
    // 按钮点击处理
  }
</script>
```

## 下一步

- [查看所有组件](/components/)
- [了解主题定制](/guide/theming)
- [配置国际化](/guide/i18n)

## 常见问题

### 样式没有生效？

请确保正确引入了样式文件：

```typescript
import 'speed-ui-vue/styles'
```

### TypeScript 类型错误？

请确保安装了正确的 Vue 版本，并在 `tsconfig.json` 中配置了类型：

```json
{
  "compilerOptions": {
    "types": ["speed-ui-vue/global"]
  }
}
```

### 按需引入不生效？

请检查是否正确配置了 `unplugin-vue-components` 和相关的 resolver。
