<text>
多行文本消息条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <sp-btn @click="show1 = true">多行消息</sp-btn>
    <sp-btn @click="show2 = true" color="secondary">垂直布局消息</sp-btn>

    <sp-msg-bar
      v-model="show1"
      text="这是一条很长的消息通知，它包含了大量的文本内容，需要多行显示才能完整展示所有信息。"
      multi-line
      color="primary"
      :timeout="6000"
    >
      <template #actions="{ isActive }">
        <sp-btn @click="isActive.value = false">关闭</sp-btn>
      </template>
    </sp-msg-bar>

    <sp-msg-bar
      v-model="show2"
      text="垂直布局的消息条，操作按钮在下方"
      vertical
      color="secondary"
      :timeout="6000"
    >
      <template #actions="{ isActive }">
        <sp-btn @click="isActive.value = false">知道了</sp-btn>
      </template>
    </sp-msg-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPMsgBar, SPBtn } from 'speed-ui-vue'

const show1 = ref(false)
const show2 = ref(false)
</script>
