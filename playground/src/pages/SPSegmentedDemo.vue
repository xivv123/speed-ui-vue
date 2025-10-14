<template>
  <div class="sp-segmented-demo">
    <header class="demo-header">
      <h1>📚 SPSegmented 分段控制组件演示</h1>
      <p>统一用法：仅使用 <code>sp-segmented</code> + <code>options</code>。</p>
    </header>

    <main class="demo-content">
      <!-- 基础用法（带滑块） -->
      <section class="demo-section">
        <h2>基础用法（带滑块）</h2>
        <div class="demo-row">
          <sp-segmented v-model="basic" :options="basicOptions" />
        </div>
        <p class="demo-result">当前选中：{{ basic }}</p>
      </section>
      <section class="demo-section">
        <h2>基础用法（带滑块）</h2>
        <div class="demo-row">
          <sp-segmented variant="outlined" v-model="basic" :options="basicOptions" />
        </div>
        <p class="demo-result">当前选中：{{ basic }}</p>
      </section>

      <section class="demo-section">
        <h2>基础用法（带滑块）</h2>
        <div class="demo-row">
          <sp-segmented variant="solo" v-model="basic" :options="basicOptions" />
        </div>
        <p class="demo-result">当前选中：{{ basic }}</p>
      </section>
      <!-- 颜色与状态 -->
      <section class="demo-section">
        <h2>颜色与状态</h2>
        <div class="demo-row">
          <sp-segmented variant="outlined" v-model="colored" :options="colorOptions" />
        </div>
        <div class="demo-row">
          <sp-segmented v-model="disabled" :options="disabledOptions" />
        </div>
        <p class="demo-result">颜色：{{ colored }}；禁用组：{{ disabled }}</p>
      </section>

      <!-- 自定义图标 -->
      <section class="demo-section">
        <h2>自定义图标</h2>
        <div class="demo-row">
          <sp-segmented v-model="iconValue" :options="iconOptions" />
        </div>
        <p class="demo-result">当前：{{ iconValue }}</p>
      </section>

      <!-- 多选（数组） -->
      <section class="demo-section">
        <h2>多选（数组模型）</h2>
        <div class="demo-row">
          <sp-segmented v-model="multi" :multiple="true" type="checkbox" :options="multiOptions" />
        </div>
        <p class="demo-result">已选：{{ multi }}</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const basic = ref('A')
const basicOptions = [
  { value: 'A', label: 'Daily' },
  { value: 'B', label: 'Weekly' },
  { value: 'C', label: 'Monthly' },
  { value: 'D', label: 'Quarterly' },
  { value: 'E', label: 'Yearly' },
]

const colored = ref('blue')
const colorOptions = [
  { value: 'blue', label: '蓝色', color: 'primary' },
  { value: 'success', label: '成功', color: 'success' },
  { value: 'error', label: '错误', color: 'error' },
]

const disabled = ref('1')
const disabledOptions = [
  { value: '1', label: '可用' },
  { value: '2', label: '禁用', disabled: true },
  { value: '3', label: '可用' },
]

const iconValue = ref('like')
const iconOptions = [
  { value: 'like', label: '喜欢', trueIcon: '$heart', falseIcon: '$heartOutline' },
  { value: 'star', label: '收藏', trueIcon: '$star', falseIcon: '$starOutline' },
  { value: 'thumb', label: '点赞', trueIcon: '$thumbUp', falseIcon: '$thumbUpOutline' },
]

const multi = ref<string[]>(['red'])
const multiOptions = [
  { value: 'red', label: '红' },
  { value: 'green', label: '绿' },
  { value: 'blue', label: '蓝' },
]
</script>

<style scoped>
.sp-segmented-demo {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-header {
  text-align: center;
  margin-bottom: 32px;
}

.demo-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.demo-section {
  background: #fff;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 24px;
}

.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.demo-result {
  margin-top: 12px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 8px 12px;
}
</style>
