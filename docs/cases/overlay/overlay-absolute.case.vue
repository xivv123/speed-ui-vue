<text>
绝对定位遮罩，相对于父元素定位
</text>

<template>
  <div style="position: relative; height: 400px; border: 2px dashed #ccc; border-radius: 8px; padding: 20px;">
    <h4>父容器区域</h4>
    <sp-btn @click="show = true">
      显示绝对定位遮罩
    </sp-btn>

    <sp-overlay v-model="show" absolute contained class="align-center justify-center">
      <sp-card style="width: 300px; padding: 20px;">
        <h3>绝对定位遮罩</h3>
        <p>仅覆盖父容器区域</p>
        <sp-btn @click="show = false" color="primary">
          关闭
        </sp-btn>
      </sp-card>
    </sp-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPOverlay, SPBtn, SPCard } from 'speed-ui-vue'

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
