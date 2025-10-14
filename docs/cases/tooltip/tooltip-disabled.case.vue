<text>
可以禁用提示框或通过 v-model 手动控制显示。
</text>

<template>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <sp-tooltip text="这个提示不会显示" disabled>
            <template #activator="{ props }">
                <sp-btn v-bind="props">禁用的提示</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="正常提示">
            <template #activator="{ props }">
                <sp-btn v-bind="props">正常提示</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="手动控制的提示" v-model="show">
            <template #activator="{ props }">
                <sp-btn v-bind="props">手动控制</sp-btn>
            </template>
        </sp-tooltip>

        <sp-btn @click="show = !show">{{ show ? '隐藏' : '显示' }}提示</sp-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
