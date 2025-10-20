# expandbtn 展开按钮

鼠标悬停时展开显示更多内容的动画按钮组件，适用于导航菜单、操作面板等场景。

## 基本用法

:::expandbtn/basic

## 不同形状

:::expandbtn/shapes

## 自定义尺寸

:::expandbtn/sizes

## 禁用状态

:::expandbtn/disabled

## API

### Props
:::api/expandbtn/props

### Events
:::api/expandbtn/events

### Slots
:::api/expandbtn/slots

## 使用说明

### 基本特性

展开按钮组件提供了流畅的展开/收起动画效果，主要特性包括：

- 鼠标悬停自动展开
- 支持圆形和矩形两种形状
- 可自定义宽度和动画时长
- 支持禁用状态

### 典型应用场景

1. **导航菜单** - 侧边栏的折叠菜单项
2. **操作面板** - 浮动操作按钮的展开菜单
3. **工具栏** - 可展开的工具按钮

### 最佳实践

1. 收起状态通常显示图标，展开状态显示图标+文字
2. 建议 `collapsed-width` 设置为图标按钮的标准尺寸（40-56px）
3. `expanded-width` 应确保能完整显示文字内容
4. 动画时长建议在 200-400ms 之间，过长会影响体验
