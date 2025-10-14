<text>
不确定进度的条形进度条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Primary 颜色</div>
      <sp-progress-linear indeterminate color="primary" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Success 颜色</div>
      <sp-progress-linear indeterminate color="success" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Warning 颜色</div>
      <sp-progress-linear indeterminate color="warning" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Error 颜色</div>
      <sp-progress-linear indeterminate color="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SPProgressLinear } from 'speed-ui-vue'
</script>
