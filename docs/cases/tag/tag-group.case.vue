<text>
使用 sp-tag-group 可以将多个标签组合在一起，支持单选或多选。
</text>

<template>
    <sp-space direction="vertical" :size="16">
        <div>
            <p style="margin-bottom: 8px;">单选标签组</p>
            <sp-tag-group v-model="selected">
                <sp-tag text="选项一" value="1" />
                <sp-tag text="选项二" value="2" />
                <sp-tag text="选项三" value="3" />
            </sp-tag-group>
        </div>

        <div>
            <p style="margin-bottom: 8px;">多选标签组</p>
            <sp-tag-group v-model="multiSelected" multiple>
                <sp-tag text="Vue" value="vue" />
                <sp-tag text="React" value="react" />
                <sp-tag text="Angular" value="angular" />
                <sp-tag text="Svelte" value="svelte" />
            </sp-tag-group>
        </div>
    </sp-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref()
const multiSelected = ref([])
</script>
