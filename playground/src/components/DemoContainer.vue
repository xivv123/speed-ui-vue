<template>
  <div class="demo-container">
    <!-- 头部区域 -->
    <HeaderCard 
      :title="title"
      :back="true"
    />

    <sp-space :size="32" />

    <!-- 演示内容插槽 -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import HeaderCard from './HeaderCard.vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
</style>