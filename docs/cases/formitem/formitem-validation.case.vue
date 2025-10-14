<text>
sp-form-item 支持多种验证规则，包括必填、长度限制、正则表达式等。
</text>

<template>
    <sp-form ref="formRef" :model="formData" label-position="left" label-width="120px">
        <sp-form-item
            label="用户名"
            prop="username"
            required
            :rules="[
                (v) => !!v || '用户名不能为空',
                (v) => v.length >= 3 || '用户名至少3个字符',
                (v) => v.length <= 20 || '用户名最多20个字符'
            ]"
        >
            <sp-text-field v-model="formData.username" placeholder="3-20个字符" />
        </sp-form-item>

        <sp-form-item
            label="手机号"
            prop="phone"
            required
            :rules="[
                (v) => !!v || '手机号不能为空',
                (v) => /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'
            ]"
        >
            <sp-text-field v-model="formData.phone" placeholder="请输入11位手机号" />
        </sp-form-item>

        <sp-form-item
            label="年龄"
            prop="age"
            required
            :rules="[
                (v) => !!v || '年龄不能为空',
                (v) => !isNaN(Number(v)) || '年龄必须是数字',
                (v) => Number(v) >= 18 || '年龄必须大于等于18岁',
                (v) => Number(v) <= 100 || '年龄必须小于等于100岁'
            ]"
        >
            <sp-text-field v-model="formData.age" placeholder="18-100" />
        </sp-form-item>

        <sp-form-item>
            <sp-btn @click="validate" primary>验证表单</sp-btn>
            <sp-btn @click="reset" style="margin-left: 10px;">重置</sp-btn>
        </sp-form-item>
    </sp-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()
const formData = reactive({
    username: '',
    phone: '',
    age: ''
})

const validate = async () => {
    try {
        await formRef.value?.validate()
    } catch (error) {
        console.error('验证失败:', error)
    }
}

const reset = () => {
    formRef.value?.reset()
    Object.assign(formData, {
        username: '',
        phone: '',
        age: ''
    })
}
</script>
