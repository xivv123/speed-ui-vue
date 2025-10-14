<text>
局部加载，通过 absolute 和 contained 属性限制在特定区域内
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <sp-btn @click="showLoading">显示局部加载</sp-btn>

    <div style="position: relative; height: 200px; border: 1px solid #ddd; border-radius: 4px; padding: 20px;">
      <p>这是一个内容区域</p>
      <p>加载遮罩会覆盖在这个区域上</p>

      <sp-loading
        v-model="loading"
        text="加载中..."
        absolute
        contained
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPLoading, SPBtn, SPSpace } from 'speed-ui-vue'

const loading = ref(false)

function showLoading() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 3000)
}
</script>
