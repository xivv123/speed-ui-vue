<text>
> 自定义样式的滑块，展示高级定制功能
</text>

<template>
  <div class="slider-custom-demo">
    <div class="demo-section">
      <h4>带图标的滑块</h4>
      <div class="icon-slider">
        <span class="slider-icon">🔅</span>
        <SPSlider
          v-model="brightnessValue"
          :min="0"
          :max="100"
          :step="1"
          color="warning"
        />
        <span class="slider-icon">🔆</span>
      </div>
      <p>亮度: {{ brightnessValue }}%</p>
    </div>

    <div class="demo-section">
      <h4>多段式滑块</h4>
      <div class="multi-segment">
        <SPSlider
          v-model="segmentValue"
          :min="0"
          :max="100"
          :step="25"
          color="success"
        />
        <div class="segment-labels">
          <span>低</span>
          <span>中低</span>
          <span>中</span>
          <span>中高</span>
          <span>高</span>
        </div>
        <p>当前级别: {{ getSegmentLabel(segmentValue) }}</p>
      </div>
    </div>

    <div class="demo-section">
      <h4>带单位的滑块</h4>
      <div class="unit-sliders">
        <div class="unit-slider">
          <label>速度控制</label>
          <SPSlider
            v-model="speedValue"
            :min="0"
            :max="120"
            :step="5"
            color="error"
          />
          <span class="unit">{{ speedValue }} km/h</span>
        </div>

        <div class="unit-slider">
          <label>重量设置</label>
          <SPSlider
            v-model="weightValue"
            :min="0"
            :max="100"
            :step="0.5"
            color="info"
          />
          <span class="unit">{{ weightValue.toFixed(1) }} kg</span>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定义样式滑块</h4>
      <div class="custom-styles">
        <div class="custom-item">
          <h5>圆角样式</h5>
          <SPSlider
            v-model="roundedValue"
            :min="0"
            :max="100"
            :step="1"
            color="primary"
            class="rounded-slider"
          />
          <p>值: {{ roundedValue }}</p>
        </div>

        <div class="custom-item">
          <h5>扁平样式</h5>
          <SPSlider
            v-model="flatValue"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            class="flat-slider"
          />
          <p>值: {{ flatValue }}</p>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>特殊用途滑块</h4>
      <div class="special-sliders">
        <div class="special-item">
          <h5>透明度控制</h5>
          <SPSlider
            v-model="opacityValue"
            :min="0"
            :max="100"
            :step="1"
            color="info"
          />
          <div
            class="opacity-preview"
            :style="{ opacity: opacityValue / 100 }"
          >
            透明度预览 {{ opacityValue }}%
          </div>
        </div>

        <div class="special-item">
          <h5>颜色饱和度</h5>
          <SPSlider
            v-model="saturationValue"
            :min="0"
            :max="100"
            :step="1"
            color="warning"
          />
          <div
            class="saturation-preview"
            :style="{ filter: `saturate(${saturationValue}%)` }"
          >
            🌈 饱和度: {{ saturationValue }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const brightnessValue = ref(80)
  const segmentValue = ref(50)
  const speedValue = ref(60)
  const weightValue = ref(65.5)
  const roundedValue = ref(40)
  const flatValue = ref(60)
  const opacityValue = ref(75)
  const saturationValue = ref(100)

  const getSegmentLabel = value => {
    if (value === 0) return '低'
    if (value === 25) return '中低'
    if (value === 50) return '中'
    if (value === 75) return '中高'
    if (value === 100) return '高'
    return '自定义'
  }
</script>

<style scoped>
  .slider-custom-demo {
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

  .custom-styles {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .custom-item {
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .custom-item h5 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1rem;
  }

  .custom-item p {
    margin: 0.5rem 0 0 0;
    color: #666;
    font-size: 0.9rem;
  }

  .rounded-slider {
    border-radius: 20px;
  }

  .flat-slider {
    border-radius: 0;
  }

  .icon-slider {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .slider-icon {
    font-size: 1.5rem;
    color: #666;
  }

  .multi-segment {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .segment-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #999;
    margin-top: 0.5rem;
  }

  .unit-sliders {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .unit-slider {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .unit-slider label {
    min-width: 80px;
    font-weight: 500;
    color: #333;
  }

  .unit {
    min-width: 80px;
    font-weight: bold;
    color: #333;
    text-align: right;
  }

  .special-sliders {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .special-item {
    padding: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .special-item h5 {
    margin: 0 0 1rem 0;
    color: #333;
    font-size: 1rem;
  }

  .opacity-preview {
    margin-top: 1rem;
    padding: 1rem;
    background: #4caf50;
    color: white;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
  }

  .saturation-preview {
    margin-top: 1rem;
    padding: 1rem;
    background: linear-gradient(
      45deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57
    );
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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
