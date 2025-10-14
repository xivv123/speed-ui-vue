<text>
sp-form-item 支持左右插槽，可以在输入框前后添加自定义内容。
</text>

<template>
    <sp-form :model="formData" label-position="left" label-width="100px">
        <sp-form-item
            label="搜索"
            prop="search"
        >
            <template #left>
                <span style="color: #666; margin-right: 8px;">🔍</span>
            </template>
            <sp-text-field v-model="formData.search" placeholder="输入关键词" />
            <template #right>
                <sp-btn size="small" primary>搜索</sp-btn>
            </template>
        </sp-form-item>

        <sp-form-item
            label="金额"
            prop="amount"
        >
            <template #left>
                <span style="color: #666; margin-right: 8px;">💰</span>
            </template>
            <sp-text-field v-model="formData.amount" placeholder="0.00" />
            <template #right>
                <span style="color: #666; margin-left: 8px;">元</span>
            </template>
        </sp-form-item>

        <sp-form-item
            label="网址"
            prop="url"
        >
            <template #left>
                <span style="color: #999; margin-right: 4px;">https://</span>
            </template>
            <sp-text-field v-model="formData.url" placeholder="example.com" />
        </sp-form-item>
    </sp-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
    search: '',
    amount: '',
    url: ''
})
</script>
