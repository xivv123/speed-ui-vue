<template>
  <DemoContainer title="SPMenu 菜单组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="点击按钮打开菜单">
      <sp-menu>
        <template #activator="{ props }">
          <sp-btn v-bind="props" variant="elevated" color="primary">点击打开菜单</sp-btn>
        </template>
        <div class="menu-content">
          <div class="menu-item">菜单项 1</div>
          <div class="menu-item">菜单项 2</div>
          <div class="menu-item">菜单项 3</div>
        </div>
      </sp-menu>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同触发方式 -->
    <DemoSection title="不同触发方式" subtitle="点击或悬停触发">
      <div class="button-group">
        <sp-menu>
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="outlined">点击触发</sp-btn>
          </template>
          <div class="menu-content">
            <div class="menu-item">点击菜单项 1</div>
            <div class="menu-item">点击菜单项 2</div>
          </div>
        </sp-menu>

        <sp-menu open-on-hover>
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="outlined" color="secondary">悬停触发</sp-btn>
          </template>
          <div class="menu-content">
            <div class="menu-item">悬停菜单项 1</div>
            <div class="menu-item">悬停菜单项 2</div>
          </div>
        </sp-menu>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同位置 -->
    <DemoSection title="不同位置" subtitle="菜单可以在不同方向展开">
      <div class="button-group">
        <sp-menu location="top">
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="tonal">顶部</sp-btn>
          </template>
          <div class="menu-content">
            <div class="menu-item">顶部菜单</div>
          </div>
        </sp-menu>

        <sp-menu location="bottom">
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="tonal">底部</sp-btn>
          </template>
          <div class="menu-content">
            <div class="menu-item">底部菜单</div>
          </div>
        </sp-menu>

        <sp-menu location="start">
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="tonal">左侧</sp-btn>
          </template>
          <div class="menu-content">
            <div class="menu-item">左侧菜单</div>
          </div>
        </sp-menu>

        <sp-menu location="end">
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="tonal">右侧</sp-btn>
          </template>
          <div class="menu-content">
            <div class="menu-item">右侧菜单</div>
          </div>
        </sp-menu>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 复杂菜单内容 -->
    <DemoSection title="复杂菜单内容" subtitle="带用户信息和操作的菜单">
      <div class="button-group">
        <sp-menu>
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="elevated" color="success">用户菜单</sp-btn>
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

        <sp-menu>
          <template #activator="{ props }">
            <sp-btn v-bind="props" variant="elevated" color="warning">操作菜单</sp-btn>
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
    </DemoSection>

    <sp-space :size="24" />

    <!-- 嵌套菜单 -->
    <DemoSection title="嵌套菜单" subtitle="菜单项中包含子菜单">
      <sp-menu>
        <template #activator="{ props }">
          <sp-btn v-bind="props" variant="elevated" color="info">嵌套菜单</sp-btn>
        </template>
        <div class="menu-content">
          <div class="menu-item">普通菜单项</div>
          <sp-menu location="end" submenu>
            <template #activator="{ props }">
              <div v-bind="props" class="menu-item submenu-trigger">子菜单 →</div>
            </template>
            <div class="menu-content">
              <div class="menu-item">子菜单项 1</div>
              <div class="menu-item">子菜单项 2</div>
              <div class="menu-item">子菜单项 3</div>
            </div>
          </sp-menu>
          <div class="menu-item">另一个菜单项</div>
        </div>
      </sp-menu>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.menu-content {
  min-width: 160px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
}

.menu-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.danger {
  color: #f56565;
}

.menu-item.danger:hover {
  background-color: #fed7d7;
}

.menu-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 4px 0;
}

.user-menu,
.action-menu {
  min-width: 200px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.user-details {
  flex: 1;
}

.username {
  font-weight: 500;
  color: #333;
}

.email {
  font-size: 12px;
  color: #666;
}

.icon {
  font-size: 16px;
}

.submenu-trigger {
  position: relative;
}
</style>
