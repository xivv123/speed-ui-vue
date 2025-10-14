<text>
自定义通知的持续时间，或设置为不自动关闭
</text>

<template>
  <sp-space :gap="10">
    <sp-btn @click="showShort">2 秒后关闭</sp-btn>
    <sp-btn @click="showLong">10 秒后关闭</sp-btn>
    <sp-btn @click="showNoAutoClose">不自动关闭</sp-btn>
  </sp-space>
</template>

<script setup lang="ts">
import { SPBtn, SPSpace, notify } from 'speed-ui-vue'

function showShort() {
  notify({
    title: '短时通知',
    message: '这条通知将在 2 秒后自动关闭',
    duration: 2000,
  })
}

function showLong() {
  notify({
    title: '长时通知',
    message: '这条通知将在 10 秒后自动关闭',
    duration: 10000,
  })
}

function showNoAutoClose() {
  notify({
    title: '不自动关闭',
    message: '这条通知需要手动点击关闭按钮',
    duration: 0,
  })
}
</script>
