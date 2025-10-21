<text>
> 自动选择第一项，支持快捷输入
</text>

<template>
  <sp-input-suggest
    v-model="autoValue"
    :items="countries"
    label="国家"
    placeholder="输入国家名称..."
    auto-select-first
    clear-on-select
    style="width: 280px"
  />
</template>

<script setup>
import { ref } from 'vue'

const autoValue = ref(null)
const countries = [
  { title: '中国', value: 'cn' },
  { title: '美国', value: 'us' },
  { title: '日本', value: 'jp' },
  { title: '英国', value: 'uk' },
  { title: '法国', value: 'fr' },
  { title: '德国', value: 'de' },
  { title: '加拿大', value: 'ca' },
  { title: '澳大利亚', value: 'au' },
]
</script>

<style scoped>
/* 自动选择样式 */
</style>
