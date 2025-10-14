<text>
> 不同标签位置的开关组件，支持左侧、右侧、上方等位置
</text>

<template>
  <div class="switch-label-demo">
    <sp-switch
      v-model="rightValue"
      label="标签在右侧"
      label-position="right"
    />

    <sp-switch
      v-model="leftValue"
      label="标签在左侧"
      label-position="left"
    />

    <sp-switch
      v-model="topValue"
      label="标签在上方"
      label-position="top"
    />

    <sp-switch
      v-model="noLabelValue"
      :show-label="false"
    />
    <p><small>无标签开关</small></p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const rightValue = ref(false)
  const leftValue = ref(true)
  const topValue = ref(false)
  const noLabelValue = ref(true)
</script>

<style scoped>
  .switch-label-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .switch-label-demo p {
    margin: -0.5rem 0 0 0;
    color: #666;
    font-size: 0.9rem;
  }
</style>
