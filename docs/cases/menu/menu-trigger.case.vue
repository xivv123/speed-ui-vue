<text>
不同的触发方式，支持点击触发和悬停触发
</text>

<template>
  <div class="demo-row">
    <!-- 点击触发 -->
    <sp-menu>
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="outlined"
        >
          点击触发
        </sp-btn>
      </template>
      <div class="menu-content">
        <div class="menu-item">点击菜单项 1</div>
        <div class="menu-item">点击菜单项 2</div>
      </div>
    </sp-menu>

    <!-- 悬停触发 -->
    <sp-menu open-on-hover>
      <template #activator="{ props }">
        <sp-btn
          v-bind="props"
          variant="outlined"
          color="secondary"
        >
          悬停触发
        </sp-btn>
      </template>
      <div class="menu-content">
        <div class="menu-item">悬停菜单项 1</div>
        <div class="menu-item">悬停菜单项 2</div>
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
