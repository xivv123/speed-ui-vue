<text>
> 配置选项演示，展示引导组件的各种配置参数
</text>

<template>
    <div class="demo-container">
        <div class="config-panel">
            <h3>🔧 配置选项</h3>
            <div class="config-grid">
                <label class="config-item">
                    <input v-model="config.showIndicator" type="checkbox" />
                    <span>显示步骤指示器</span>
                </label>
                <label class="config-item">
                    <input v-model="config.keyboard" type="checkbox" />
                    <span>启用键盘导航</span>
                </label>
                <label class="config-item">
                    <input v-model="config.closable" type="checkbox" />
                    <span>显示关闭按钮</span>
                </label>
                <label class="config-item">
                    <input v-model="config.mask" type="checkbox" />
                    <span>显示遮罩层</span>
                </label>
            </div>

            <div class="config-controls">
                <sp-btn @click="startTour" color="primary" size="large">
                    🎮 体验配置效果
                </sp-btn>
                <div class="config-status">
                    当前配置：{{ configText }}
                </div>
            </div>
        </div>

        <div class="demo-area">
            <div class="demo-card" id="card-1">
                <h4>功能区域 A</h4>
                <p>这是第一个演示区域</p>
            </div>

            <div class="demo-card" id="card-2">
                <h4>功能区域 B</h4>
                <p>这是第二个演示区域</p>
            </div>

            <div class="demo-card" id="card-3">
                <h4>功能区域 C</h4>
                <p>这是第三个演示区域</p>
            </div>
        </div>

        <sp-tour v-model="showTour" v-model:current="currentStep" :steps="tourSteps" :closable="config.closable"
            :show-indicator="config.showIndicator" :keyboard="config.keyboard" :mask="config.mask" :z-index="2001"
            @finish="onTourFinish" @skip="onTourSkip" @change="onStepChange" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showTour = ref(false)
const currentStep = ref(0)

const config = ref({
    showIndicator: true,
    keyboard: true,
    closable: true,
    mask: true
})

const configText = computed(() => {
    const activeConfigs = []
    if (config.value.showIndicator) activeConfigs.push('指示器')
    if (config.value.keyboard) activeConfigs.push('键盘导航')
    if (config.value.closable) activeConfigs.push('可关闭')
    if (config.value.mask) activeConfigs.push('遮罩层')
    return activeConfigs.join('、') || '无'
})

const tourSteps = [
    {
        title: '配置演示开始',
        description: '您可以在上方调整各种配置选项，然后重新开始引导来查看效果。',
        target: '.config-panel',
        placement: 'bottom'
    },
    {
        title: '功能区域 A',
        description: '这里演示了不同配置下的引导效果，请注意观察变化。',
        target: '#card-1',
        placement: 'right'
    },
    {
        title: '功能区域 B',
        description: '您可以使用键盘的左右箭头键进行导航（如果启用了键盘导航）。',
        target: '#card-2',
        placement: 'top'
    },
    {
        title: '功能区域 C',
        description: '配置完成！现在您了解了各种配置选项的作用。',
        target: '#card-3',
        placement: 'left'
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

const onStepChange = (step) => {
    // 步骤变更
}
</script>

<style scoped>
.demo-container {
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.config-panel {
    background: white;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 30px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

.config-panel h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 1.4rem;
}

.config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
}

.config-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    transition: all 0.2s ease;
}

.config-item:hover {
    background: #f8f9fa;
    border-color: #d0d7de;
}

.config-item input[type="checkbox"] {
    width: 18px;
    height: 18px;
}

.config-item span {
    color: #333;
    font-size: 0.95rem;
}

.config-controls {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}

.config-status {
    padding: 8px 16px;
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    border-radius: 6px;
    color: #0369a1;
    font-size: 0.9rem;
}

.demo-area {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.demo-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
}

.demo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.demo-card h4 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.2rem;
}

.demo-card p {
    margin: 0;
    color: #666;
    line-height: 1.4;
}
</style>