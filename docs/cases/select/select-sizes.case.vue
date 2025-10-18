<text>
> 不同尺寸和密度的选择器
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-select v-model:value="smallValue1" label="小尺寸选择器" placeholder="小尺寸" :items="sizeItems" density="compact" />
      <sp-select v-model:value="defaultValue1" label="默认尺寸选择器" placeholder="默认尺寸" :items="sizeItems" />
      <sp-select v-model:value="comfortableValue1" label="舒适尺寸选择器" placeholder="舒适尺寸" :items="sizeItems"
        density="comfortable" />
    </sp-col>

    <sp-col>
      <sp-select v-model:value="smallValue2" label="小尺寸轮廓" variant="outlined" placeholder="小尺寸轮廓" :items="sizeItems"
        density="compact" />
      <sp-select v-model:value="defaultValue2" label="默认尺寸轮廓" variant="outlined" placeholder="默认尺寸轮廓" :items="sizeItems" />
      <sp-select v-model:value="comfortableValue2" label="舒适尺寸轮廓" variant="outlined" placeholder="舒适尺寸轮廓" :items="sizeItems"
        density="comfortable" />
    </sp-col>
  </sp-row>
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
