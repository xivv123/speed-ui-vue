<template>
  <!-- 仅在首页展示 -->
  <div v-if="isHome" class="home-scroll-showcase">
    <!-- 顶部品牌区域：替换为大字报式标题，左文右述 -->
    <div class="hero-top">
      <div class="hero-layout">
        <div class="hero-left">
          <h1 class="hero-headline" aria-label="SPEED UI VUE3 COMPONENT">
            <span class="speed-text">
              <img src="/logos/logo.png" alt="S" class="logo-s" />PEED UI VUE
            </span>
            <span>COMPONENTS</span>
          </h1>
        </div>
        <!-- <div class="hero-right">
          <div class="hero-divider" aria-hidden="true"></div>
          <p class="hero-right-text">极速、优雅、可扩展的 Vue 3 组件库</p>
        </div> -->
      </div>
    </div>

    <!-- 滚动容器 -->
    <div class="scroll-container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <div class="scroll-track" :style="{ animationDuration: scrollSpeed + 's' }">
        <!-- 第一组组件 -->
        <div class="component-group">
          <div class="component-item" v-for="(item, index) in componentItemsFixed" :key="`g1-${index}`">
            <component :is="item.component" v-bind="item.props" :class="item.class">
              <template v-if="item.component === 'sp-card' && item.cardSlots">
                <sp-card-title v-if="item.cardSlots.title">{{ item.cardSlots.title }}</sp-card-title>
                <sp-card-text v-if="item.cardSlots.text">{{ item.cardSlots.text }}</sp-card-text>
                <sp-card-actions v-if="item.cardSlots.actions && item.cardSlots.actions.length">
                  <sp-btn v-for="(btn, i) in item.cardSlots.actions" :key="i" :variant="btn.variant" :color="btn.color">{{ btn.label }}</sp-btn>
                </sp-card-actions>
              </template>
              <template v-else>
                {{ item.content }}
              </template>
            </component>
          </div>
        </div>
        <!-- 第二组组件（用于无缝循环） -->
        <div class="component-group">
          <div class="component-item" v-for="(item, index) in componentItemsFixed" :key="`g2-${index}`">
            <component :is="item.component" v-bind="item.props" :class="item.class">
              <template v-if="item.component === 'sp-card' && item.cardSlots">
                <sp-card-title v-if="item.cardSlots.title">{{ item.cardSlots.title }}</sp-card-title>
                <sp-card-text v-if="item.cardSlots.text">{{ item.cardSlots.text }}</sp-card-text>
                <sp-card-actions v-if="item.cardSlots.actions && item.cardSlots.actions.length">
                  <sp-btn v-for="(btn, i) in item.cardSlots.actions" :key="i" :variant="btn.variant" :color="btn.color">{{ btn.label }}</sp-btn>
                </sp-card-actions>
              </template>
              <template v-else>
                {{ item.content }}
              </template>
            </component>
          </div>
        </div>
      </div>
    </div>

    <!-- 特性卡片区域 -->
    <div class="features-section">
      <div class="features-container">
        <!-- 新版三列卡片（Vue / TS / Material） -->
        <div class="guide-card">
          <div class="guide-top grad-vue">
            <!-- Vue mark -->
            <svg class="guide-illus" viewBox="0 0 128 96" aria-hidden="true">
              <polygon points="64,16 44,16 64,52 84,16" fill="#35495E"/>
              <polygon points="64,24 52,24 64,46 76,24" fill="#41B883"/>
            </svg>
          </div>
          <div class="guide-body">
            <h3 class="guide-title">Vue</h3>
            <p class="guide-desc">Vue 3 组件生态与最佳实践</p>
          </div>
        </div>

        <div class="guide-card">
          <div class="guide-top grad-ts">
            <!-- TypeScript mark -->
            <svg class="guide-illus" viewBox="0 0 128 96" aria-hidden="true">
              <rect x="16" y="16" width="96" height="64" rx="10" fill="#3178C6"/>
              <text x="64" y="58" text-anchor="middle" font-size="40" fill="#fff" font-weight="700">TS</text>
            </svg>
          </div>
          <div class="guide-body">
            <h3 class="guide-title">TypeScript</h3>
            <p class="guide-desc">类型安全、智能提示、健壮工程</p>
          </div>
        </div>

        <div class="guide-card">
          <div class="guide-top grad-google">
            <!-- Google/Material vibe -->
            <svg class="guide-illus" viewBox="0 0 128 96" aria-hidden="true">
              <circle cx="44" cy="48" r="18" fill="#4285F4"/>
              <circle cx="64" cy="48" r="18" fill="#EA4335" opacity="0.9"/>
              <circle cx="84" cy="48" r="18" fill="#34A853" opacity="0.9"/>
            </svg>
          </div>
          <div class="guide-body">
            <h3 class="guide-title">Material 设计语言</h3>
            <p class="guide-desc">Google 指南，舒适、可用与一致性</p>
          </div>
        </div>
        <SPCard class="feature-card" variant="elevated" width="350">
          <sp-card-title>⚡ 高性能</sp-card-title>
          <sp-card-text>
            基于 Vue 3 + TypeScript 构建，采用 Composition API 设计，提供卓越的性能表现和开发体验。
          </sp-card-text>
          <sp-card-text>
            • Tree-shaking 支持，按需加载<br>
            • 虚拟滚动优化长列表<br>
            • 响应式设计，适配各种设备
          </sp-card-text>
          <sp-card-actions>
            <sp-btn variant="text">了解更多</sp-btn>
            <sp-btn>立即体验</sp-btn>
          </sp-card-actions>
        </SPCard>

        <SPCard class="feature-card" variant="elevated" width="350">
          <sp-card-title>🎨 现代设计</sp-card-title>
          <sp-card-text>
            遵循 Material Design 3 设计规范，提供美观且一致的用户界面组件。
          </sp-card-text>
          <sp-card-text>
            • 动态主题系统<br>
            • 深色模式支持<br>
            • 丰富的动画效果
          </sp-card-text>
          <sp-card-actions>
            <sp-btn variant="text">查看主题</sp-btn>
            <sp-btn>设计指南</sp-btn>
          </sp-card-actions>
        </SPCard>

        <SPCard class="feature-card" variant="elevated" width="350">
          <sp-card-title>🛠️ 开发友好</sp-card-title>
          <sp-card-text>
            完整的 TypeScript 支持，详细的文档和示例，让开发变得更加简单高效。
          </sp-card-text>
          <sp-card-text>
            • 完整的类型定义<br>
            • 丰富的组件 API<br>
            • 可定制的主题系统
          </sp-card-text>
          <sp-card-actions>
            <sp-btn variant="text">查看文档</sp-btn>
            <sp-btn>快速开始</sp-btn>
          </sp-card-actions>
        </SPCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value?.layout === 'home')

