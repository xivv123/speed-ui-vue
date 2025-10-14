<text>
带倒计时进度条的消息条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <sp-btn @click="show1 = true">3秒倒计时</sp-btn>
    <sp-btn @click="show2 = true" color="success">5秒倒计时（自定义颜色）</sp-btn>

    <sp-msg-bar
      v-model="show1"
      text="这条消息将在3秒后自动消失"
      :timeout="3000"
      timer
    />

    <sp-msg-bar
      v-model="show2"
      text="这条消息将在5秒后自动消失"
      color="success"
      :timeout="5000"
      timer="warning"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPMsgBar, SPBtn } from 'speed-ui-vue'

const show1 = ref(false)
const show2 = ref(false)
</script>
