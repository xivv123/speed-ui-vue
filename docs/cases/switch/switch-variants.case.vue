<text>
> 不同变体样式的开关组件，包括内嵌、扁平、方形等样式
</text>

<template>
  <div class="switch-variants-demo">
    <sp-switch
      v-model="defaultValue"
      label="默认样式"
    />

    <sp-switch
      v-model="insetValue"
      label="内嵌样式"
      inset
    />

    <sp-switch
      v-model="flatValue"
      label="扁平样式"
      flat
    />

    <sp-switch
      v-model="insetFlatValue"
      label="内嵌 + 扁平"
      inset
      flat
    />

    <sp-switch
      v-model="squareValue"
      label="方形内嵌样式"
      inset-square
    />

    <sp-switch
      v-model="squareColorValue"
      label="方形 + 颜色"
      inset-square
      color="primary"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const defaultValue = ref(false)
  const insetValue = ref(true)
  const flatValue = ref(false)
  const insetFlatValue = ref(true)
  const squareValue = ref(false)
  const squareColorValue = ref(true)
</script>

<style scoped>
  .switch-variants-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
