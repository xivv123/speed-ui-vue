<text>
通过 precision 属性设置小数精度，通过 step 设置步长
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <sp-input-num
        v-model="value1"
        :precision="0"
        :step="1"
      />
    </div>

    <div>
      <sp-input-num
        v-model="value2"
        :precision="2"
        :step="0.1"
      />
    </div>

    <div>
      <sp-input-num
        v-model="value3"
        :precision="4"
        :min-fraction-digits="2"
        :step="0.01"
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(0)
const value2 = ref(0.00)
const value3 = ref(1.50)
</script>
