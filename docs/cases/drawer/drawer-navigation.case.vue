导航菜单,常见的侧边导航使用场景。

<template>
  <sp-btn @click="drawer = true">打开导航</sp-btn>

  <sp-drawer v-model="drawer" location="left" :width="280">
    <div class="nav-drawer">
      <div class="nav-header">
        <h3>导航菜单</h3>
        <sp-btn icon @click="drawer = false">×</sp-btn>
      </div>
      <div class="nav-body">
        <div class="nav-item" @click="handleNavClick('home')">🏠 首页</div>
        <div class="nav-item" @click="handleNavClick('profile')">👤 个人中心</div>
        <div class="nav-item" @click="handleNavClick('settings')">⚙️ 设置</div>
        <div class="nav-item" @click="handleNavClick('about')">ℹ️ 关于</div>
      </div>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(false)

  const handleNavClick = (route: string) => {
    console.log('导航到:', route)
    drawer.value = false
  }
</script>

<style scoped>
  .nav-drawer {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e0e0e0;
  }

  .nav-header h3 {
    margin: 0;
    font-size: 18px;
  }

  .nav-body {
    padding: 8px 0;
  }

  .nav-item {
    padding: 12px 24px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .nav-item:hover {
    background-color: #f5f5f5;
  }
</style>
