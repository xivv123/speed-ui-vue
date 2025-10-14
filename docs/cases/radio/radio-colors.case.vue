<text>
> 不同颜色主题的单选按钮，支持多种预设颜色
</text>

<template>
  <div class="radio-colors-demo">
    <sp-radio-group
      v-model="colorValue"
      label="选择颜色主题："
      inline
    >
      <sp-radio
        value="primary"
        label="主色"
        color="primary"
      />
      <sp-radio
        value="secondary"
        label="次色"
        color="secondary"
      />
      <sp-radio
        value="success"
        label="成功"
        color="success"
      />
      <sp-radio
        value="warning"
        label="警告"
        color="warning"
      />
      <sp-radio
        value="error"
        label="错误"
        color="error"
      />
    </sp-radio-group>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const colorValue = ref('primary')
</script>

<style scoped>
  .radio-colors-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
