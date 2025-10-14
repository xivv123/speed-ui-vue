<text>
> 复杂表单演示，展示多步骤、多分组的复杂表单
</text>

<template>
    <sp-form v-model="form" @submit="onSubmit">
        <template #default="{ isValid, isValidating, validate, reset, errors }">
            <sp-space direction="vertical" :size="24">
                <!-- 基本信息 -->
                <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h4
                        style="margin: 0 0 16px 0; color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 8px;">
                        👤 基本信息
                    </h4>
                    <sp-space direction="vertical" :size="16">
                        <sp-space direction="horizontal" :size="16" wrap>
                            <sp-text-field v-model="form.personal.firstName" label="名" placeholder="请输入名"
                                :rules="nameRules" required style="flex: 1;" />
                            <sp-text-field v-model="form.personal.lastName" label="姓" placeholder="请输入姓"
                                :rules="nameRules" required style="flex: 1;" />
                        </sp-space>
                        <sp-space direction="horizontal" :size="16" wrap>
                            <sp-text-field v-model="form.personal.email" label="邮箱" placeholder="请输入邮箱" type="email"
                                :rules="emailRules" required style="flex: 1;" />
                            <sp-text-field v-model="form.personal.phone" label="手机号" placeholder="请输入手机号"
                                :rules="phoneRules" required style="flex: 1;" />
                        </sp-space>
                    </sp-space>
                </div>

                <!-- 地址信息 -->
                <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h4
                        style="margin: 0 0 16px 0; color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 8px;">
                        🏠 地址信息
                    </h4>
                    <sp-space direction="vertical" :size="16">
                        <sp-space direction="horizontal" :size="16" wrap>
                            <sp-select v-model="form.address.province" label="省份" :items="provinces"
                                :rules="requiredRules" required style="flex: 1;" />
                            <sp-select v-model="form.address.city" label="城市" :items="cities" :rules="requiredRules"
                                required style="flex: 1;" />
                        </sp-space>
                        <sp-text-field v-model="form.address.street" label="详细地址" placeholder="请输入详细地址"
                            :rules="addressRules" required />
                    </sp-space>
                </div>

                <!-- 工作信息 -->
                <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h4
                        style="margin: 0 0 16px 0; color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 8px;">
                        💼 工作信息
                    </h4>
                    <sp-space direction="vertical" :size="16">
                        <sp-space direction="horizontal" :size="16" wrap>
                            <sp-text-field v-model="form.work.company" label="公司名称" placeholder="请输入公司名称"
                                :rules="companyRules" style="flex: 2;" />
                            <sp-text-field v-model="form.work.position" label="职位" placeholder="请输入职位"
                                :rules="positionRules" style="flex: 1;" />
                        </sp-space>
                        <sp-textarea v-model="form.work.description" label="工作描述" placeholder="请简要描述工作内容..."
                            :rules="descriptionRules" rows="3" counter="200" />
                    </sp-space>
                </div>

                <!-- 其他信息 -->
                <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h4
                        style="margin: 0 0 16px 0; color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 8px;">
                        📝 其他信息
                    </h4>
                    <sp-space direction="vertical" :size="16">
                        <sp-textarea v-model="form.other.bio" label="个人简介" placeholder="请简单介绍一下自己..." :rules="bioRules"
                            rows="4" counter="300" />
                        <sp-space direction="vertical" :size="8">
                            <sp-checkbox v-model="form.other.newsletter" label="订阅我们的新闻通讯" />
                            <sp-checkbox v-model="form.other.terms" label="我同意用户协议和隐私政策" :rules="termsRules" required />
                        </sp-space>
                    </sp-space>
                </div>

                <!-- 表单状态 -->
                <div style="padding: 16px; background: #f5f5f5; border-radius: 8px;">
                    <h4 style="margin: 0 0 12px 0;">📊 表单状态</h4>
                    <sp-space direction="horizontal" :size="24" wrap>
                        <div><strong>表单状态：</strong> {{ isValid ? '✅ 有效' : '❌ 无效' }}</div>
                        <div><strong>验证中：</strong> {{ isValidating ? '是' : '否' }}</div>
                        <div><strong>错误数量：</strong> {{ errors.length }}</div>
                    </sp-space>
                    <div v-if="errors.length > 0"
                        style="margin-top: 12px; padding: 12px; background: #ffebee; border-radius: 4px;">
                        <strong style="color: #d32f2f;">验证错误：</strong>
                        <ul style="margin: 8px 0 0 16px; color: #d32f2f;">
                            <li v-for="error in errors" :key="error.id">
                                {{ error.id }}: {{ error.errorMessages.join(', ') }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <sp-space direction="horizontal" :size="12" justify="center" wrap>
                    <sp-btn type="submit" variant="elevated" color="primary" size="large" :disabled="!isValid"
                        :loading="isValidating">
                        提交完整表单
                    </sp-btn>

                    <sp-btn type="button" variant="outlined" size="large" @click="validate">
                        验证表单
                    </sp-btn>

                    <sp-btn type="button" variant="text" size="large" @click="reset">
                        重置表单
                    </sp-btn>
                </sp-space>
            </sp-space>
        </template>
    </sp-form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const isValid = ref(null)

const form = reactive({
    personal: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    },
    address: {
        province: '',
        city: '',
        street: ''
    },
    work: {
        company: '',
        position: '',
        description: ''
    },
    other: {
        bio: '',
        newsletter: false,
        terms: false
    }
})

const provinces = [
    { title: '北京市', value: 'beijing' },
    { title: '上海市', value: 'shanghai' },
    { title: '广东省', value: 'guangdong' },
    { title: '浙江省', value: 'zhejiang' }
]

const cities = computed(() => {
    const cityMap = {
        beijing: [{ title: '朝阳区', value: 'chaoyang' }, { title: '海淀区', value: 'haidian' }],
        shanghai: [{ title: '浦东新区', value: 'pudong' }, { title: '徐汇区', value: 'xuhui' }],
        guangdong: [{ title: '深圳市', value: 'shenzhen' }, { title: '广州市', value: 'guangzhou' }],
        zhejiang: [{ title: '杭州市', value: 'hangzhou' }, { title: '宁波市', value: 'ningbo' }]
    }
    return cityMap[form.address.province] || []
})

// 验证规则
const nameRules = [
    v => !!v || '此字段不能为空',
    v => (v && v.length >= 2) || '至少2个字符'
]

const emailRules = [
    v => !!v || '邮箱不能为空',
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || '请输入有效的邮箱地址'
]

const phoneRules = [
    v => !!v || '手机号不能为空',
    v => /^1[3-9]\d{9}$/.test(v) || '请输入有效的手机号'
]

const requiredRules = [
    v => !!v || '此字段为必填项'
]

const addressRules = [
    v => !!v || '详细地址不能为空',
    v => (v && v.length >= 5) || '地址至少5个字符'
]

const companyRules = [
    v => !v || (v.length >= 2) || '公司名称至少2个字符'
]

const positionRules = [
    v => !v || (v.length >= 2) || '职位至少2个字符'
]

const descriptionRules = [
    v => !v || (v.length <= 200) || '工作描述不能超过200个字符'
]

const bioRules = [
    v => !v || (v.length <= 300) || '个人简介不能超过300个字符'
]

const termsRules = [
    v => v || '必须同意用户协议才能继续'
]

const onSubmit = async (e) => {
    const result = await e
    if (result.valid) {
        alert('复杂表单提交成功！')
    } else {
        alert('表单验证失败，请检查所有字段')
    }
}
</script>