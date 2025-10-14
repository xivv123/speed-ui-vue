<text>
> 基础用法演示，展示不同变体的选择器样式
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-space wrap>
      <sp-select v-model:value="basicValue" label="基础选择器" placeholder="请选择一个选项" :items="basicItems"
        style="width: 280px" />
      <sp-select v-model:value="outlinedValue" label="轮廓选择器" variant="outlined" placeholder="轮廓样式" :items="basicItems"
        style="width: 280px" />
    </sp-space>
    <sp-space wrap>
      <sp-select v-model:value="soloValue" label="Solo选择器" variant="solo" placeholder="Solo样式" :items="basicItems"
        style="width: 280px" />
      <sp-select v-model:value="underlinedValue" label="下划线选择器" variant="underlined" placeholder="下划线样式"
        :items="basicItems" style="width: 280px" />
    </sp-space>
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const basicValue = ref('')
const outlinedValue = ref('')
const soloValue = ref('')
const underlinedValue = ref('')

const basicItems = [
  'California',
  'Colorado',
  'Florida',
  'Georgia',
  'Texas',
  'Wyoming'
]
</script>
