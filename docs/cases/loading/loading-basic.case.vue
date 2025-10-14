<text>
基本的加载状态，通过 v-model 控制显示
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="showLoading">显示加载</sp-btn>

    <sp-loading
      v-model="loading"
      text="加载中..."
      class="loading-center"
    />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPLoading, SPBtn, SPSpace } from 'speed-ui-vue'

const loading = ref(false)

function showLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>

<style scoped>
.loading-center :deep(.sp-overlay__content) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
