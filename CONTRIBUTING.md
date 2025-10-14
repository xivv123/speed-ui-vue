# 贡献指南

感谢你考虑为 Speed UI 做出贡献！

## 🚀 快速开始

### 环境要求

- Node.js >= 18.17.0
- pnpm >= 8.7.0

### 安装依赖

```bash
# 克隆仓库
git clone https://github.com/xivv123/speed-ui.git
cd speed-ui

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

## 📝 开发流程

### 1. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 2. 开发组件

```bash
# 启动 playground 开发环境
pnpm dev

# 启动文档站点
pnpm docs:dev

# 构建组件库
pnpm build:ui
```

### 3. 代码规范

```bash
# 格式化代码
pnpm format

# 检查代码
pnpm lint

# 类型检查
pnpm typecheck
```

### 4. 提交代码

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能
git commit -m "feat: 添加新组件 SPButton"

# 修复
git commit -m "fix: 修复 SPInput 的样式问题"

# 文档
git commit -m "docs: 更新 README"

# 样式
git commit -m "style: 格式化代码"

# 重构
git commit -m "refactor: 重构 SPSelect 组件"

# 性能
git commit -m "perf: 优化 SPTable 渲染性能"

# 测试
git commit -m "test: 添加 SPButton 单元测试"
```

### 5. 提交 Pull Request

1. Push 到你的分支
2. 在 GitHub 上创建 Pull Request
3. 等待 Code Review
4. 根据反馈修改
5. 合并到主分支

## 🧪 测试

```bash
# 运行所有测试
pnpm test

# 运行测试覆盖率
pnpm test:coverage

# 监听模式
pnpm test:watch
```

## 📦 发布流程

```bash
# 创建 changeset
pnpm changeset

# 更新版本
pnpm changeset:version

# 发布
pnpm changeset:publish
```

## 🎨 组件开发规范

### 文件结构

```
SPButton/
├── SPButton.tsx        # 组件实现
├── props.ts            # Props 定义
├── types.ts            # 类型定义
├── index.ts            # 导出
├── SPButton.scss       # 样式
└── __tests__/          # 测试
    └── SPButton.spec.ts
```

### 命名规范

- 组件名：PascalCase (SPButton)
- 文件名：PascalCase (SPButton.tsx)
- Props：camelCase (buttonType)
- 事件：on + PascalCase (onClick)

### 代码风格

- 使用 TypeScript
- 使用 Vue 3 Composition API
- 使用 JSX/TSX
- 遵循 ESLint 规则

## 📚 文档规范

### 组件文档结构

```markdown
# 组件名

简短描述

## 基础用法

示例代码

## API

### Props
### Events
### Slots
### Methods
```

## 🐛 报告 Bug

请使用 [GitHub Issues](https://github.com/xivv123/speed-ui/issues) 报告 Bug。

包含以下信息：
- Bug 描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（浏览器、Node 版本等）
- 截图（如果适用）

## 💡 功能建议

欢迎提出新功能建议！请先在 Issues 中讨论。

## 📄 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下发布。

## 🙏 感谢

感谢所有贡献者！
