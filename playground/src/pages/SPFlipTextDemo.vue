<template>
  <DemoContainer title="SPFlipText 翻转文字组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="自动循环翻转文字">
      <div class="flip-container">
        <sp-flip-text>
          <template #front>
            前面的文字
          </template>
          <template #back>
            后面的文字
          </template>
        </sp-flip-text>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 翻转方向 -->
    <DemoSection title="翻转方向" subtitle="支持四个方向的翻转">
      <div class="direction-group">
        <div class="direction-item">
          <h4>向上翻转</h4>
          <div class="flip-container">
            <sp-flip-text direction="flip-up" :interval="2000">
              <template #front>
                向上翻转 ↑
              </template>
              <template #back>
                翻转完成 ✓
              </template>
            </sp-flip-text>
          </div>
        </div>

        <div class="direction-item">
          <h4>向下翻转</h4>
          <div class="flip-container">
            <sp-flip-text direction="flip-down" :interval="2000">
              <template #front>
                向下翻转 ↓
              </template>
              <template #back>
                翻转完成 ✓
              </template>
            </sp-flip-text>
          </div>
        </div>

        <div class="direction-item">
          <h4>向左翻转</h4>
          <div class="flip-container">
            <sp-flip-text direction="flip-left" :interval="2000">
              <template #front>
                向左翻转 ←
              </template>
              <template #back>
                翻转完成 ✓
              </template>
            </sp-flip-text>
          </div>
        </div>

        <div class="direction-item">
          <h4>向右翻转</h4>
          <div class="flip-container">
            <sp-flip-text direction="flip-right" :interval="2000">
              <template #front>
                向右翻转 →
              </template>
              <template #back>
                翻转完成 ✓
              </template>
            </sp-flip-text>
          </div>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 触发方式 -->
    <DemoSection title="触发方式" subtitle="自动、悬停、点击">
      <div class="trigger-group">
        <div class="trigger-item">
          <h4>自动触发</h4>
          <div class="flip-container">
            <sp-flip-text trigger="auto" :interval="1500">
              <template #front>
                自动翻转
              </template>
              <template #back>
                循环播放
              </template>
            </sp-flip-text>
          </div>
        </div>

        <div class="trigger-item">
          <h4>悬停触发</h4>
          <div class="flip-container">
            <sp-flip-text trigger="hover" :loop="false">
              <template #front>
                鼠标悬停
              </template>
              <template #back>
                触发翻转
              </template>
            </sp-flip-text>
          </div>
        </div>

        <div class="trigger-item">
          <h4>点击触发</h4>
          <div class="flip-container">
            <sp-flip-text trigger="click" :loop="false">
              <template #front>
                点击我
              </template>
              <template #back>
                翻转了！
              </template>
            </sp-flip-text>
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
.flip-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  background: white;
  border-radius: 4px;
  margin: 10px 0;
}

.direction-group,
.trigger-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.direction-item,
.trigger-item {
  text-align: center;
}

h4 {
  color: #555;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
}
</style>
