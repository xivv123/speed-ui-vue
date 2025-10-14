<text>
自定义遮罩样式，包括透明度和颜色
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="showLoading1">浅色遮罩</sp-btn>
    <sp-btn @click="showLoading2">深色遮罩</sp-btn>

    <sp-loading
      v-model="loading1"
      text="加载中..."
      scrim="#ffffff"
      :opacity="0.9"
      class="loading-center"
    />

    <sp-loading
      v-model="loading2"
      text="加载中..."
      scrim="#000000"
      :opacity="0.7"
      color="white"
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
