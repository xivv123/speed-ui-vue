<text>
> 加载状态演示，展示组合框的加载动画效果
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="loadingValue" :items="items" label="加载状态组合框" placeholder="显示加载动画..." :loading="isLoading"
      style="width: 300px" />
    <sp-button @click="toggleLoading" variant="primary">
      {{ isLoading ? '停止加载' : '开始加载' }}
    </sp-button>
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const loadingValue = ref(null)
const isLoading = ref(false)
const items = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
]

const toggleLoading = () => {
  isLoading.value = !isLoading.value
}
</script>

<style scoped>
/* 加载状态样式 */
</style>