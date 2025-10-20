<text>
> 控制滚动的暂停和恢复，支持鼠标悬停暂停
</text>

<template>
  <div class="demo-container">
    <div class="demo-item">
      <p class="label">手动控制暂停</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text :paused="isPaused">
          这段文字可以通过按钮控制暂停和继续
        </sp-scroll-text>
      </div>
      <div class="controls">
        <sp-btn @click="isPaused = !isPaused" size="small">
          {{ isPaused ? '继续' : '暂停' }}
        </sp-btn>
      </div>
    </div>

    <div class="demo-item">
      <p class="label">鼠标悬停时暂停</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text pause-on-hover>
          鼠标移到这段文字上时会暂停滚动
        </sp-scroll-text>
      </div>
    </div>

    <div class="demo-item">
      <p class="label">延迟3秒后开始滚动</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text :delay="3000">
          这段文字会在3秒后开始滚动
        </sp-scroll-text>
      </div>
    </div>

    <div class="demo-item">
      <p class="label">单次滚动（不循环）</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text :loop="false">
          这段文字只会滚动一次，不会循环
        </sp-scroll-text>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isPaused = ref(false)
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.scroll-wrapper {
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}

.controls {
  margin-top: 8px;
}
</style>
