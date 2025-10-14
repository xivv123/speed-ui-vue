<text>
  基础用法,展示最简单的抽屉打开和关闭功能。
</text>
<template>
  <sp-btn @click="drawer = true">打开抽屉</sp-btn>

  <sp-drawer v-model="drawer">
    <div style="padding: 24px;">
      <h3>抽屉标题</h3>
      <p>这是一个基础的抽屉组件，从右侧滑入。</p>
      <sp-btn @click="drawer = false" variant="filled">关闭</sp-btn>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(false)
</script>
