<text>
基本单选组，选择一个选项
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-radio-group v-model="selected" inline>
      <sp-radio value="option1">选项 1</sp-radio>
      <sp-radio value="option2">选项 2</sp-radio>
      <sp-radio value="option3">选项 3</sp-radio>
    </sp-radio-group>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('option1')
</script>
