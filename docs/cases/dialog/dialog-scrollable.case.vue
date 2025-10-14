<text>
可滚动对话框,当内容超出对话框高度时会出现滚动条。
</text>

<template>
  <sp-btn @click="scrollableDialog = true" variant="filled" color="secondary">
    打开可滚动对话框
  </sp-btn>

  <sp-dialog v-model="scrollableDialog" scrollable max-width="600px">
    <sp-card title="可滚动对话框" subtitle="内容超出时自动滚动" variant="elevated">
      <sp-card-text>
        <p v-for="i in 20" :key="i">
          这是第 {{ i }} 段内容。当内容超出对话框高度时，会出现滚动条。
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="scrollableDialog = false" variant="text">取消</sp-btn>
        <sp-btn @click="scrollableDialog = false" variant="filled">确定</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const scrollableDialog = ref(false)
</script>
