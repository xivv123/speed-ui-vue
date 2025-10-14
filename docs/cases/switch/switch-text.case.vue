<text>
> 带文本显示的开关组件，支持在开关内部或滑块上显示文字
</text>

<template>
  <div class="switch-text-demo">
    <sp-switch
      v-model="innerTextValue"
      label="内部文本"
      show-text
      checked-text="开"
      unchecked-text="关"
    />

    <sp-switch
      v-model="englishTextValue"
      label="英文文本"
      show-text
      checked-text="ON"
      unchecked-text="OFF"
    />

    <sp-switch
      v-model="thumbTextValue"
      label="滑块文本"
      thumb-checked-text="开"
      thumb-unchecked-text="关"
    />

    <sp-switch
      v-model="thumbEnglishValue"
      label="滑块英文"
      thumb-checked-text="ON"
      thumb-unchecked-text="OFF"
    />

    <sp-switch
      v-model="thumbSymbolValue"
      label="滑块符号"
      thumb-checked-text="✓"
      thumb-unchecked-text="✗"
    />

    <sp-switch
      v-model="insetTextValue"
      label="内嵌 + 文本"
      inset
      thumb-checked-text="YES"
      thumb-unchecked-text="NO"
      color="success"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const innerTextValue = ref(false)
  const englishTextValue = ref(true)
  const thumbTextValue = ref(false)
  const thumbEnglishValue = ref(true)
  const thumbSymbolValue = ref(false)
  const insetTextValue = ref(true)
</script>

<style scoped>
  .switch-text-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
