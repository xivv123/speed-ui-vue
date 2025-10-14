<text>
粘性定位的全局横幅，始终停留在页面顶部。
</text>

<template>
  <div>
    <SPGlobalBanner
      sticky
      bg-color="info"
    >
      <template #left>
        <span>ℹ️ 重要通知</span>
      </template>
      <template #center>
        <span>系统将于今晚 22:00 - 24:00 进行维护升级</span>
      </template>
    </SPGlobalBanner>

    <div style="padding: 20px; height: 200vh;">
      <p>滚动页面查看横幅粘性效果...</p>
      <p style="margin-top: 100px;">横幅会保持在页面顶部</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SPGlobalBanner } from 'speed-ui-vue'
</script>
