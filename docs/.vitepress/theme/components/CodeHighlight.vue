<template>
  <div class="code-highlight">
    <div class="code-content" v-html="highlightedCode"></div>
    <button @click="copyCode" class="copy-btn" title="复制代码">
      <Copy />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { codeToHtml, createHighlighter } from 'shiki'
import { Copy } from '@vicons/ionicons5'

interface Props {
  code: string
  language?: string
  title?: string
  // theme: 'auto' | shiki theme name; 'auto' follows dark mode
  theme?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  theme: 'auto'
})

const highlighter = ref()
const highlightedCode = ref('')
const isDark = ref(false)

const currentTheme = computed(() => {
  if (props.theme && props.theme !== 'auto') return props.theme
  return isDark.value ? 'vitesse-dark' : 'vitesse-light'
})

// 初始化高亮器
const initHighlighter = async () => {
  try {
    highlighter.value = await createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light', 'github-dark', 'github-light', 'nord', 'material-theme-darker'],
      langs: ['vue', 'typescript', 'javascript', 'html', 'css', 'json', 'bash', 'shell']
    })
    
    highlightCode()
  } catch (error) {
    console.error('初始化代码高亮失败:', error)
    // 降级方案：使用普通的 pre 标签
    highlightedCode.value = `<pre><code>${escapeHtml(props.code)}</code></pre>`
  }
}

// 高亮代码
const highlightCode = () => {
  if (!highlighter.value || !props.code) {
    highlightedCode.value = `<pre><code>${escapeHtml(props.code)}</code></pre>`
    return
  }

  try {
    let html = highlighter.value.codeToHtml(props.code, {
      lang: props.language,
      theme: currentTheme.value
    })
    
    highlightedCode.value = html
    
    // 高亮完成后进行后处理
    postProcessSpComponents()
  } catch (error) {
    console.error('代码高亮失败:', error)
    highlightedCode.value = `<pre><code>${escapeHtml(props.code)}</code></pre>`
  }
}

// HTML 转义
const escapeHtml = (text: string) => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// 复制代码
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch (err) {
    console.error('复制失败:', err)
    // 降级方案：选择文本
    const selection = window.getSelection()
    const range = document.createRange()
    const codeElement = document.querySelector('.code-content pre')
    if (codeElement && selection) {
      range.selectNodeContents(codeElement)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

// 监听代码变化，重新高亮
watch(
  () => [props.code, props.language, currentTheme.value],
  () => {
    if (highlighter.value) highlightCode()
  }
)

// 添加后处理函数来处理sp-组件和template标签的高亮
const postProcessSpComponents = () => {
  nextTick(() => {
    const codeElement = document.querySelector('.code-content')
    if (codeElement) {
      // 直接查找所有span元素并检查其内容
      const spans = codeElement.querySelectorAll('span')
      spans.forEach(span => {
        const text = span.textContent || ''
        
        // 只处理纯标签名，不包含属性的情况
        // 处理 sp- 开头的组件标签名 - 使用按钮的紫色到蓝色渐变
        if (text.match(/^sp-[a-zA-Z0-9-]+$/)) {
          span.style.background = 'linear-gradient(135deg, #753fbf 0%, #4abfd9 100%)'
          span.style.webkitBackgroundClip = 'text'
          span.style.backgroundClip = 'text'
          span.style.webkitTextFillColor = 'transparent'
          span.style.fontWeight = '700'
        }
        
        // 处理纯 template 标签名 - 使用相同的渐变色
        if (text === 'template') {
          span.style.background = 'linear-gradient(135deg, #753fbf 0%, #4abfd9 100%)'
          span.style.webkitBackgroundClip = 'text'
          span.style.backgroundClip = 'text'
          span.style.webkitTextFillColor = 'transparent'
          span.style.fontWeight = '700'
        }
        
        // 处理纯 script 标签名 - 使用相同的渐变色
        if (text === 'script') {
          span.style.background = 'linear-gradient(135deg, #753fbf 0%, #4abfd9 100%)'
          span.style.webkitBackgroundClip = 'text'
          span.style.backgroundClip = 'text'
          span.style.webkitTextFillColor = 'transparent'
          span.style.fontWeight = '700'
        }
      })
    }
  })
}

onMounted(() => {
  const updateDark = () => {
    isDark.value = document.documentElement.classList.contains('dark')
    if (highlighter.value) highlightCode()
  }
  updateDark()
  const mo = new MutationObserver(updateDark)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  initHighlighter().then(() => {
    postProcessSpComponents()
  })
})
</script>

<style scoped>
.code-highlight {
  position: relative;
}

.copy-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
  z-index: 10;
}

.copy-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.copy-btn:active {
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}

.copy-btn svg {
  width: 16px;
  height: 16px;
}

.code-content {
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
  position: relative;
}

/* 覆盖 shiki 的默认样式 */
.code-content :deep(pre) {
  margin: 0 !important;
  border: none;
  padding: 24px !important;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', monospace !important;
  font-size: 16px !important;
  line-height: 1.7 !important;
  background: var(--vp-c-bg) !important;
  font-weight: 500 !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
  font-variant-ligatures: normal !important;
}

.code-content :deep(code) {
  background: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', monospace !important;
}

/* 更强力的选择器来覆盖所有可能的样式 */
.code-content :deep(*) {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', monospace !important;
}

.code-content :deep(span) {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Consolas', monospace !important;
}

/* 行号样式优化 */
.code-content :deep(.line) {
  min-height: 1.7em;
}

/* 自定义滚动条样式 */
.code-content::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.code-content::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft);
  border-radius: 5px;
}

.code-content::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 5px;
  border: 2px solid var(--vp-c-bg-soft);
}

.code-content::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-divider);
}

.code-content::-webkit-scrollbar-corner {
  background: var(--vp-c-bg-soft);
}

/* 代码高亮增强 */
.code-content :deep(.token.keyword) {
  font-weight: 700;
}

.code-content :deep(.token.string) {
  font-style: italic;
  font-weight: 600;
}

/* sp- 开头的组件标签会通过JavaScript动态添加紫色样式 */

/* 渐变色样式类 */
.gradient-text {
  background: linear-gradient(135deg, #753fbf 0%, #4abfd9 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 700 !important;
}

/* 特殊标签渐变效果 */
.code-content :deep(.special-tag) {
  background: linear-gradient(135deg, #753fbf 0%, #4abfd9 100%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: 700 !important;
}

/* 直接通过CSS匹配包含sp-的内容 */
.code-content :deep(span) {
  &:has-text("sp-") {
    color: #753fbf !important;
    font-weight: 700 !important;
  }
}

/* 通过属性选择器匹配 */
.code-content :deep([style*="color: #753fbf"]) {
  color: #753fbf !important;
  font-weight: 700 !important;
}
</style> 
