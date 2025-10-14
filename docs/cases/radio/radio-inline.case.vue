<text>
> 内联布局的单选按钮，水平排列显示
</text>

<template>
  <div class="radio-inline-demo">
    <sp-radio-group
      v-model="inlineValue"
      label="选择尺寸："
      inline
    >
      <sp-radio
        value="small"
        label="小"
      />
      <sp-radio
        value="medium"
        label="中"
      />
      <sp-radio
        value="large"
        label="大"
      />
    </sp-radio-group>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const inlineValue = ref('medium')
</script>

<style scoped>
  .radio-inline-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
