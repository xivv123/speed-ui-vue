<text>
> 不同状态的选择器（正常、禁用、只读、加载等）
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-select v-model:value="normalValue" label="正常状态" placeholder="正常可选择状态" :items="stateItems" />
      <sp-select v-model="readonlyValue" label="只读状态" placeholder="只读状态" :items="stateItems" readonly />
      <sp-select v-model:value="emptyValue" label="空数据状态" placeholder="暂无数据" :items="[]" no-data-text="没有可选项" />
      <sp-select v-model="outlinedDisabledValue" label="轮廓 + 禁用" variant="outlined" placeholder="轮廓禁用状态"
        :items="stateItems" disabled />
    </sp-col>

    <sp-col>
      <sp-select v-model="disabledValue" placeholder="禁用状态" :items="stateItems" disabled />
      <sp-select v-model:value="loadingValue" label="加载状态" placeholder="加载中..." :items="stateItems" loading />
      <sp-select v-model:value="focusedValue" label="自动聚焦" placeholder="自动聚焦" :items="stateItems" />
      <sp-select v-model="outlinedReadonlyValue" label="轮廓 + 只读" variant="outlined" placeholder="轮廓只读状态"
        :items="stateItems" readonly />
    </sp-col>
  </sp-row>
</template>

<script setup>
import { ref } from 'vue'

const normalValue = ref('')
const disabledValue = ref('禁用状态')
const readonlyValue = ref('正常选项')
const loadingValue = ref('')
const emptyValue = ref('')
const focusedValue = ref('')
const outlinedDisabledValue = ref('第三个选项')
const outlinedReadonlyValue = ref('另一个选项')

const stateItems = [
  '正常选项',
  '另一个选项',
  '第三个选项',
  '最后一个选项'
]
</script>
