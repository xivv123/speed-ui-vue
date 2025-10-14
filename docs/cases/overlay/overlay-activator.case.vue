<text>
使用 activator 插槽定义触发器
</text>

<template>
  <sp-overlay>
    <template #activator="{ props }">
      <sp-btn v-bind="props" color="secondary">
        点击打开
      </sp-btn>
    </template>
    <div class="overlay-content">
      <sp-card style="width: 400px; padding: 20px;">
        <h3>通过 activator 触发</h3>
        <p>使用 activator 插槽可以更方便地定义触发器</p>
      </sp-card>
    </div>
  </sp-overlay>
</template>

<script setup lang="ts">
import { SPOverlay, SPBtn, SPCard } from 'speed-ui-vue'
</script>

<style scoped>
.overlay-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
