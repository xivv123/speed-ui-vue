# 主题定制

Speed UI 提供了灵活的主题定制系统，你可以轻松地自定义组件的外观以匹配你的品牌风格。

### CSS 变量

所有的主题变量都以 CSS 自定义属性的形式提供：

```css
:root {
  /* 主色调 */
  --sp-color-primary: #1976d2;
  --sp-color-primary-light: #42a5f5;
  --sp-color-primary-dark: #1565c0;
  
  /* 功能色 */
  --sp-color-success: #4caf50;
  --sp-color-warning: #ff9800;
  --sp-color-error: #f44336;
  --sp-color-info: #2196f3;
  
  /* 中性色 */
  --sp-color-text-primary: #212121;
  --sp-color-text-secondary: #757575;
  --sp-color-text-disabled: #bdbdbd;
  
  /* 背景色 */
  --sp-color-background: #ffffff;
  --sp-color-background-soft: #f5f5f5;
  --sp-color-background-mute: #fafafa;
  
  /* 边框 */
  --sp-color-border: #e0e0e0;
  --sp-color-border-hover: #bdbdbd;
  
  /* 尺寸 */
  --sp-size-small: 24px;
  --sp-size-medium: 32px;
  --sp-size-large: 40px;
  
  /* 圆角 */
  --sp-border-radius-small: 4px;
  --sp-border-radius-medium: 6px;
  --sp-border-radius-large: 8px;
  
  /* 间距 */
  --sp-spacing-xs: 4px;
  --sp-spacing-sm: 8px;
  --sp-spacing-md: 16px;
  --sp-spacing-lg: 24px;
  --sp-spacing-xl: 32px;
  
  /* 字体 */
  --sp-font-size-xs: 12px;
  --sp-font-size-sm: 14px;
  --sp-font-size-md: 16px;
  --sp-font-size-lg: 18px;
  --sp-font-size-xl: 20px;
  
  /* 阴影 */
  --sp-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --sp-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.12);
  --sp-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.12);
}
```

## 自定义主题

### 方法一：覆盖 CSS 变量

最简单的方式是在你的项目中覆盖 CSS 变量：

```css
/* 在你的全局样式文件中 */
:root {
  /* 自定义主色调 */
  --sp-color-primary: #6366f1;
  --sp-color-primary-light: #818cf8;
  --sp-color-primary-dark: #4f46e5;
  
  /* 自定义圆角 */
  --sp-border-radius-small: 2px;
  --sp-border-radius-medium: 4px;
  --sp-border-radius-large: 6px;
  
  /* 自定义字体 */
  --sp-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 方法二：使用 SCSS 变量

如果你使用 SCSS，可以在导入 Speed UI 样式之前定义变量：

```scss
// theme.scss
$sp-color-primary: #6366f1;
$sp-color-success: #10b981;
$sp-color-warning: #f59e0b;
$sp-color-error: #ef4444;

