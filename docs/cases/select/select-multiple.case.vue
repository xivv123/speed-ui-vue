<text>
> 多选模式的选择器，可以选择多个选项
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-space wrap>
      <sp-select v-model="multipleValue1" label="多选选择器" placeholder="可选择多个选项" :items="multipleItems" multiple clearable
        style="width: 320px" />
      <sp-select v-model="multipleValue2" label="轮廓多选" variant="outlined" placeholder="轮廓样式多选" :items="multipleItems"
        multiple clearable style="width: 320px" />
    </sp-space>

    <sp-space wrap>
      <sp-select v-model="multipleValue3" label="技能选择" placeholder="选择你的技能" :items="skillItems" multiple chips clearable
        style="width: 380px" />
    </sp-space>
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const multipleValue1 = ref(['技能一', '技能三'])
const multipleValue2 = ref(['技能二'])
const multipleValue3 = ref(['前端开发', 'UI设计'])

const multipleItems = [
  '技能一',
  '技能二',
  '技能三',
  '技能四',
  '技能五'
]

const skillItems = [
  '前端开发',
  '后端开发',
  '移动开发',
  'UI设计',
  '产品设计',
  '数据分析'
]
</script>
