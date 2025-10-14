<text>
不同位置的通知提醒，支持四个角落的显示
</text>

<template>
  <sp-space :gap="10" wrap>
    <sp-btn @click="showTopRight">右上角</sp-btn>
    <sp-btn @click="showTopLeft">左上角</sp-btn>
    <sp-btn @click="showBottomRight">右下角</sp-btn>
    <sp-btn @click="showBottomLeft">左下角</sp-btn>
  </sp-space>
</template>

<script setup lang="ts">
import { SPBtn, SPSpace, notify } from 'speed-ui-vue'

function showTopRight() {
  notify({
    title: '右上角通知',
    message: '这条通知显示在右上角',
    position: 'top-right',
  })
}

function showTopLeft() {
  notify({
    title: '左上角通知',
    message: '这条通知显示在左上角',
    position: 'top-left',
  })
}

function showBottomRight() {
  notify({
    title: '右下角通知',
    message: '这条通知显示在右下角',
    position: 'bottom-right',
  })
}

function showBottomLeft() {
  notify({
    title: '左下角通知',
    message: '这条通知显示在左下角',
    position: 'bottom-left',
  })
}
</script>
