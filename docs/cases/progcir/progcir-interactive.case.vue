<text>
交互式进度条，可以动态调整进度值
</text>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 24px;">
    <sp-prog-cir v-model="progress" :size="140" color="primary" :width="8">
      <template #default="{ value }">
        <div style="text-align: center;">
          <div style="font-size: 40px; font-weight: 700; color: #1976d2;">{{ Math.round(value) }}%</div>
        </div>
      </template>
    </sp-prog-cir>

    <div style="display: flex; gap: 12px;">
      <sp-btn @click="decrease" :disabled="progress === 0" variant="outlined">
        -10
      </sp-btn>
      <sp-btn @click="increase" :disabled="progress === 100" color="primary">
        +10
      </sp-btn>
      <sp-btn @click="reset" variant="outlined" color="secondary">
        重置
      </sp-btn>
      <sp-btn @click="autoAnimate" :disabled="isAnimating" color="success">
        {{ isAnimating ? '动画中...' : '自动演示' }}
      </sp-btn>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
const progress = ref(50)
const isAnimating = ref(false)
let timer: NodeJS.Timeout | null = null

const increase = () => {
  if (progress.value < 100) {
    progress.value = Math.min(100, progress.value + 10)
  }
}

const decrease = () => {
  if (progress.value > 0) {
    progress.value = Math.max(0, progress.value - 10)
  }
}

const reset = () => {
  progress.value = 50
}

const autoAnimate = () => {
  isAnimating.value = true
  progress.value = 0

  timer = setInterval(() => {
    progress.value += 1
    if (progress.value >= 100) {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      isAnimating.value = false
    }
  }, 50)
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
