<template>
  <DemoContainer title="SPInputNum 数字输入框组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="基本的数字输入功能">
      <sp-input-num v-model="basicValue" label="数量" />
      <p class="value-display">当前值：{{ basicValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 范围限制 -->
    <DemoSection title="范围限制" subtitle="设置最小值和最大值">
      <sp-input-num 
        v-model="rangeValue" 
        :min="0" 
        :max="100" 
        label="范围限制 (0-100)"
      />
      <p class="value-display">当前值：{{ rangeValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 精度控制 -->
    <DemoSection title="精度控制" subtitle="控制小数位数">
      <sp-input-num 
        v-model="precisionValue" 
        :precision="2" 
        :step="0.1"
        label="精度控制 (2位小数)"
      />
      <p class="value-display">当前值：{{ precisionValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 步长控制 -->
    <DemoSection title="步长控制" subtitle="设置每次增减的步长">
      <sp-input-num 
        v-model="stepValue" 
        :step="5" 
        label="步长 5"
      />
      <p class="value-display">当前值：{{ stepValue }}</p>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 前缀和后缀 -->
    <DemoSection title="前缀和后缀" subtitle="添加单位或货币符号">
      <div class="affix-group">
        <div>
          <sp-input-num 
            v-model="prefixValue" 
            prefix="$"
            label="价格"
          />
          <p class="value-display">当前值：{{ prefixValue }}</p>
        </div>
        <div>
          <sp-input-num 
            v-model="suffixValue" 
            suffix="kg"
            label="重量"
          />
          <p class="value-display">当前值：{{ suffixValue }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 禁用和只读 -->
    <DemoSection title="禁用和只读状态" subtitle="不可编辑的状态">
      <div class="state-group">
        <div>
          <sp-input-num 
            v-model="disabledValue" 
            disabled
            label="禁用状态"
          />
        </div>
        <div>
          <sp-input-num 
            v-model="readonlyValue" 
            readonly
            label="只读状态"
          />
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 可清除 -->
    <DemoSection title="可清除" subtitle="快速清空输入值">
      <sp-input-num 
        v-model="clearableValue" 
        clearable
        label="可清除"
      />
      <p class="value-display">当前值：{{ clearableValue }}</p>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const basicValue = ref(0)
const rangeValue = ref(50)
const precisionValue = ref(3.14)
const stepValue = ref(10)
const prefixValue = ref(99.99)
const suffixValue = ref(75.5)
const disabledValue = ref(25)
const readonlyValue = ref(42)
const clearableValue = ref(100)
</script>

<style scoped>
.value-display {
  margin-top: 8px;
  color: #1976d2;
  font-weight: bold;
  font-family: monospace;
  font-size: 14px;
}

.affix-group,
.state-group {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.affix-group > div,
.state-group > div {
  flex: 1;
  min-width: 200px;
}
</style>
