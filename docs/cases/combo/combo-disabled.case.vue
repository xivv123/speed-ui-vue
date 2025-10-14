<text>
> 禁用状态演示，展示组合框的禁用和只读状态
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="disabledValue" :items="items" label="禁用组合框" placeholder="已禁用" disabled
      style="width: 200px" />
    <sp-combo v-model="readonlyValue" :items="items" label="只读组合框" placeholder="只读状态" readonly
      style="width: 200px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const disabledValue = ref(null)
const readonlyValue = ref('option1')
const items = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
]
</script>

<style scoped>
/* 禁用状态样式 */
</style>