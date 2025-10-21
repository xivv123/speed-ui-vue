<text>
支持 flat、tonal、outlined、text 四种样式变体
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert
      type="info"
      variant="flat"
      text="Flat 样式的信息提示"
    />

    <sp-alert
      type="success"
      variant="tonal"
      text="Tonal 样式的成功提示"
    />

    <sp-alert
      type="warning"
      variant="outlined"
      text="Outlined 样式的警告提示"
    />

    <sp-alert
      type="error"
      variant="text"
      text="Text 样式的错误提示"
    />
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
