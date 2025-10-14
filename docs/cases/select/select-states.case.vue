<text>
> 不同状态的选择器（正常、禁用、只读、加载等）
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-space wrap>
      <sp-select v-model="normalValue" label="正常状态" placeholder="正常可选择状态" :items="stateItems" style="width: 280px" />
      <sp-select v-model="disabledValue" label="禁用状态" placeholder="禁用状态" :items="stateItems" disabled
        style="width: 280px" />
      <sp-select v-model="readonlyValue" label="只读状态" placeholder="只读状态" :items="stateItems" readonly
        style="width: 280px" />
    </sp-space>

    <sp-space wrap>
      <sp-select v-model="loadingValue" label="加载状态" placeholder="加载中..." :items="stateItems" loading
        style="width: 280px" />
      <sp-select v-model="emptyValue" label="空数据状态" placeholder="暂无数据" :items="[]" no-data-text="没有可选项"
        style="width: 280px" />
      <sp-select v-model="focusedValue" label="自动聚焦" placeholder="自动聚焦" :items="stateItems" autofocus
        style="width: 280px" />
    </sp-space>

    <sp-space wrap>
      <sp-select v-model="outlinedDisabledValue" label="轮廓 + 禁用" variant="outlined" placeholder="轮廓禁用状态"
        :items="stateItems" disabled style="width: 280px" />
      <sp-select v-model="outlinedReadonlyValue" label="轮廓 + 只读" variant="outlined" placeholder="轮廓只读状态"
        :items="stateItems" readonly style="width: 280px" />
    </sp-space>
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const normalValue = ref('')
const disabledValue = ref('另一个选项')
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
