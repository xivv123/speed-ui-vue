<text>
> 不同状态的单选按钮（正常、禁用、只读等）
</text>

<template>
  <div class="radio-states-demo">
    <sp-radio-group
      v-model="disabledValue"
      label="禁用状态演示："
      inline
    >
      <sp-radio
        value="option1"
        label="正常选项"
      />
      <sp-radio
        value="option2"
        label="禁用选项"
        disabled
      />
      <sp-radio
        value="option3"
        label="另一个正常选项"
      />
    </sp-radio-group>

    <sp-radio-group
      v-model="readonlyValue"
      label="只读状态："
      readonly
      inline
    >
      <sp-radio
        value="option1"
        label="选项 1"
      />
      <sp-radio
        value="option2"
        label="选项 2"
      />
      <sp-radio
        value="option3"
        label="选项 3"
      />
    </sp-radio-group>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const disabledValue = ref('option1')
  const readonlyValue = ref('option2')
</script>

<style scoped>
  .radio-states-demo {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
