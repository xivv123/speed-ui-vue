<template>
  <div class="progress-colors-demo">
    <h4>自定义颜色和高度</h4>

    <div class="demo-section">
      <h5>绿色进度条</h5>
      <div
        v-progress="{ value: 60, color: 'green', height: 4 }"
        class="demo-container"
      >
        <p>绿色进度条 - 60%</p>
      </div>
    </div>

    <div class="demo-section">
      <h5>橙色进度条</h5>
      <div
        v-progress="{ value: 80, color: 'orange', height: 6 }"
        class="demo-container"
      >
        <p>橙色进度条 - 80%</p>
      </div>
    </div>

    <div class="demo-section">
      <h5>红色进度条</h5>
      <div
        v-progress="{ value: 45, color: 'red', height: 8 }"
        class="demo-container"
      >
        <p>红色进度条 - 45%</p>
      </div>
    </div>

    <div class="demo-section">
      <h5>自定义颜色进度条</h5>
      <div
        v-progress="{ value: 70, color: '#9c27b0', height: 5 }"
        class="demo-container"
      >
        <p>紫色进度条 - 70%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .progress-colors-demo {
    padding: 1rem;
  }

  .demo-section {
    margin-bottom: 2rem;
  }

  .demo-section h5 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-weight: 600;
  }

  .demo-container {
    position: relative;
    height: 80px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 0;
  }

  .demo-container p {
    margin: 0;
    font-weight: 500;
    color: #555;
  }
</style>
