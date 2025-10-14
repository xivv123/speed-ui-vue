<text>
不同类型的通知，包括 success、warning、info、error
</text>

<template>
  <sp-space :gap="10">
    <sp-btn @click="showSuccess" base-color="success">成功</sp-btn>
    <sp-btn @click="showWarning" base-color="warning">警告</sp-btn>
    <sp-btn @click="showInfo" base-color="info">信息</sp-btn>
    <sp-btn @click="showError" base-color="error">错误</sp-btn>
  </sp-space>
</template>

<script setup lang="ts">
import { SPBtn, SPSpace, notify } from 'speed-ui-vue'

function showSuccess() {
  notify.success({
    title: '成功',
    message: '操作已成功完成！',
  })
}

function showWarning() {
  notify.warning({
    title: '警告',
    message: '这是一条警告消息',
  })
}

function showInfo() {
  notify.info({
    title: '提示',
    message: '这是一条提示信息',
  })
}

function showError() {
  notify.error({
    title: '错误',
    message: '操作失败，请重试',
  })
}
</script>
