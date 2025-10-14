# Speed UI

一个基于 Vue 3 的现代化 UI 组件库，提供丰富的组件和优秀的开发体验。

## ✨ 特性

- 🎨 **现代化设计** - 简洁美观的设计风格
- 🚀 **Vue 3 支持** - 基于 Vue 3 Composition API 开发
- 📦 **开箱即用** - 丰富的组件库，满足大部分业务需求
- 🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 🌍 **国际化** - 内置国际化支持
- 📱 **响应式设计** - 支持各种屏幕尺寸
- ⚡ **按需加载** - 支持 Tree Shaking，减小打包体积

## 📦 安装

```bash
# npm
npm install @speed-ui/ui

# yarn
yarn add @speed-ui/ui

# pnpm
pnpm add @speed-ui/ui
```

## 🚀 快速开始

### 完整引入

```typescript
import { createApp } from 'vue'
import SpeedUI from '@speed-ui/ui'
import '@speed-ui/ui/styles'

const app = createApp(App)
app.use(SpeedUI)
app.mount('#app')
```

### 按需引入

```typescript
import { createApp } from 'vue'
import { SPButton, SPInput } from '@speed-ui/ui'
import '@speed-ui/ui/styles'

const app = createApp(App)
app.use(SPButton)
app.use(SPInput)
app.mount('#app')
```

### 在组件中使用

```vue
<template>
  <div>
    <SPButton type="primary" @click="handleClick">
      点击我
    </SPButton>
    <SPInput v-model="inputValue" placeholder="请输入内容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPButton, SPInput } from '@speed-ui/ui'

const inputValue = ref('')

const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>
```

## 📋 组件列表

### 基础组件
- **Button** - 按钮
- **ButtonGroup** - 按钮组
- **Badge** - 徽标
- **Tag** - 标签
- **TagGroup** - 标签组
- **Divider** - 分割线
- **Space** - 间距

### 表单组件
- **Input** - 输入框
- **TextField** - 文本字段
- **Textarea** - 文本域
- **InputNumber** - 数字输入框
- **Select** - 选择器
- **Cascader** - 级联选择器
- **Checkbox** - 复选框
- **Radio** - 单选框
- **RadioGroup** - 单选框组
- **Switch** - 开关
- **Slider** - 滑块
- **Form** - 表单
- **FormItem** - 表单项

### 数据展示
- **Card** - 卡片
- **List** - 列表
- **Grid** - 栅格
- **Collapse** - 折叠面板
- **Progress** - 进度条
- **ProgressLinear** - 线性进度条
- **ProgressCircular** - 环形进度条

### 导航组件
- **Menu** - 菜单
- **Segmented** - 分段控制器

### 反馈组件
- **Dialog** - 对话框
- **MessageBar** - 消息条
- **Notification** - 通知
- **Loading** - 加载
- **Tooltip** - 文字提示
- **Note** - 提示

### 其他组件
- **Overlay** - 遮罩层
- **Tour** - 漫游式引导
- **Combo** - 组合框

## 🔧 开发

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建组件库
pnpm build:ui

# 运行测试
pnpm test
```

## 📖 文档

访问我们的[在线文档](https://your-docs-url.com)获取更详细的使用说明和示例。

## 🤝 贡献

我们欢迎所有的贡献。请阅读我们的贡献指南了解如何开始。

## 📄 许可证

[MIT License](./LICENSE)

## 🙋‍♂️ 支持

如果你在使用过程中遇到问题，可以通过以下方式获取帮助：

- 提交 [Issue](https://github.com/your-repo/issues)
- 查看 [文档](https://your-docs-url.com)
- 加入我们的社区讨论

---

Made with ❤️ by Speed UI Team