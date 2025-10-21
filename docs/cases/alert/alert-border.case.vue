<text>
使用 border 属性在指定位置显示边框，可选值：top、end、bottom、start
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert
      type="info"
      border="start"
      text="左侧边框的信息提示"
    />

    <sp-alert
      type="success"
      border="top"
      text="顶部边框的成功提示"
    />

    <sp-alert
      type="warning"
      border="end"
      text="右侧边框的警告提示"
    />

    <sp-alert
      type="error"
      border="bottom"
      text="底部边框的错误提示"
    />
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
