<text>
不同颜色和变体的消息条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <sp-btn @click="info = true" color="primary">信息消息</sp-btn>
    <sp-btn @click="success = true" color="success">成功消息</sp-btn>
    <sp-btn @click="warning = true" color="warning">警告消息</sp-btn>
    <sp-btn @click="error = true" color="error">错误消息</sp-btn>

    <sp-msg-bar v-model="info" text="这是一条信息消息" color="primary" />
    <sp-msg-bar v-model="success" text="操作成功完成！" color="success" />
    <sp-msg-bar v-model="warning" text="请注意这个警告信息" color="warning" />
    <sp-msg-bar v-model="error" text="发生了一个错误" color="error" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPMsgBar, SPBtn } from 'speed-ui-vue'

const info = ref(false)
const success = ref(false)
const warning = ref(false)
const error = ref(false)
</script>
