<text>
嵌套对话框,在一个对话框中打开另一个对话框。
</text>

<template>
  <sp-btn @click="parentDialog = true" variant="filled">打开父对话框</sp-btn>

  <sp-dialog v-model="parentDialog" max-width="600px">
    <sp-card title="父对话框" subtitle="可以打开子对话框" variant="elevated">
      <sp-card-text>
        <p>这是父对话框，可以在其中打开子对话框。</p>
        <sp-btn @click="childDialog = true" variant="outlined">打开子对话框</sp-btn>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="parentDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>

  <sp-dialog v-model="childDialog" max-width="400px">
    <sp-card title="子对话框" subtitle="嵌套在父对话框中" variant="elevated">
      <sp-card-text>
        <p>这是嵌套在父对话框中的子对话框。</p>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="childDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const parentDialog = ref(false)
  const childDialog = ref(false)
</script>
