<text>
> 基本的全局横幅用法，可关闭的顶部通知条
</text>

<template>
  <div class="demo-container">
    <sp-global-banner v-model="visible">
      <template #left>
        这是一条重要的系统通知消息
      </template>
    </sp-global-banner>

    <sp-btn @click="visible = true" v-if="!visible">
      显示横幅
    </sp-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<style scoped>
.demo-container {
  min-height: 100px;
}
</style>
