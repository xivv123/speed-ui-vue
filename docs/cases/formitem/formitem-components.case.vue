<text>
sp-form-item 可以与各种表单组件配合使用，包括输入框、选择器、复选框、单选框、滑块等。
</text>

<template>
    <sp-form ref="formRef" :model="formData" label-position="left" label-width="120px">
        <!-- 文本输入框 -->
        <sp-form-item
            label="姓名"
            prop="name"
            :rules="[(v) => !!v || '姓名不能为空']"
        >
            <sp-text-field v-model="formData.name" placeholder="请输入姓名" />
        </sp-form-item>

        <!-- 选择器 -->
        <sp-form-item
            label="城市"
            prop="city"
            :rules="[(v) => !!v || '请选择城市']"
        >
            <sp-select
                v-model="formData.city"
                :items="['北京', '上海', '广州', '深圳']"
                placeholder="请选择城市"
            />
        </sp-form-item>

        <!-- 级联选择器 -->
        <sp-form-item
            label="地区"
            prop="region"
            :rules="[(v) => !!v || '请选择地区']"
        >
            <sp-cascader
                v-model="formData.region"
                :options="cascaderOptions"
                placeholder="请选择地区"
            />
        </sp-form-item>

        <!-- 复选框 -->
        <sp-form-item
            label="同意条款"
            prop="agreement"
            :rules="[(v) => !!v || '请同意相关条款']"
        >
            <sp-checkbox v-model="formData.agreement" label="我同意用户协议和隐私政策" />
        </sp-form-item>

        <!-- 单选框组 -->
        <sp-form-item
            label="性别"
            prop="gender"
            :rules="[(v) => !!v || '请选择性别']"
        >
            <sp-radio-group v-model="formData.gender" inline>
                <sp-radio value="male" label="男" />
                <sp-radio value="female" label="女" />
                <sp-radio value="other" label="其他" />
            </sp-radio-group>
        </sp-form-item>

        <!-- 滑块 -->
        <sp-form-item
            label="年龄"
            prop="age"
            :rules="[(v) => v >= 18 || '年龄必须大于等于18岁']"
        >
            <sp-slider v-model="formData.age" :min="0" :max="100" />
        </sp-form-item>

        <!-- 开关 -->
        <sp-form-item
            label="接收通知"
            prop="notification"
        >
            <sp-switch v-model="formData.notification" label="开启邮件通知" />
        </sp-form-item>

        <sp-form-item>
            <sp-btn @click="validate" primary>提交</sp-btn>
            <sp-btn @click="reset" style="margin-left: 10px;">重置</sp-btn>
        </sp-form-item>
    </sp-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formRef = ref()
const formData = reactive({
    name: '',
    city: '',
    region: null,
    agreement: false,
    gender: '',
    age: 25,
    notification: false
})

const cascaderOptions = [
    {
        label: '北京市',
        value: 'beijing',
        children: [
            { label: '海淀区', value: 'haidian' },
            { label: '朝阳区', value: 'chaoyang' },
            { label: '东城区', value: 'dongcheng' }
        ]
    },
    {
        label: '上海市',
        value: 'shanghai',
        children: [
            { label: '浦东新区', value: 'pudong' },
            { label: '黄浦区', value: 'huangpu' },
            { label: '徐汇区', value: 'xuhui' }
        ]
    }
]

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
        name: '',
        city: '',
        region: null,
        agreement: false,
        gender: '',
        age: 25,
        notification: false
    })
}
</script>
