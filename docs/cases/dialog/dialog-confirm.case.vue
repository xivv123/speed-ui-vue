<text>
确认对话框,用于需要用户确认的危险操作。
</text>

<template>
  <sp-btn @click="confirmDialog = true" variant="filled" color="error">删除操作</sp-btn>

  <sp-dialog v-model="confirmDialog" max-width="400px">
    <sp-card title="确认删除" subtitle="此操作无法撤销" variant="elevated">
      <sp-card-text>
        <div style="text-align: center; font-size: 3rem; margin: 20px 0">⚠️</div>
        <p style="text-align: center">您确定要删除这个项目吗？此操作无法撤销。</p>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="confirmDialog = false" variant="text">取消</sp-btn>
        <sp-btn @click="handleDelete" variant="filled" color="error">删除</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const confirmDialog = ref(false)

  const handleDelete = () => {
    alert('删除成功！')
    confirmDialog.value = false
  }
</script>
