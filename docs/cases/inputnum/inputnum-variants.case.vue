<text>
不同的控制按钮样式，支持 default、stacked、split 三种变体
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <sp-input-num
        v-model="value"
        control-variant="default"
      />
    </div>

    <div>
      <sp-input-num
        v-model="value"
        control-variant="stacked"
      />
    </div>

    <div>
      <sp-input-num
        v-model="value"
        control-variant="split"
      />
    </div>

    <div>
      <sp-input-num
        v-model="value"
        control-variant="hidden"
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(50)
</script>
