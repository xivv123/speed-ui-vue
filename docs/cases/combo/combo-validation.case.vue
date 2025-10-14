<text>
> 验证状态演示，展示组合框的表单验证功能
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="validValue" :items="items" label="必填组合框" placeholder="请选择..." :rules="validationRules"
      required style="width: 250px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const validValue = ref(null)
const items = [
  { title: '选项 1', value: 'option1' },
  { title: '选项 2', value: 'option2' },
  { title: '选项 3', value: 'option3' },
  { title: '选项 4', value: 'option4' },
]

const validationRules = [(v) => !!v || '请选择一个选项']
</script>

<style scoped>
/* 验证状态样式 */
</style>