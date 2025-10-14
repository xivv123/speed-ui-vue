<!-- 从 playground 复制过来的 DemoShowcase 组件，但路径解析会基于 docs 目录 -->
<template>
  <div class="demo-showcase">
    <!-- 演示框架容器 -->
    <div class="showcase-container">
      <!-- 描述区域 -->
      <div class="showcase-description" v-if="finalDescription">
        <div class="description-content">
          <div v-html="finalDescription"></div>
          <button @click="toggleCode" class="action-btn" :title="showCode ? '收起代码' : '查看代码'">
            <ChevronUp v-if="showCode" />
            <Code v-else />
          </button>
        </div>
      </div>

      <!-- 演示区域 -->
      <div class="showcase-demo">
        <!-- 加载骨架：当存在 caseFile 且 case 组件尚未注入时显示 -->
        <div v-if="!caseComponent && props.caseFile" class="demo-skeleton">
          <div class="skeleton-block"></div>
          <div class="skeleton-block small"></div>
        </div>
        <!-- 如果有 case 文件，渲染 case 组件 -->
        <component v-else-if="caseComponent" :is="caseComponent" />
        <!-- 否则使用默认插槽 -->
        <slot v-else name="demo"></slot>
      </div>

      <!-- 代码展示区域 -->
      <div class="showcase-code" v-if="showCode">
        <CodeHighlight :code="finalCodeContent" :language="'vue'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, markRaw, shallowRef } from 'vue'
import CodeHighlight from './CodeHighlight.vue'
import { Code, ChevronUp } from '@vicons/ionicons5'

// 使用 import.meta.glob 预加载所有 case 文件
// 使用相对路径，从当前文件位置向上找到 cases 目录
// 当前文件: docs/.vitepress/theme/components/DemoShowcase.vue
// 目标目录: docs/cases/
// 相对路径: ../../../cases/
const caseModules = import.meta.glob('../../../cases/**/*.case.vue')

// 轻量 deferred 工具，用于向全局注册 pending
function createDeferred<T = any>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

// 全局 pending demos 管理
if (typeof window !== 'undefined' && !(window as any).__pendingDemos) {
  ; (window as any).__pendingDemos = []
}

interface Props {
  title?: string
  description?: string
  codeContent?: string
  caseFile?: string
}

const props = defineProps<Props>()

const showCode = ref(false)
const caseComponent = shallowRef(null) // 使用 shallowRef 避免深度响应式
const caseTitle = ref('')
const caseDescription = ref('')
const caseTemplate = ref('')
const caseScript = ref('')
const caseCodeExample = ref('')

// 当有 caseFile 时，将 pending promise 注册到全局，等待加载完成后 resolve
const deferred = props.caseFile ? createDeferred<boolean>() : null
if (deferred && typeof window !== 'undefined') {
  ; (window as any).__pendingDemos.push(deferred.promise)
}

// 解析 markdown 为 HTML
const parseMarkdown = (text: string) => {
  return text
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><blockquote>/g, '<blockquote>')
    .replace(/<\/blockquote><\/p>/g, '</blockquote>')
    .replace(/<p><ul>/g, '<ul>')
    .replace(/<\/ul><\/p>/g, '</ul>')
}

// 计算最终的标题
const finalTitle = computed(() => {
  return caseTitle.value || props.title || '演示'
})

// 计算最终的描述
const finalDescription = computed(() => {
  if (caseDescription.value) {
    return parseMarkdown(caseDescription.value)
  }
  return props.description
})

// 计算最终的代码内容
const finalCodeContent = computed(() => {
  // 优先使用 caseCodeExample
  if (caseCodeExample.value) {
    return caseCodeExample.value
  }

  // 降级方案：组合template和script
  if (caseTemplate.value) {
    // 保持template原始缩进，不使用 trim()
    const templateLines = caseTemplate.value.split('\n')
    // 只过滤掉开头和结尾的空行，保持原始缩进
    const filteredTemplateLines = templateLines.filter((line, index) => {
      const isFirstEmpty = index === 0 && line.trim() === ''
      const isLastEmpty =
        index === templateLines.length - 1 && line.trim() === ''
      return !(isFirstEmpty || isLastEmpty)
    })

    let result =
      '<template>\n' + filteredTemplateLines.join('\n') + '\n</template>'

    if (caseScript.value) {
      // 保持原始缩进，不使用 trim()
      const scriptLines = caseScript.value.split('\n')
      // 只过滤掉完全空白的行，保持原始缩进
      const filteredScriptLines = scriptLines.filter((line, index) => {
        // 保留中间的空行，只去掉开头和结尾的空行
        const isFirstEmpty = index === 0 && line.trim() === ''
        const isLastEmpty =
          index === scriptLines.length - 1 && line.trim() === ''
        return !(isFirstEmpty || isLastEmpty)
      })

      const scriptStart = '<' + 'script lang="ts">'
      const scriptEnd = '</' + 'script>'
      result =
        result +
        '\n\n' +
        scriptStart +
        '\n' +
        filteredScriptLines.join('\n') +
        '\n' +
        scriptEnd
    }

    return result
  }
  return props.codeContent || ''
})

