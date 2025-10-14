<template>
  <sp-scrollbar height="100vh" id="app">
    <!-- 路由视图 -->
    <router-view />
  </sp-scrollbar>
</template>

<script setup lang="ts">
</script>

<style>
/* 全局样式 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#app {
  /* 移除 min-height，因为现在由 sp-scrollbar 控制高度 */
  width: 100%;
}
</style>