<text>
> 多选模式演示，支持选择多个选项
</text>

<template>
  <sp-space direction="vertical" :size="12">
    <sp-cascader
      v-model="multipleValue"
      :options="basicOptions"
      placeholder="多选模式"
      multiple
      style="width: 300px"
    />
    <sp-cascader
      v-model="multipleValue2"
      :options="basicOptions"
      placeholder="多选 + 仅显示最后一级"
      multiple
      :show-all-levels="false"
      style="width: 300px"
    />
    <sp-cascader
      v-model="multipleValue3"
      :options="basicOptions"
      placeholder="多选 + 可折叠标签"
      multiple
      collapse-tags
      style="width: 300px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const multipleValue = ref([])
const multipleValue2 = ref([])
const multipleValue3 = ref([])

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
      {
        label: '朝阳区',
        value: 'chaoyang',
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
      {
        label: '黄浦区',
        value: 'huangpu',
        children: [
          { label: '外滩', value: 'waitan' },
          { label: '南京路', value: 'nanjinglu' },
        ],
      },
    ],
  },
]
</script>