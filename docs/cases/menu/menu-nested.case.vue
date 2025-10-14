<text>
嵌套菜单，支持多级子菜单展开
</text>

<template>
  <sp-menu>
    <template #activator="{ props }">
      <sp-btn
        v-bind="props"
        variant="elevated"
        color="info"
      >
        嵌套菜单
      </sp-btn>
    </template>
    <div class="menu-content">
      <div class="menu-item">普通菜单项</div>
      <sp-menu
        location="end"
        submenu
      >
        <template #activator="{ props }">
          <div
            v-bind="props"
            class="menu-item submenu-trigger"
          >
            子菜单 →
          </div>
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
</template>

<script setup lang="ts">
import { SPMenu, SPBtn } from 'speed-ui-vue'
</script>
