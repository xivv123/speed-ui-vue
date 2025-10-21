<text>
> 多选模式，可以选择多个选项
</text>

<template>
  <sp-input-suggest
    v-model="multipleValue"
    :items="languages"
    label="选择编程语言"
    placeholder="请选择多个语言..."
    multiple
    tags
    closable-tags
    style="width: 400px"
  />
</template>

<script setup>
import { ref } from 'vue'

const multipleValue = ref([])
const languages = [
  { title: 'JavaScript', value: 'js' },
  { title: 'TypeScript', value: 'ts' },
  { title: 'Python', value: 'py' },
  { title: 'Java', value: 'java' },
  { title: 'C#', value: 'cs' },
  { title: 'C++', value: 'cpp' },
  { title: 'Go', value: 'go' },
  { title: 'Rust', value: 'rust' },
  { title: 'PHP', value: 'php' },
  { title: 'Ruby', value: 'ruby' },
]
</script>

<style scoped>
/* 多选样式 */
</style>
