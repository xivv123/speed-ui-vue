<text>
基本的分段控制器，通过 options 数组配置选项
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-segmented
      v-model="selected1"
      :options="['选项1', '选项2', '选项3']"
    />

    <sp-segmented
      v-model="selected2"
      :options="options"
    />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected1 = ref('选项1')
const selected2 = ref('home')

const options = [
  { label: '首页', value: 'home' },
  { label: '文档', value: 'docs' },
  { label: '组件', value: 'components' }
]
</script>
