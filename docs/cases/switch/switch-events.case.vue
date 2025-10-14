<text>
> 开关组件的事件处理，包括 change、focus、blur 等事件
</text>

<template>
  <div class="switch-events-demo">
    <sp-switch
      v-model="eventValue"
      label="事件监听开关"
      @change="onSwitchChange"
      @focus="onSwitchFocus"
      @blur="onSwitchBlur"
    />

    <sp-switch
      v-model="asyncValue"
      label="异步切换"
      :loading="isAsyncLoading"
      @change="handleAsyncChange"
    />

    <div class="event-log">
      <h4>事件日志:</h4>
      <div class="log-container">
        <div
          v-for="(log, index) in eventLogs"
          :key="index"
          class="log-item"
        >
          <span class="log-time">{{ log.time }}</span>
          <span class="log-event">{{ log.event }}</span>
          <span class="log-value">{{ log.value }}</span>
        </div>
      </div>
      <button @click="clearLogs" class="clear-btn">
        清空日志
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const eventValue = ref(false)
  const asyncValue = ref(false)
  const isAsyncLoading = ref(false)
  const eventLogs = ref([])

  const onSwitchChange = (value) => {
    addEventLog('change', value)
  }

  const onSwitchFocus = () => {
    addEventLog('focus', 'focused')
  }

  const onSwitchBlur = () => {
    addEventLog('blur', 'blurred')
  }

  const handleAsyncChange = async (value) => {
    isAsyncLoading.value = true
    addEventLog('async-start', `开始异步切换到 ${value}`)
    
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    asyncValue.value = value
    isAsyncLoading.value = false
    addEventLog('async-complete', `异步切换完成: ${value}`)
  }

  const addEventLog = (event, value) => {
    const time = new Date().toLocaleTimeString()
    eventLogs.value.unshift({ time, event, value })
    
    // 限制日志数量
    if (eventLogs.value.length > 8) {
      eventLogs.value = eventLogs.value.slice(0, 8)
    }
  }

  const clearLogs = () => {
    eventLogs.value = []
  }
</script>

<style scoped>
  .switch-events-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .event-log {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }

  .event-log h4 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .log-container {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .log-item {
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid #eee;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
  }

  .log-item:last-child {
    border-bottom: none;
  }

  .log-time {
    color: #666;
    margin-right: 1rem;
    min-width: 80px;
  }

  .log-event {
    color: #e74c3c;
    margin-right: 1rem;
    min-width: 100px;
    font-weight: bold;
  }

  .log-value {
    color: #27ae60;
  }

  .clear-btn {
    padding: 0.5rem 1rem;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .clear-btn:hover {
    background: #c0392b;
  }
</style>
