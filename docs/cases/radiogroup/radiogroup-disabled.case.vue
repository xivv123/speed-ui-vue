<text>
禁用状态的单选按钮
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-radio-group v-model="selected" inline>
      <sp-radio value="option1" disabled>禁用选项 1</sp-radio>
      <sp-radio value="option2">正常选项 2</sp-radio>
      <sp-radio value="option3" disabled>禁用选项 3</sp-radio>
    </sp-radio-group>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('option2')
</script>
