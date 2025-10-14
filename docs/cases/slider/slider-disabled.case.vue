<text>
> 禁用状态的滑块，展示不可交互的状态
</text>

<template>
  <div class="slider-disabled-demo">
    <div class="demo-section">
      <h4>禁用状态</h4>
      <SPSlider
        v-model="disabledValue"
        :min="0"
        :max="100"
        :step="1"
        disabled
      />
      <p>当前值: {{ disabledValue }} (禁用状态)</p>
    </div>

    <div class="demo-section">
      <h4>只读状态</h4>
      <SPSlider
        v-model="readonlyValue"
        :min="0"
        :max="100"
        :step="1"
        readonly
      />
      <p>当前值: {{ readonlyValue }} (只读状态)</p>
    </div>

    <div class="demo-section">
      <h4>动态禁用控制</h4>
      <div class="control-section">
        <label>
          <input
            type="checkbox"
            v-model="isDisabled"
          />
          禁用滑块
        </label>
        <label>
          <input
            type="checkbox"
            v-model="isReadonly"
          />
          只读模式
        </label>
      </div>

      <SPSlider
        v-model="controlledValue"
        :min="0"
        :max="100"
        :step="1"
        :disabled="isDisabled"
        :readonly="isReadonly"
        color="primary"
      />
      <p>
        当前值: {{ controlledValue }}
        <span v-if="isDisabled">(禁用)</span>
        <span v-else-if="isReadonly">(只读)</span>
        <span v-else>(正常)</span>
      </p>
    </div>

    <div class="demo-section">
      <h4>不同颜色的禁用状态</h4>
      <div class="disabled-colors">
        <div class="color-item">
          <h5>禁用主色</h5>
          <SPSlider
            v-model="disabledPrimary"
            :min="0"
            :max="100"
            :step="1"
            disabled
            color="primary"
          />
          <p>值: {{ disabledPrimary }}</p>
        </div>

        <div class="color-item">
          <h5>禁用成功色</h5>
          <SPSlider
            v-model="disabledSuccess"
            :min="0"
            :max="100"
            :step="1"
            disabled
            color="success"
          />
          <p>值: {{ disabledSuccess }}</p>
        </div>

        <div class="color-item">
          <h5>禁用错误色</h5>
          <SPSlider
            v-model="disabledError"
            :min="0"
            :max="100"
            :step="1"
            disabled
            color="error"
          />
          <p>值: {{ disabledError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { SPSlider } from 'speed-ui-vue'

  const disabledValue = ref(40)
  const readonlyValue = ref(60)
  const controlledValue = ref(50)
  const isDisabled = ref(false)
  const isReadonly = ref(false)
  const disabledPrimary = ref(30)
  const disabledSuccess = ref(70)
  const disabledError = ref(90)
</script>

<style scoped>
  .slider-disabled-demo {
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

  .control-section {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .control-section label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .disabled-colors {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .color-item h5 {
    margin: 0 0 0.5rem 0;
    color: #555;
    font-size: 0.9rem;
  }

  .color-item p {
    margin: 0.5rem 0 0 0;
    font-size: 0.8rem;
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
