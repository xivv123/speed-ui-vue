<text>
> 基础表单演示，展示最简单的表单用法
</text>

<template>
    <sp-form v-model="isValid" @submit="onSubmit">
        <template #default="{ isValid, isValidating, reset }">
                <sp-text-field v-model="form.username" label="用户名" placeholder="请输入用户名" :rules="usernameRules"
                    required />

                <sp-text-field v-model="form.email" label="邮箱" placeholder="请输入邮箱" type="email" :rules="emailRules"
                    required />

                <sp-space direction="horizontal" :size="12" wrap>
                    <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid"
                        >
                        提交
                    </sp-btn>

                    <sp-btn type="button" variant="outlined" @click="reset">
                        重置
                    </sp-btn>
                </sp-space>
        </template>
    </sp-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isValid = ref(null)

const form = reactive({
    username: '',
    email: ''
})

const usernameRules = [
    v => !!v || '用户名不能为空',
    v => (v && v.length >= 3) || '用户名至少3个字符'
]

const emailRules = [
    v => !!v || '邮箱不能为空',
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '请输入有效的邮箱地址'
]

const onSubmit = async (e) => {
    const result = await e
    if (result.valid) {
        alert('提交成功！')
    }
}
</script>