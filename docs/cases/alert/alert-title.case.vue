<text>
使用 title 属性设置标题，text 属性设置内容
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert
      type="info"
      title="信息提示"
      text="这是带有标题的信息提示内容，可以提供更详细的说明信息。"
    />

    <sp-alert
      type="error"
      title="操作失败"
      text="您的操作失败，请检查输入内容后重试。"
      closable
    />
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
