<text>
交互式进度条，可动态调整
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">
        当前进度: {{ Math.round(progress) }}%
      </div>
      <sp-progress-linear
        v-model="progress"
        color="primary"
        :height="8"
        rounded-bar
      >
        <template #default="{ value }">
          <div style="font-size: 12px; color: white; font-weight: 600;">
            {{ Math.round(value) }}%
          </div>
        </template>
      </sp-progress-linear>
    </div>

    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <sp-btn @click="decrease" :disabled="progress <= 0" variant="outlined">
        -10
      </sp-btn>
      <sp-btn @click="increase" :disabled="progress >= 100" color="primary">
        +10
      </sp-btn>
      <sp-btn @click="reset" variant="outlined" color="secondary">
        重置
      </sp-btn>
      <sp-btn @click="autoAnimate" :disabled="isAnimating" color="success">
        {{ isAnimating ? '动画中...' : '自动演示' }}
      </sp-btn>
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">
        条纹样式进度条: {{ Math.round(progress) }}%
      </div>
      <sp-progress-linear
        v-model="progress"
        color="warning"
        :height="12"
        striped
        rounded
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { SPProgressLinear, SPBtn } from 'speed-ui-vue'

const progress = ref(50)
const isAnimating = ref(false)
let timer: NodeJS.Timeout | null = null

const increase = () => {
  progress.value = Math.min(100, progress.value + 10)
}

const decrease = () => {
  progress.value = Math.max(0, progress.value - 10)
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
  }, 30)
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
