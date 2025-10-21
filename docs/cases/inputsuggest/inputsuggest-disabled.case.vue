<text>
展示禁用和只读两种不可编辑状态
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-input-suggest
      v-model="disabledValue"
      :items="items"
      label="禁用状态"
      placeholder="此输入框已禁用"
      disabled
      style="width: 280px"
    />

    <sp-input-suggest
      v-model="readonlyValue"
      :items="items"
      label="只读状态"
      placeholder="此输入框为只读"
      readonly
      style="width: 280px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const disabledValue = ref('option1')
const readonlyValue = ref('option2')
const items = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
]
</script>

<style scoped>
/* 禁用和只读样式 */
</style>
