<text>
sp-form-item 支持标签对齐方式：左对齐(left)、居中(center)、右对齐(right)。
</text>

<template>
    <sp-form :model="formData" label-position="left" label-width="120px">
        <sp-form-item
            label="姓名"
            prop="name"
            label-align="left"
        >
            <sp-text-field v-model="formData.name" placeholder="标签左对齐" />
        </sp-form-item>

        <sp-form-item
            label="部门"
            prop="department"
            label-align="center"
        >
            <sp-text-field v-model="formData.department" placeholder="标签居中对齐" />
        </sp-form-item>

        <sp-form-item
            label="职位"
            prop="position"
            label-align="right"
        >
            <sp-text-field v-model="formData.position" placeholder="标签右对齐" />
        </sp-form-item>
    </sp-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
    name: '',
    department: '',
    position: ''
})
</script>
