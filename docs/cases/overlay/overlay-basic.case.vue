<text>
基本遮罩层，点击按钮显示遮罩
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="show = true">
      显示遮罩层
    </sp-btn>

    <sp-overlay v-model="show" class="align-center justify-center">
      <sp-card style="width: 400px; padding: 20px;">
        <h3>这是遮罩层内容</h3>
        <p>点击外部或按钮关闭遮罩层</p>
        <sp-btn @click="show = false" color="primary">
          关闭
        </sp-btn>
      </sp-card>
    </sp-overlay>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPOverlay, SPBtn, SPCard, SPSpace } from 'speed-ui-vue'

const show = ref(false)
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
