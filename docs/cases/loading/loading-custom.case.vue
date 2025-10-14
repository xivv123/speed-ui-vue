<text>
自定义加载样式，包括颜色、大小、文本等
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="showLoading1">蓝色加载</sp-btn>
    <sp-btn @click="showLoading2">大尺寸加载</sp-btn>

    <sp-loading
      v-model="loading1"
      text="加载中..."
      color="primary"
      :size="64"
      :width="6"
      class="loading-center"
    />

    <sp-loading
      v-model="loading2"
      text="处理数据中..."
      color="success"
      :size="80"
      :width="8"
      class="loading-center"
    />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPLoading, SPBtn, SPSpace } from 'speed-ui-vue'

const loading1 = ref(false)
const loading2 = ref(false)

function showLoading1() {
  loading1.value = true
  setTimeout(() => {
    loading1.value = false
  }, 3000)
}

function showLoading2() {
  loading2.value = true
  setTimeout(() => {
    loading2.value = false
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
