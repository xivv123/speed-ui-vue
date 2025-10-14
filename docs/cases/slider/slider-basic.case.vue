<text>
> 基本的滑块用法，展示滑块组件的基础功能
</text>

<template>
  <SPSlider
    v-model="basicValue"
    :min="0"
    :max="100"
    :step="1"
  />
  <SPSlider
    v-model="stepValue"
    :min="0"
    :max="100"
    :step="10"
  />
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const basicValue = ref(30)
  const stepValue = ref(50)
  const labelValue = ref(0.7)
</script>

<style scoped>
  .slider-demo {
    padding: 20px;
  }

  .demo-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
  }

  .slider-wrapper {
    padding: 15px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 400px; /* 确保容器有足够宽度 */
  }

  .slider-wrapper h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #555;
    font-size: 16px;
  }

  .slider-wrapper p {
    margin-top: 15px;
    margin-bottom: 0;
    color: #666;
    font-weight: 500;
  }
</style>
