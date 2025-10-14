<text>
不同样式变体的分段控制器，支持 filled、outlined、solo 三种样式
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">Filled (默认)</div>
      <sp-segmented
        v-model="selected"
        :options="options"
        variant="filled"
      />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">Outlined</div>
      <sp-segmented
        v-model="selected"
        :options="options"
        variant="outlined"
      />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">Solo</div>
      <sp-segmented
        v-model="selected"
        :options="options"
        variant="solo"
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPSegmented, SPSpace } from 'speed-ui-vue'

const selected = ref('day')

const options = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
  { label: '年', value: 'year' }
]
</script>
