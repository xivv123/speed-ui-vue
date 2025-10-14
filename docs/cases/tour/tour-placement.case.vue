<text>
> 不同位置演示，展示引导弹窗在不同位置的显示效果
</text>



<template>
    <div class="demo-container">
        <div class="demo-header">
            <h3>📍 位置演示</h3>
            <p>点击下面的按钮体验不同位置的引导效果</p>
            <sp-btn @click="startTour" color="primary" size="large">
                🗺️ 开始位置演示
            </sp-btn>
        </div>

        <div class="position-grid">
            <!-- 顶部位置 -->
            <div class="position-area top-area">
                <div class="position-card" id="top-left">
                    <span>左上角</span>
                </div>
                <div class="position-card" id="top-center">
                    <span>顶部中央</span>
                </div>
                <div class="position-card" id="top-right">
                    <span>右上角</span>
                </div>
            </div>

            <!-- 中间位置 -->
            <div class="position-area middle-area">
                <div class="position-card" id="left-center">
                    <span>左侧中央</span>
                </div>
                <div class="position-card center-card" id="center">
                    <span>正中央</span>
                </div>
                <div class="position-card" id="right-center">
                    <span>右侧中央</span>
                </div>
            </div>

            <!-- 底部位置 -->
            <div class="position-area bottom-area">
                <div class="position-card" id="bottom-left">
                    <span>左下角</span>
                </div>
                <div class="position-card" id="bottom-center">
                    <span>底部中央</span>
                </div>
                <div class="position-card" id="bottom-right">
                    <span>右下角</span>
                </div>
            </div>
        </div>

        <sp-tour v-model="showTour" v-model:current="currentStep" :steps="tourSteps" :closable="true"
            :show-indicator="true" @finish="onTourFinish" @skip="onTourSkip" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showTour = ref(false)
const currentStep = ref(0)

const tourSteps = [
  {
    title: '位置演示开始',
    description: '我们将展示引导弹窗在不同位置的显示效果。',
    target: '.demo-header',
    placement: 'bottom'
  },
  {
    title: '顶部位置',
    description: '当目标元素在顶部时，引导弹窗会显示在元素下方。',
    target: '#top-center',
    placement: 'bottom'
  },
  {
    title: '右侧位置',
    description: '当目标元素在右侧时，引导弹窗会显示在元素左侧。',
    target: '#right-center',
    placement: 'left'
  },
  {
    title: '底部位置',
    description: '当目标元素在底部时，引导弹窗会显示在元素上方。',
    target: '#bottom-center',
    placement: 'top'
  },
  {
    title: '左侧位置',
    description: '当目标元素在左侧时，引导弹窗会显示在元素右侧。',
    target: '#left-center',
    placement: 'right'
  },
  {
    title: '中央位置',
    description: '当目标元素在中央时，可以根据需要选择合适的位置。',
    target: '#center',
    placement: 'top'
  },
  {
    title: '自动调整',
    description: '引导组件会根据页面空间自动调整弹窗位置，确保最佳显示效果。',
    target: '#top-left',
    placement: 'bottom-start'
  },
  {
    title: '位置演示完成',
    description: '现在您了解了引导弹窗在不同位置的显示规律！',
    target: '#bottom-right',
    placement: 'top-end'
  }
]

const startTour = () => {
  currentStep.value = 0
  showTour.value = true
}

const onTourFinish = () => {
  showTour.value = false
}

const onTourSkip = () => {
  showTour.value = false
}
</script>

<style scoped>
.demo-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    min-height: 600px;
}

.demo-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 24px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border-radius: 12px;
}

.demo-header h3 {
    margin: 0 0 8px 0;
    font-size: 1.5rem;
}

.demo-header p {
    margin: 0 0 20px 0;
    opacity: 0.9;
}

.position-grid {
    display: flex;
    flex-direction: column;
    gap: 40px;
    min-height: 400px;
}

.position-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.position-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 2px solid #e0e0e0;
    transition: all 0.3s ease;
    min-width: 120px;
    text-align: center;
    font-weight: 500;
    color: #333;
}

.position-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border-color: #6366f1;
}

.center-card {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-color: #0ea5e9;
    color: #0369a1;
    font-weight: 600;
}

.middle-area {
    align-items: stretch;
}

.middle-area .position-card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
}

@media (max-width: 600px) {
    .position-area {
        flex-direction: column;
        gap: 20px;
    }

    .middle-area {
        flex-direction: row;
    }

    .position-card {
        min-width: 100px;
        padding: 16px;
    }
}
</style>