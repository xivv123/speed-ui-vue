<template>
  <DemoContainer title="🎚️ SPSlider TSX滑块组件演示" subtitle="演示 SPSlider TSX 组件的不同变体和功能">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="基本的滑块组件使用方式">
      <div class="demo-row">
        <div class="slider-wrapper">
          <h3>默认滑块</h3>
          <SPSlider
            v-model="value1"
            :min="0"
            :max="100"
            :step="1"
          />
          <p>当前值: {{ value1 }}</p>
        </div>

        <div class="slider-wrapper">
          <h3>带标签的滑块</h3>
          <SPSlider
            v-model="value2"
            :min="0"
            :max="100"
            :step="5"
          />
          <p>当前值: {{ value2 }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 范围和步长 -->
    <DemoSection title="范围和步长" subtitle="自定义滑块的取值范围和步长">
      <div class="demo-row">
        <div class="slider-wrapper">
          <h3>自定义范围 (0-200)</h3>
          <SPSlider
            v-model="value3"
            :min="0"
            :max="200"
            :step="10"
          />
          <p>当前值: {{ value3 }}</p>
        </div>

        <div class="slider-wrapper">
          <h3>小数步长 (0-1, 步长0.1)</h3>
          <SPSlider
            v-model="value4"
            :min="0"
            :max="1"
            :step="0.1"
          />
          <p>当前值: {{ value4.toFixed(1) }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 状态演示 -->
    <DemoSection title="状态演示" subtitle="不同状态下的滑块表现">
      <div class="demo-row">
        <div class="slider-wrapper">
          <h3>禁用状态</h3>
          <SPSlider
            v-model="value5"
            :min="0"
            :max="100"
            :step="1"
            disabled
          />
          <p>当前值: {{ value5 }}</p>
        </div>

        <div class="slider-wrapper">
          <h3>只读状态</h3>
          <SPSlider
            v-model="value6"
            :min="0"
            :max="100"
            :step="1"
            readonly
          />
          <p>当前值: {{ value6 }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 颜色主题 -->
    <DemoSection title="颜色主题" subtitle="不同颜色主题的滑块">
      <div class="demo-row">
        <div class="slider-wrapper">
          <h3>主色调</h3>
          <SPSlider
            v-model="value7"
            :min="0"
            :max="100"
            :step="1"
            color="primary"
          />
          <p>当前值: {{ value7 }}</p>
        </div>

        <div class="slider-wrapper">
          <h3>成功色</h3>
          <SPSlider
            v-model="value8"
            :min="0"
            :max="100"
            :step="1"
            color="success"
          />
          <p>当前值: {{ value8 }}</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 事件演示 -->
    <DemoSection title="事件演示" subtitle="监听滑块的各种事件">
      <div class="demo-row">
        <div class="slider-wrapper">
          <h3>事件监听</h3>
          <SPSlider
            v-model="value9"
            :min="0"
            :max="100"
            :step="1"
            @start="onSliderStart"
            @end="onSliderEnd"
            @update:modelValue="onSliderChange"
          />
          <p>当前值: {{ value9 }}</p>
          <div class="event-log">
            <h4>事件日志:</h4>
            <ul>
              <li
                v-for="(event, index) in eventLog"
                :key="index"
              >
                {{ event }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 垂直滑块 -->
    <DemoSection title="垂直滑块" subtitle="垂直方向的滑块组件">
      <div class="demo-row">
        <div class="slider-wrapper vertical-demo">
          <h3>垂直方向</h3>
          <div class="vertical-sliders">
            <SPSlider
              v-model="value10"
              :min="0"
              :max="100"
              :step="1"
              direction="vertical"
              style="height: 200px"
            />
            <SPSlider
              v-model="value11"
              :min="0"
              :max="100"
              :step="1"
              direction="vertical"
              style="height: 200px"
            />
          </div>
          <p>值1: {{ value10 }}, 值2: {{ value11 }}</p>
        </div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPSlider } from '@speed-ui/ui'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

// 响应式数据
const value1 = ref(30)
const value2 = ref(50)
const value3 = ref(100)
const value4 = ref(0.5)
const value5 = ref(40)
const value6 = ref(60)
const value7 = ref(70)
const value8 = ref(80)
const value9 = ref(45)
const value10 = ref(25)
const value11 = ref(75)

// 事件日志
const eventLog = ref<string[]>([])

// 事件处理函数
const onSliderStart = (value: number) => {
  eventLog.value.unshift(`开始拖拽: ${value}`)
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}

const onSliderEnd = (value: number) => {
  eventLog.value.unshift(`结束拖拽: ${value}`)
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}

const onSliderChange = (value: number) => {
  eventLog.value.unshift(`值变化: ${value}`)
  if (eventLog.value.length > 5) {
    eventLog.value.pop()
  }
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.slider-wrapper {
  flex: 1;
  min-width: 300px;
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider-wrapper h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--sp-color-text-primary);
  font-size: 16px;
}

.slider-wrapper p {
  margin-top: 15px;
  margin-bottom: 0;
  color: var(--sp-color-text-secondary);
  font-weight: 500;
}

.vertical-demo {
  text-align: center;
}

.vertical-sliders {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
}

.event-log {
  margin-top: 15px;
  padding: 10px;
  background: var(--sp-color-surface-variant);
  border-radius: 4px;
}

.event-log h4 {
  margin: 0 0 10px 0;
  color: var(--sp-color-text-primary);
  font-size: 14px;
}

.event-log ul {
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
  color: var(--sp-color-text-secondary);
}

.event-log li {
  margin-bottom: 5px;
}
</style>
