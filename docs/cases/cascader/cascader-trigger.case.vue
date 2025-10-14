<text>
> 展开触发方式演示，支持点击和悬停触发
</text>

<template>
  <sp-space direction="vertical" :size="12">
    <sp-cascader
      v-model="clickValue"
      :options="basicOptions"
      placeholder="点击展开（默认）"
      expand-trigger="click"
      style="width: 300px"
    />
    <sp-cascader
      v-model="hoverValue"
      :options="basicOptions"
      placeholder="悬停展开"
      expand-trigger="hover"
      style="width: 300px"
    />
    <sp-cascader
      v-model="hoverValue2"
      :options="basicOptions"
      placeholder="悬停 + 多选"
      expand-trigger="hover"
      multiple
      style="width: 300px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const clickValue = ref(null)
const hoverValue = ref(null)
const hoverValue2 = ref([])

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