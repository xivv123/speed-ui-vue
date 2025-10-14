<text>
不同颜色主题的全局横幅示例。
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SPGlobalBanner bg-color="primary">
      <template #center>
        <span>主要色调横幅 - Primary Theme</span>
      </template>
    </SPGlobalBanner>

    <SPGlobalBanner bg-color="success">
      <template #center>
        <span>成功提示横幅 - Success Theme</span>
      </template>
    </SPGlobalBanner>

    <SPGlobalBanner bg-color="warning">
      <template #center>
        <span>警告信息横幅 - Warning Theme</span>
      </template>
    </SPGlobalBanner>

    <SPGlobalBanner bg-color="error">
      <template #center>
        <span>错误提示横幅 - Error Theme</span>
      </template>
    </SPGlobalBanner>

    <SPGlobalBanner bg-color="info">
      <template #center>
        <span>信息通知横幅 - Info Theme</span>
      </template>
    </SPGlobalBanner>
  </div>
</template>

<script setup lang="ts">
import { SPGlobalBanner } from 'speed-ui-vue'
</script>
