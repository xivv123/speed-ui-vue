不同位置,抽屉可以从四个方向滑出。

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <sp-btn @click="leftDrawer = true">左侧</sp-btn>
    <sp-btn @click="rightDrawer = true">右侧</sp-btn>
    <sp-btn @click="topDrawer = true">顶部</sp-btn>
    <sp-btn @click="bottomDrawer = true">底部</sp-btn>
  </div>

  <sp-drawer v-model="leftDrawer" location="left">
    <div style="padding: 24px;">
      <h3>左侧抽屉</h3>
      <p>从左侧滑入</p>
      <sp-btn @click="leftDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>

  <sp-drawer v-model="rightDrawer" location="right">
    <div style="padding: 24px;">
      <h3>右侧抽屉</h3>
      <p>从右侧滑入</p>
      <sp-btn @click="rightDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>

  <sp-drawer v-model="topDrawer" location="top">
    <div style="padding: 24px;">
      <h3>顶部抽屉</h3>
      <p>从顶部滑入</p>
      <sp-btn @click="topDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>

  <sp-drawer v-model="bottomDrawer" location="bottom">
    <div style="padding: 24px;">
      <h3>底部抽屉</h3>
      <p>从底部滑入</p>
      <sp-btn @click="bottomDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const leftDrawer = ref(false)
  const rightDrawer = ref(false)
  const topDrawer = ref(false)
  const bottomDrawer = ref(false)
</script>