// 响应式状态
const scrollSpeed = ref(15)
const isPaused = ref(false)
const isHovering = ref(false)

// 斜向滚动状态
const diagonalScrollSpeed = ref(18)
const isDiagonalPaused = ref(false)
const isDiagonalHovering = ref(false)

// 斜向滚动的组件（不同的配色和内容）
const diagonalComponentItems = reactive([
  { component: 'sp-btn', props: { color: 'primary', variant: 'filled', size: 'medium' }, content: '开始', class: 'diagonal-button' },
  {
    component: 'sp-card',
    props: { title: '特色卡片', subtitle: '斜向展示', elevation: 2, hover: true },
    class: 'diagonal-card',
    cardSlots: {
      title: '斜向卡片',
      text: '演示卡片在滚动区域的正确布局：标题、正文、操作区。',
      actions: [
        { label: '详情', variant: 'text' },
        { label: '操作', variant: 'outlined' }
      ]
    }
  },
  { component: 'sp-tag', props: { color: 'success', pill: false }, content: '新功能', class: 'diagonal-tag' },
  { component: 'sp-switch', props: { modelValue: false, label: '斜向开关', color: 'primary' }, content: '', class: 'diagonal-switch' },
  { component: 'sp-checkbox', props: { modelValue: false, label: '斜向选择' }, content: '', class: 'diagonal-checkbox' },
  { component: 'sp-progress-linear', props: { modelValue: 80, color: 'primary', height: 4 }, content: '', class: 'diagonal-progress' },
  { component: 'sp-text-field', props: { modelValue: '斜向输入', label: '斜向字段', variant: 'filled', color: 'secondary' }, content: '', class: 'diagonal-text-field' }
])
// 展示的组件（精简版）
const componentItems = reactive([
  { component: 'sp-text-super', props: { modelValue: '文本输入框', variant: 'solo', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-text-field', props: { modelValue: '文本输入框', label: '用户名', variant: 'outlined', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-textarea', props: { modelValue: '这是一个多行文本域', label: '描述', rows: 3, variant: 'filled' }, content: '', class: 'scroll-textarea' },
  { component: 'sp-btn', props: { color: 'success', variant: 'elevated', size: 'large' }, content: '确认', class: 'scroll-button' },
  {
    component: 'sp-card',
    props: { title: '演示卡片', subtitle: '卡片组件', elevation: 4, hover: true },
    class: 'scroll-card',
    cardSlots: {
      title: '演示卡片标题',
      text: '正确的卡片区域：标题、正文、操作按钮。',
      actions: [
        { label: '了解更多', variant: 'text' },
        { label: '立即体验' }
      ]
    }
  },
  { component: 'sp-switch', props: { modelValue: true, label: '开关组件', color: 'warning' }, content: '', class: 'scroll-switch' },
  { component: 'sp-select', props: { label: '选择器', placeholder: '请选择…', variant: 'outlined', color: 'primary', items: ['选项A', '选项B', '选项C'] }, content: '', class: 'scroll-select' },
  { component: 'sp-checkbox', props: { modelValue: true, label: '我同意协议' }, content: '', class: 'scroll-checkbox' },
  { component: 'sp-slider', props: { modelValue: 40, min: 0, max: 100, step: 5, color: 'secondary' }, content: '', class: 'scroll-slider' },
  { component: 'sp-progress-linear', props: { modelValue: 60, color: 'success', height: 6 }, content: '', class: 'scroll-progress' },
  // { component: 'sp-tag', props: { color: 'warning', pill: true }, content: '热门', class: 'scroll-tag' },
  { component: 'sp-btn', props: { variant: 'elevated', size: 'large' }, content: '确认', class: 'scroll-button' },
  
])

// 修复用：用于首页滚动演示（卡片含标题/正文/操作区）
const componentItemsFixed = reactive([
  { component: 'sp-text-field', props: { modelValue: '文本输入', label: '用户名', variant: 'outlined', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-textarea', props: { modelValue: '这是一个多行文本域', label: '描述', rows: 3, variant: 'filled' }, content: '', class: 'scroll-textarea' },
  { component: 'sp-btn', props: { color: 'success', variant: 'elevated', size: 'large' }, content: '确认', class: 'scroll-button' },
  {
    component: 'sp-card',
    props: { title: '演示卡片', subtitle: '卡片组件', elevation: 4, hover: true },
    class: 'scroll-card',
    cardSlots: {
      title: '演示卡片标题',
      text: '正确的卡片区域：标题、正文、操作按钮。',
      actions: [
        { label: '了解更多', variant: 'text' },
        { label: '立即体验' }
      ]
    }
  },
  ...diagonalComponentItems,

  { component: 'sp-switch', props: { modelValue: true, label: '开关组件', color: 'warning' }, content: '', class: 'scroll-switch' },
  { component: 'sp-select', props: { label: '选择器', placeholder: '请选择', variant: 'outlined', color: 'primary', items: ['选项A', '选项B', '选项C'] }, content: '', class: 'scroll-select' },
  { component: 'sp-checkbox', props: { modelValue: true, label: '我同意协议' }, content: '', class: 'scroll-checkbox' },
  { component: 'sp-slider', props: { modelValue: 40, min: 0, max: 100, step: 5, color: 'secondary' }, content: '', class: 'scroll-slider' },
  { component: 'sp-progress-linear', props: { modelValue: 60, color: 'success', height: 6 }, content: '', class: 'scroll-progress' },
  { component: 'sp-tag', props: { color: 'warning', pill: true }, content: '热门', class: 'scroll-tag' },
  { component: 'sp-text-field', props: { modelValue: '文本输入', label: '用户名', variant: 'outlined', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-text-field', props: { modelValue: '文本输入', label: '用户名', variant: 'solo', color: 'primary' }, content: '', class: 'scroll-text-field' },

])


// 悬停控制动画
const onMouseEnter = () => {
  isHovering.value = true
  const track = document.querySelector('.scroll-track') as HTMLElement
  track && (track.style.animationPlayState = 'paused')
}
const onMouseLeave = () => {
  isHovering.value = false
  const track = document.querySelector('.scroll-track') as HTMLElement
  if (track && !isPaused.value) track.style.animationPlayState = 'running'
}

// 斜向滚动悬停控制
const onDiagonalMouseEnter = () => {
  isDiagonalHovering.value = true
  const track = document.querySelector('.diagonal-scroll-track') as HTMLElement
  track && (track.style.animationPlayState = 'paused')
}
const onDiagonalMouseLeave = () => {
  isDiagonalHovering.value = false
  const track = document.querySelector('.diagonal-scroll-track') as HTMLElement
  if (track && !isDiagonalPaused.value) track.style.animationPlayState = 'running'
}

// 控制动画（保留以备后续扩展）
const toggleAnimation = () => {
  isPaused.value = !isPaused.value
  const track = document.querySelector('.scroll-track') as HTMLElement
  if (!track) return
  track.style.animationPlayState = isPaused.value || isHovering.value ? 'paused' : 'running'
}

// 重置动画（保留以备后续扩展）
const resetAnimation = () => {
  const track = document.querySelector('.scroll-track') as HTMLElement
  if (!track) return
  track.style.animation = 'none'
  setTimeout(() => {
    track.style.animation = `scroll-left ${scrollSpeed.value}s linear infinite`
    track.style.animationPlayState = isPaused.value || isHovering.value ? 'paused' : 'running'
  }, 10)
}


onMounted(() => {
  setTimeout(() => {
    const track = document.querySelector('.scroll-track') as HTMLElement
    track && (track.style.animationPlayState = 'running')

    // 启动斜向滚动动画
    const diagonalTrack = document.querySelector('.diagonal-scroll-track') as HTMLElement
    diagonalTrack && (diagonalTrack.style.animationPlayState = 'running')
  }, 120)
})
</script>

<style scoped>
/* 布局增强：左巨字右说明 */
.hero-layout {
  width: min(1280px, 92vw);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr minmax(240px, 360px);
  column-gap: clamp(16px, 3vw, 28px);
  align-items: start;
}

.hero-top {
  align-items: stretch;
}

.hero-left {
  text-align: left;
}

.hero-headline {
  text-align: left;
  line-height: 0.75;
  /* 降低行高，让文字更修长 */
  letter-spacing: 2px;
  /* 增加字母间距，让文字更修长 */
  font-stretch: condensed;
  /* 让字体更修长 */
}

.hero-right {
  display: grid;
  grid-template-columns: 2px 1fr;
  align-items: start;
  column-gap: 18px;
}

.hero-divider {
  width: 2px;
  height: 100%;
  background: rgba(0, 0, 0, 0.14);
}

.hero-right-text {
  margin: 0;
  color: rgba(20, 30, 50, 0.82);
  font-size: clamp(14px, 2.1vw, 18px);
  line-height: 1.6;
}

/* 移动端：改为单栏，保留左对齐 */
@media (max-width: 768px) {
  .hero-layout {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }

  .hero-right {
    grid-template-columns: 2px 1fr;
  }

  .hero-divider {
    height: auto;
  }
  /* 小屏导航更高时，增加顶部安全区 */
  .hero-top {
    padding-top: calc(var(--vp-nav-height, 72px) + 8px);
  }
}

.home-scroll-showcase {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
}

/* 顶部品牌区域 */
.hero-top {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  /* 根据导航高度留出安全区，避免被头部遮挡 */
  padding: calc(var(--vp-nav-height, 64px) + 12px) 16px 16px;
}

.hero-top::before {
  /* 保留已实现的极光动画背景 */
}

.hero-top::after {
  /* 保留顶部柔和光晕 */
}

/* 巨型标题：三行堆叠，强烈视觉冲击 */
.hero-headline {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* 改为左对齐 */
  text-transform: uppercase;
  text-align: left;
  /* 改为左对齐 */
  font-weight: 900;
  line-height: 1.1;
  /* 增加行高，避免文字重叠 */
  letter-spacing: 4px;
  /* 增加字母间距，让文字更修长 */
  font-stretch: ultra-condensed;
  /* 使用更强的字体压缩 */
  color: #1866ff;
  /* 接近示例图的蓝色，可按需微调 */
  font-size: clamp(40px, 12vw, 172px);
  height: auto;
  /* 增加高度 */
  min-height: clamp(120px, 20vw, 300px);
  /* 设置最小高度，让文字更高 */
}

.hero-headline span {
  display: block;
  transform: scaleX(0.85) scaleY(1.15);
  /* 水平压缩让字母更修长，垂直拉伸让文字更高 */
  transform-origin: left bottom;
  /* 设置变换原点为左下角 */
  margin-bottom: clamp(4px, 1vw, 8px);
  /* 添加底部间距，确保文字不重叠 */
}

/* SPEED文字容器样式 */
.speed-text {
  display: flex !important;
  align-items: baseline;
  gap: 0;
}

/* Logo作为S的替换样式 */
.logo-s {
  height: 0.81em;
  /* 与文字高度一致 */
  width: 0.8em;
  display: inline-block;
  vertical-align: baseline;
  margin-right: -0.05em;
  /* 微调与后续字母的间距 */
  transform: scaleX(0.85) scaleY(0.9);
  /* 保持与文字相同的变形效果 */
  transform-origin: left bottom;
}

/* 移除旧的 logo 样式（不再使用） */
/* .hero-logo-wrap, .hero-logo, .brand-title, .brand-subtitle { } */

/* 其他样式保持不变 */
.brand-title {
  margin: 0;
  font-size: clamp(28px, 4.6vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0.3px;
  background: linear-gradient(92deg, #ffffff 0%, #ddecff 40%, #b4d9ff 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 4px 28px rgba(40, 130, 255, 0.15);
}

.cta-btn {
  transform: translateZ(0);
  box-shadow: 0 10px 26px rgba(40, 130, 255, 0.24);
}

/* 斜向滚动容器 */
.diagonal-scroll-container {
  position: absolute;
  top: 1%;
  right: 1%;
  width: 55%;
  height: 25vh;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transform: rotate(45deg);
  transform-origin: center;
  z-index: 10;
  opacity: 0.8;
  /* 斜向遮罩效果 */
  -webkit-mask-image: linear-gradient(135deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(135deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.diagonal-scroll-track {
  display: flex;
  width: 200%;
  height: 100%;
  animation: scroll-diagonal 18s linear infinite;
  filter: blur(4px);
  transition: filter 0.35s ease-in-out;
  will-change: filter, transform;
  position: relative;
}

/* 悬停时斜向内容变清晰 */
.diagonal-scroll-container:hover .diagonal-scroll-track {
  filter: blur(0);
  opacity: 1;
}

@keyframes scroll-diagonal {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

.diagonal-component-group {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 50%;
  padding: 15px;
  gap: 15px;
}

.diagonal-component-item {
  flex: 0 0 auto;
  margin: 8px;
  transform: scale(0.85);
}

/* 斜向组件样式 */
.diagonal-text-field {
  width: 200px;
}

.diagonal-button {
  min-width: 100px;
}

.diagonal-card {
  width: 220px;
  max-width: 220px;
}

.diagonal-tag {
  min-width: 70px;
}

.diagonal-progress {
  width: 250px;
}

/* 斜向开关样式 */
.diagonal-switch {
  display: flex;
  align-items: center;
  padding: 8px;
  background: transparent !important;
  border-radius: 6px;
}

.diagonal-switch :deep(.sp-selection-control__input) {
  background: transparent !important;
}

.diagonal-switch :deep(.sp-switch__track) {
  background-color: rgba(0, 0, 0, 0.15) !important;
}

.diagonal-switch :deep(.sp-switch__thumb) {
  background-color: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
}

.diagonal-switch :deep(.sp-selection-control--dirty .sp-switch__track) {
  background-color: var(--sp-color-primary, #1866ff) !important;
}

.diagonal-checkbox {
  display: flex;
  align-items: center;
  padding: 8px;
}

/* 滚动容器 */
.scroll-container {
  width: 100%;
  /* height: 52vh; */
  overflow: hidden;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border-radius: 0;
  border: none;
  margin: 12px 0 0;
  /* 原 6px -> 12px：更好的呼吸感 */
  position: relative;
  cursor: default;
  /* 两侧渐隐遮罩，让滚动边缘更高级 */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.scroll-track {
  display: flex;
  width: 200%;
  height: 100%;
  animation: scroll-left 15s linear infinite;
  filter: blur(6px);
  transition: filter 0.35s ease-in-out;
  will-change: filter;
  position: relative;
  z-index: 1;
}

/* 悬停时内容变清晰 */
.scroll-container:hover .scroll-track {
  filter: blur(0);
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

/* 使用多列布局做“瀑布流”，避免同一行被最高项拉伸产生大片留白 */
.component-group {
  display: block;
  width: 50%;
  padding: 20px;
  column-width: 300px; /* 列目标宽度，自动计算列数 */
  column-gap: 20px;
  column-fill: balance; /* 尽量均衡列高 */
}

.component-item {
  display: inline-block;
  width: 100%;
  margin: var(--stagger, 0px) 0 20px; /* 顶部错位 + 纵向间隔 */
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
}

/* 轻微“错位”规则：让列首高度不完全整齐（避免视觉过于工整） */
.component-item:nth-child(6n + 1) { --stagger: 6px }
.component-item:nth-child(6n + 2) { --stagger: 12px }
.component-item:nth-child(6n + 3) { --stagger: 4px }
.component-item:nth-child(6n + 4) { --stagger: 10px }
.component-item:nth-child(6n + 5) { --stagger: 2px }
.component-item:nth-child(6n)     { --stagger: 8px }

/* 移动端还原为整齐布局，避免跳动感 */
@media (max-width: 768px) {
  .component-item { --stagger: 0px }
}

/* 小屏回退到非多列布局，避免多列在变换容器中造成交叠 */
@media (max-width: 1100px) {
  .component-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 16px;
    column-width: auto;
    column-gap: 0;
  }
  .component-item {
    display: block;
    width: auto;
    margin: 0; /* 使用父级 gap 控制间距 */
    break-inside: auto;
  }
}

/* 组件样式 */
.scroll-text-field {
  width: 250px;
}

.scroll-textarea {
  width: 300px;
}

.scroll-button {
  min-width: 120px;
}

.scroll-card {
  width: 280px;
  max-width: 280px;
}

.scroll-select {
  width: 240px;
}

.scroll-checkbox {
  width: 240px;
}

.scroll-slider {
  width: 300px;
}

.scroll-progress {
  width: 320px;
}

.scroll-tag {
  min-width: 80px;
}

/* 修复开关/单选的背景与可见性 */
.scroll-switch {
  display: flex;
  align-items: center;
  padding: 10px;
  background: transparent !important;
  border-radius: 8px;
}

.scroll-switch :deep(.sp-selection-control__input) {
  background: transparent !important;
}

.scroll-switch :deep(.sp-switch__track) {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

.scroll-switch :deep(.sp-switch__thumb) {
  background-color: #ffffff !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
}

.scroll-switch :deep(.sp-selection-control--dirty .sp-switch__track) {
  background-color: var(--sp-color-warning, #ff9800) !important;
}

.scroll-switch :deep(.sp-selection-control--dirty .sp-switch__thumb) {
  background-color: #ffffff !important;
}

/* 响应式 */
@media (max-width: 768px) {
  .home-scroll-showcase {
    width: 100vw;
  }

  .scroll-container {
    height: 42vh;
  }

  .scroll-track {
    filter: blur(4px);
  }

  /* 移动端降低模糊，提升可读性 */

  /* 移动端斜向滚动调整 */
  .diagonal-scroll-container {
    width: 60%;
    height: 30vh;
    top: 1%;
    right: 1%;
    transform: rotate(45deg);
  }

  .diagonal-scroll-track {
    filter: blur(3px);
  }
}

/* 动效偏好：降低或关闭动画 */
@media (prefers-reduced-motion: reduce) {
  .scroll-track {
    animation: none !important;
    filter: none !important;
  }

  .diagonal-scroll-track {
    animation: none !important;
    filter: none !important;
  }
}

/* 特性卡片区域样式 */
.features-section {
  margin-top: 4rem;
  padding: 0 2rem;
}

.features-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

/* 新版首页引导卡片 */
.guide-card {
  background: #ffffff;
  border: 1px solid rgba(15, 18, 24, 0.06);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(15, 18, 24, 0.06);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.guide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(15, 18, 24, 0.12);
}

.guide-top {
  height: 140px;
  margin: 16px 16px 12px;
  border-radius: 12px;
  position: relative;
}

.guide-illus { width: 100%; height: 100%; opacity: .9; }

/* Vue card */
.guide-top.grad-vue { background: linear-gradient(135deg, #7bdcb5 0%, #60a5fa 100%); }
.guide-top.grad-vue::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(60px 60px at 70% 50%, rgba(255,255,255,0.35), transparent 60%),
    radial-gradient(42px 42px at 35% 70%, rgba(255,255,255,0.25), transparent 42%),
    radial-gradient(28px 28px at 20% 35%, rgba(255,255,255,0.2), transparent 28%);
}

/* TS card */
.guide-top.grad-ts { background: linear-gradient(135deg, #60a5fa 0%, #3178C6 100%); }
.guide-top.grad-ts .illus-text { display: none; }

/* Google/Material card */
.guide-top.grad-google { background: linear-gradient(135deg, #d7c8fb 0%, #b1a2f5 100%); }
.guide-top.grad-google::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(48px 48px at 30% 58%, rgba(255,255,255,0.28), transparent 48px),
    radial-gradient(36px 36px at 52% 52%, rgba(255,255,255,0.26), transparent 36px),
    radial-gradient(44px 44px at 74% 56%, rgba(255,255,255,0.24), transparent 44px);
}

.guide-body {
  padding: 0 20px 18px;
}

.guide-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1, #1f2328);
}

.guide-desc {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2, #6b7280);
}

/* 旧 feature-card 隐藏（保留结构，避免大改模板） */
.feature-card {
  display: none !important;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .features-section {
    margin-top: 2rem;
    padding: 0 1rem;
  }

  .features-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