// 切换代码显示
const toggleCode = () => {
  showCode.value = !showCode.value
}

// 解析 case 文件内容
const parseCaseFile = async () => {
  if (!props.caseFile) return

  try {
    console.log('Trying to load case:', props.caseFile)

    let module: any = null

    // 将 /docs/cases/ 路径转换为相对于当前文件的路径
    // /docs/cases/btngroup/btngroup-basic.case.vue -> ../../../cases/btngroup/btngroup-basic.case.vue
    const relativePath = props.caseFile.replace('/docs/cases/', '../../../cases/')

    const moduleLoader = caseModules[relativePath]
    if (moduleLoader) {
      console.log('Found in glob, loading...')
      module = await moduleLoader()
    } else {
      console.log('Not found in glob')
      console.log('Requested:', props.caseFile)
      console.log('Converted to:', relativePath)
      console.log('Available:', Object.keys(caseModules).slice(0, 5))
      // 如果找不到，尝试动态导入（开发环境降级方案）
      try {
        module = await import(/* @vite-ignore */ props.caseFile)
      } catch (importError) {
        console.error('Dynamic import also failed')
        throw importError
      }
    }

    if (!module || !module.default) {
      throw new Error('Module loaded but no default export found')
    }

    // 使用 markRaw 防止组件被转换为响应式对象
    caseComponent.value = markRaw(module.default)

    const metadata = module.default?.__caseMetadata

    if (metadata) {
      caseTitle.value = metadata.title || ''
      caseDescription.value = metadata.description || ''
      caseTemplate.value = metadata.template || ''
      caseScript.value = metadata.script || ''
      caseCodeExample.value = metadata.codeExample || ''
    } else {
      caseTitle.value = 'Demo'
      caseDescription.value = '演示组件'
      caseTemplate.value = ''
      caseScript.value = ''
      caseCodeExample.value = ''
    }
  } catch (error) {
    console.error('Failed to parse case file:', error)
    // 设置错误状态，避免无限加载
    caseTitle.value = 'Error'
    caseDescription.value = '加载失败'
  }
}

onMounted(() => {
  if (props.caseFile) {
    ; (parseCaseFile() as Promise<any>).finally(() => {
      try {
        deferred?.resolve(true)
      } catch { }
    })
  } else {
    try {
      deferred?.resolve(true)
    } catch { }
  }
})
</script>

<style scoped>
.demo-showcase {
  margin-bottom: 32px;
}

.showcase-container {
  border: 1px solid var(--vp-c-divider);
  overflow: visible;
  background: var(--vp-c-bg);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  /* border: 1px solid var(--vp-c-divider); */
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
  flex-shrink: 0;
}

.action-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.action-btn:active {
  color: var(--vp-c-text-2);
  border-color: var(--vp-c-divider);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.showcase-description {
  padding: 16px 24px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.description-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.description-content blockquote {
  margin: 8px 0;
  padding: 8px 16px;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-2);
  font-style: italic;
}

.description-content blockquote p {
  margin: 0;
}

.showcase-demo {
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
  min-height: 80px;
  background: var(--vp-c-bg);
  position: relative;
  z-index: 1;
  overflow: visible;
}

.showcase-code {
  border-top: 1px solid var(--vp-c-divider);
  animation: slideDown 0.3s ease-out;
}

/* 骨架屏样式 */
.demo-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.skeleton-block {
  height: 56px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f2f3f5 25%, #e9ecef 37%, #f2f3f5 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.skeleton-block.small {
  height: 20px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0 50%
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }

  to {
    opacity: 1;
    max-height: 500px;
  }
}

@media (max-width: 768px) {
  .showcase-demo {
    padding: 20px 16px;
  }

  .description-content {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .action-btn {
    align-self: flex-start;
  }
}
</style>
