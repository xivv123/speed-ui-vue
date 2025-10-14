<text>
> 基础用法演示，展示组合框的基本功能
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="basicValue" :items="basicItems" label="选择一个选项" placeholder="请选择..."
      style="width: 280px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const basicValue = ref(null)
const basicItems = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
  { title: '选项 5', value: 'option5' },
]
</script>

<style scoped>
/* 基础样式 */
</style>