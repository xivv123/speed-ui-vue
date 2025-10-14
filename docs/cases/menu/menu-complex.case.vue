<text>
复杂菜单内容，包含用户信息、图标、分割线等复杂结构
</text>

<template>
  <div class="demo-row">
    <!-- 用户菜单 -->
    <sp-menu>
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="elevated"
          color="success"
        >
          用户菜单
        </sp-btn>
      </template>
      <div class="user-menu">
        <div class="user-info">
          <div class="avatar">👤</div>
          <div class="user-details">
            <div class="username">张三</div>
            <div class="email">zhangsan@example.com</div>
          </div>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item">个人资料</div>
        <div class="menu-item">设置</div>
        <div class="menu-item">帮助</div>
        <div class="menu-divider"></div>
        <div class="menu-item danger">退出登录</div>
      </div>
    </sp-menu>

    <!-- 操作菜单 -->
    <sp-menu>
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="elevated"
          color="warning"
        >
          操作菜单
        </sp-btn>
      </template>
      <div class="action-menu">
        <div class="menu-item">
          <span class="icon">📝</span>
          编辑
        </div>
        <div class="menu-item">
          <span class="icon">📋</span>
          复制
        </div>
        <div class="menu-item">
          <span class="icon">📤</span>
          分享
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item danger">
          <span class="icon">🗑️</span>
          删除
        </div>
      </div>
    </sp-menu>
  </div>
</template>

<script setup lang="ts">
import { SPMenu, SPBtn } from 'speed-ui-vue'
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
