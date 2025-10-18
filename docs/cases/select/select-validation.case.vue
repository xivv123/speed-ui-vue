<text>
> 带有验证和错误状态的选择器
</text>

<template>
  <sp-row :cols="2" gap="24">
    <sp-col>
      <sp-select v-model="successValue" label="成功状态" placeholder="验证通过" :items="validationItems" color="success" />
      <sp-select v-model="errorValue" label="错误状态" placeholder="验证失败" :items="validationItems" color="error" />
      <sp-select v-model="requiredValue" label="必填字段" placeholder="此字段为必填项" :items="validationItems"
        :rules="[requiredRule]" />
      <sp-select v-model="outlinedErrorValue" label="轮廓 + 错误" variant="outlined" placeholder="轮廓错误状态"
        :items="validationItems" :error-messages="outlinedErrorValue ? [] : ['选择无效']" />
    </sp-col>

    <sp-col>
      <sp-select v-model="warningValue" label="警告状态" placeholder="需要注意" :items="validationItems" color="warning" />
      <sp-select v-model="errorWithMessageValue" label="带错误信息" placeholder="请选择一个选项" :items="validationItems"
        :error-messages="errorWithMessageValue ? [] : ['请选择一个有效的选项']" />
      <sp-select v-model="outlinedSuccessValue" label="轮廓 + 成功" variant="outlined" placeholder="轮廓成功状态"
        :items="validationItems" color="success" />
    </sp-col>
  </sp-row>
</template>

<script setup>
import { ref } from 'vue'

const successValue = ref('有效选项')
const warningValue = ref('警告选项')
const errorValue = ref('无效选项')
const errorWithMessageValue = ref('')
const requiredValue = ref('')
const outlinedSuccessValue = ref('成功选项')
const outlinedErrorValue = ref('')

const validationItems = [
  '有效选项',
  '警告选项',
  '无效选项',
  '成功选项',
  '错误选项'
]

const requiredRule = (value) => {
  return !!value || '请选择一个选项'
}
</script>
