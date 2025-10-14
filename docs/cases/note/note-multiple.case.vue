<text>
多个便签可以同时存在，点击便签会自动置顶。
</text>

<template>
  <div style="height: 500px; position: relative; border: 1px dashed #ccc;">
    <SPNote
      v-if="visible1"
      v-model="note1"
      :position="{ x: 50, y: 50 }"
      title="便签 1"
      :width="250"
      :height="200"
      @close="visible1 = false"
    />
    <SPNote
      v-if="visible2"
      v-model="note2"
      :position="{ x: 200, y: 150 }"
      title="便签 2"
      :width="250"
      :height="200"
      @close="visible2 = false"
    />
    <SPNote
      v-if="visible3"
      v-model="note3"
      :position="{ x: 350, y: 80 }"
      title="便签 3"
      :width="250"
      :height="200"
      @close="visible3 = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPNote } from 'speed-ui-vue'

const note1 = ref('第一个便签内容')
const note2 = ref('第二个便签内容')
const note3 = ref('第三个便签内容')
const visible1 = ref(true)
const visible2 = ref(true)
const visible3 = ref(true)
</script>
