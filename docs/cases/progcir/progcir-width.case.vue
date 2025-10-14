<text>
自定义线条宽度
</text>

<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
    <div style="text-align: center;">
      <sp-prog-cir v-model="progress" :size="120" color="primary" :width="4">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress" :size="120" color="success" :width="8">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress" :size="120" color="warning" :width="12">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const progress = ref(60)
</script>
