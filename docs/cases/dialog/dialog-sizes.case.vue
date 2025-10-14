<text>
不同尺寸的对话框,通过 max-width 属性控制对话框宽度。
</text>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <sp-btn @click="smallDialog = true" variant="outlined">小对话框</sp-btn>
    <sp-btn @click="mediumDialog = true" variant="outlined">中等对话框</sp-btn>
    <sp-btn @click="largeDialog = true" variant="outlined">大对话框</sp-btn>
  </div>

  <!-- 小对话框 -->
  <sp-dialog v-model="smallDialog" max-width="400px">
    <sp-card title="小对话框" subtitle="400px 宽度" variant="elevated">
      <sp-card-text>这是一个小尺寸的对话框，适合简单的提示信息。</sp-card-text>
      <sp-card-actions>
        <sp-btn @click="smallDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>

  <!-- 中等对话框 -->
  <sp-dialog v-model="mediumDialog" max-width="600px">
    <sp-card title="中等对话框" subtitle="600px 宽度" variant="elevated">
      <sp-card-text>这是一个中等尺寸的对话框，适合大多数使用场景，可以容纳适量的内容和表单。</sp-card-text>
      <sp-card-actions>
        <sp-btn @click="mediumDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>

  <!-- 大对话框 -->
  <sp-dialog v-model="largeDialog" max-width="800px">
    <sp-card title="大对话框" subtitle="800px 宽度" variant="elevated">
      <sp-card-text>
        这是一个大尺寸的对话框，适合展示更多内容。可以包含表单、表格或其他复杂的内容结构，提供更宽敞的展示空间。
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="largeDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const smallDialog = ref(false)
  const mediumDialog = ref(false)
  const largeDialog = ref(false)
</script>
