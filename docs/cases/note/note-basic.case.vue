<text>
基本的便签使用方式，支持拖拽和调整大小。
</text>

<template>
  <div style="height: 400px; position: relative; border: 1px dashed #ccc;">
    <SPNote
      v-if="visible"
      v-model="noteContent"
      :position="{ x: 50, y: 50 }"
      title="我的便签"
      @close="visible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPNote } from 'speed-ui-vue'

const noteContent = ref('这是一个可以拖拽和调整大小的便签')
const visible = ref(true)
</script>
