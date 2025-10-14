<text>
不同的弹出位置，支持 top（顶部）、bottom（底部）、start（左侧）、end（右侧）
</text>

<template>
  <div class="demo-grid">
    <!-- 顶部 -->
    <sp-menu location="top">
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="tonal"
        >
          顶部
        </sp-btn>
      </template>
      <div class="menu-content">
        <div class="menu-item">顶部菜单</div>
      </div>
    </sp-menu>

    <!-- 底部 -->
    <sp-menu location="bottom">
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="tonal"
        >
          底部
        </sp-btn>
      </template>
      <div class="menu-content">
        <div class="menu-item">底部菜单</div>
      </div>
    </sp-menu>

    <!-- 左侧 -->
    <sp-menu location="start">
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="tonal"
        >
          左侧
        </sp-btn>
      </template>
      <div class="menu-content">
        <div class="menu-item">左侧菜单</div>
      </div>
    </sp-menu>

    <!-- 右侧 -->
    <sp-menu location="end">
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="tonal"
        >
          右侧
        </sp-btn>
      </template>
      <div class="menu-content">
        <div class="menu-item">右侧菜单</div>
      </div>
    </sp-menu>
  </div>
</template>

<script setup lang="ts">
import { SPMenu, SPBtn } from 'speed-ui-vue'
</script>

<style scoped>
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}
</style>
