<text>
自定义颜色的分段控制器。通过整体的 baseColor 属性可以设置所有选项的基础颜色，通过单个选项的 color 属性可以为每个选项设置独立的颜色
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-segmented
      v-model="selected1"
      :options="['选项1', '选项2', '选项3']"
      base-color="success"
    />

    <sp-segmented
      v-model="selected2"
      :options="colorOptions"
    />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPSegmented, SPSpace } from 'speed-ui-vue'

const selected1 = ref('选项1')
const selected2 = ref('primary')

const colorOptions = [
  { label: 'Primary', value: 'primary', color: 'primary' },
  { label: 'Success', value: 'success', color: 'success' },
  { label: 'Warning', value: 'warning', color: 'warning' },
  { label: 'Error', value: 'error', color: 'error' }
]
</script>
