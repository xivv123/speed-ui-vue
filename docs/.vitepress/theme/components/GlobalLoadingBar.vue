<template>
  <div v-if="isLoading" class="global-loading-container">
    <div class="page-mask" aria-hidden="true"></div>
    <SPProgressLinear
      :model-value="progress"
      :indeterminate="indeterminate"
      :active="isLoading"
      :absolute="true"
      :height="3"
      :color="loadingColor"
      :bg-color="'transparent'"
      :rounded="false"
      class="global-loading-bar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vitepress'
import { SPProgressLinear } from 'speed-ui-vue'
const isLoading = ref(false)
const progress = ref(0)
const indeterminate = ref(false)

// 动态获取主题颜色
const loadingColor = computed(() => {
  if (typeof window !== 'undefined') {
    const style = getComputedStyle(document.documentElement)
    return style.getPropertyValue('--vp-c-brand-1') || '#3451b2'
  }
  return '#3451b2'
})

let progressTimer = null

const startLoading = () => {
  isLoading.value = true
  progress.value = 0
  indeterminate.value = false
  
  // 模拟进度条动画
  progressTimer = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10
    }
  }, 100)
}

const finishLoading = () => {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
  
  progress.value = 100
  
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
  }, 300)
}

const router = useRouter()

onMounted(() => {
  // 路由监听
  if (router) {
    // VitePress 路由事件监听
    const originalOnBeforeRouteChange = router.onBeforeRouteChange
    const originalOnAfterRouteChange = router.onAfterRouteChange
    
    router.onBeforeRouteChange = (to: string) => {
      ;(window as any).__pendingDemos = []
      startLoading()
      return originalOnBeforeRouteChange?.(to)
    }
    
    router.onAfterRouteChange = async (to: string) => {
      try {
        // 等待新页面组件完成 setup/注册 pending（收集期）
        await nextTick()
        await new Promise(resolve => setTimeout(resolve, 0))
        await new Promise(resolve => setTimeout(resolve, 50))

        const pending: Promise<any>[] = (window as any).__pendingDemos || []
        if (pending.length) {
          const timeout = new Promise(resolve => setTimeout(resolve, 8000))
          await Promise.race([
            Promise.allSettled(pending),
            timeout,
          ])
        }
      } catch (err) {
        console.warn('等待 Demo 就绪时出错：', err)
      } finally {
        finishLoading()
      }
      return originalOnAfterRouteChange?.(to)
    }
  } else {
    console.warn('⚠️ GlobalLoadingBar: 未找到 VitePress 路由器')
  }
})

onUnmounted(() => {
  if (progressTimer) {
    clearInterval(progressTimer)
  }
})

// 导出方法供外部调用
defineExpose({
  start: startLoading,
  finish: finishLoading
})
</script>

<style scoped>
.global-loading-container {
  position: fixed;
  inset: 0;
  z-index: 2000;
  pointer-events: none;
}

.page-mask {
  position: absolute;
  inset: 0;
  background: var(--vp-c-bg);
  opacity: 0.3;
  pointer-events: auto;
}

.global-loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>