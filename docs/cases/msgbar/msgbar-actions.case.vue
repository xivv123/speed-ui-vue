<text>
带操作按钮的消息条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <sp-btn @click="show = true">显示带操作的消息</sp-btn>

    <sp-msg-bar v-model="show" text="文件已删除" color="error" :timeout="-1">
      <template #actions="{ isActive }">
        <sp-btn @click="handleUndo">撤销</sp-btn>
        <sp-btn @click="isActive.value = false">关闭</sp-btn>
      </template>
    </sp-msg-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPMsgBar, SPBtn } from 'speed-ui-vue'

const show = ref(false)

const handleUndo = () => {
  show.value = false
}
</script>
