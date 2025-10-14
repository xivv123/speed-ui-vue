<text>
> 不同尺寸的开关组件，支持 small、medium、large 三种尺寸
</text>

<template>
  <div class="switch-sizes-demo">
    <sp-switch
      v-model="smallValue"
      label="小尺寸开关"
      size="small"
    />
    
    <sp-switch
      v-model="mediumValue"
      label="中等尺寸开关"
      size="medium"
    />
    
    <sp-switch
      v-model="largeValue"
      label="大尺寸开关"
      size="large"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const smallValue = ref(false)
  const mediumValue = ref(true)
  const largeValue = ref(false)
</script>

<style scoped>
  .switch-sizes-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
</style>
