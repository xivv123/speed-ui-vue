<text>
> 不同变体样式的单选按钮，包括默认和边框样式
</text>

<template>
  <div class="radio-variants-demo">
    <sp-radio-group
      v-model="outlinedValue"
      label="边框样式："
      inline
    >
      <sp-radio
        value="small"
        label="小"
        variant="outlined"
      />
      <sp-radio
        value="medium"
        label="中"
        variant="outlined"
      />
      <sp-radio
        value="large"
        label="大"
        variant="outlined"
      />
    </sp-radio-group>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const outlinedValue = ref('medium')
</script>

<style scoped>
  .radio-variants-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
