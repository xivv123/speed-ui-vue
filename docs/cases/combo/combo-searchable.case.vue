<text>
> 可搜索组合框演示，展示搜索过滤功能
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="searchValue" :items="searchItems" label="可搜索组合框" placeholder="输入搜索..."
      :filterKeys="['title', 'subtitle']" style="width: 300px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const searchValue = ref(null)
const searchItems = [
  { title: 'Apple', subtitle: '苹果', value: 'apple' },
  { title: 'Banana', subtitle: '香蕉', value: 'banana' },
  { title: 'Cherry', subtitle: '樱桃', value: 'cherry' },
  { title: 'Date', subtitle: '枣子', value: 'date' },
  { title: 'Elderberry', subtitle: '接骨木果', value: 'elderberry' },
  { title: 'Fig', subtitle: '无花果', value: 'fig' },
  { title: 'Grape', subtitle: '葡萄', value: 'grape' },
  { title: 'Honeydew', subtitle: '蜜瓜', value: 'honeydew' },
]
</script>

<style scoped>
/* 可搜索样式 */
</style>