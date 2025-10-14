# SPExpandBtn 优化说明

## 优化内容

### 1. 使用 Web Animations API
- **替代**: CSS transition
- **优势**: 
  - 更精确的动画控制
  - 可以取消正在进行的动画
  - 更流畅的性能表现
  - 避免 CSS transition 的限制

### 2. 添加动画状态管理
- **新增**: `isAnimating` 状态
- **作用**: 防止快速 hover 导致的动画堆叠和冲突
- **效果**: 动画期间忽略新的 hover 事件

### 3. 使用 watch 监听状态变化
- **优势**: 
  - 动画逻辑与事件处理解耦
  - 更清晰的控制流
  - 便于维护和扩展

### 4. 优化资源清理
- **改进**: 
  - 统一的 timer 管理（合并 enterTimer 和 leaveTimer）
  - 添加动画取消机制
  - 组件卸载时清理所有资源

### 5. 简化样式计算
- **移除**: CSS transitionDuration 和 transitionDelay
- **原因**: 动画由 JS 控制，不需要 CSS transition 属性

### 6. 添加动画 class
- **新增**: `sp-expand-btn--animating`
- **用途**: 可以在 CSS 中针对动画状态添加特殊样式

## 性能提升

1. **防止动画冲突**: `isAnimating` 标志防止重复触发
2. **及时取消动画**: 新动画开始前取消旧动画
3. **减少 computed 计算**: 移除不必要的样式计算
4. **使用 cubic-bezier 缓动**: 更自然的动画效果

## 代码结构改进

- ✅ Props 和 Types 拆分到独立文件
- ✅ 更清晰的状态管理
- ✅ 更好的资源清理机制
- ✅ 更易维护的代码结构
