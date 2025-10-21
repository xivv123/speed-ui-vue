<text>
展示输入建议框的基本功能，可以输入搜索或从列表中选择
</text>

<template>
  <sp-input-suggest
    v-model="basicValue"
    :items="basicItems"
    label="选择或输入"
    placeholder="请输入或选择..."
    style="width: 280px"
  />
</template>

<script setup>
import { ref } from 'vue'

const basicValue = ref(null)
const basicItems = [
  { title: 'JavaScript', value: 'js' },
  { title: 'TypeScript', value: 'ts' },
  { title: 'Python', value: 'py' },
  { title: 'Java', value: 'java' },
  { title: 'C++', value: 'cpp' },
  { title: 'Go', value: 'go' },
  { title: 'Rust', value: 'rust' },
]
</script>

<style scoped>
/* 基础样式 */
</style>
