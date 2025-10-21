<text>
> 搜索过滤功能，支持自定义过滤逻辑
</text>

<template>
  <sp-input-suggest
    v-model="searchValue"
    :items="frameworks"
    label="前端框架"
    placeholder="输入框架名称搜索..."
    style="width: 320px"
  />
</template>

<script setup>
import { ref } from 'vue'

const searchValue = ref(null)
const frameworks = [
  { title: 'Vue.js', value: 'vue' },
  { title: 'React', value: 'react' },
  { title: 'Angular', value: 'angular' },
  { title: 'Svelte', value: 'svelte' },
  { title: 'Solid.js', value: 'solid' },
  { title: 'Qwik', value: 'qwik' },
  { title: 'Next.js', value: 'next' },
  { title: 'Nuxt.js', value: 'nuxt' },
  { title: 'Remix', value: 'remix' },
  { title: 'Astro', value: 'astro' },
]
</script>

<style scoped>
/* 过滤样式 */
</style>
