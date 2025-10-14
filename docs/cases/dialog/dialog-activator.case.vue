<text>
使用激活器插槽,通过 activator 插槽绑定触发元素。
</text>

<template>
  <sp-dialog v-model="activatorDialog">
    <template #activator="{ props }">
      <sp-btn v-bind="props" variant="filled" color="success">点击打开对话框</sp-btn>
    </template>

    <sp-card title="激活器对话框" subtitle="使用 activator 插槽" variant="elevated">
      <sp-card-text>
        这个对话框使用了激活器插槽，通过 activator 插槽可以将任何元素作为触发器，点击即可打开对话框。
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="activatorDialog = false" variant="text">取消</sp-btn>
        <sp-btn @click="activatorDialog = false" variant="filled">确定</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const activatorDialog = ref(false)
</script>
