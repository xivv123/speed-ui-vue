<text>
通过 min 和 max 属性设置数值范围
</text>

<template>
  <sp-space direction="vertical" :gap="20">
    <div>
      <sp-input-num
        v-model="value1"
        :min="0"
        :max="100"
        placeholder="0-100"
      />
    </div>

    <div>
      <sp-input-num
        v-model="value2"
        :min="-10"
        :max="10"
        placeholder="-10 到 10"
      />
    </div>
  </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPInputNum, SPSpace } from 'speed-ui-vue'

const value1 = ref(50)
const value2 = ref(0)
</script>
