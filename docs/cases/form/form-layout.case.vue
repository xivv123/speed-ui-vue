<text>
> 表单布局演示，展示不同的表单布局方式
</text>

<template>
    <sp-space direction="vertical" :size="32">
        <!-- 垂直布局 -->
        <div>
            <h4 style="margin: 0 0 16px 0; color: #1976d2;">垂直布局</h4>
            <sp-form v-model="verticalValid" @submit="onSubmit">
                <template #default="{ isValid, reset }">
                    <sp-space direction="vertical" :size="16">
                        <sp-text-field v-model="verticalForm.name" label="姓名" required :rules="nameRules" />
                        <sp-text-field v-model="verticalForm.email" label="邮箱" type="email" required
                            :rules="emailRules" />
                        <sp-space direction="horizontal" :size="12" wrap>
                            <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid">提交</sp-btn>
                            <sp-btn type="button" variant="outlined" @click="reset">重置</sp-btn>
                        </sp-space>
                    </sp-space>
                </template>
            </sp-form>
        </div>

        <!-- 水平布局 -->
        <div>
            <h4 style="margin: 0 0 16px 0; color: #1976d2;">水平布局</h4>
            <sp-form v-model="horizontalValid" @submit="onSubmit">
                <template #default="{ isValid, reset }">
                    <sp-space direction="vertical" :size="16">
                        <sp-space direction="horizontal" :size="16" align="end">
                            <sp-text-field v-model="horizontalForm.firstName" label="名" required :rules="nameRules"
                                style="flex: 1;" />
                            <sp-text-field v-model="horizontalForm.lastName" label="姓" required :rules="nameRules"
                                style="flex: 1;" />
                        </sp-space>
                        <sp-space direction="horizontal" :size="16" align="end">
                            <sp-text-field v-model="horizontalForm.phone" label="手机号" :rules="phoneRules"
                                style="flex: 1;" />
                            <sp-text-field v-model="horizontalForm.age" label="年龄" type="number" :rules="ageRules"
                                style="flex: 1;" />
                        </sp-space>
                        <sp-space direction="horizontal" :size="12" wrap>
                            <sp-btn type="submit" variant="elevated" color="primary" :disabled="!isValid">提交</sp-btn>
                            <sp-btn type="button" variant="outlined" @click="reset">重置</sp-btn>
                        </sp-space>
                    </sp-space>
                </template>
            </sp-form>
        </div>

        <!-- 内联布局 -->
        <div>
            <h4 style="margin: 0 0 16px 0; color: #1976d2;">内联布局</h4>
            <sp-form v-model="inlineValid" @submit="onSubmit">
                <template #default="{ isValid, reset }">
                    <sp-space direction="vertical" :size="16">
                        <sp-space direction="horizontal" :size="12" align="center" wrap>
                            <sp-text-field v-model="inlineForm.keyword" label="搜索关键词" placeholder="请输入关键词"
                                style="min-width: 200px;" />
                            <sp-select v-model="inlineForm.category" label="分类" :items="categories"
                                style="min-width: 120px;" />
                            <sp-btn type="submit" variant="elevated" color="primary">搜索</sp-btn>
                            <sp-btn type="button" variant="text" @click="reset">清除</sp-btn>
                        </sp-space>
                    </sp-space>
                </template>
            </sp-form>
        </div>
    </sp-space>
</template>

<script setup>
import { ref, reactive } from 'vue'

const verticalValid = ref(null)
const horizontalValid = ref(null)
const inlineValid = ref(null)

const verticalForm = reactive({
    name: '',
    email: ''
})

const horizontalForm = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    age: ''
})

const inlineForm = reactive({
    keyword: '',
    category: ''
})

const categories = [
    { title: '全部', value: 'all' },
    { title: '技术', value: 'tech' },
    { title: '设计', value: 'design' },
    { title: '产品', value: 'product' }
]

const nameRules = [
    v => !!v || '此字段不能为空',
    v => (v && v.length >= 2) || '至少2个字符'
]

const emailRules = [
    v => !!v || '邮箱不能为空',
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '请输入有效的邮箱地址'
]

const phoneRules = [
    v => !v || /^1[3-9]\d{9}$/.test(v) || '请输入有效的手机号'
]

const ageRules = [
    v => !v || /^\d+$/.test(v) || '年龄必须是数字',
    v => !v || (parseInt(v) >= 1 && parseInt(v) <= 120) || '年龄必须在1-120之间'
]

const onSubmit = async (e) => {
    const result = await e
    if (result.valid) {
        alert('表单提交成功！')
    }
}
</script>