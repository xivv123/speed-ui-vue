<template>
  <div class="component-demo">
    <!-- 组件展示区域 -->
    <div class="demo-showcase">
      <div class="demo-content">
        <slot name="demo"></slot>
      </div>
    </div>
    
    <!-- 描述区域 -->
    <div v-if="$slots.description" class="demo-description">
      <slot name="description"></slot>
    </div>
    
    <!-- 代码展示区域 -->
    <div class="demo-code-wrapper">
      <div class="demo-actions">
        <button 
          class="demo-action-btn"
          @click="toggleCode"
          :title="showCode ? '隐藏代码' : '显示代码'"
        >
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
          {{ showCode ? '隐藏代码' : '显示代码' }}
        </button>
        
        <button 
          class="demo-action-btn"
          @click="copyCode"
          title="复制代码"
        >
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
          {{ copied ? '已复制' : '复制代码' }}
        </button>
      </div>
      
      <div v-show="showCode" class="demo-code">
        <slot name="code"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showCode = ref(false)
const copied = ref(false)

const toggleCode = () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  try {
    const codeElement = document.querySelector('.demo-code pre code')
    if (codeElement) {
      await navigator.clipboard.writeText(codeElement.textContent)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
.component-demo {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.demo-showcase {
  padding: 24px;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-border);
}

.demo-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
}

.demo-description {
  padding: 16px 24px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.demo-code-wrapper {
  position: relative;
}

.demo-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.demo-action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-action-btn:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}

.icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.demo-code {
  background: var(--vp-code-block-bg);
}

.demo-code :deep(pre) {
  margin: 0;
  padding: 16px;
  background: transparent;
}

.demo-code :deep(code) {
  background: transparent;
}
</style>
