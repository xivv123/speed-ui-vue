<text>
> 带有清除功能的选择器，选择后可以清空
</text>

<template>
  <sp-space wrap :size="16">
    <sp-select v-model="clearValue1" label="可清除选择器" placeholder="选择后可清除" :items="clearItems" clearable
      style="width: 280px" />
    <sp-select v-model="clearValue2" label="轮廓 + 清除" variant="outlined" placeholder="轮廓样式 + 清除功能" :items="clearItems"
      clearable style="width: 280px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const clearValue1 = ref('上海') // 预设值用于演示清除功能
const clearValue2 = ref('北京')

const clearItems = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州'
]
</script>
