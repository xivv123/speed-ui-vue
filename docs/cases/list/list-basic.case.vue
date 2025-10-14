<text>
基本的列表，使用 items 数组配置列表项
</text>

<template>
  <sp-list :items="items" />
</template>

<script setup lang="ts">
import { SPList } from 'speed-ui-vue'

const items = [
  { title: '列表项 1', value: 1 },
  { title: '列表项 2', value: 2 },
  { title: '列表项 3', value: 3 },
  { title: '列表项 4', value: 4 },
]
</script>
