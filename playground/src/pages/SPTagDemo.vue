<template>
  <DemoContainer title="SPTag 标签组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="标签的基本使用方式">
      <div class="tag-group">
        <sp-tag>默认标签</sp-tag>
        <sp-tag text="文本标签" />
        <sp-tag>Vue.js</sp-tag>
        <sp-tag>React</sp-tag>
        <sp-tag>Angular</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同颜色 -->
    <DemoSection title="不同颜色" subtitle="支持多种颜色主题">
      <div class="tag-group">
        <sp-tag color="primary">主要</sp-tag>
        <sp-tag color="secondary">次要</sp-tag>
        <sp-tag color="success">成功</sp-tag>
        <sp-tag color="warning">警告</sp-tag>
        <sp-tag color="error">错误</sp-tag>
        <sp-tag color="info">信息</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="提供多种尺寸选择">
      <div class="tag-group">
        <sp-tag size="x-small">超小</sp-tag>
        <sp-tag size="small">小</sp-tag>
        <sp-tag size="default">默认</sp-tag>
        <sp-tag size="large">大</sp-tag>
        <sp-tag size="x-large">超大</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同变体 -->
    <DemoSection title="不同变体" subtitle="支持多种视觉风格">
      <div class="tag-group">
        <sp-tag variant="flat" color="primary">平面</sp-tag>
        <sp-tag variant="elevated" color="primary">浮起</sp-tag>
        <sp-tag variant="tonal" color="primary">色调</sp-tag>
        <sp-tag variant="outlined" color="primary">轮廓</sp-tag>
        <sp-tag variant="text" color="primary">文本</sp-tag>
        <sp-tag variant="plain" color="primary">朴素</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 可关闭标签 -->
    <DemoSection title="可关闭标签" subtitle="支持关闭操作的标签">
      <div class="tag-group">
        <sp-tag
          v-for="(tag, index) in closableTags"
          :key="index"
          :model-value="tag.visible"
          @update:model-value="tag.visible = $event"
          closable
          :color="tag.color"
        >
          {{ tag.text }}
        </sp-tag>
      </div>
      <sp-space :size="16" />
      <sp-btn @click="resetClosableTags">重置标签</sp-btn>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带图标的标签 -->
    <DemoSection title="带图标的标签" subtitle="标签可以添加前置或后置图标">
      <div class="tag-group">
        <sp-tag prepend-icon="mdi-account" color="primary">用户</sp-tag>
        <sp-tag append-icon="mdi-close" color="error">删除</sp-tag>
        <sp-tag prepend-icon="mdi-star" append-icon="mdi-heart" color="warning">收藏</sp-tag>
        <sp-tag prepend-icon="mdi-check" color="success">完成</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 标签形状 -->
    <DemoSection title="标签形状" subtitle="不同的圆角和形状样式">
      <div class="tag-group">
        <sp-tag>默认圆角</sp-tag>
        <sp-tag label>标签形状</sp-tag>
        <sp-tag pill>胶囊形状</sp-tag>
        <sp-tag rounded="0">无圆角</sp-tag>
        <sp-tag rounded="xl">超大圆角</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 密度调整 -->
    <DemoSection title="密度调整" subtitle="调整标签的内边距大小">
      <div class="tag-group">
        <sp-tag density="default">默认密度</sp-tag>
        <sp-tag density="comfortable">舒适密度</sp-tag>
        <sp-tag density="compact">紧凑密度</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 过滤标签 -->
    <DemoSection title="过滤标签" subtitle="可以用作过滤器的交互式标签">
      <div class="tag-group">
        <sp-tag
          v-for="(filter, index) in filterTags"
          :key="index"
          :model-value="filter.active"
          @update:model-value="filter.active = $event"
          filter
          :color="filter.active ? 'primary' : 'default'"
          @click="filter.active = !filter.active"
        >
          {{ filter.text }}
        </sp-tag>
      </div>
      <sp-space :size="12" />
      <div class="status-display">已选择的过滤器: {{ activeFilters.join(', ') || '无' }}</div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 链接标签 -->
    <DemoSection title="链接标签" subtitle="可点击的链接样式标签">
      <div class="tag-group">
        <sp-tag link @click="handleTagClick('Vue.js')">Vue.js</sp-tag>
        <sp-tag link @click="handleTagClick('React')">React</sp-tag>
        <sp-tag link @click="handleTagClick('Angular')">Angular</sp-tag>
        <sp-tag link disabled>禁用链接</sp-tag>
      </div>
      <sp-space :size="12" />
      <div v-if="clickedTag" class="status-display">点击了: {{ clickedTag }}</div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 禁用状态 -->
    <DemoSection title="禁用状态" subtitle="标签的禁用状态展示">
      <div class="tag-group">
        <sp-tag>正常标签</sp-tag>
        <sp-tag disabled>禁用标签</sp-tag>
        <sp-tag disabled color="primary">禁用主要</sp-tag>
        <sp-tag disabled closable>禁用可关闭</sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义内容 -->
    <DemoSection title="自定义内容" subtitle="使用插槽自定义标签内容">
      <div class="tag-group">
        <sp-tag color="primary" closable>
          <template #prepend>
            <span style="margin-right: 4px">👤</span>
          </template>
          用户标签
        </sp-tag>
        <sp-tag color="success" closable>
          <template #append>
            <span style="margin-left: 4px">✓</span>
          </template>
          完成任务
        </sp-tag>
        <sp-tag color="warning">
          <template #prepend>
            <span style="margin-right: 4px">⭐</span>
          </template>
          重要
          <template #append>
            <span style="margin-left: 4px">!</span>
          </template>
        </sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 动态标签管理 -->
    <DemoSection title="动态标签管理" subtitle="动态添加和删除标签">
      <div class="tag-group">
        <sp-tag
          v-for="(tag, index) in dynamicTags"
          :key="index"
          :model-value="true"
          @update:model-value="removeDynamicTag(index)"
          closable
          color="primary"
        >
          {{ tag }}
        </sp-tag>
        <sp-tag v-if="showInput" variant="outlined" style="padding: 0">
          <input
            ref="inputRef"
            v-model="inputValue"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
            class="tag-input"
            placeholder="新标签"
          />
        </sp-tag>
        <sp-tag v-else variant="outlined" @click="showInputTag" style="border-style: dashed">
          + 添加标签
        </sp-tag>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- SPTagGroup 标签组 -->
    <DemoSection title="SPTagGroup 标签组" subtitle="使用标签组管理多个标签">
      <!-- 基础标签组 -->
      <div class="subsection">
        <h3>基础标签组（多选）</h3>
        <sp-tag-group v-model="selectedTags" multiple>
          <sp-tag
            v-for="tag in basicTags"
            :key="tag.value"
            :value="tag.value"
            :color="tag.color"
          >
            {{ tag.text }}
          </sp-tag>
        </sp-tag-group>
        <sp-space :size="12" />
        <div class="status-display">已选择: {{ selectedTags.join(', ') || '无' }}</div>
      </div>

      <sp-space :size="20" />

      <!-- 单选标签组 -->
      <div class="subsection">
        <h3>单选标签组</h3>
        <sp-tag-group v-model="selectedSingleTag">
          <sp-tag
            v-for="tag in singleSelectTags"
            :key="tag.value"
            :value="tag.value"
            :color="tag.color"
          >
            {{ tag.text }}
          </sp-tag>
        </sp-tag-group>
        <sp-space :size="12" />
        <div class="status-display">已选择: {{ selectedSingleTag || '无' }}</div>
      </div>

      <sp-space :size="20" />

      <!-- 垂直标签组 -->
      <div class="subsection">
        <h3>垂直标签组</h3>
        <sp-tag-group v-model="selectedVerticalTags" multiple column>
          <sp-tag
            v-for="tag in verticalTags"
            :key="tag.value"
            :value="tag.value"
            :color="tag.color"
          >
            {{ tag.text }}
          </sp-tag>
        </sp-tag-group>
        <sp-space :size="12" />
        <div class="status-display">已选择: {{ selectedVerticalTags.join(', ') || '无' }}</div>
      </div>

      <sp-space :size="20" />

      <!-- 可滚动标签组 -->
      <div class="subsection">
        <h3>可滚动标签组</h3>
        <sp-tag-group v-model="selectedScrollTags" multiple show-arrows style="max-width: 400px">
          <sp-tag
            v-for="tag in scrollTags"
            :key="tag.value"
            :value="tag.value"
            :color="tag.color"
          >
            {{ tag.text }}
          </sp-tag>
        </sp-tag-group>
        <sp-space :size="12" />
        <div class="status-display">已选择: {{ selectedScrollTags.join(', ') || '无' }}</div>
      </div>

      <sp-space :size="20" />

      <!-- 过滤器标签组 -->
      <div class="subsection">
        <h3>过滤器标签组</h3>
        <sp-tag-group v-model="selectedFilterTags" multiple filter>
          <sp-tag
            v-for="tag in filterTagsGroup"
            :key="tag.value"
            :value="tag.value"
            :color="tag.color"
          >
            {{ tag.text }}
          </sp-tag>
        </sp-tag-group>
        <sp-space :size="12" />
        <div class="status-display">已选择: {{ selectedFilterTags.join(', ') || '无' }}</div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

