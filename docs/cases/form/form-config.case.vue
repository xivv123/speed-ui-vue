<text>
> 表单配置演示，展示不同的表单配置选项
</text>

<template>
    <sp-space direction="vertical" :size="24">
        <!-- 配置选项 -->
        <div style="padding: 16px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #1976d2;">
            <h4 style="margin: 0 0 12px 0; color: #1976d2;">表单配置</h4>
            <sp-space direction="horizontal" :size="16" wrap>
                <sp-checkbox v-model="config.fastFail" label="快速失败" />
                <sp-checkbox v-model="config.disabled" label="禁用表单" />
                <sp-checkbox v-model="config.readonly" label="只读表单" />
            </sp-space>
        </div>

        <!-- 表单 -->
        <sp-form v-model="isValid" :fast-fail="config.fastFail" :disabled="config.disabled" :readonly="config.readonly"
            validate-on="blur" @submit="onSubmit">
            <template #default="{ isValid, isValidating, validate, reset, errors }">
                <sp-space direction="vertical" :size="16">
                    <sp-text-field v-model="form.username" label="用户名" placeholder="请输入用户名" :rules="usernameRules"
                        required />

                    <sp-text-field v-model="form.email" label="邮箱" placeholder="请输入邮箱" type="email" :rules="emailRules"
                        required />

                    <sp-textarea v-model="form.description" label="描述" placeholder="请输入描述信息" :rules="descriptionRules"
                        rows="3" counter="100" />

                    <sp-checkbox v-model="form.agree" label="我同意相关条款和条件" :rules="agreeRules" required />

                    <!-- 操作按钮 -->
                    <sp-space direction="horizontal" :size="12" wrap>
                        <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid"
                            :loading="isValidating">
                            提交
                        </sp-btn>

                        <sp-btn type="button" variant="outlined" @click="validate">
                            验证
                        </sp-btn>

                        <sp-btn type="button" variant="text" @click="reset">
                            重置
                        </sp-btn>
                    </sp-space>

                    <!-- 状态显示 -->
                    <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
                        <div><strong>表单状态：</strong> {{ isValid ? '✅ 有效' : '❌ 无效' }}</div>
                        <div><strong>快速失败：</strong> {{ config.fastFail ? '开启' : '关闭' }}</div>
                        <div><strong>表单禁用：</strong> {{ config.disabled ? '是' : '否' }}</div>
                        <div><strong>表单只读：</strong> {{ config.readonly ? '是' : '否' }}</div>
                        <div><strong>错误数量：</strong> {{ errors.length }}</div>
                    </div>
                </sp-space>
            </template>
        </sp-form>
    </sp-space>
</template>

<script setup>
import { ref, reactive } from 'vue'

const isValid = ref(null)

const config = reactive({
    fastFail: false,
    disabled: false,
    readonly: false
})

const form = reactive({
    username: '',
    email: '',
    description: '',
    agree: false
})

const usernameRules = [
    v => !!v || '用户名不能为空',
    v => (v && v.length >= 3) || '用户名至少3个字符'
]

const emailRules = [
    v => !!v || '邮箱不能为空',
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '请输入有效的邮箱地址'
]

const descriptionRules = [
    v => (v && v.length <= 100) || '描述不能超过100个字符'
]

const agreeRules = [
    v => v || '必须同意条款才能继续'
]

const onSubmit = async (e) => {
    const result = await e
    if (result.valid) {
        alert('配置表单提交成功！')
    }
}
</script>