<text>
确定进度的加载状态，通过 progress 属性设置进度值
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="startProgress">开始进度加载</sp-btn>

    <sp-loading
      v-model="loading"
      :progress="progress"
      :indeterminate="false"
      :text="`加载中 ${progress}%`"
      class="loading-center"
    />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPLoading, SPBtn, SPSpace } from 'speed-ui-vue'

const loading = ref(false)
const progress = ref(0)

function startProgress() {
  loading.value = true
  progress.value = 0

  const timer = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(timer)
      setTimeout(() => {
        loading.value = false
      }, 500)
    }
  }, 300)
}
</script>

<style scoped>
.loading-center :deep(.sp-overlay__content) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
