<text>
> 验证规则演示，展示各种字段验证功能
</text>

<template>
    <sp-form v-model="isValid" @submit="onSubmit">
        <template #default="{ isValid, isValidating, validate, reset, errors }">
                <!-- 必填字段 -->
                <sp-text-field v-model="form.name" label="姓名（必填）" placeholder="请输入姓名" :rules="nameRules" required />

                <!-- 长度验证 -->
                <sp-text-field v-model="form.password" label="密码（6-20字符）" placeholder="请输入密码" type="password"
                    :rules="passwordRules" required />

                <!-- 格式验证 -->
                <sp-text-field v-model="form.phone" label="手机号" placeholder="请输入手机号" :rules="phoneRules" />

                <!-- 数字验证 -->
                <sp-text-field v-model="form.age" label="年龄（18-100）" placeholder="请输入年龄" type="number"
                    :rules="ageRules" />

                <!-- 自定义验证 -->
                <sp-text-field v-model="form.confirmPassword" label="确认密码" placeholder="请再次输入密码" type="password"
                    :rules="confirmPasswordRules" />

                <!-- 错误信息显示 -->
                <div v-if="errors.length > 0"
                    style="padding: 12px; background: #ffebee; border-radius: 4px; border-left: 4px solid #f44336;">
                    <strong style="color: #d32f2f;">验证错误：</strong>
                    <ul style="margin: 8px 0 0 16px; color: #d32f2f;">
                        <li v-for="error in errors" :key="error.id">
                            {{ error.id }}: {{ error.errorMessages.join(', ') }}
                        </li>
                    </ul>
                </div>

                <!-- 操作按钮 -->
                <sp-space direction="horizontal" :size="12" wrap>
                    <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid"
                        >
                        提交表单
                    </sp-btn>

                    <sp-btn type="button" variant="outlined" @click="validate">
                        验证
                    </sp-btn>

                    <sp-btn type="button" variant="text" @click="reset">
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
    name: '',
    password: '',
    phone: '',
    age: '',
    confirmPassword: ''
})

const nameRules = [
    v => !!v || '姓名不能为空',
    v => (v && v.length >= 2) || '姓名至少2个字符',
    v => (v && v.length <= 20) || '姓名不能超过20个字符'
]

const passwordRules = [
    v => !!v || '密码不能为空',
    v => (v && v.length >= 6) || '密码至少6个字符',
    v => (v && v.length <= 20) || '密码不能超过20个字符'
]

const phoneRules = [
    v => !v || /^1[3-9]\d{9}$/.test(v) || '请输入有效的手机号'
]

const ageRules = [
    v => !v || /^\d+$/.test(v) || '年龄必须是数字',
    v => !v || (parseInt(v) >= 18 && parseInt(v) <= 100) || '年龄必须在18-100之间'
]

const confirmPasswordRules = [
    v => !v || v === form.password || '两次密码输入不一致'
]

const onSubmit = async (e) => {
    const result = await e
    if (result.valid) {
        alert('验证通过，表单提交成功！')
    } else {
        alert('表单验证失败，请检查输入')
    }
}
</script>