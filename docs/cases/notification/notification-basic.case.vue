<text>
基本的通知提醒，通过 useNotification 或 notify 函数调用
</text>

<template>
  <sp-space :gap="10">
    <sp-btn @click="showBasic">基本通知</sp-btn>
    <sp-btn @click="showWithTitle">带标题的通知</sp-btn>
  </sp-space>
</template>

<script setup lang="ts">
import { SPBtn, SPSpace, notify } from 'speed-ui-vue'

function showBasic() {
  notify({
    message: '这是一条通知消息',
  })
}

function showWithTitle() {
  notify({
    title: '通知标题',
    message: '这是通知的内容，可以包含更多详细信息',
  })
}
</script>
