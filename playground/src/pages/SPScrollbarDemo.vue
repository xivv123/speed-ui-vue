<template>
  <DemoContainer title="SPScrollbar 滚动条组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="自定义滚动条样式">
      <sp-scrollbar style="height: 300px;">
        <div style="padding: 20px;">
          <p v-for="i in 20" :key="i" style="margin: 10px 0;">
            这是第 {{ i }} 行内容，滚动查看更多内容
          </p>
        </div>
      </sp-scrollbar>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 水平滚动 -->
    <DemoSection title="水平滚动" subtitle="支持水平方向滚动">
      <sp-scrollbar style="width: 100%;">
        <div style="width: 2000px; padding: 20px; white-space: nowrap;">
          这是一段很长的文字内容，需要水平滚动才能查看完整内容。这是一段很长的文字内容，需要水平滚动才能查看完整内容。
        </div>
      </sp-scrollbar>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 双向滚动 -->
    <DemoSection title="双向滚动" subtitle="同时支持垂直和水平滚动">
      <sp-scrollbar style="height: 300px; width: 100%;">
        <div style="width: 1500px; padding: 20px;">
          <p v-for="i in 15" :key="i" style="margin: 10px 0;">
            第 {{ i }} 行 - 这是一段很长的文字内容，需要水平滚动才能查看完整内容
          </p>
        </div>
      </sp-scrollbar>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
</script>

<style scoped>
/* 组件样式 */
</style>
