<text>
不同尺寸的环形进度条
</text>

<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
    <div style="text-align: center;">
      <sp-prog-cir v-model="progress" :size="80" color="primary" :width="4">
        <template #default="{ value }">
          <div style="font-size: 14px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress" :size="120" color="success" :width="6">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress" :size="160" color="warning" :width="8">
        <template #default="{ value }">
          <div style="font-size: 24px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const progress = ref(70)
</script>
