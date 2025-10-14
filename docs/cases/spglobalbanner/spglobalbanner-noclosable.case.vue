<text>
不可关闭的全局横幅，适用于重要通知场景。
</text>

<template>
  <div>
    <SPGlobalBanner
      :closable="false"
      bg-color="warning"
    >
      <template #left>
        <span>⚠️</span>
      </template>
      <template #center>
        <span>此横幅无法关闭，用于展示持续性重要信息</span>
      </template>
    </SPGlobalBanner>

    <div style="padding: 20px;">
      <p>页面内容...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SPGlobalBanner } from 'speed-ui-vue'
</script>
