<template>
  <div class="scroll-container" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="scroll-track" :style="{ animationDuration: scrollSpeed + 's' }">
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
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const scrollSpeed = ref(15)
const isPaused = ref(false)
const isHovering = ref(false)

const diagonalComponentItems = reactive([
  { component: 'sp-btn', props: { color: 'primary', variant: 'filled', size: 'medium' }, content: '开始', class: 'diagonal-button' },
  {
    component: 'sp-card',
    props: { title: '示例卡片', subtitle: '斜向展示', elevation: 2, hover: true },
    class: 'diagonal-card',
    cardSlots: {
      title: '斜向卡片',
      text: '展示卡片在滚动区域中的标题、副标题、按钮等',
      actions: [
        { label: '更多', variant: 'text' },
        { label: '操作', variant: 'outlined' }
      ]
    }
  },
  { component: 'sp-tag', props: { color: 'success', pill: false }, content: '标签', class: 'diagonal-tag' },
  { component: 'sp-switch', props: { modelValue: false, label: '开关', color: 'primary' }, content: '', class: 'diagonal-switch' },
  { component: 'sp-checkbox', props: { modelValue: false, label: '复选' }, content: '', class: 'diagonal-checkbox' },
  { component: 'sp-progress-linear', props: { modelValue: 80, color: 'primary', height: 4 }, content: '', class: 'diagonal-progress' },
  { component: 'sp-text-field', props: { modelValue: '输入', label: '文本', variant: 'filled', color: 'secondary' }, content: '', class: 'diagonal-text-field' }
])

