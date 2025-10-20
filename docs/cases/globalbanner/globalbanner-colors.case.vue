<text>
> 不同颜色和变体的全局横幅
</text>

<template>
  <div class="demo-container">
    <sp-global-banner v-model="visible1" color="primary">
      <template #left>
        主色调横幅 - 这是一条重要通知
      </template>
    </sp-global-banner>

    <sp-global-banner v-model="visible2" color="success" class="mt-2">
      <template #left>
        成功消息 - 操作已成功完成
      </template>
    </sp-global-banner>

    <sp-global-banner v-model="visible3" color="warning" class="mt-2">
      <template #left>
        警告消息 - 请注意这个重要提示
      </template>
    </sp-global-banner>

    <sp-global-banner v-model="visible4" color="error" class="mt-2">
      <template #left>
        错误消息 - 发生了一些问题
      </template>
    </sp-global-banner>

    <div class="controls">
      <sp-btn @click="showAll" size="small">显示全部</sp-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible1 = ref(true)
const visible2 = ref(true)
const visible3 = ref(true)
const visible4 = ref(true)

const showAll = () => {
  visible1.value = true
  visible2.value = true
  visible3.value = true
  visible4.value = true
}
</script>

<style scoped>
.demo-container {
  min-height: 200px;
}

.mt-2 {
  margin-top: 8px;
}

.controls {
  margin-top: 16px;
}
</style>
