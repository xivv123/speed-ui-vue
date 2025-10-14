<text>
> 基本的单选按钮用法，展示单选按钮组件的基础功能
</text>

<template>
  <div class="radio-demo">
    <sp-radio-group
      v-model="basicValue"
      label="选择一个选项："
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

  const basicValue = ref('option1')
</script>

<style scoped>
  .radio-demo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
