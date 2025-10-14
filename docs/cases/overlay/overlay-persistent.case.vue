<text>
持久化遮罩，点击外部不会关闭
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="show = true">
      显示持久化遮罩
    </sp-btn>

    <sp-overlay v-model="show" persistent class="align-center justify-center">
      <sp-card style="width: 400px; padding: 20px;">
        <h3>持久化遮罩</h3>
        <p>点击外部不会关闭，必须点击关闭按钮</p>
        <sp-btn @click="show = false" color="primary">
          关闭
        </sp-btn>
      </sp-card>
    </sp-overlay>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPOverlay, SPBtn, SPCard, SPSpace } from 'speed-ui-vue'

const show = ref(false)
</script>

<style scoped>
.align-center {
  display: flex;
  align-items: center;
}

.justify-center {
  display: flex;
  justify-content: center;
}
</style>
