<text>
不同高度的进度条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">细 (2px)</div>
      <sp-progress-linear v-model="progress" color="primary" :height="2" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">默认 (4px)</div>
      <sp-progress-linear v-model="progress" color="success" :height="4" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">中等 (8px)</div>
      <sp-progress-linear v-model="progress" color="warning" :height="8" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">粗 (16px)</div>
      <sp-progress-linear v-model="progress" color="error" :height="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPProgressLinear } from 'speed-ui-vue'

const progress = ref(60)
</script>
