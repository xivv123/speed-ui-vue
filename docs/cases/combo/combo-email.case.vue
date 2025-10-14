<text>
> 邮箱自动补全演示，展示动态搜索和自动建议功能
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <sp-combo v-model="emailValue" :items="emailSuggestions" label="邮箱输入" placeholder="输入邮箱地址..."
      @update:search="handleEmailSearch" style="width: 350px" />
  </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const emailValue = ref(null)
const emailSuggestions = ref([])

const emailDomains = [
  '@qq.com',
  '@163.com',
  '@126.com',
  '@gmail.com',
  '@hotmail.com',
  '@outlook.com',
  '@sina.com',
  '@sohu.com',
]

const handleEmailSearch = (searchValue) => {
  if (!searchValue || searchValue.includes('@')) {
    emailSuggestions.value = []
    return
  }

  // 生成邮箱建议
  emailSuggestions.value = emailDomains.map(domain => ({
    title: searchValue + domain,
    value: searchValue + domain,
  }))
}
</script>

<style scoped>
/* 邮箱自动补全样式 */
</style>