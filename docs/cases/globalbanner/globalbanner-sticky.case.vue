<text>
> 粘性定位的全局横幅，滚动时保持在顶部
</text>

<template>
  <div class="demo-container">
    <sp-global-banner v-model="visible" sticky color="primary">
      <template #left>
        <sp-icon name="mdi-pin" class="mr-2" />
        这是一个粘性横幅，会固定在顶部
      </template>
    </sp-global-banner>

    <div class="content">
      <p>向下滚动查看粘性效果...</p>
      <p v-for="i in 20" :key="i">这是第 {{ i }} 行内容</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<style scoped>
.demo-container {
  height: 400px;
  overflow: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.content {
  padding: 20px;
}

.mr-2 {
  margin-right: 8px;
}
</style>
