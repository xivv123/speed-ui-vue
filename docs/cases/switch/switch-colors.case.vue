<text>
> 不同颜色主题的开关组件，支持多种预设颜色
</text>

<template>
  <div class="switch-colors-demo">
    <sp-switch
      v-model="defaultValue"
      label="默认颜色"
    />

    <sp-switch
      v-model="primaryValue"
      label="Primary"
      color="primary"
    />

    <sp-switch
      v-model="secondaryValue"
      label="Secondary"
      color="secondary"
    />

    <sp-switch
      v-model="successValue"
      label="Success"
      color="success"
    />

    <sp-switch
      v-model="warningValue"
      label="Warning"
      color="warning"
    />

    <sp-switch
      v-model="errorValue"
      label="Error"
      color="error"
    />

    <sp-switch
      v-model="infoValue"
      label="Info"
      color="info"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const defaultValue = ref(false)
  const primaryValue = ref(true)
  const secondaryValue = ref(false)
  const successValue = ref(true)
  const warningValue = ref(false)
  const errorValue = ref(true)
  const infoValue = ref(false)
</script>

<style scoped>
  .switch-colors-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
