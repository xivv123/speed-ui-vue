<text>
便签支持多种配置选项，如禁用拖拽、禁用调整大小、隐藏头部等。
</text>

<template>
  <div style="height: 500px; position: relative; border: 1px dashed #ccc;">
    <SPNote
      v-if="visible1"
      v-model="note1"
      :position="{ x: 50, y: 50 }"
      title="可关闭便签"
      :width="250"
      :height="180"
      @close="visible1 = false"
    />
    <SPNote
      v-if="visible2"
      v-model="note2"
      :position="{ x: 350, y: 50 }"
      title="不可拖拽"
      :draggable="false"
      :width="250"
      :height="180"
      @close="visible2 = false"
    />
    <SPNote
      v-if="visible3"
      v-model="note3"
      :position="{ x: 50, y: 280 }"
      title="不可调整大小"
      :resizable="false"
      :width="250"
      :height="180"
      @close="visible3 = false"
    />
    <SPNote
      v-if="visible4"
      v-model="note4"
      :position="{ x: 350, y: 280 }"
      title="不可关闭"
      :closable="false"
      :width="250"
      :height="180"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPNote } from 'speed-ui-vue'

const note1 = ref('点击关闭按钮可以关闭便签')
const note2 = ref('这个便签不能拖拽')
const note3 = ref('这个便签不能调整大小')
const note4 = ref('这个便签不能关闭')

const visible1 = ref(true)
const visible2 = ref(true)
const visible3 = ref(true)
const visible4 = ref(true)
</script>
