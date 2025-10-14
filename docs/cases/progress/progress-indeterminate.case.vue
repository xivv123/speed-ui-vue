<template>
  <div class="progress-indeterminate-demo">
    <h4>无限进度条</h4>
    <div
      v-progress="showIndeterminate"
      class="demo-container"
    >
      <div class="content">
        <p>{{ showIndeterminate ? '加载中...' : '点击开始加载' }}</p>
        <sp-btn @click="toggleIndeterminate">
          {{ showIndeterminate ? '停止' : '开始' }} 加载
        </sp-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const showIndeterminate = ref(true)

  function toggleIndeterminate() {
    showIndeterminate.value = !showIndeterminate.value
  }
</script>

<style scoped>
  .progress-indeterminate-demo {
    padding: 1rem;
  }

  .demo-container {
    position: relative;
    height: 120px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
  }

  .content {
    text-align: center;
  }

  .content sp-btn {
    padding: 0.75rem 1.5rem;
    border: 1px solid #007bff;
    border-radius: 4px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
  }

  .content sp-btn:hover {
    background: #0056b3;
    border-color: #0056b3;
  }
</style>
