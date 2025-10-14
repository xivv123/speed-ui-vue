<text>
> 禁用状态演示，支持整体禁用和选项禁用
</text>

<template>
  <sp-space direction="vertical" :size="12">
    <sp-cascader
      v-model="disabledValue"
      :options="basicOptions"
      placeholder="整体禁用"
      disabled
      style="width: 300px"
    />
    <sp-cascader
      v-model="partialDisabledValue"
      :options="disabledOptions"
      placeholder="部分选项禁用"
      style="width: 300px"
    />
    <sp-cascader
      v-model="multipleDisabledValue"
      :options="disabledOptions"
      placeholder="多选 + 部分禁用"
      multiple
      style="width: 300px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const disabledValue = ref(null)
const partialDisabledValue = ref(null)
const multipleDisabledValue = ref([])

const basicOptions = [
  {
    label: '北京市',
    value: 'beijing',
    children: [
      {
        label: '海淀区',
        value: 'haidian',
        children: [
          { label: '中关村', value: 'zhongguancun' },
          { label: '五道口', value: 'wudaokou' },
        ],
      },
    ],
  },
]

const disabledOptions = [
  {
    label: '北京市',
    value: 'beijing',
    children: [
      {
        label: '海淀区',
        value: 'haidian',
        children: [
          { label: '中关村', value: 'zhongguancun' },
          { label: '五道口', value: 'wudaokou', disabled: true },
        ],
      },
      {
        label: '朝阳区',
        value: 'chaoyang',
        disabled: true,
        children: [
          { label: '三里屯', value: 'sanlitun' },
          { label: '国贸', value: 'guomao' },
        ],
      },
    ],
  },
  {
    label: '上海市',
    value: 'shanghai',
    children: [
      {
        label: '浦东新区',
        value: 'pudong',
        children: [
          { label: '陆家嘴', value: 'lujiazui' },
          { label: '张江', value: 'zhangjiang' },
        ],
      },
    ],
  },
]
</script>