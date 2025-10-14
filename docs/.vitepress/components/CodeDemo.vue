<template>
  <div class="code-demo">
    <!-- 标签页导航 -->
    <div class="demo-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['tab-button', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
      
      <!-- 右侧操作按钮 -->
      <div class="demo-actions">
        <button class="action-btn" @click="toggleConfig" title="配置">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
          </svg>
        </button>
        <button class="action-btn" @click="copyCode" title="复制代码">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
          </svg>
        </button>
        <button class="action-btn" @click="toggleExpand" title="展开/收起">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path v-if="!isExpanded" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
            <path v-else d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 演示区域 -->
    <div class="demo-content">
      <div v-if="activeTab === 'preview'" class="demo-preview">
        <slot name="demo">
          <div class="empty-demo">请在 demo 插槽中添加演示内容</div>
        </slot>
      </div>
      
      <div v-else-if="activeTab === 'code'" class="demo-code">
        <pre><code v-html="highlightedCode"></code></pre>
      </div>
    </div>

    <!-- 配置面板 -->
    <div v-if="showConfig" class="demo-config">
      <div class="config-header">
        <span>配置</span>
        <button @click="showConfig = false" class="close-btn">×</button>
      </div>
      <div class="config-content">
        <slot name="config">
          <div class="config-item">
            <label>
              <input type="text" v-model="configLabel" placeholder="Label">
              <span>Label</span>
            </label>
          </div>
          <div class="config-item">
            <label>
              <input type="checkbox" v-model="configPrependIcon">
              <span>Prepend icon</span>
            </label>
          </div>
          <div class="config-item">
            <label>
              <input type="checkbox" v-model="configClearable">
              <span>Clearable</span>
            </label>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  code?: string
  language?: string
  defaultTab?: 'preview' | 'code'
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: 'vue',
  defaultTab: 'preview'
})

const activeTab = ref(props.defaultTab)
const isExpanded = ref(false)
const showConfig = ref(false)

// 配置项
const configLabel = ref('Label')
const configPrependIcon = ref(false)
const configClearable = ref(false)

const tabs = [
  { key: 'preview', label: 'Default' },
  { key: 'code', label: 'Outlined' }
]

// 简单的代码高亮
const highlightedCode = computed(() => {
  if (!props.code) return ''
  
  let highlighted = props.code
    // HTML 标签
    .replace(/(&lt;\/?)([a-zA-Z-]+)([^&]*?)(&gt;)/g, '<span class="tag">$1$2$3$4</span>')
    // 属性名
    .replace(/(\s)([a-zA-Z-:]+)(=)/g, '$1<span class="attr-name">$2</span>$3')
    // 属性值
    .replace(/(=")([^"]*?)(")/g, '=<span class="attr-value">"$2"</span>')
    // 注释
    .replace(/(&lt;!--.*?--&gt;)/g, '<span class="comment">$1</span>')
  
  return highlighted
})

const toggleConfig = () => {
  showConfig.value = !showConfig.value
}

const copyCode = async () => {
  if (props.code) {
    try {
      await navigator.clipboard.writeText(props.code)
      // 这里可以添加复制成功的提示
    } catch (err) {
      console.error('复制失败:', err)
    }
  }
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.code-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  margin: 16px 0;
}

.demo-tabs {
  display: flex;
  align-items: center;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0 16px;
}

.tab-button {
  padding: 12px 16px;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.tab-button:hover:not(.active) {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.demo-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.demo-content {
  position: relative;
}

.demo-preview {
  padding: 24px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-demo {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.demo-code {
  background: var(--vp-c-bg-soft);
  padding: 16px;
  overflow-x: auto;
  max-height: 400px;
}

.demo-code pre {
  margin: 0;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.demo-code code {
  background: none;
  padding: 0;
  font-size: inherit;
}

/* 代码高亮样式 */
:deep(.tag) {
  color: var(--vp-c-danger-1, #dc2626);
}

:deep(.attr-name) {
  color: var(--vp-c-success-1, #059669);
}

:deep(.attr-value) {
  color: var(--vp-c-brand-1);
}

:deep(.comment) {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.demo-config {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  z-index: 10;
}

.config-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.close-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.config-content {
  padding: 16px;
}

.config-item {
  margin-bottom: 16px;
}

.config-item label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.config-item input[type="text"] {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-radius: 4px;
  font-size: 14px;
}

.config-item input[type="text"]:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--vp-c-brand-1) 20%, transparent);
}

.config-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
}
</style>
