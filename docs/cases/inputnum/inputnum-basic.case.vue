<text>
基本的数字输入框，支持通过按钮或键盘增减数值
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-input-num v-model="value1" placeholder="请输入数字" />
    <sp-input-num v-model="value2" :step="10" placeholder="步长为 10" />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(0)
const value2 = ref(0)
</script>
