<template>
  <div class="progress-basic-demo">
    <h4>基础进度条</h4>
    <div
      v-progress="progressValue"
      class="demo-container"
    >
      <div class="content">
        <p>当前进度: {{ progressValue }}%</p>
        <div class="controls">
          <sp-btn @click="setProgress(25)">25%</sp-btn>
          <sp-btn @click="setProgress(50)">50%</sp-btn>
          <sp-btn @click="setProgress(75)">75%</sp-btn>
          <sp-btn @click="setProgress(100)">100%</sp-btn>
          <sp-btn @click="resetProgress">重置</sp-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const progressValue = ref(30)

  function setProgress(value) {
    progressValue.value = value
  }

  function resetProgress() {
    progressValue.value = 0
  }
</script>

<style scoped>
  .progress-basic-demo {
    padding: 1rem;
  }

  .demo-container {
    position: relative;
    height: 120px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
  }

  .content {
    text-align: center;
  }

  .controls {
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .controls sp-btn {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .controls sp-btn:hover {
    background: #f0f0f0;
    border-color: #999;
  }
</style>
