<text>
> 事件监听演示，展示引导过程中的各种事件回调
</text>



<template>
    <div class="demo-container">
        <div class="demo-controls">
            <sp-btn @click="startTour" color="primary" size="large">
                🎭 开始事件演示
            </sp-btn>
            <sp-btn @click="clearEvents" color="secondary" size="medium">
                🧹 清空日志
            </sp-btn>
        </div>

        <div class="demo-content">
            <div class="demo-section" id="event-section-1">
                <h4>🎯 第一个区域</h4>
                <p>这里会触发进入和离开事件</p>
            </div>

            <div class="demo-section" id="event-section-2">
                <h4>⚡ 第二个区域</h4>
                <p>观察控制台和事件日志的变化</p>
            </div>

            <div class="demo-section" id="event-section-3">
                <h4>🔥 第三个区域</h4>
                <p>最后一个步骤的事件监听</p>
            </div>
        </div>

        <div class="event-log">
            <h4>📝 事件日志</h4>
            <div class="log-content">
                <div v-for="(log, index) in eventLogs" :key="index" :class="['log-item', `log-${log.type}`]">
                    <span class="log-time">{{ log.time }}</span>
                    <span class="log-event">{{ log.event }}</span>
                    <span class="log-detail">{{ log.detail }}</span>
                </div>
                <div v-if="eventLogs.length === 0" class="log-empty">
                    暂无事件日志
                </div>
            </div>
        </div>

        <sp-tour v-model="showTour" v-model:current="currentStep" :steps="tourSteps" :closable="true"
            :show-indicator="true" @finish="onTourFinish" @skip="onTourSkip" @close="onTourClose" @change="onStepChange"
            @before-enter="onBeforeEnter" @before-leave="onBeforeLeave" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showTour = ref(false)
const currentStep = ref(0)
const eventLogs = ref([])

const tourSteps = [
  {
    title: '事件监听演示',
    description: '这个演示会展示引导过程中触发的各种事件，请注意观察右侧的事件日志。',
    target: '#event-section-1',
    placement: 'right'
  },
  {
    title: '步骤变化事件',
    description: '当步骤发生变化时，会触发 change 事件，同时也会触发 before-enter 和 before-leave 事件。',
    target: '#event-section-2',
    placement: 'bottom'
  },
  {
    title: '生命周期事件',
    description: '每个步骤都有完整的生命周期，包括进入前、进入后、离开前、离开后等事件。',
    target: '#event-section-3',
    placement: 'left'
  }
]

const addLog = (event, detail, type = 'info') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  eventLogs.value.push({
    event,
    detail,
    type,
    time
  })
  
  // 保持日志条数不超过10条
  if (eventLogs.value.length > 10) {
    eventLogs.value.shift()
  }
}

const startTour = () => {
  currentStep.value = 0
  showTour.value = true
  addLog('start', '开始引导演示', 'success')
}

const clearEvents = () => {
  eventLogs.value = []
  addLog('clear', '清空事件日志', 'info')
}

const onTourFinish = () => {
  addLog('finish', '用户完成了引导流程', 'success')
  showTour.value = false
}

const onTourSkip = () => {
  addLog('skip', '用户跳过了引导流程', 'warning')
  showTour.value = false
}

const onTourClose = () => {
  addLog('close', '用户关闭了引导弹窗', 'warning')
  showTour.value = false
}

const onStepChange = (step) => {
  addLog('change', `步骤变更到第 ${step + 1} 步`, 'info')
}

const onBeforeEnter = (step, index) => {
  addLog('before-enter', `即将进入第 ${index + 1} 步: ${step.title}`, 'info')
}

const onBeforeLeave = (step, index) => {
  addLog('before-leave', `即将离开第 ${index + 1} 步: ${step.title}`, 'warning')
}
</script>

<style scoped>
.demo-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

.demo-controls {
    grid-column: 1 / -1;
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 20px;
}

.demo-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.demo-section {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
}

.demo-section:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.demo-section h4 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 1.2rem;
}

.demo-section p {
    margin: 0;
    color: #666;
    line-height: 1.5;
}

.event-log {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    max-height: 500px;
    display: flex;
    flex-direction: column;
}

.event-log h4 {
    margin: 0 0 16px 0;
    color: #333;
    font-size: 1.1rem;
}

.log-content {
    flex: 1;
    overflow-y: auto;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 12px;
    background: #fafafa;
}

.log-item {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 6px;
    font-size: 0.9rem;
    border-left: 3px solid #ddd;
}

.log-item:last-child {
    margin-bottom: 0;
}

.log-success {
    background: #f0f9ff;
    border-left-color: #10b981;
}

.log-warning {
    background: #fffbeb;
    border-left-color: #f59e0b;
}

.log-info {
    background: #f8f9fa;
    border-left-color: #6b7280;
}

.log-time {
    color: #6b7280;
    font-family: monospace;
    font-size: 0.85rem;
    min-width: 60px;
}

.log-event {
    font-weight: 600;
    color: #374151;
    min-width: 80px;
}

.log-detail {
    color: #6b7280;
    flex: 1;
}

.log-empty {
    text-align: center;
    color: #9ca3af;
    font-style: italic;
    padding: 20px;
}

@media (max-width: 768px) {
    .demo-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .demo-controls {
        flex-direction: column;
        align-items: center;
    }
}
</style>