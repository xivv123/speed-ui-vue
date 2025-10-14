<text>
> 多选模式演示，展示组合框的多选功能和标签显示
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="multipleValue" :items="items" label="多选组合框" placeholder="请选择多个选项..." multiple tags
      closableTags clearable style="width: 350px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const multipleValue = ref([])
const items = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
  { title: '选项 5', value: 'option5' },
]
</script>

<style scoped>
/* 多选样式 */
</style>