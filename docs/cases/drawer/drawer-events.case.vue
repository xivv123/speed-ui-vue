事件监听,监听抽屉的打开和关闭事件。

<template>
  <div>
    <sp-btn @click="drawer = true">打开抽屉</sp-btn>
    <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <div>事件日志:</div>
      <div v-for="(log, index) in logs" :key="index" style="font-size: 12px; color: #666;">
        {{ log }}
      </div>
    </div>
  </div>

  <sp-drawer 
    v-model="drawer"
    @update:modelValue="onUpdateModelValue"
    @afterEnter="onAfterEnter"
    @afterLeave="onAfterLeave"
  >
    <div style="padding: 24px;">
      <h3>事件监听示例</h3>
      <p>打开和关闭抽屉时会触发相应的事件</p>
      <sp-btn @click="drawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(false)
  const logs = ref<string[]>([])

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString()
    logs.value.unshift(`[${time}] ${message}`)
    if (logs.value.length > 5) {
      logs.value.pop()
    }
  }

  const onUpdateModelValue = (value: boolean) => {
    addLog(`modelValue 改变: ${value}`)
  }

  const onAfterEnter = () => {
    addLog('抽屉打开动画完成')
  }

  const onAfterLeave = () => {
    addLog('抽屉关闭动画完成')
  }
</script>
