<text>
通过 actions 插槽可以在头部添加自定义操作按钮。
</text>

<template>
  <div style="height: 400px; position: relative; border: 1px dashed #ccc;">
    <SPNote
      v-if="visible"
      v-model="noteContent"
      :position="{ x: 50, y: 50 }"
      title="自定义操作"
      :width="300"
      @close="visible = false"
    >
      <template #actions>
        <button
          @click="starred = !starred"
          style="margin-right: 8px; background: none; border: none; cursor: pointer; font-size: 16px;"
        >
          {{ starred ? '⭐' : '☆' }}
        </button>
        <button
          @click="pinned = !pinned"
          style="margin-right: 8px; background: none; border: none; cursor: pointer; font-size: 16px;"
        >
          {{ pinned ? '📌' : '📍' }}
        </button>
      </template>
    </SPNote>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPNote } from 'speed-ui-vue'

const noteContent = ref('这个便签有自定义操作按钮')
const starred = ref(false)
const pinned = ref(false)
const visible = ref(true)
</script>
