<text>
sp-form-item 的基本用法，展示表单项的标签、输入框和验证规则。
</text>

<template>
    <sp-form :model="formData">
        <sp-form-item
            label="用户名"
            prop="username"
            :rules="[(v) => !!v || '用户名不能为空']"
        >
            <sp-text-field v-model="formData.username" placeholder="请输入用户名" />
        </sp-form-item>

        <sp-form-item
            label="邮箱"
            prop="email"
            :rules="[
                (v) => !!v || '邮箱不能为空',
                (v) => /.+@.+\..+/.test(v) || '邮箱格式不正确'
            ]"
        >
            <sp-text-field v-model="formData.email" placeholder="请输入邮箱" />
        </sp-form-item>

        <sp-form-item
            label="密码"
            prop="password"
            :rules="[
                (v) => !!v || '密码不能为空',
                (v) => v.length >= 6 || '密码至少6个字符'
            ]"
        >
            <sp-text-field v-model="formData.password" type="password" placeholder="请输入密码" />
        </sp-form-item>
    </sp-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
    username: '',
    email: '',
    password: ''
})
</script>
