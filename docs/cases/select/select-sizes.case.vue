<text>
> 不同尺寸和密度的选择器
</text>

<template>
  <sp-space direction="vertical" :size="20">
    <div>
      <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px">
        小尺寸
      </h4>
      <sp-space wrap>
        <sp-select v-model="smallValue1" label="小尺寸选择器" placeholder="小尺寸" :items="sizeItems" density="compact"
          style="width: 250px" />
        <sp-select v-model="smallValue2" label="小尺寸轮廓" variant="outlined" placeholder="小尺寸轮廓" :items="sizeItems"
          density="compact" style="width: 250px" />
      </sp-space>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px">
        默认尺寸
      </h4>
      <sp-space wrap>
        <sp-select v-model="defaultValue1" label="默认尺寸选择器" placeholder="默认尺寸" :items="sizeItems" style="width: 280px" />
        <sp-select v-model="defaultValue2" label="默认尺寸轮廓" variant="outlined" placeholder="默认尺寸轮廓" :items="sizeItems"
          style="width: 280px" />
      </sp-space>
    </div>

    <div>
      <h4 style="margin: 0 0 12px 0; color: #374151; font-size: 14px">
        舒适尺寸
      </h4>
      <sp-space wrap>
        <sp-select v-model="comfortableValue1" label="舒适尺寸选择器" placeholder="舒适尺寸" :items="sizeItems"
          density="comfortable" style="width: 320px" />
        <sp-select v-model="comfortableValue2" label="舒适尺寸轮廓" variant="outlined" placeholder="舒适尺寸轮廓" :items="sizeItems"
          density="comfortable" style="width: 320px" />
      </sp-space>
    </div>
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const smallValue1 = ref('')
const smallValue2 = ref('')
const defaultValue1 = ref('')
const defaultValue2 = ref('')
const comfortableValue1 = ref('')
const comfortableValue2 = ref('')

const sizeItems = [
  '选项 A',
  '选项 B',
  '选项 C',
  '选项 D'
]
</script>
