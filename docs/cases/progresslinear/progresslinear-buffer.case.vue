<text>
带缓冲区的进度条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">视频加载进度（已播放：{{ progress }}%，已缓冲：{{ buffer }}%）</div>
      <sp-progress-linear
        v-model="progress"
        :buffer-value="buffer"
        color="primary"
        :height="6"
      />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">流式传输进度</div>
      <sp-progress-linear
        v-model="progress2"
        :buffer-value="buffer2"
        stream
        color="success"
        :height="6"
      />
    </div>

    <div style="display: flex; gap: 12px;">
      <sp-btn @click="simulateProgress" :disabled="isSimulating">
        {{ isSimulating ? '加载中...' : '模拟加载' }}
      </sp-btn>
      <sp-btn @click="reset" variant="outlined">重置</sp-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { SPProgressLinear, SPBtn } from 'speed-ui-vue'

const progress = ref(30)
const buffer = ref(60)
const progress2 = ref(20)
const buffer2 = ref(50)
const isSimulating = ref(false)
let timer: NodeJS.Timeout | null = null

const simulateProgress = () => {
  isSimulating.value = true

  timer = setInterval(() => {
    // 缓冲进度增加得更快
    if (buffer.value < 100) {
      buffer.value = Math.min(100, buffer.value + Math.random() * 5)
      buffer2.value = Math.min(100, buffer2.value + Math.random() * 5)
    }

    // 播放进度增加得慢一些，且不超过缓冲进度
    if (progress.value < buffer.value - 5) {
      progress.value = Math.min(buffer.value - 5, progress.value + Math.random() * 2)
      progress2.value = Math.min(buffer2.value - 5, progress2.value + Math.random() * 2)
    }

    // 如果都到100%就停止
    if (progress.value >= 95 && buffer.value >= 100) {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      isSimulating.value = false
    }
  }, 100)
}

const reset = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  progress.value = 30
  buffer.value = 60
  progress2.value = 20
  buffer2.value = 50
  isSimulating.value = false
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
