<template>
  <DemoContainer title="SPScrollText 滚动文字组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="从右到左滚动文字">
      <div class="scroll-container">
        <sp-scroll-text>
          这是一段滚动的文字，会从右到左持续滚动显示！
        </sp-scroll-text>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 滚动方向 -->
    <DemoSection title="滚动方向" subtitle="支持四个方向的滚动">
      <div class="direction-group">
        <div class="direction-item">
          <h4>向左滚动（默认）</h4>
          <div class="scroll-container">
            <sp-scroll-text direction="left">
              向左滚动的文字内容 →
            </sp-scroll-text>
          </div>
        </div>

        <div class="direction-item">
          <h4>向右滚动</h4>
          <div class="scroll-container">
            <sp-scroll-text direction="right">
              ← 向右滚动的文字内容
            </sp-scroll-text>
          </div>
        </div>

        <div class="direction-item">
          <h4>向上滚动</h4>
          <div class="scroll-container vertical">
            <sp-scroll-text direction="up">
              向上滚动的文字内容 ↑
            </sp-scroll-text>
          </div>
        </div>

        <div class="direction-item">
          <h4>向下滚动</h4>
          <div class="scroll-container vertical">
            <sp-scroll-text direction="down">
              ↓ 向下滚动的文字内容
            </sp-scroll-text>
          </div>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 滚动速度 -->
    <DemoSection title="滚动速度" subtitle="控制滚动速度">
      <div class="speed-group">
        <div class="speed-item">
          <h4>慢速滚动 (30px/s)</h4>
          <div class="scroll-container">
            <sp-scroll-text :speed="30">
              这是慢速滚动的文字
            </sp-scroll-text>
          </div>
        </div>

        <div class="speed-item">
          <h4>正常速度 (50px/s)</h4>
          <div class="scroll-container">
            <sp-scroll-text :speed="50">
              这是正常速度滚动的文字
            </sp-scroll-text>
          </div>
        </div>

        <div class="speed-item">
          <h4>快速滚动 (100px/s)</h4>
          <div class="scroll-container">
            <sp-scroll-text :speed="100">
              这是快速滚动的文字
            </sp-scroll-text>
          </div>
        </div>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.scroll-container {
  width: 100%;
  height: 60px;
  border: 1px dashed #ccc;
  background: #fff;
  display: flex;
  align-items: center;
  margin: 10px 0;
  overflow: hidden;
  position: relative;
}

.scroll-container.vertical {
  height: 120px;
  width: 300px;
}

.direction-group,
.speed-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.direction-item,
.speed-item {
  display: flex;
  flex-direction: column;
}

h4 {
  margin-bottom: 10px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
}
</style>
