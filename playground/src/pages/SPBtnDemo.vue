<template>
  <DemoContainer title="SPBtn 按钮组件">
    <!-- 基础按钮 -->
    <DemoSection title="基础按钮" subtitle="不同变体的按钮样式">
      <div class="button-group">
        <sp-btn>默认按钮</sp-btn>
        <sp-btn variant="filled">填充按钮</sp-btn>
        <sp-btn variant="outlined">边框按钮</sp-btn>
        <sp-btn variant="text">文本按钮</sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 颜色变体 -->
    <DemoSection title="颜色变体" subtitle="不同颜色的按钮">
      <div class="button-group">
        <sp-btn color="primary">主要按钮</sp-btn>
        <sp-btn color="secondary">次要按钮</sp-btn>
        <sp-btn color="success">成功按钮</sp-btn>
        <sp-btn color="warning">警告按钮</sp-btn>
        <sp-btn color="error">错误按钮</sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 尺寸变体 -->
    <DemoSection title="尺寸变体" subtitle="不同大小的按钮">
      <div class="button-group align-center">
        <sp-btn size="small">小按钮</sp-btn>
        <sp-btn size="default">默认按钮</sp-btn>
        <sp-btn size="large">大按钮</sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 带图标的按钮 -->
    <DemoSection title="带图标的按钮" subtitle="图标与文字的组合">
      <div class="button-group">
        <sp-btn>
          <sp-icon name="add" size="16" />
          添加
        </sp-btn>
        <sp-btn variant="outlined">
          <sp-icon name="edit" size="16" />
          编辑
        </sp-btn>
        <sp-btn color="error">
          <sp-icon name="delete" size="16" />
          删除
        </sp-btn>
        <sp-btn variant="text">
          下载
          <sp-icon name="download" size="16" />
        </sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 按钮状态 -->
    <DemoSection title="按钮状态" subtitle="禁用和加载状态">
      <div class="button-group">
        <sp-btn disabled>禁用按钮</sp-btn>
        <sp-btn loading>加载中...</sp-btn>
        <sp-btn @click="toggleLoading" :loading="isLoading">
          {{ isLoading ? '加载中...' : '点击加载' }}
        </sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 交互示例 -->
    <DemoSection title="交互示例" subtitle="按钮点击事件演示">
      <div class="button-group">
        <sp-btn @click="showMessage('你点击了按钮！')">点击我</sp-btn>
        <sp-btn color="success" @click="incrementCounter">
          点击次数: {{ clickCount }}
        </sp-btn>
      </div>
      <sp-space :size="16" />
      <div v-if="message" class="message-display">
        {{ message }}
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const isLoading = ref(false)
const clickCount = ref(0)
const message = ref('')

const toggleLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

const incrementCounter = () => {
  clickCount.value++
}

const showMessage = (msg: string) => {
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.button-group.align-center {
  align-items: center;
}

.message-display {
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
}
</style>