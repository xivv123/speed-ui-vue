# navigationdrawer 导航抽屉

SPNavigationDrawer 导航抽屉组件是一个功能强大的侧边导航容器，用于显示应用程序的主要导航菜单。支持多种显示模式，包括临时抽屉、永久显示、Rail 模式等，适用于各种布局场景。

## 基本用法

最基本的导航抽屉用法，通过 v-model 控制显示和隐藏。

:::navigationdrawer/basic

## 不同位置

导航抽屉可以从左、右、上、下四个方向显示，通过 location 属性控制。

:::navigationdrawer/location

## 永久显示

使用 permanent 属性创建永久显示的导航抽屉，始终可见并占据布局空间。

:::navigationdrawer/permanent

## Rail 模式

Rail 模式提供紧凑的导航栏，只显示图标，可通过按钮切换展开状态。

:::navigationdrawer/rail

## 悬浮展开

使用 expand-on-hover 属性，鼠标悬浮时自动展开导航抽屉，离开后自动收起为 Rail 模式。

:::navigationdrawer/expand

## 临时抽屉

临时抽屉模式，点击遮罩层可关闭，适合移动端或临时显示的场景。

:::navigationdrawer/temporary

## 自定义宽度

通过 width 属性可以设置不同的抽屉宽度，以适应不同的内容需求。

:::navigationdrawer/width

## 切换按钮

使用 on-off 属性显示切换按钮，方便用户控制导航抽屉的显示和隐藏。

:::navigationdrawer/toggle

## API

### Props

:::api/navigationdrawer/props

### Events

:::api/navigationdrawer/events

### Slots

:::api/navigationdrawer/slots

## 使用说明

### 显示模式

NavigationDrawer 组件支持三种主要的显示模式：

1. **临时模式 (temporary)**: 浮动在内容之上，带有遮罩层，点击遮罩层可关闭
2. **永久模式 (permanent)**: 始终可见，占据布局空间，主内容区域会自动调整
3. **Rail 模式 (rail)**: 紧凑模式，只显示图标，可配合 expand-on-hover 实现悬浮展开

### 布局集成

NavigationDrawer 需要配合 SPLayout 和 SPLayoutMain 组件使用，以实现正确的布局效果：

```vue
<sp-layout>
  <sp-navigation-drawer v-model="drawer" permanent>
    <!-- 导航内容 -->
  </sp-navigation-drawer>

  <sp-layout-main>
    <!-- 主要内容 -->
  </sp-layout-main>
</sp-layout>
```

### 位置选项

通过 location 属性可以设置抽屉从哪个方向显示：

- `start` / `left`: 从左侧显示（默认）
- `end` / `right`: 从右侧显示
- `top`: 从顶部显示
- `bottom`: 从底部显示

### 响应式行为

组件会根据屏幕尺寸自动调整行为：

- 在移动设备上（mobile 为 true 时），导航抽屉会自动切换为临时模式
- 可以通过 disable-resize-watcher 属性禁用这个自动行为

### 最佳实践

1. **使用永久模式**：桌面端应用推荐使用 permanent 模式，提供稳定的导航体验
2. **使用临时模式**：移动端或需要最大化内容空间时使用 temporary 模式
3. **使用 Rail 模式**：需要节省空间同时保持导航可见时使用 rail 模式
4. **悬浮展开**：配合 rail 和 expand-on-hover 使用，提供良好的交互体验
5. **切换按钮**：使用 on-off 属性为用户提供明确的控制方式
