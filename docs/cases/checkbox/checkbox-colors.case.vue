<text>
> 不同颜色主题的复选框，支持多种预设颜色和自定义颜色
</text>

<template>
  <div class="checkbox-colors-demo">
    <sp-checkbox
      v-model="primaryValue"
      label="Primary 主色"
      color="primary"
    />
    <sp-checkbox
      v-model="secondaryValue"
      label="Secondary 次色"
      color="secondary"
    />
    <sp-checkbox
      v-model="successValue"
      label="Success 成功"
      color="success"
    />
    <sp-checkbox
      v-model="warningValue"
      label="Warning 警告"
      color="#785658"
    />
    <sp-checkbox
      v-model="errorValue"
      label="Error 错误"
      color="error"
    />
    <sp-checkbox
      v-model="infoValue"
      label="Info 信息"
      color="info"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const primaryValue = ref(true)
  const secondaryValue = ref(false)
  const successValue = ref(true)
  const warningValue = ref(false)
  const errorValue = ref(true)
  const infoValue = ref(false)
</script>

<style scoped>
  .checkbox-colors-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