// 响应式数据
const closableTags = ref([
  { text: 'Vue.js', color: 'success', visible: true },
  { text: 'React', color: 'info', visible: true },
  { text: 'Angular', color: 'error', visible: true },
  { text: 'Svelte', color: 'warning', visible: true },
])

const filterTags = ref([
  { text: '前端', active: false },
  { text: '后端', active: false },
  { text: '移动端', active: false },
  { text: '全栈', active: false },
])

const clickedTag = ref('')
const dynamicTags = ref(['标签1', '标签2', '标签3'])
const showInput = ref(false)
const inputValue = ref('')
const inputRef = ref()

// SPTagGroup 相关数据
const selectedTags = ref(['vue', 'typescript'])
const selectedSingleTag = ref('vue')
const selectedVerticalTags = ref(['frontend'])
const selectedScrollTags = ref(['javascript'])
const selectedFilterTags = ref(['web'])

const basicTags = ref([
  { text: 'Vue.js', value: 'vue', color: 'success' },
  { text: 'React', value: 'react', color: 'info' },
  { text: 'Angular', value: 'angular', color: 'error' },
  { text: 'TypeScript', value: 'typescript', color: 'primary' },
  { text: 'JavaScript', value: 'javascript', color: 'warning' },
])

const singleSelectTags = ref([
  { text: 'Vue.js', value: 'vue', color: 'success' },
  { text: 'React', value: 'react', color: 'info' },
  { text: 'Angular', value: 'angular', color: 'error' },
  { text: 'Svelte', value: 'svelte', color: 'secondary' },
])

