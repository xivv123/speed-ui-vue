<template>
  <DemoContainer title="SPLoading 加载组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="全屏加载遮罩">
      <sp-btn @click="showBasicLoading = !showBasicLoading">
        {{ showBasicLoading ? '隐藏' : '显示' }}基础加载
      </sp-btn>
      <SPLoading v-model="showBasicLoading" text="加载中..." />
    </DemoSection>

    <sp-space :size="24" />

    <!-- 局部加载 -->
    <DemoSection title="局部加载" subtitle="在指定容器内显示加载状态">
      <sp-btn @click="showLocalLoading = !showLocalLoading">
        {{ showLocalLoading ? '隐藏' : '显示' }}局部加载
      </sp-btn>
      <sp-space :size="16" />
      <div class="demo-container">
        <div class="content-box">
          <p>这是一个容器内容区域</p>
          <p>当加载状态激活时，此区域会被遮罩覆盖</p>
        </div>
        <SPLoading
          v-model="showLocalLoading"
          absolute
          contained
          text="正在加载数据..."
          color="primary"
        />
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 确定进度 -->
    <DemoSection title="确定进度" subtitle="显示具体的进度百分比">
      <div class="button-group">
        <sp-btn @click="startProgressLoading">开始进度加载</sp-btn>
        <sp-btn @click="resetProgress">重置进度</sp-btn>
      </div>
      <SPLoading
        v-model="showProgressLoading"
        :indeterminate="false"
        :progress="progressValue"
        :text="`加载进度: ${progressValue}%`"
        color="success"
      />
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义样式 -->
    <DemoSection title="自定义样式" subtitle="自定义颜色、大小和样式">
      <sp-btn @click="showCustomLoading = !showCustomLoading">
        {{ showCustomLoading ? '隐藏' : '显示' }}自定义加载
      </sp-btn>
      <SPLoading
        v-model="showCustomLoading"
        text="自定义样式加载中..."
        color="warning"
        scrim-color="rgba(0, 0, 0, 0.8)"
        :size="64"
        :width="6"
      />
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同尺寸 -->
    <DemoSection title="不同尺寸" subtitle="展示不同尺寸的加载指示器">
      <sp-btn @click="showSizeLoading = !showSizeLoading">
        {{ showSizeLoading ? '隐藏' : '显示' }}尺寸演示
      </sp-btn>
      <sp-space :size="16" />
      <div class="size-demo">
        <div class="size-item">
          <h4>小尺寸 (32px)</h4>
          <SPLoading v-model="showSizeLoading" absolute contained text="小" :size="32" :width="3" />
        </div>
        <div class="size-item">
          <h4>中等尺寸 (48px)</h4>
          <SPLoading v-model="showSizeLoading" absolute contained text="中" :size="48" :width="4" />
        </div>
        <div class="size-item">
          <h4>大尺寸 (64px)</h4>
          <SPLoading v-model="showSizeLoading" absolute contained text="大" :size="64" :width="5" />
        </div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const showBasicLoading = ref(false)
const showLocalLoading = ref(false)
const showProgressLoading = ref(false)
const showCustomLoading = ref(false)
const showSizeLoading = ref(false)
const progressValue = ref(0)

let progressTimer: ReturnType<typeof setInterval> | null = null

const startProgressLoading = () => {
  showProgressLoading.value = true
  progressValue.value = 0

  if (progressTimer) clearInterval(progressTimer)

  progressTimer = setInterval(() => {
    progressValue.value += 10
    if (progressValue.value >= 100) {
      clearInterval(progressTimer!)
      progressTimer = null
      setTimeout(() => {
        showProgressLoading.value = false
      }, 500)
    }
  }, 500)
}

const resetProgress = () => {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
  progressValue.value = 0
  showProgressLoading.value = false
}
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
}

.demo-container {
  position: relative;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.content-box {
  padding: 20px;
}

.size-demo {
  display: flex;
  gap: 20px;
}

.size-item {
  flex: 1;
  position: relative;
  border: 1px dashed #999;
  border-radius: 8px;
  padding: 10px;
  min-height: 150px;
}

.size-item h4 {
  margin: 0 0 10px 0;
}
</style>
