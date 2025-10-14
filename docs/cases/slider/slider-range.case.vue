<text>
> 使用两个滑块模拟范围选择功能
</text>

<template>
  <div class="slider-range-demo">
    <div class="demo-section">
      <h4>价格范围选择</h4>
      <div class="range-container">
        <div class="range-item">
          <label>最低价格</label>
          <div class="slider-container">
            <SPSlider
              v-model="priceMin"
              :min="0"
              :max="priceMax - 50"
              :step="50"
            />
          </div>
          <span>¥{{ priceMin }}</span>
        </div>
        <div class="range-item">
          <label>最高价格</label>
          <div class="slider-container">
            <SPSlider
              v-model="priceMax"
              :min="priceMin + 50"
              :max="1000"
              :step="50"
            />
          </div>
          <span>¥{{ priceMax }}</span>
        </div>
      </div>
      <p>价格范围: ¥{{ priceMin }} - ¥{{ priceMax }}</p>
    </div>

    <div class="demo-section">
      <h4>时间范围选择</h4>
      <div class="range-container">
        <div class="range-item">
          <label>开始时间</label>
          <SPSlider
            v-model="timeStart"
            :min="0"
            :max="timeEnd - 1"
            :step="1"
          />
          <span>{{ timeStart }}:00</span>
        </div>
        <div class="range-item">
          <label>结束时间</label>
          <SPSlider
            v-model="timeEnd"
            :min="timeStart + 1"
            :max="24"
            :step="1"
          />
          <span>{{ timeEnd }}:00</span>
        </div>
      </div>
      <p>时间范围: {{ timeStart }}:00 - {{ timeEnd }}:00</p>
    </div>

    <div class="demo-section">
      <h4>年龄范围选择</h4>
      <div class="range-container">
        <div class="range-item">
          <label>最小年龄</label>
          <SPSlider
            v-model="ageMin"
            :min="18"
            :max="ageMax - 1"
            :step="1"
          />
          <span>{{ ageMin }}岁</span>
        </div>
        <div class="range-item">
          <label>最大年龄</label>
          <SPSlider
            v-model="ageMax"
            :min="ageMin + 1"
            :max="80"
            :step="1"
          />
          <span>{{ ageMax }}岁</span>
        </div>
      </div>
      <p>年龄范围: {{ ageMin }}岁 - {{ ageMax }}岁</p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const priceMin = ref(200)
  const priceMax = ref(800)
  const timeStart = ref(9)
  const timeEnd = ref(18)
  const ageMin = ref(25)
  const ageMax = ref(45)
</script>

<style scoped>
  .slider-range-demo {
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

  .range-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .range-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .range-item label {
    min-width: 80px;
    font-weight: 500;
    color: #333;
  }

  .range-item span {
    min-width: 60px;
    font-weight: bold;
    color: #666;
  }

  .slider-container {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
  }

  /* 确保滑块组件有正确的宽度 */
  .slider-container :deep(.sp-slider) {
    width: 100% !important;
  }

  .slider-container :deep(.sp-slider__container) {
    width: 100% !important;
  }
</style>
