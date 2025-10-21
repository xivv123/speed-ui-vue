<text>
> 不同样式变体的输入建议框
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-input-suggest
      v-model="filledValue"
      :items="items"
      label="Filled (默认)"
      placeholder="请选择..."
      variant="filled"
      style="width: 280px"
    />

    <sp-input-suggest
      v-model="outlinedValue"
      :items="items"
      label="Outlined"
      placeholder="请选择..."
      variant="outlined"
      style="width: 280px"
    />

    <sp-input-suggest
      v-model="soloValue"
      :items="items"
      label="Solo"
      placeholder="请选择..."
      variant="solo"
      style="width: 280px"
    />

    <sp-input-suggest
      v-model="underlinedValue"
      :items="items"
      label="Underlined"
      placeholder="请选择..."
      variant="underlined"
      style="width: 280px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const filledValue = ref(null)
const outlinedValue = ref(null)
const soloValue = ref(null)
const underlinedValue = ref(null)

const items = [
  { title: 'Apple', value: 'apple' },
  { title: 'Banana', value: 'banana' },
  { title: 'Orange', value: 'orange' },
  { title: 'Grape', value: 'grape' },
  { title: 'Mango', value: 'mango' },
]
</script>

<style scoped>
/* 变体样式 */
</style>
