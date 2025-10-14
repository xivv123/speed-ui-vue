<text>
自定义遮罩颜色，支持不同的遮罩样式
</text>

<template>
  <sp-space :gap="20">
    <sp-btn @click="show1 = true">
      默认遮罩
    </sp-btn>

    <sp-btn @click="show2 = true" color="error">
      红色遮罩
    </sp-btn>

    <sp-btn @click="show3 = true" color="success">
      无遮罩
    </sp-btn>

    <sp-overlay v-model="show1" class="align-center justify-center">
      <sp-card style="width: 300px; padding: 20px;">
        <h3>默认遮罩</h3>
        <sp-btn @click="show1 = false" color="primary">关闭</sp-btn>
      </sp-card>
    </sp-overlay>

    <sp-overlay v-model="show2" scrim="error" class="align-center justify-center">
      <sp-card style="width: 300px; padding: 20px;">
        <h3>红色遮罩</h3>
        <sp-btn @click="show2 = false" color="primary">关闭</sp-btn>
      </sp-card>
    </sp-overlay>

    <sp-overlay v-model="show3" :scrim="false" class="align-center justify-center">
      <sp-card style="width: 300px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
        <h3>无遮罩</h3>
        <sp-btn @click="show3 = false" color="primary">关闭</sp-btn>
      </sp-card>
    </sp-overlay>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPOverlay, SPBtn, SPCard, SPSpace } from 'speed-ui-vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
</script>

<style scoped>
.align-center {
  display: flex;
  align-items: center;
}

.justify-center {
  display: flex;
  justify-content: center;
}
</style>
