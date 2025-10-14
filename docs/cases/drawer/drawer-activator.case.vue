使用 Activator 插槽,通过插槽更方便地控制触发元素。

<template>
  <sp-drawer v-model="drawer">
    <template #activator="{ props }">
      <sp-btn v-bind="props">点击打开抽屉</sp-btn>
    </template>
    <div style="padding: 24px;">
      <h3>通过 Activator 打开</h3>
      <p>使用 activator 插槽可以更方便地控制触发元素</p>
      <sp-btn @click="drawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(false)
</script>
