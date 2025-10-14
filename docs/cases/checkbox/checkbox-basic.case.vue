<text>
> 基本的复选框用法，展示复选框组件的基础功能
</text>

<template>
  <div class="checkbox-demo">
    <sp-checkbox
      v-model="basicValue1"
      label="选项 1"
    />
    <sp-checkbox
      v-model="basicValue2"
      label="选项 2"
    />
    <sp-checkbox
      v-model="basicValue3"
      label="选项 3"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const basicValue1 = ref(false)
  const basicValue2 = ref(true)
  const basicValue3 = ref(false)
</script>

<style scoped>
  .checkbox-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
