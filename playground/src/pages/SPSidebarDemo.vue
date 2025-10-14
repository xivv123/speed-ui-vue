<template>
  <DemoContainer title="SPSidebar 推挤式侧边栏组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="默认的推挤式侧边栏">
      <div class="demo-layout">
        <SPSidebar v-model="show1" width="256">
          <template #prepend>
            <div class="sidebar-header">📚 导航菜单</div>
          </template>
          <div class="sidebar-content">
            <div class="menu-item">🏠 首页</div>
            <div class="menu-item">📊 数据</div>
            <div class="menu-item">⚙️ 设置</div>
            <div class="menu-item">👤 用户</div>
          </div>
        </SPSidebar>
        <div class="main-content">
          <h3>主内容区域</h3>
          <p>侧边栏会推挤主内容，点击边缘按钮切换。</p>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- Mini 模式 -->
    <DemoSection title="Mini 模式（Rail）" subtitle="侧边栏始终显示图标">
      <div class="demo-layout">
        <SPSidebar v-model="show2" rail :rail-width="72" :width="256">
          <template #prepend>
            <div class="sidebar-center">🎨</div>
          </template>
          <div class="sidebar-content">
            <div class="menu-item">
              <span class="icon">🏠</span>
              <span class="text">首页</span>
            </div>
            <div class="menu-item">
              <span class="icon">📊</span>
              <span class="text">数据</span>
            </div>
            <div class="menu-item">
              <span class="icon">⚙️</span>
              <span class="text">设置</span>
            </div>
          </div>
        </SPSidebar>
        <div class="main-content">
          <h3>Mini 模式</h3>
          <SPBtn @click="show2 = !show2" color="primary">
            {{ show2 ? '收起为 Mini' : '展开侧边栏' }}
          </SPBtn>
        </div>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 右侧侧边栏 -->
    <DemoSection title="右侧侧边栏" subtitle="从右边推挤内容">
      <div class="demo-layout">
        <div class="main-content">
          <h3>主内容</h3>
          <SPBtn @click="show3 = !show3" color="success">
            {{ show3 ? '关闭右侧栏' : '打开右侧栏' }}
          </SPBtn>
        </div>
        <SPSidebar v-model="show3" location="right" width="300" bg-color="success">
          <template #prepend>
            <div class="sidebar-header">ℹ️ 信息面板</div>
          </template>
          <div class="sidebar-content">
            <p>这是右侧的信息面板</p>
          </div>
        </SPSidebar>
      </div>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'

const show1 = ref(true)
const show2 = ref(false)
const show3 = ref(false)
</script>

<style scoped>
.demo-layout {
  display: flex;
  border: 2px dashed #ddd;
  border-radius: 8px;
  overflow: hidden;
  min-height: 400px;
}

.main-content {
  flex: 1;
  padding: 24px;
  background: #f5f5f5;
}

.sidebar-header {
  padding: 16px;
  font-weight: bold;
  font-size: 18px;
}

.sidebar-center {
  padding: 16px;
  text-align: center;
  font-size: 24px;
}

.sidebar-content {
  padding: 8px;
}

.menu-item {
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.menu-item .icon {
  font-size: 20px;
}

.menu-item .text {
  flex: 1;
}
</style>
