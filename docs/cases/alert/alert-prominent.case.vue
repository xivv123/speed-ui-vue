<text>
使用 prominent 属性显示更大的图标，适合重要提示
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert
      type="warning"
      prominent
      title="重要警告"
      text="这是一条使用醒目样式的重要警告提示信息。"
      closable
    />

    <sp-alert
      type="error"
      prominent
      border="start"
      title="严重错误"
      text="系统检测到严重错误，请立即处理。"
      closable
    />
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
