<text>
基本条形进度条
</text>

<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">25% 进度</div>
      <sp-progress-linear v-model="progress1" color="primary" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">50% 进度</div>
      <sp-progress-linear v-model="progress2" color="success" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">75% 进度</div>
      <sp-progress-linear v-model="progress3" color="warning" />
    </div>

    <div>
      <div style="margin-bottom: 8px; font-size: 14px; color: #666;">100% 进度</div>
      <sp-progress-linear v-model="progress4" color="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPProgressLinear } from 'speed-ui-vue'

const progress1 = ref(25)
const progress2 = ref(50)
const progress3 = ref(75)
const progress4 = ref(100)
</script>