const allComponentItems = [
  { component: 'sp-text-field', props: { modelValue: '输入', label: '用户名', variant: 'outlined', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-textarea', props: { modelValue: '这是一段示例文本', label: '备注', rows: 3, variant: 'filled' }, content: '', class: 'scroll-textarea' },
  { component: 'sp-btn', props: { color: 'success', variant: 'elevated', size: 'large' }, content: '确定', class: 'scroll-button' },
  { component: 'sp-slider', props: { modelValue: 65, min: 0, max: 100, step: 5, color: 'error' }, content: '', class: 'scroll-slider' },
  { component: 'sp-switch', props: { modelValue: true, label: '开启', color: 'warning' }, content: '', class: 'scroll-switch' },
  {
    component: 'sp-card',
    props: { title: '展示卡片', subtitle: '卡片示例', elevation: 4, hover: true },
    class: 'scroll-card',
    cardSlots: {
      title: '展示卡片标题',
      text: '标准卡片结构：标题、副标题、按钮区',
      actions: [
        { label: '了解更多', variant: 'text' },
        { label: '立即使用' }
      ]
    }
  },
  ...diagonalComponentItems,

  { component: 'sp-switch', props: { modelValue: true, label: '提醒', color: 'warning' }, content: '', class: 'scroll-switch' },
  { component: 'sp-select', props: { label: '选择器', placeholder: '请选择', variant: 'outlined', color: 'primary', items: ['选项A', '选项B', '选项C'] }, content: '', class: 'scroll-select' },
  { component: 'sp-checkbox', props: { modelValue: true, label: '同意协议' }, content: '', class: 'scroll-checkbox' },
  { component: 'sp-slider', props: { modelValue: 40, min: 0, max: 100, step: 5, color: 'secondary' }, content: '', class: 'scroll-slider' },
  { component: 'sp-progress-linear', props: { modelValue: 60, color: 'success', height: 6 }, content: '', class: 'scroll-progress' },
  { component: 'sp-tag', props: { color: 'warning', pill: true }, content: '标签', class: 'scroll-tag' },
  { component: 'sp-text-field', props: { modelValue: '输入', label: '邮箱', variant: 'outlined', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-text-field', props: { modelValue: '输入', label: '密码', variant: 'solo', color: 'primary' }, content: '', class: 'scroll-text-field' },
  { component: 'sp-btn', props: { color: 'error', variant: 'outlined', size: 'medium' }, content: '取消', class: 'scroll-button' },
  { component: 'sp-btn', props: { color: 'info', variant: 'filled', size: 'small' }, content: '保存', class: 'scroll-button' },
  { component: 'sp-tag', props: { color: 'error', pill: false }, content: '重要', class: 'scroll-tag' },
  { component: 'sp-tag', props: { color: 'info', pill: true }, content: '消息', class: 'scroll-tag' },
  { component: 'sp-checkbox', props: { modelValue: false, label: '记住我' }, content: '', class: 'scroll-checkbox' },
  { component: 'sp-switch', props: { modelValue: false, label: '通知', color: 'success' }, content: '', class: 'scroll-switch' },
  { component: 'sp-progress-linear', props: { modelValue: 35, color: 'warning', height: 5 }, content: '', class: 'scroll-progress' },
  { component: 'sp-slider', props: { modelValue: 70, min: 0, max: 100, step: 10, color: 'primary' }, content: '', class: 'scroll-slider' },
]

// 根据屏幕宽度决定显示的组件数量
const getComponentItems = () => {
  if (typeof window === 'undefined') return allComponentItems
  // 桌面端显示所有组件，手机端显示12个
  return window.innerWidth <= 768 ? allComponentItems.slice(0, 12) : allComponentItems
}

const componentItemsFixed = reactive(getComponentItems())

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

onMounted(() => {
  setTimeout(() => {
    const track = document.querySelector('.scroll-track') as HTMLElement
    track && (track.style.animationPlayState = 'running')
  }, 120)

  // 监听窗口大小变化，动态调整组件数量
  const updateComponents = () => {
    const newItems = getComponentItems()
    componentItemsFixed.splice(0, componentItemsFixed.length, ...newItems)
  }
  
  window.addEventListener('resize', updateComponents)
})
</script>

<style scoped>
.scroll-container {
  width: 100%;
  overflow: hidden;
  background: transparent;
  border: none;
  margin: 12px 0 0;
  position: relative;
  cursor: default;
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

.scroll-container:hover .scroll-track { filter: blur(0); }

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.component-group {
  display: block;
  width: 50%;
  padding: 20px;
  column-width: 300px;
  column-gap: 20px;
  column-fill: balance;
}

.component-item {
  display: inline-block;
  width: 100%;
  margin: var(--stagger, 0px) 0 20px;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  -moz-column-break-inside: avoid;
}

.component-item:nth-child(6n + 1) { --stagger: 6px }
.component-item:nth-child(6n + 2) { --stagger: 12px }
.component-item:nth-child(6n + 3) { --stagger: 4px }
.component-item:nth-child(6n + 4) { --stagger: 10px }
.component-item:nth-child(6n + 5) { --stagger: 2px }
.component-item:nth-child(6n)     { --stagger: 8px }

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
    margin: 0;
    break-inside: auto;
  }
}

/* widths for typical items */
.scroll-text-field { width: 250px; }
.scroll-textarea { width: 300px; }
.scroll-button { min-width: 120px; }
.scroll-card { width: 280px; max-width: 280px; }
.scroll-select { width: 240px; }
.scroll-checkbox { width: 240px; }
.scroll-slider { width: 300px; }
.scroll-progress { width: 320px; }
.scroll-tag { min-width: 80px; }

/* 手机端显示更多行 */
@media (max-width: 768px) {
  .scroll-container {
    max-height: 240px;
    overflow: hidden;
    margin: 8px 0 0;
  }

  .scroll-track {
    filter: blur(3px);
  }

  .component-group {
    padding: 10px;
    gap: 10px;
    display: flex !important;
    flex-wrap: wrap !important;
  }

  .component-item {
    transform: scale(0.75);
    transform-origin: left top;
    flex-shrink: 0;
  }

  /* 缩小组件宽度 */
  .scroll-text-field { width: 140px; }
  .scroll-textarea { width: 180px; }
  .scroll-button { min-width: 70px; width: auto; }
  .scroll-card { width: 160px; max-width: 160px; }
  .scroll-select { width: 140px; }
  .scroll-checkbox { width: 130px; }
  .scroll-slider { width: 170px; }
  .scroll-progress { width: 190px; }
  .scroll-tag { min-width: 55px; width: auto; }
  .scroll-switch { width: 110px; }
  .diagonal-button { min-width: 65px; width: auto; }
  .diagonal-card { width: 150px; max-width: 150px; }
  .diagonal-tag { min-width: 45px; width: auto; }
  .diagonal-switch { width: 100px; }
  .diagonal-checkbox { width: 120px; }
  .diagonal-text-field { width: 130px; }
  .diagonal-progress { width: 160px; }
}
</style>

