<template>
  <div class="scrollbar-test">
    <h2>Scrollbar 滚动条组件测试</h2>

    <!-- 基础用法 -->
    <section class="test-section">
      <h3>基础用法</h3>
      <div class="demo-container">
        <Scrollbar
          max-height="200px"
          class="demo-scrollbar"
        >
          <div class="demo-content">
            <p
              v-for="i in 20"
              :key="i"
            >
              这是第 {{ i }} 行内容，用于测试垂直滚动功能。Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </div>
        </Scrollbar>
      </div>
    </section>

    <!-- 水平滚动 -->
    <section class="test-section">
      <h3>水平滚动</h3>
      <div class="demo-container">
        <Scrollbar
          max-height="100px"
          max-width="300px"
          class="demo-scrollbar"
        >
          <div class="demo-content-horizontal">
            <div
              class="horizontal-item"
              v-for="i in 10"
              :key="i"
            >
              项目 {{ i }}
            </div>
          </div>
        </Scrollbar>
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="test-section">
      <h3>不同尺寸</h3>
      <div class="demo-row">
        <div class="demo-item">
          <h4>小尺寸</h4>
          <Scrollbar
            size="small"
            max-height="150px"
            class="demo-scrollbar"
          >
            <div class="demo-content">
              <p
                v-for="i in 15"
                :key="i"
              >
                小尺寸滚动条 - 第 {{ i }} 行
              </p>
            </div>
          </Scrollbar>
        </div>

        <div class="demo-item">
          <h4>中等尺寸</h4>
          <Scrollbar
            size="medium"
            max-height="150px"
            class="demo-scrollbar"
          >
            <div class="demo-content">
              <p
                v-for="i in 15"
                :key="i"
              >
                中等尺寸滚动条 - 第 {{ i }} 行
              </p>
            </div>
          </Scrollbar>
        </div>

        <div class="demo-item">
          <h4>大尺寸</h4>
          <Scrollbar
            size="large"
            max-height="150px"
            class="demo-scrollbar"
          >
            <div class="demo-content">
              <p
                v-for="i in 15"
                :key="i"
              >
                大尺寸滚动条 - 第 {{ i }} 行
              </p>
            </div>
          </Scrollbar>
        </div>
      </div>
    </section>

    <!-- 主题变体 -->
    <section class="test-section">
      <h3>主题变体</h3>
      <div class="demo-row">
        <div class="demo-item">
          <h4>浅色主题</h4>
          <Scrollbar
            theme="light"
            max-height="150px"
            class="demo-scrollbar light-bg"
          >
            <div class="demo-content">
              <p
                v-for="i in 15"
                :key="i"
              >
                浅色主题滚动条 - 第 {{ i }} 行
              </p>
            </div>
          </Scrollbar>
        </div>

        <div class="demo-item">
          <h4>深色主题</h4>
          <Scrollbar
            theme="dark"
            max-height="150px"
            class="demo-scrollbar dark-bg"
          >
            <div class="demo-content light-text">
              <p
                v-for="i in 15"
                :key="i"
              >
                深色主题滚动条 - 第 {{ i }} 行
              </p>
            </div>
          </Scrollbar>
        </div>
      </div>
    </section>

    <!-- 始终显示 -->
    <section class="test-section">
      <h3>始终显示滚动条</h3>
      <div class="demo-container">
        <Scrollbar
          :always="true"
          max-height="150px"
          class="demo-scrollbar"
        >
          <div class="demo-content">
            <p
              v-for="i in 15"
              :key="i"
            >
              始终显示滚动条 - 第 {{ i }} 行内容
            </p>
          </div>
        </Scrollbar>
      </div>
    </section>

    <!-- 原生滚动条 -->
    <section class="test-section">
      <h3>原生滚动条模式</h3>
      <div class="demo-container">
        <Scrollbar
          :native="true"
          max-height="150px"
          class="demo-scrollbar"
        >
          <div class="demo-content">
            <p
              v-for="i in 15"
              :key="i"
            >
              原生滚动条模式 - 第 {{ i }} 行内容
            </p>
          </div>
        </Scrollbar>
      </div>
    </section>

    <!-- 控制按钮 -->
    <section class="test-section">
      <h3>程序控制</h3>
      <div class="demo-container">
        <div class="control-buttons">
          <button @click="scrollToTop">滚动到顶部</button>
          <button @click="scrollToBottom">滚动到底部</button>
          <button @click="scrollToMiddle">滚动到中间</button>
        </div>
        <Scrollbar
          ref="scrollbarRef"
          max-height="200px"
          class="demo-scrollbar"
        >
          <div class="demo-content">
            <p
              v-for="i in 30"
              :key="i"
            >
              可控制滚动条 - 第 {{ i }} 行内容
            </p>
          </div>
        </Scrollbar>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Scrollbar } from '@speed-ui/ui'

  const scrollbarRef = ref()

  const scrollToTop = () => {
    scrollbarRef.value?.scrollTop(0)
  }

  const scrollToBottom = () => {
    scrollbarRef.value?.scrollTop(999999)
  }

  const scrollToMiddle = () => {
    scrollbarRef.value?.scrollTop(300)
  }
</script>

<style scoped>
  .scrollbar-test {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .test-section {
    margin-bottom: 40px;
  }

  .test-section h3 {
    margin-bottom: 16px;
    color: #333;
    border-bottom: 2px solid #409eff;
    padding-bottom: 8px;
  }

  .demo-container {
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    padding: 20px;
    background: #fff;
  }

  .demo-scrollbar {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  .demo-content {
    padding: 16px;
  }

  .demo-content p {
    margin: 8px 0;
    line-height: 1.6;
    color: #606266;
  }

  .demo-content-horizontal {
    display: flex;
    gap: 16px;
    padding: 16px;
    width: 800px;
  }

  .horizontal-item {
    flex-shrink: 0;
    width: 120px;
    height: 60px;
    background: #f0f9ff;
    border: 1px solid #409eff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #409eff;
    font-weight: 500;
  }

  .demo-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .demo-item {
    flex: 1;
    min-width: 300px;
  }

  .demo-item h4 {
    margin-bottom: 12px;
    color: #606266;
    font-size: 14px;
  }

  .light-bg {
    background: #f8f9fa;
  }

  .dark-bg {
    background: #2d3748;
  }

  .light-text p {
    color: #e2e8f0;
  }

  .control-buttons {
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
  }

  .control-buttons button {
    padding: 8px 16px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }

  .control-buttons button:hover {
    background: #66b1ff;
  }
</style>
