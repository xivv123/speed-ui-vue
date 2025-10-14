自定义宽度,可以设置不同的抽屉宽度。

<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <sp-btn @click="smallDrawer = true">小 (200px)</sp-btn>
    <sp-btn @click="mediumDrawer = true">中 (400px)</sp-btn>
    <sp-btn @click="largeDrawer = true">大 (600px)</sp-btn>
  </div>

  <sp-drawer v-model="smallDrawer" :width="200">
    <div style="padding: 24px;">
      <h3>小抽屉</h3>
      <p>宽度: 200px</p>
      <sp-btn @click="smallDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>

  <sp-drawer v-model="mediumDrawer" :width="400">
    <div style="padding: 24px;">
      <h3>中等抽屉</h3>
      <p>宽度: 400px</p>
      <sp-btn @click="mediumDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>

  <sp-drawer v-model="largeDrawer" :width="600">
    <div style="padding: 24px;">
      <h3>大抽屉</h3>
      <p>宽度: 600px</p>
      <sp-btn @click="largeDrawer = false">关闭</sp-btn>
    </div>
  </sp-drawer>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const smallDrawer = ref(false)
  const mediumDrawer = ref(false)
  const largeDrawer = ref(false)
</script>
