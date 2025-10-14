<template>
  <div class="api-table-wrapper">
    <table v-if="apiData && apiData.length > 0" class="api-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in apiData" :key="index">
          <td v-for="col in columns" :key="col" v-html="formatCell(row[col])"></td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty-state">
      暂无数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  apiFile?: string
  title?: string
  type?: 'props' | 'events' | 'slots'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'props'
})

const apiData = ref<any[]>([])

// 根据类型定义不同的列
const columns = computed(() => {
  switch (props.type) {
    case 'props':
      return ['参数', '说明', '类型', '默认值']
    case 'events':
      return ['事件名', '说明', '回调参数']
    case 'slots':
      return ['插槽名', '说明', '作用域参数']
    default:
      return ['参数', '说明', '类型', '默认值']
  }
})

// 格式化单元格内容，支持代码高亮
const formatCell = (value: any) => {
  if (!value) return '-'

  const str = String(value)

  // 高亮代码块（用反引号包裹的内容）
  return str.replace(/`([^`]+)`/g, '<code>$1</code>')
}

// 加载 API 数据
const loadApiData = async () => {
  if (!props.apiFile) return

  try {
    const module = await import(/* @vite-ignore */ props.apiFile)
    apiData.value = module.default || []
  } catch (error) {
    console.error('Failed to load API file:', error)
    apiData.value = []
  }
}

onMounted(() => {
  loadApiData()
})
</script>

<style scoped>
.api-table-wrapper {
  margin: 16px 0;
  overflow-x: auto;
  width: 100%;
}

.api-table {
  width: auto;
  min-width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.7;
  table-layout: auto;
}

.api-table thead {
  background: var(--vp-c-bg-soft);
}

.api-table th {
  padding: 10px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  white-space: nowrap;
}

.api-table td {
  padding: 10px 16px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

/* 第一列（参数名）保持紧凑 */
.api-table td:first-child,
.api-table th:first-child {
  white-space: nowrap;
  width: 1%;
}

/* 第二列（说明）可以换行 */
.api-table td:nth-child(2),
.api-table th:nth-child(2) {
  white-space: normal;
  min-width: 150px;
}

/* 第三列（类型）可以换行但优先不换 */
.api-table td:nth-child(3),
.api-table th:nth-child(3) {
  white-space: normal;
}

/* 第四列（默认值）保持紧凑 */
.api-table td:nth-child(4),
.api-table th:nth-child(4) {
  white-space: nowrap;
  width: 1%;
}

.api-table tbody tr:hover {
  background: var(--vp-c-bg-soft);
}

.api-table td:first-child {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.api-table :deep(code) {
  padding: 2px 6px;
  background: rgba(127, 127, 127, 0.1);
  border-radius: 3px;
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.empty-state {
  padding: 32px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-style: italic;
}

@media (max-width: 768px) {
  .api-table th,
  .api-table td {
    padding: 8px 12px;
    font-size: 13px;
  }

  .api-table {
    font-size: 13px;
  }
}
</style>
