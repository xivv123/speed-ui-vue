<text>
隐藏关闭按钮或添加关闭回调
</text>

<template>
  <sp-space :gap="10">
    <sp-btn @click="showNoClose">无关闭按钮</sp-btn>
    <sp-btn @click="showWithCallback">带关闭回调</sp-btn>
  </sp-space>
</template>

<script setup lang="ts">
import { SPBtn, SPSpace, notify } from 'speed-ui-vue'

function showNoClose() {
  notify({
    title: '自动消失',
    message: '这条通知没有关闭按钮，会自动消失',
    showClose: false,
    duration: 3000,
  })
}

function showWithCallback() {
  notify({
    title: '通知',
    message: '关闭时会触发回调函数',
    onClose: () => {
      notify.success('通知关闭回调已执行')
    },
  })
}
</script>
