<text>
提供 success、info、warning、error 四种类型的警告提示
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert type="success">
      这是一条成功提示信息
    </sp-alert>

    <sp-alert type="info">
      这是一条普通信息提示
    </sp-alert>

    <sp-alert type="warning">
      这是一条警告提示信息
    </sp-alert>

    <sp-alert type="error">
      这是一条错误提示信息
    </sp-alert>
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
