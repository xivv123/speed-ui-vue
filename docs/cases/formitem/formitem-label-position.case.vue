<text>
sp-form-item 支持不同的标签位置：左侧(left)、右侧(right)、顶部(top)。
</text>

<template>
    <div style="display: grid; gap: 24px;">
        <!-- 左侧标签 -->
        <sp-form :model="formData">
            <h4>标签位置：左侧 (left)</h4>
            <sp-form-item
                label="用户名"
                prop="username"
                label-position="left"
                label-width="100px"
            >
                <sp-text-field v-model="formData.username" placeholder="标签在左侧" />
            </sp-form-item>
        </sp-form>

        <!-- 右侧标签 -->
        <sp-form :model="formData">
            <h4>标签位置：右侧 (right)</h4>
            <sp-form-item
                label="用户名"
                prop="username"
                label-position="right"
                label-width="100px"
            >
                <sp-text-field v-model="formData.username" placeholder="标签在右侧" />
            </sp-form-item>
        </sp-form>

        <!-- 顶部标签 -->
        <sp-form :model="formData">
            <h4>标签位置：顶部 (top)</h4>
            <sp-form-item
                label="用户名"
                prop="username"
                label-position="top"
            >
                <sp-text-field v-model="formData.username" placeholder="标签在顶部" />
            </sp-form-item>
        </sp-form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
    username: ''
})
</script>
