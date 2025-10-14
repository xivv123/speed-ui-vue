<text>
> 不同颜色主题的滑块，支持多种预设颜色
</text>

<template>
  <div class="slider-colors-demo">
    <div class="demo-section">
      <h4>Primary 主色</h4>
      <SPSlider
        v-model="primaryValue"
        :min="0"
        :max="100"
        :step="1"
        color="primary"
        style="width: 400px"
      />
      <p>当前值: {{ primaryValue }}</p>
    </div>

    <div class="demo-section">
      <h4>Secondary 次色</h4>
      <SPSlider
        v-model="secondaryValue"
        :min="0"
        :max="100"
        :step="1"
        color="secondary"
        style="width: 400px"
      />
      <p>当前值: {{ secondaryValue }}</p>
    </div>

    <div class="demo-section">
      <h4>Success 成功</h4>
      <SPSlider
        v-model="successValue"
        :min="0"
        :max="100"
        :step="1"
        color="success"
      />
      <p>当前值: {{ successValue }}</p>
    </div>

    <div class="demo-section">
      <h4>Warning 警告</h4>
      <SPSlider
        v-model="warningValue"
        :min="0"
        :max="100"
        :step="1"
        color="warning"
      />
      <p>当前值: {{ warningValue }}</p>
    </div>

    <div class="demo-section">
      <h4>Error 错误</h4>
      <SPSlider
        v-model="errorValue"
        :min="0"
        :max="100"
        :step="1"
        color="error"
      />
      <p>当前值: {{ errorValue }}</p>
    </div>

    <div class="demo-section">
      <h4>Info 信息</h4>
      <SPSlider
        v-model="infoValue"
        :min="0"
        :max="100"
        :step="1"
        color="info"
      />
      <p>当前值: {{ infoValue }}</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const primaryValue = ref(30)
  const secondaryValue = ref(40)
  const successValue = ref(50)
  const warningValue = ref(60)
  const errorValue = ref(70)
  const infoValue = ref(80)
</script>

<style scoped>
  .slider-colors-demo {
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

  /* 为所有滑块设置统一宽度 */
  .demo-section :deep(.sp-slider) {
    width: 100% !important;
    min-width: 300px !important;
    max-width: 500px !important;
  }

  /* 确保滑块容器也有正确的宽度 */
  .demo-section :deep(.sp-slider__container) {
    width: 100% !important;
  }

  .range-colors {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
