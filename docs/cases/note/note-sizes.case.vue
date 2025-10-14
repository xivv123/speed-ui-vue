<text>
可以自定义便签的大小，也可以设置最小/最大尺寸限制。
</text>

<template>
  <div style="height: 500px; position: relative; border: 1px dashed #ccc;">
    <SPNote
      v-if="visible1"
      v-model="note1"
      :position="{ x: 50, y: 50 }"
      title="小便签"
      :width="200"
      :height="150"
      :min-width="150"
      :min-height="120"
      @close="visible1 = false"
    />
    <SPNote
      v-if="visible2"
      v-model="note2"
      :position="{ x: 280, y: 50 }"
      title="中等便签"
      :width="300"
      :height="200"
      @close="visible2 = false"
    />
    <SPNote
      v-if="visible3"
      v-model="note3"
      :position="{ x: 50, y: 280 }"
      title="大便签"
      :width="400"
      :height="180"
      :max-width="500"
      :max-height="250"
      @close="visible3 = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPNote } from 'speed-ui-vue'

const note1 = ref('这是一个小便签，有最小尺寸限制')
const note2 = ref('这是一个中等大小的便签')
const note3 = ref('这是一个大便签，有最大尺寸限制')
const visible1 = ref(true)
const visible2 = ref(true)
const visible3 = ref(true)
</script>
