<text>
> 尺寸变体演示，支持不同尺寸的级联选择器
</text>

<template>
  <sp-space direction="vertical" :size="12">
    <sp-cascader
      v-model="smallValue"
      :options="basicOptions"
      placeholder="小尺寸"
      size="small"
      style="width: 200px"
    />
    <sp-cascader
      v-model="mediumValue"
      :options="basicOptions"
      placeholder="中等尺寸（默认）"
      size="medium"
      style="width: 250px"
    />
    <sp-cascader
      v-model="largeValue"
      :options="basicOptions"
      placeholder="大尺寸"
      size="large"
      style="width: 300px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const smallValue = ref(null)
const mediumValue = ref(null)
const largeValue = ref(null)

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
    ],
  },
]
</script>