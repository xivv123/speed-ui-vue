<text>
> 不同步长设置的滑块，展示离散值选择功能
</text>

<template>
  <div class="slider-step-demo">
    <div class="demo-section">
      <h4>步长为 1</h4>
      <div class="slider-container">
        <SPSlider
          v-model="step1Value"
          :min="0"
          :max="10"
          :step="1"
        />
      </div>
      <p>当前值: {{ step1Value }}</p>
    </div>

    <div class="demo-section">
      <h4>步长为 5</h4>
      <div class="slider-container">
        <SPSlider
          v-model="step5Value"
          :min="0"
          :max="100"
          :step="5"
        />
      </div>
      <p>当前值: {{ step5Value }}</p>
    </div>

    <div class="demo-section">
      <h4>步长为 25</h4>
      <div class="slider-container">
        <SPSlider
          v-model="step25Value"
          :min="0"
          :max="100"
          :step="25"
        />
      </div>
      <p>当前值: {{ step25Value }}</p>
    </div>

    <div class="demo-section">
      <h4>小数步长</h4>
      <div class="slider-container">
        <SPSlider
          v-model="decimalValue"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </div>
      <p>当前值: {{ decimalValue.toFixed(1) }}</p>
    </div>

    <div class="demo-section">
      <h4>温度调节</h4>
      <div class="slider-container">
        <SPSlider
          v-model="temperatureValue"
          :min="16"
          :max="30"
          :step="0.5"
          color="warning"
        />
      </div>
      <p>当前温度: {{ temperatureValue.toFixed(1) }}°C</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const step1Value = ref(5)
  const step5Value = ref(50)
  const step25Value = ref(50)
  const decimalValue = ref(0.5)
  const temperatureValue = ref(22)
</script>

<style scoped>
  .slider-step-demo {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .demo-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .demo-section h4 {
    margin: 0;
    color: #333;
    font-size: 1.1rem;
  }

  .demo-section p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  .slider-container {
    width: 100%;
    min-width: 300px;
    max-width: 500px;
    margin: 1rem 0;
  }

  /* 确保滑块组件有正确的宽度 */
  .slider-container :deep(.sp-slider) {
    width: 100% !important;
  }

  .slider-container :deep(.sp-slider__container) {
    width: 100% !important;
  }
</style>
