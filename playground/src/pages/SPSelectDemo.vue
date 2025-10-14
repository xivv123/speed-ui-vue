<template>
  <DemoContainer title="SPSelect 选择器组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="最简单的选择器使用方式">
      <SPSelect v-model:value="basicValue" :items="basicItems" label="基础选择器" placeholder="请选择..." />
      <p style="margin-top: 8px; color: #666;">选中值: {{ basicValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同变体 -->
    <DemoSection title="不同变体" subtitle="多种视觉样式">
      <div class="variant-group">
        <SPSelect v-model="variantValue1" :items="basicItems" label="填充变体" variant="filled" />
        <SPSelect v-model="variantValue2" :items="basicItems" label="轮廓变体" variant="outlined" />
        <SPSelect v-model="variantValue3" :items="basicItems" label="下划线变体" variant="underlined" />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 禁用和只读 -->
    <DemoSection title="禁用和只读状态" subtitle="不可编辑的状态">
      <div class="state-group">
        <SPSelect v-model="disabledValue" :items="basicItems" label="禁用状态" disabled />
        <SPSelect v-model="readonlyValue" :items="basicItems" label="只读状态" readonly />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 清除功能 -->
    <DemoSection title="清除功能" subtitle="快速清空选择">
      <SPSelect v-model="clearableValue" :items="basicItems" label="可清除选择器" placeholder="请选择..." clearable />
      <p style="margin-top: 8px; color: #666;">选中值: {{ clearableValue }}</p>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
import { SPSelect } from '@speed-ui/ui'

const basicItems = ['选项 1', '选项 2', '选项 3', '选项 4', '选项 5']

const basicValue = ref('')
const variantValue1 = ref('')
const variantValue2 = ref('')
const variantValue3 = ref('')
const disabledValue = ref('选项 1')
const readonlyValue = ref('选项 2')
const clearableValue = ref('')
</script>

<style scoped>
.variant-group,
.state-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
