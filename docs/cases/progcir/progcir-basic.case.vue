<text>
基本环形进度条，显示具体进度值
</text>

<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap;">
    <div style="text-align: center;">
      <sp-prog-cir v-model="progress1" :size="100" color="primary" :width="6">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress2" :size="100" color="success" :width="6">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress3" :size="100" color="warning" :width="6">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir v-model="progress4" :size="100" color="error" :width="6">
        <template #default="{ value }">
          <div style="font-size: 18px; font-weight: 600;">{{ Math.round(value) }}%</div>
        </template>
      </sp-prog-cir>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPProgCir } from 'speed-ui-vue'

const progress1 = ref(25)
const progress2 = ref(50)
const progress3 = ref(75)
const progress4 = ref(100)
</script>