const verticalTags = ref([
  { text: '前端开发', value: 'frontend', color: 'primary' },
  { text: '后端开发', value: 'backend', color: 'secondary' },
  { text: '移动开发', value: 'mobile', color: 'success' },
  { text: '全栈开发', value: 'fullstack', color: 'warning' },
  { text: 'DevOps', value: 'devops', color: 'error' },
])

const scrollTags = ref([
  { text: 'JavaScript', value: 'javascript', color: 'warning' },
  { text: 'TypeScript', value: 'typescript', color: 'primary' },
  { text: 'Vue.js', value: 'vue', color: 'success' },
  { text: 'React', value: 'react', color: 'info' },
  { text: 'Angular', value: 'angular', color: 'error' },
  { text: 'Node.js', value: 'nodejs', color: 'success' },
  { text: 'Express', value: 'express', color: 'secondary' },
  { text: 'MongoDB', value: 'mongodb', color: 'success' },
  { text: 'MySQL', value: 'mysql', color: 'info' },
  { text: 'Redis', value: 'redis', color: 'error' },
])

const filterTagsGroup = ref([
  { text: 'Web开发', value: 'web', color: 'primary' },
  { text: '移动开发', value: 'mobile', color: 'success' },
  { text: '桌面应用', value: 'desktop', color: 'info' },
  { text: '游戏开发', value: 'game', color: 'warning' },
  { text: '人工智能', value: 'ai', color: 'error' },
])

// 计算属性
const activeFilters = computed(() => {
  return filterTags.value.filter(f => f.active).map(f => f.text)
})

// 方法
const resetClosableTags = () => {
  closableTags.value.forEach(tag => {
    tag.visible = true
  })
}

const handleTagClick = (tagName: string) => {
  clickedTag.value = tagName
  setTimeout(() => {
    clickedTag.value = ''
  }, 2000)
}

const removeDynamicTag = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

const showInputTag = () => {
  showInput.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value.trim()) {
    dynamicTags.value.push(inputValue.value.trim())
  }
  inputValue.value = ''
  showInput.value = false
}
</script>

<style scoped>
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.status-display {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
}

.subsection {
  padding: 16px;
  background-color: #fafafa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.subsection h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.tag-input {
  border: none;
  outline: none;
  background: transparent;
  padding: 4px 8px;
  width: 80px;
  font-family: inherit;
  font-size: inherit;
}
</style>
