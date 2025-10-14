<template>
  <DemoContainer title="SPCombo 组合框组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="可搜索的下拉选择">
      <sp-combo
        v-model="basicValue"
        :items="basicItems"
        label="组合框"
        placeholder="请选择或输入..."
        style="width: 300px"
      />
      <p class="result">选中值: {{ basicValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 多选模式 -->
    <DemoSection title="多选模式" subtitle="支持选择多个选项">
      <sp-combo
        v-model="multipleValue"
        :items="basicItems"
        label="多选组合框"
        placeholder="请选择多个选项..."
        multiple
        chips
        closable-chips
        style="width: 350px"
      />
      <p class="result">选中值: {{ JSON.stringify(multipleValue) }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 可清除 -->
    <DemoSection title="可清除" subtitle="快速清空选择">
      <sp-combo
        v-model="clearableValue"
        :items="basicItems"
        label="可清除组合框"
        placeholder="请选择..."
        clearable
        style="width: 300px"
      />
      <p class="result">选中值: {{ clearableValue }}</p>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const basicItems = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
  { title: '选项 5', value: 'option5' },
]

const basicValue = ref(null)
const multipleValue = ref([])
const clearableValue = ref(null)
</script>

<style scoped>
.result {
  margin-top: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #666;
}
</style>
