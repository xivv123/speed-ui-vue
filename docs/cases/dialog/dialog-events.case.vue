<text>
事件监听,监听对话框的打开、关闭等事件。
</text>

<template>
  <sp-btn @click="eventDialog = true" variant="filled">打开事件对话框</sp-btn>

  <sp-dialog v-model="eventDialog" @after-enter="onDialogEnter" @after-leave="onDialogLeave">
    <sp-card title="事件对话框" subtitle="监听打开和关闭事件" variant="elevated">
      <sp-card-text>
        <p>这个对话框会触发进入和离开事件。</p>
        <div class="event-log">
          <h4>事件日志：</h4>
          <ul>
            <li v-for="(event, index) in eventLog" :key="index">{{ event }}</li>
          </ul>
        </div>
      </sp-card-text>
      <sp-card-actions>
        <sp-btn @click="eventDialog = false" variant="text">关闭</sp-btn>
      </sp-card-actions>
    </sp-card>
  </sp-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const eventDialog = ref(false)
  const eventLog = ref<string[]>([])

  const onDialogEnter = () => {
    const timestamp = new Date().toLocaleTimeString()
    eventLog.value.push(`${timestamp} - 对话框已打开`)
  }

  const onDialogLeave = () => {
    const timestamp = new Date().toLocaleTimeString()
    eventLog.value.push(`${timestamp} - 对话框已关闭`)
  }
</script>

<style scoped>
  .event-log {
    margin: 20px 0;
    padding: 20px;
    background: linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%);
    border-radius: 12px;
    border-left: 4px solid #667eea;
  }

  .event-log h4 {
    margin: 0 0 16px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #667eea;
  }

  .event-log ul {
    margin: 0;
    padding-left: 24px;
    max-height: 180px;
    overflow-y: auto;
  }

  .event-log li {
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: #555;
  }
</style>
