<text>
全屏对话框,占据整个屏幕空间,适用于需要大量内容展示的场景。
</text>

<template>
  <sp-btn @click="fullscreenDialog = true" variant="filled" color="primary">
    打开全屏对话框
  </sp-btn>

  <sp-dialog v-model="fullscreenDialog" fullscreen>
    <sp-card title="全屏对话框" subtitle="占据整个屏幕空间" variant="elevated">
      <sp-card-text>
        <p>这是一个全屏对话框，占据整个屏幕空间。</p>
        <p>适用于需要大量内容展示的场景，比如详细的表单、复杂的数据展示等。</p>
        <p>全屏模式下可以充分利用屏幕空间，提供更好的用户体验。</p>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="fullscreenDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const fullscreenDialog = ref(false)
</script>
