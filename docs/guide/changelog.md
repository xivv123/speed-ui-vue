# 更新日志

本页面记录了 Speed UI 的所有版本更新和变更历史。

## 版本规范

Speed UI 遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向下兼容的功能性新增
- **修订号**：向下兼容的问题修正

## 🚀 v1.0.0 (2024-01-15)

### ✨ 新特性

- 🎉 **首次发布**：Speed UI 正式发布！
- 📦 **完整组件库**：提供 30+ 个常用组件
- 🎨 **主题系统**：支持自定义主题和暗色模式
- 🌍 **国际化**：内置 10+ 种语言支持
- 📱 **响应式设计**：完美适配移动端和桌面端
- ⚡ **TypeScript**：完整的 TypeScript 类型定义
- 🔧 **按需引入**：支持 Tree Shaking，减小打包体积

### 📦 核心组件

#### 基础组件
- `SpButton` - 按钮组件
- `SpButtonGroup` - 按钮组
- `SpCard` - 卡片组件
- `SpDivider` - 分割线
- `SpTag` - 标签组件

#### 布局组件
- `SpGrid` - 栅格系统
- `SpSpace` - 间距组件

#### 表单组件
- `SpInput` - 输入框
- `SpTextarea` - 多行文本框
- `SpSelect` - 选择器
- `SpCombo` - 组合选择器
- `SpForm` - 表单容器
- `SpFormItem` - 表单项
- `SpCascader` - 级联选择器
- `SpSwitch` - 开关
- `SpRadio` - 单选框
- `SpRadioGroup` - 单选组
- `SpCheckbox` - 复选框
- `SpSlider` - 滑块
- `SpBadge` - 徽章
- `SpSegmented` - 分段控制器
- `SpInputNumber` - 数字输入框

#### 导航组件
- `SpMenu` - 菜单

#### 数据展示
- `SpList` - 列表
- `SpProgress` - 进度条（环形）
- `SpProgressLinear` - 进度条（条形）

#### 反馈组件
- `SpDialog` - 对话框
- `SpMessageBar` - 消息条
- `SpTour` - 引导
- `SpTooltip` - 提示框
- `SpCollapse` - 折叠面板
- `SpNotification` - 通知
- `SpLoading` - 加载状态
- `SpOverlay` - 遮罩层
- `SpNote` - 便签

### 🛠️ 开发体验

- **Vite 构建**：基于 Vite 的快速构建系统
- **热重载**：开发时支持组件热重载
- **类型提示**：完整的 IDE 类型提示支持
- **文档站点**：基于 VitePress 的文档系统
- **示例代码**：每个组件都提供丰富的示例

### 📚 文档和工具

- **完整文档**：详细的组件 API 文档
- **在线示例**：可交互的组件示例
- **设计指南**：UI 设计规范和最佳实践
- **主题编辑器**：可视化主题定制工具

---

## 🔄 v0.9.0-beta (2023-12-20)

### ✨ 新特性

- 🎨 **主题系统重构**：全新的 CSS 变量主题系统
- 🌙 **暗色模式**：内置暗色主题支持
- 📱 **移动端优化**：改进移动端交互体验
- 🔧 **构建优化**：减小 30% 的打包体积

### 🐛 问题修复

- 修复 `SpSelect` 在某些情况下的选项显示问题
- 修复 `SpDatePicker` 的日期格式化问题
- 修复 `SpForm` 验证消息的显示位置

### 💔 破坏性变更

- `SpButton` 的 `ghost` 属性重命名为 `variant="outline"`
- 移除了已废弃的 `SpIcon` 组件，请使用图标库

---

## 🔄 v0.8.0-beta (2023-11-15)

### ✨ 新特性

- 🌍 **国际化支持**：新增多语言支持
- 📋 **表单验证**：集成 VeeValidate 表单验证
- 🎯 **无障碍访问**：改进 ARIA 支持和键盘导航
- 🔄 **动画系统**：统一的过渡动画

### 🐛 问题修复

- 修复 `SpModal` 的 z-index 层级问题
- 修复 `SpTable` 的排序功能
- 修复 `SpUpload` 的文件类型验证

---

## 🔄 v0.7.0-beta (2023-10-10)

### ✨ 新特性

- 📊 **数据组件**：新增 `SpTable`、`SpPagination` 组件
- 🎨 **图标系统**：内置图标库
- 🔍 **搜索组件**：新增 `SpAutoComplete` 组件
- 📅 **日期组件**：新增 `SpDatePicker`、`SpTimePicker`

### 🐛 问题修复

- 修复 `SpDropdown` 的定位问题
- 修复 `SpTabs` 的切换动画
- 修复 SSR 兼容性问题

---

## 🔄 v0.6.0-beta (2023-09-05)

### ✨ 新特性

- 🎪 **布局组件**：新增 `SpLayout`、`SpHeader`、`SpSider`、`SpContent`、`SpFooter`
- 🎭 **反馈组件**：新增 `SpAlert`、`SpMessage`、`SpNotification`
- 🎨 **视觉优化**：改进组件视觉设计和交互效果

### 🐛 问题修复

- 修复 `SpInput` 的清除按钮样式
- 修复 `SpSelect` 的多选模式问题
- 修复组件的 TypeScript 类型定义

---

## 🔄 v0.5.0-alpha (2023-08-01)

### ✨ 新特性

- 🎯 **核心组件**：完成基础表单组件开发
- 🎨 **样式系统**：建立设计令牌系统
- 📦 **打包优化**：支持按需引入

### 🐛 问题修复

- 修复组件的默认属性问题
- 修复样式的浏览器兼容性

---

## 🔄 v0.1.0-alpha (2023-07-01)

### ✨ 新特性

- 🎉 **项目初始化**：Speed UI 项目启动
- 🏗️ **基础架构**：建立项目基础架构
- 📦 **构建系统**：配置 Vite 构建系统
- 📚 **文档系统**：搭建 VitePress 文档站点

---

## 🗺️ 路线图

### 🎯 v1.1.0 (计划中)

- 🎨 **可视化主题编辑器**：在线主题定制工具
- 📊 **更多数据组件**：Tree、Transfer、Timeline 等
- 🎪 **高级布局**：Affix、BackTop、Anchor 等
- 🔧 **开发工具**：CLI 工具和代码生成器

### 🎯 v1.2.0 (计划中)

- 📱 **移动端组件**：专门的移动端组件库
- 🎨 **动画库**：丰富的动画效果
- 🔍 **搜索优化**：全文搜索和过滤功能
- 🌐 **CDN 支持**：官方 CDN 服务

### 🎯 v2.0.0 (远期规划)

- ⚡ **性能优化**：虚拟滚动、懒加载等
- 🎨 **设计系统**：完整的设计系统
- 🔧 **插件系统**：可扩展的插件架构
- 🌍 **生态建设**：周边工具和社区建设

---

## 📝 贡献指南

我们欢迎社区贡献！如果你想参与 Speed UI 的开发，请查看我们的[贡献指南](https://github.com/speed-ui/speed-ui/blob/main/CONTRIBUTING.md)。

## 🐛 问题反馈

如果你发现了 bug 或有功能建议，请在 [GitHub Issues](https://github.com/speed-ui/speed-ui/issues) 中提交。

## 📄 许可证

Speed UI 使用 [MIT 许可证](https://github.com/speed-ui/speed-ui/blob/main/LICENSE)。