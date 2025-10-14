<text>
禁用和只读状态的数字输入框
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <sp-input-num
        v-model="value"
        disabled
      />
    </div>

    <div>
      <sp-input-num
        v-model="value"
        readonly
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(100)
</script>