// 导入 Speed UI 样式
@import 'speed-ui-vue/styles';
```

### 方法三：JavaScript 配置

你也可以通过 JavaScript 动态设置主题：

```typescript
// theme.ts
export const setTheme = (theme: Record<string, string>) => {
  const root = document.documentElement
  
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--sp-${key}`, value)
  })
}

// 使用示例
setTheme({
  'color-primary': '#6366f1',
  'color-success': '#10b981',
  'border-radius-medium': '8px'
})
```

## 暗色主题

Speed UI 内置了暗色主题支持：

```css
/* 暗色主题变量 */
[data-theme="dark"] {
  --sp-color-text-primary: #ffffff;
  --sp-color-text-secondary: #b3b3b3;
  --sp-color-text-disabled: #666666;
  
  --sp-color-background: #121212;
  --sp-color-background-soft: #1e1e1e;
  --sp-color-background-mute: #2a2a2a;
  
  --sp-color-border: #333333;
  --sp-color-border-hover: #555555;
}
```

### 切换暗色主题

```typescript
// 切换到暗色主题
document.documentElement.setAttribute('data-theme', 'dark')

// 切换到亮色主题
document.documentElement.setAttribute('data-theme', 'light')

// 或者移除属性使用默认主题
document.documentElement.removeAttribute('data-theme')
```

### Vue 组合式函数

你可以创建一个组合式函数来管理主题：

```typescript
// composables/useTheme.ts
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'auto'

export const useTheme = () => {
  const theme = ref<Theme>('light')
  
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    
    if (newTheme === 'auto') {
      // 跟随系统主题
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      document.documentElement.setAttribute(
        'data-theme', 
        mediaQuery.matches ? 'dark' : 'light'
      )
    } else {
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  }
  
  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }
  
  return {
    theme,
    setTheme,
    toggleTheme
  }
}
```

## 组件级定制

### 单个组件定制

你可以为特定组件创建自定义样式：

```vue
<template>
  <sp-button class="custom-button">
    自定义按钮
  </sp-button>
</template>

<style scoped>
.custom-button {
  --sp-color-primary: #ff6b6b;
  --sp-border-radius-medium: 20px;
  
  /* 或者直接覆盖样式 */
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  border: none;
  color: white;
}
</style>
```

### 全局组件样式

```css
/* 全局定制所有按钮 */
.sp-button {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 定制特定类型的按钮 */
.sp-button--primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
}
```

## 预设主题

Speed UI 提供了几个预设主题供你选择：

### 默认主题

```typescript
import 'speed-ui-vue/themes/default.css'
```

### Material Design 主题

```typescript
import 'speed-ui-vue/themes/material.css'
```

### Ant Design 主题

```typescript
import 'speed-ui-vue/themes/antd.css'
```

### 自定义预设主题

你可以创建自己的预设主题文件：

```css
/* themes/my-theme.css */
:root {
  /* 品牌色 */
  --sp-color-primary: #6366f1;
  --sp-color-primary-light: #818cf8;
  --sp-color-primary-dark: #4f46e5;
  
  /* 圆角风格 */
  --sp-border-radius-small: 12px;
  --sp-border-radius-medium: 16px;
  --sp-border-radius-large: 20px;
  
  /* 阴影风格 */
  --sp-shadow-sm: 0 2px 8px rgba(99, 102, 241, 0.15);
  --sp-shadow-md: 0 8px 24px rgba(99, 102, 241, 0.15);
  --sp-shadow-lg: 0 16px 40px rgba(99, 102, 241, 0.15);
}
```

## 响应式主题

你可以为不同的屏幕尺寸设置不同的主题变量：

```css
:root {
  --sp-size-medium: 32px;
  --sp-font-size-md: 16px;
}

@media (max-width: 768px) {
  :root {
    --sp-size-medium: 28px;
    --sp-font-size-md: 14px;
  }
}
```

## 主题工具

### 主题生成器

你可以使用在线主题生成器来快速创建自定义主题：

```typescript
// 使用主题生成器 API
import { generateTheme } from '@speed-ui/theme-generator'

const customTheme = generateTheme({
  primaryColor: '#6366f1',
  borderRadius: 'rounded', // 'sharp' | 'rounded' | 'pill'
  colorMode: 'vibrant' // 'muted' | 'vibrant' | 'pastel'
})

// 应用主题
setTheme(customTheme)
```

### 主题验证

确保你的自定义主题符合可访问性标准：

```typescript
import { validateTheme } from '@speed-ui/theme-validator'

const isValid = validateTheme({
  'color-primary': '#6366f1',
  'color-background': '#ffffff'
})

if (!isValid.passed) {
  console.warn('主题验证失败:', isValid.errors)
}
```

## 最佳实践

1. **保持一致性**：确保你的主题变量在整个应用中保持一致
2. **考虑可访问性**：确保颜色对比度符合 WCAG 标准
3. **测试多种场景**：在不同的组件和状态下测试你的主题
4. **使用语义化命名**：为你的自定义 CSS 变量使用有意义的名称
5. **文档化**：为你的团队记录自定义主题的使用方法

## 下一步

- [了解国际化配置](/guide/i18n)
- [查看组件示例](/components/)
- [查看更新日志](/guide/changelog)