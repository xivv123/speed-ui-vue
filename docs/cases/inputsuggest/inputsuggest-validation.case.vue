<text>
支持表单验证规则，可以设置必填、自定义验证等
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-input-suggest
      v-model="validationValue"
      :items="items"
      :rules="rules"
      label="必填选项"
      placeholder="请选择一个选项..."
      style="width: 320px"
    />

    <sp-btn @click="validate">验证</sp-btn>
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const validationValue = ref(null)
const items = [
  { title: '选项 A', value: 'a' },
  { title: '选项 B', value: 'b' },
  { title: '选项 C', value: 'c' },
  { title: '选项 D', value: 'd' },
]

const rules = [
  (v) => !!v || '请选择一个选项',
  (v) => (v && v !== 'a') || '不能选择选项 A',
]

const validate = () => {
  if (validationValue.value) {
    alert('验证通过！')
  } else {
    alert('验证失败！')
  }
}
</script>

<style scoped>
/* 验证样式 */
</style>
