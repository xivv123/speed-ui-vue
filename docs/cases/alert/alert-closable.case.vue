<text>
设置 closable 属性显示关闭按钮，可以通过 v-model 控制显示状态
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-alert
      type="success"
      closable
      title="成功提示"
      text="这是一条可以关闭的成功提示信息"
    />

    <sp-alert
      type="warning"
      closable
      title="警告提示"
      text="这是一条可以关闭的警告提示信息"
    />
  </sp-space>
</template>

<script setup>
</script>

<style scoped>
</style>
