<div align="center">
  <img src="https://raw.githubusercontent.com/xivv123/speed-ui-vue/master/docs/public/logos/logo.png" alt="Speed UI Logo" width="120" height="120">

# Speed UI

<p align="center">
    基于 Vue 3 + TypeScript + Material Design 3 的现代化组件库
  </p>

<p align="center">
    <a href="https://github.com/xivv123/speed-ui-vue"><img src="https://img.shields.io/github/stars/xivv123/speed-ui-vue?style=flat-square&logo=github" alt="GitHub Stars"></a>
    <a href="https://github.com/xivv123/speed-ui-vue/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"></a>
    <img src="https://img.shields.io/badge/Vue-3.x-brightgreen?style=flat-square&logo=vue.js" alt="Vue 3">
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite" alt="Vite">
  </p>

---

## ✨ 特性

- 🎨 **Material Design 3** - 遵循最新的 Material Design 设计规范
- 💪 **TypeScript** - 完整的类型定义，提供更好的开发体验
- ⚡ **Vite 驱动** - 极速的开发体验和构建速度
- 🎯 **按需加载** - 支持 Tree Shaking，优化包体积
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🌍 **国际化** - 内置多语言支持
- 🎭 **主题定制** - 灵活的主题配置系统
- ♿ **无障碍** - 遵循 WCAG 2.1 标准

## 📦 组件

Speed UI 提供了 **40+ 个高质量组件**，涵盖：

- 🔘 **基础组件** - Button、Card、Divider、Tag 等
- 📝 **表单组件** - TextField、Select、Checkbox、Radio、Switch 等
- 📐 **布局组件** - Grid、Space 等
- 🗂️ **数据展示** - List、Progress、Badge 等
- 💬 **反馈组件** - Dialog、Drawer、Notification、Loading 等
- 🧭 **导航组件** - Menu、Tour 等

查看 [完整组件列表](https://xivv123.github.io/speed-ui-vue/components/)

## 🏗️ 项目结构

```
speed-ui/
├── packages/ui/         # 核心组件库
├── playground/          # 开发演示环境
└── docs/               # 文档
```

## 快速开始

### 安装

```bash
npm install speed-ui-vue
# 或
pnpm add speed-ui-vue
# 或
yarn add speed-ui-vue
```

### 使用

```typescript
// main.ts
import { createApp } from 'vue'
import SpeedUI from 'speed-ui-vue'
import 'speed-ui-vue/es/speed-ui-vue.css'
import App from './App.vue'

const app = createApp(App)
app.use(SpeedUI)
app.mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <SPBtn color="primary">Hello Speed UI</SPBtn>
</template>
```

查看 [完整文档](https://xivv123.github.io/speed-ui-vue/guide/installation) 了解更多

## 🛠️ 本地开发

```bash
# 克隆项目
git clone https://github.com/xivv123/speed-ui-vue.git
cd speed-ui-vue

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 启动文档站点
pnpm docs:dev

# 构建
pnpm build

# 构建文档
pnpm docs:build
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

## 📝 更新日志

查看 [CHANGELOG](./packages/ui/CHANGELOG.md) 了解版本更新历史。

## 📄 许可证

[MIT License](./LICENSE) © 2024 Speed UI Team

---

<div align="center">
  <p>
    <strong>⭐ 如果这个项目对你有帮助，请给我一个 Star！作者：Yanxi</strong>
  </p>