<text>
不同布局方向，支持水平和垂直
</text>

<template>
  <sp-space direction="vertical" :gap="30">
    <div>
      <h4 style="margin-bottom: 12px;">水平布局</h4>
      <sp-radio-group v-model="horizontal" inline>
        <sp-radio value="option1">选项 1</sp-radio>
        <sp-radio value="option2">选项 2</sp-radio>
        <sp-radio value="option3">选项 3</sp-radio>
      </sp-radio-group>
    </div>

    <div>
      <h4 style="margin-bottom: 12px;">垂直布局</h4>
      <sp-radio-group v-model="vertical">
        <sp-radio value="option1">选项1</sp-radio>
        <sp-radio value="option2">选项2</sp-radio>
        <sp-radio value="option3">选项3 </sp-radio>
      </sp-radio-group>
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const horizontal = ref('option1')
const vertical = ref('option1')
</script>
