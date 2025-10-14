<text>
> 基本的开关用法，展示开关组件的基础功能
</text>

<template>
  <div class="switch-demo">
    <sp-switch
      v-model="basicValue1"
      label="基础开关"
    />

    <sp-switch
      v-model="basicValue2"
      label="默认开启"
    />

    <sp-switch v-model="basicValue3" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const basicValue1 = ref(false)
  const basicValue2 = ref(true)
  const basicValue3 = ref(false)
</script>

<style scoped>
  .switch-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
