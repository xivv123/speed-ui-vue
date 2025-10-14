<text>
> 垂直方向的滑块，适用于音量控制等场景
</text>

<template>
  <div class="slider-vertical-demo">
    <div class="demo-section">
      <h4>垂直滑块</h4>
      <div class="vertical-container">
        <SPSlider
          v-model="verticalValue"
          :min="0"
          :max="100"
          :step="1"
          direction="vertical"
          style="height: 200px"
        />
        <p>音量: {{ verticalValue }}%</p>
      </div>
    </div>

    <div class="demo-section">
      <h4>多个垂直滑块</h4>
      <div class="multiple-vertical">
        <div class="vertical-item">
          <SPSlider
            v-model="bass"
            :min="0"
            :max="100"
            :step="1"
            direction="vertical"
            color="primary"
            style="height: 200px"
          />
          <span>低音: {{ bass }}</span>
        </div>
        <div class="vertical-item">
          <SPSlider
            v-model="mid"
            :min="0"
            :max="100"
            :step="1"
            direction="vertical"
            color="secondary"
            style="height: 200px"
          />
          <span>中音: {{ mid }}</span>
        </div>
        <div class="vertical-item">
          <SPSlider
            v-model="treble"
            :min="0"
            :max="100"
            :step="1"
            direction="vertical"
            color="success"
            style="height: 200px"
          />
          <span>高音: {{ treble }}</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>温度控制</h4>
      <div class="vertical-container">
        <SPSlider
          v-model="temperature"
          :min="16"
          :max="30"
          :step="0.5"
          direction="vertical"
          color="warning"
          style="height: 200px"
        />
        <p>温度: {{ temperature.toFixed(1) }}°C</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const verticalValue = ref(60)
  const bass = ref(50)
  const mid = ref(60)
  const treble = ref(70)
  const temperature = ref(22)
</script>

<style scoped>
  .slider-vertical-demo {
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

  .vertical-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 200px;
  }

  .multiple-vertical {
    display: flex;
    gap: 3rem;
    height: 200px;
    align-items: flex-end;
  }

  .vertical-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    height: 100%;
  }

  .vertical-item span {
    font-size: 0.9rem;
    color: #666;
  }

  /* 水平滑块设置统一宽度 */
  .demo-section:not(.vertical-demo) :deep(.sp-slider) {
    width: 100% !important;
    min-width: 300px !important;
    max-width: 500px !important;
  }

  .demo-section:not(.vertical-demo) :deep(.sp-slider__container) {
    width: 100% !important;
  }
</style>
