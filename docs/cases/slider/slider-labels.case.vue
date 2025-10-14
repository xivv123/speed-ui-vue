<text>
> 带自定义标签显示的滑块，提供更好的用户体验
</text>

<template>
  <div class="slider-labels-demo">
    <div class="demo-section">
      <h4>评分滑块</h4>
      <SPSlider
        v-model="ratingValue"
        :min="0"
        :max="5"
        :step="1"
        color="warning"
      />
      <div class="rating-display">
        <span class="rating-text">{{ getRatingText(ratingValue) }}</span>
        <span class="rating-stars">
          {{ '★'.repeat(ratingValue) + '☆'.repeat(5 - ratingValue) }}
        </span>
      </div>
    </div>

    <div class="demo-section">
      <h4>温度控制</h4>
      <SPSlider
        v-model="temperatureValue"
        :min="16"
        :max="30"
        :step="1"
        color="error"
      />
      <div class="temperature-display">
        <span class="temp-value">{{ temperatureValue }}°C</span>
        <span
          class="temp-status"
          :class="getTemperatureClass(temperatureValue)"
        >
          {{ getTemperatureStatus(temperatureValue) }}
        </span>
      </div>
    </div>

    <div class="demo-section">
      <h4>音量控制</h4>
      <SPSlider
        v-model="volumeValue"
        :min="0"
        :max="100"
        :step="5"
        color="primary"
      />
      <div class="volume-display">
        <span class="volume-icon">{{ getVolumeIcon(volumeValue) }}</span>
        <span class="volume-text">{{ getVolumeText(volumeValue) }}</span>
        <span class="volume-percent">{{ volumeValue }}%</span>
      </div>
    </div>

    <div class="demo-section">
      <h4>进度控制</h4>
      <SPSlider
        v-model="progressValue"
        :min="0"
        :max="100"
        :step="1"
        color="success"
      />
      <div class="progress-display">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: progressValue + '%' }"
          ></div>
        </div>
        <span class="progress-text">{{ progressValue }}% 完成</span>
      </div>
    </div>

    <div class="demo-section">
      <h4>亮度控制</h4>
      <SPSlider
        v-model="brightnessValue"
        :min="0"
        :max="100"
        :step="1"
        color="warning"
      />
      <div class="brightness-display">
        <span class="brightness-icon">
          {{ getBrightnessIcon(brightnessValue) }}
        </span>
        <span class="brightness-text">亮度: {{ brightnessValue }}%</span>
        <div
          class="brightness-preview"
          :style="{ opacity: brightnessValue / 100 }"
        >
          💡
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const ratingValue = ref(3)
  const temperatureValue = ref(22)
  const volumeValue = ref(70)
  const progressValue = ref(65)
  const brightnessValue = ref(80)

  const getRatingText = value => {
    const ratings = ['很差', '差', '一般', '好', '很好', '优秀']
    return ratings[value] || '未知'
  }

  const getTemperatureStatus = temp => {
    if (temp < 18) return '偏冷'
    if (temp < 22) return '凉爽'
    if (temp < 26) return '舒适'
    if (temp < 28) return '温暖'
    return '偏热'
  }

  const getTemperatureClass = temp => {
    if (temp < 18) return 'cold'
    if (temp < 22) return 'cool'
    if (temp < 26) return 'comfortable'
    if (temp < 28) return 'warm'
    return 'hot'
  }

  const getVolumeText = volume => {
    if (volume === 0) return '静音'
    if (volume < 30) return '低音量'
    if (volume < 70) return '中等音量'
    return '高音量'
  }

  const getVolumeIcon = volume => {
    if (volume === 0) return '🔇'
    if (volume < 30) return '🔈'
    if (volume < 70) return '🔉'
    return '🔊'
  }

  const getBrightnessIcon = brightness => {
    if (brightness < 30) return '🌑'
    if (brightness < 70) return '🌓'
    return '🌕'
  }
</script>

<style scoped>
  .slider-labels-demo {
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

  .rating-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .rating-text {
    font-weight: bold;
    color: #333;
  }

  .rating-stars {
    font-size: 1.2rem;
    color: #ffc107;
  }

  .temperature-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .temp-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .temp-status {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .temp-status.cold {
    background: #e3f2fd;
    color: #1976d2;
  }
  .temp-status.cool {
    background: #e8f5e8;
    color: #388e3c;
  }
  .temp-status.comfortable {
    background: #fff3e0;
    color: #f57c00;
  }
  .temp-status.warm {
    background: #fce4ec;
    color: #c2185b;
  }
  .temp-status.hot {
    background: #ffebee;
    color: #d32f2f;
  }

  .volume-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .volume-icon {
    font-size: 1.2rem;
  }

  .volume-text {
    color: #666;
    font-size: 0.9rem;
  }

  .volume-percent {
    font-weight: bold;
    color: #333;
  }

  .progress-display {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #4caf50;
    transition: width 0.3s ease;
  }

  .progress-text {
    font-weight: bold;
    color: #333;
    text-align: center;
  }

  .brightness-display {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .brightness-icon {
    font-size: 1.2rem;
  }

  .brightness-text {
    color: #666;
    font-size: 0.9rem;
  }

  .brightness-preview {
    font-size: 1.5rem;
    transition: opacity 0.3s ease;
  }

  /* 为所有滑块设置统一宽度 */
  .demo-section :deep(.sp-slider) {
    width: 100% !important;
    min-width: 300px !important;
    max-width: 500px !important;
  }

  .demo-section :deep(.sp-slider__container) {
    width: 100% !important;
  }
</style>
