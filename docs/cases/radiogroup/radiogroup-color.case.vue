<text>
自定义单选按钮颜色
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-radio-group v-model="selected" inline>
      <sp-radio value="primary" color="primary">主要色</sp-radio>
      <sp-radio value="secondary" color="secondary">次要色</sp-radio>
      <sp-radio value="success" color="success">成功色</sp-radio>
      <sp-radio value="warning" color="warning">警告色</sp-radio>
      <sp-radio value="error" color="error">错误色</sp-radio>
    </sp-radio-group>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('primary')
</script>
