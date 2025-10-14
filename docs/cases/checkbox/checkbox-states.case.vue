<text>
> 不同状态的复选框（正常、禁用、只读、不确定状态等）
</text>

<template>
  <div class="checkbox-states-demo">
    <sp-checkbox
      v-model="normalValue"
      label="正常状态"
    />
    <sp-checkbox
      v-model="disabledValue1"
      label="禁用未选中"
      disabled
    />
    <sp-checkbox
      v-model="disabledValue2"
      label="禁用已选中"
      disabled
    />
    <sp-checkbox
      v-model="readonlyValue"
      label="只读状态"
      readonly
    />
    <sp-checkbox
      v-model="indeterminateValue"
      label="不确定状态"
      indeterminate
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const normalValue = ref(false)
  const disabledValue1 = ref(false)
  const disabledValue2 = ref(true)
  const readonlyValue = ref(true)
  const indeterminateValue = ref(false)
</script>

<style scoped>
  .checkbox-states-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
