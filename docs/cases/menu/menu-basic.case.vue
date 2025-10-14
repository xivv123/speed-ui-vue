<text>
基本菜单用法，点击按钮打开菜单
</text>

<template>
  <sp-menu>
    <template #activator="{ props }">
      <sp-btn
        v-bind="props"
        variant="elevated"
        color="primary"
      >
        点击打开菜单
      </sp-btn>
    </template>
    <div class="menu-content">
      <div class="menu-item">菜单项 1</div>
      <div class="menu-item">菜单项 2</div>
      <div class="menu-item">菜单项 3</div>
    </div>
  </sp-menu>
</template>

<script setup lang="ts">
import { SPMenu, SPBtn } from 'speed-ui-vue'
</script>
