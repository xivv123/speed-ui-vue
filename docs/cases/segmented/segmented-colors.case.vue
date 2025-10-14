<text>
自定义颜色的分段控制器，支持通过 baseColor 和 color 属性设置颜色
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-segmented
      v-model="selected1"
      :options="['选项1', '选项2', '选项3']"
      base-color="primary"
    />

    <sp-segmented
      v-model="selected2"
      :options="options"
    />
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPSegmented, SPSpace } from 'speed-ui-vue'

const selected1 = ref('选项1')
const selected2 = ref('primary')

const options = [
  { label: 'Primary', value: 'primary', baseColor: 'primary' },
  { label: 'Success', value: 'success', baseColor: 'success' },
  { label: 'Warning', value: 'warning', baseColor: 'warning' },
  { label: 'Error', value: 'error', baseColor: 'error' }
]
</script>
