<text>
> 不同状态的开关组件（正常、禁用、只读、加载等）
</text>

<template>
  <div class="switch-states-demo">
    <sp-switch
      v-model="normalValue"
      label="正常状态"
    />

    <sp-switch
      v-model="disabledOffValue"
      label="禁用状态（关闭）"
      disabled
    />

    <sp-switch
      v-model="disabledOnValue"
      label="禁用状态（开启）"
      disabled
    />

    <sp-switch
      v-model="readonlyValue"
      label="只读状态"
      readonly
    />

    <sp-switch
      v-model="loadingValue"
      label="加载状态"
      loading
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const normalValue = ref(false)
  const disabledOffValue = ref(false)
  const disabledOnValue = ref(true)
  const readonlyValue = ref(true)
  const loadingValue = ref(false)
</script>

<style scoped>
  .switch-states-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
