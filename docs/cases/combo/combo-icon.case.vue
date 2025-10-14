<text>
> 带图标的组合框演示，展示如何在选项中添加图标
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="iconValue" :items="iconItems" label="带图标组合框" placeholder="选择带图标的选项..."
      style="width: 280px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const iconValue = ref(null)
const iconItems = [
  { title: '首页', value: 'home', prependIcon: 'home' },
  { title: '用户', value: 'user', prependIcon: 'person' },
  { title: '设置', value: 'settings', prependIcon: 'settings' },
  { title: '帮助', value: 'help', prependIcon: 'help' },
  { title: '关于', value: 'about', prependIcon: 'info' },
]
</script>

<style scoped>
/* 图标样式 */
</style>