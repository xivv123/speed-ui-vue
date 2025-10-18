# icon 图标

基于 [xicon](https://www.xicons.org/) 的图标组件，提供统一的图标大小和颜色控制功能，支持多种图标库。

## 基础用法

:::icon/icon-basic

## 图标颜色

:::icon/icon-colors

## 图标大小

:::icon/icon-sizes

## 交互图标

:::icon/icon-interactive

## API

### Props
:::api/icon/props

### Events
:::api/icon/events

## 图标库

推荐使用以下图标库：

- [@vicons/ionicons5](https://www.xicons.org/#/zh-CN/ionicons5) - Ionicons 5 图标
- [@vicons/ionicons4](https://www.xicons.org/#/zh-CN/ionicons4) - Ionicons 4 图标
- [@vicons/antd](https://www.xicons.org/#/zh-CN/antd) - Ant Design 图标
- [@vicons/material](https://www.xicons.org/#/zh-CN/material) - Material Design 图标

### 安装图标库

```bash
# 使用 pnpm
pnpm add @vicons/ionicons5

# 使用 npm
npm install @vicons/ionicons5

# 使用 yarn
yarn add @vicons/ionicons5
```

## 注意事项

1. **图标大小**：建议使用偶数尺寸（16、24、32 等），以保证图标清晰度
2. **颜色继承**：如果不设置 `color` 属性，图标会继承父元素的 `color` 样式
3. **可点击状态**：设置 `clickable` 后，图标会显示指针光标，并且可以触发点击事件
4. **禁用状态**：禁用后图标透明度会降低，且不可点击
5. **性能优化**：图标组件会按需导入，不会影响打包体积
