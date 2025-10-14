<text>
> 基础用法演示，展示级联选择器的基本功能
</text>

<template>
  <sp-space direction="vertical" :size="12">
    <sp-cascader
      v-model="singleValue"
      :options="basicOptions"
      placeholder="请选择地区"
      style="width: 300px"
    />
    <sp-cascader
      v-model="singleValue2"
      :options="basicOptions"
      placeholder="仅显示最后一级"
      :show-all-levels="false"
      style="width: 300px"
    />
    <sp-cascader
      v-model="singleValue3"
      :options="basicOptions"
      placeholder="自定义分隔符"
      separator=" → "
      style="width: 300px"
    />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const singleValue = ref(null)
const singleValue2 = ref(null)
const singleValue3 = ref(null)

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