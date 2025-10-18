<text>
> 不同颜色主题的选择器
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-select v-model="primaryValue" label="主要颜色" placeholder="主要颜色主题" :items="colorItems" color="primary" />
      <sp-select v-model="successValue" label="成功颜色" placeholder="成功颜色主题" :items="colorItems" color="success" />
      <sp-select v-model="errorValue" label="错误颜色" placeholder="错误颜色主题" :items="colorItems" color="error" />
      <sp-select v-model="outlinedPrimaryValue" label="轮廓主要色" variant="outlined" placeholder="轮廓主要颜色"
        :items="colorItems" color="primary" />
    </sp-col>

    <sp-col>
      <sp-select v-model="secondaryValue" label="次要颜色" placeholder="次要颜色主题" :items="colorItems" color="secondary" />
      <sp-select v-model="warningValue" label="警告颜色" placeholder="警告颜色主题" :items="colorItems" color="warning" />
      <sp-select v-model="infoValue" label="信息颜色" placeholder="信息颜色主题" :items="colorItems" color="info" />
      <sp-select v-model="outlinedSuccessValue" label="轮廓成功色" variant="outlined" placeholder="轮廓成功颜色"
        :items="colorItems" color="success" />
    </sp-col>
  </sp-row>
</template>

<script setup>
import { ref } from 'vue'

const primaryValue = ref('选项一')
const secondaryValue = ref('')
const successValue = ref('选项二')
const warningValue = ref('')
const errorValue = ref('')
const infoValue = ref('')
const outlinedPrimaryValue = ref('')
const outlinedSuccessValue = ref('选项三')

const colorItems = [
    '选项一',
    '选项二',
    '选项三',
    '选项四',
    '选项五'
]
</script>