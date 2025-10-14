<text>
表单对话框,在对话框中使用表单组件收集用户输入。
</text>

<template>
  <sp-btn @click="formDialog = true" variant="filled" color="warning">
    打开表单对话框
  </sp-btn>

  <sp-dialog v-model="formDialog" max-width="500px">
    <sp-card title="用户信息" subtitle="请填写您的信息" variant="elevated">
      <sp-card-text>
        <sp-form @submit="handleFormSubmit">
          <sp-text-field v-model="formData.name" label="姓名" required />
          <sp-text-field v-model="formData.email" label="邮箱" type="email" required />
          <sp-textarea v-model="formData.message" label="留言" rows="3" />
        </sp-form>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="formDialog = false" variant="text">取消</sp-btn>
        <sp-btn @click="handleFormSubmit" variant="filled">提交</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  const formDialog = ref(false)

  const formData = reactive({
    name: '',
    email: '',
    message: '',
  })

  const handleFormSubmit = (event?: Event) => {
    if (event) event.preventDefault()
    alert('表单提交成功！')
    formDialog.value = false
    // 重置表单
    Object.assign(formData, { name: '', email: '', message: '' })
  }
</script>
