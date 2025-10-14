<text>
基础用法,展示最简单的对话框打开和关闭功能。
</text>

<template>
  <sp-btn @click="basicDialog = true">打开基础对话框</sp-btn>

  <sp-dialog v-model="basicDialog" max-width="500px">
    <sp-card title="基础对话框" subtitle="简单的对话框示例" variant="elevated">
      <sp-card-text>
        这是一个基础的对话框组件，展示了最简单的使用方式。
        对话框可以包含任何内容，并提供了灵活的交互方式。
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="basicDialog = false" variant="text">取消</sp-btn>
        <sp-btn @click="basicDialog = false" variant="filled">确定</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const basicDialog = ref(false)
</script>
