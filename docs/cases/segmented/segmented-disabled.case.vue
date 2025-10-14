<text>
禁用状态的分段控制器，可以禁用整个组件或单个选项
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">禁用整个组件</div>
      <sp-segmented
        v-model="selected1"
        :options="['选项1', '选项2', '选项3']"
        disabled
      />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #666; font-size: 14px;">禁用单个选项</div>
      <sp-segmented
        v-model="selected2"
        :options="options"
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPSegmented, SPSpace } from 'speed-ui-vue'

const selected1 = ref('选项1')
const selected2 = ref('option1')

const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2 (禁用)', value: 'option2', disabled: true },
  { label: '选项3', value: 'option3' }
]
</script>
