<text>
基本消息条，显示简单的文本消息
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <sp-btn @click="show1 = true">显示顶部消息</sp-btn>
    <sp-btn @click="show2 = true" color="success">显示底部消息</sp-btn>

    <sp-msg-bar v-model="show1" text="这是一条顶部消息通知" location="top" />
    <sp-msg-bar v-model="show2" text="这是一条底部消息通知" location="bottom" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPMsgBar, SPBtn } from 'speed-ui-vue'

const show1 = ref(false)
const show2 = ref(false)
</script>
