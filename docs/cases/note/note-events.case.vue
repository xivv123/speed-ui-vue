<text>
便签支持多种事件，可以监听拖拽、大小变化、关闭等操作。
</text>

<template>
  <div>
    <div style="margin-bottom: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div><strong>事件日志：</strong></div>
      <div v-for="(log, index) in logs" :key="index" style="font-size: 12px; margin-top: 4px;">
        {{ log }}
      </div>
    </div>

    <div style="height: 400px; position: relative; border: 1px dashed #ccc;">
      <SPNote
        v-if="visible"
        v-model="noteContent"
        v-model:position="position"
        v-model:width="width"
        v-model:height="height"
        v-model:title="title"
        @drag:start="onDragStart"
        @drag:move="onDragMove"
        @drag:end="onDragEnd"
        @update:width="onWidthChange"
        @update:height="onHeightChange"
        @close="onClose"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPNote } from 'speed-ui-vue'
import type { NotePosition } from 'speed-ui-vue'

const noteContent = ref('拖动或调整大小来查看事件')
const position = ref<NotePosition>({ x: 50, y: 50 })
const width = ref(300)
const height = ref(200)
const title = ref('事件演示')
const logs = ref<string[]>([])
const visible = ref(true)

function addLog(message: string) {
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
  if (logs.value.length > 5) logs.value.pop()
}

function onDragStart(pos: NotePosition) {
  addLog(`开始拖拽: (${pos.x}, ${pos.y})`)
}

function onDragMove(pos: NotePosition) {
  addLog(`拖拽中: (${pos.x}, ${pos.y})`)
}

function onDragEnd(pos: NotePosition) {
  addLog(`拖拽结束: (${pos.x}, ${pos.y})`)
}

function onWidthChange(newWidth: number | string) {
  addLog(`宽度变化: ${newWidth}`)
}

function onHeightChange(newHeight: number | string) {
  addLog(`高度变化: ${newHeight}`)
}

function onClose() {
  addLog('便签关闭')
  visible.value = false
  // 重新显示便签（演示用）
  setTimeout(() => {
    visible.value = true
    position.value = { x: 50, y: 50 }
  }, 1000)
}
</script>
