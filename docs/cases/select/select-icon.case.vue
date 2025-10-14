<text>
> 带有图标和前后缀的选择器示例
</text>

<template>
    <sp-space direction="vertical" :size="16">
        <sp-space wrap>
            <sp-select v-model="prependIconValue" label="前置图标" placeholder="带前置图标的选择器" :items="iconItems"
                prepend-icon="mdi-account" style="width: 280px" />
            <sp-select v-model="appendIconValue" label="后置图标" placeholder="带后置图标的选择器" :items="iconItems"
                append-icon="mdi-information" style="width: 280px" />
        </sp-space>

        <sp-space wrap>
            <sp-select v-model="menuIconValue" label="自定义菜单图标" placeholder="自定义下拉图标" :items="iconItems"
                menu-icon="mdi-chevron-down" style="width: 280px" />
            <sp-select v-model="bothIconValue" label="前后图标" placeholder="前后都有图标" :items="iconItems"
                prepend-icon="mdi-map-marker" append-icon="mdi-star" style="width: 280px" />
        </sp-space>

        <sp-space wrap>
            <sp-select v-model="outlinedIconValue" label="轮廓 + 图标" variant="outlined" placeholder="轮廓样式带图标"
                :items="iconItems" prepend-icon="mdi-email" clearable style="width: 280px" />
        </sp-space>
    </sp-space>
</template>

<script setup>
import { ref } from 'vue'

const prependIconValue = ref('')
const appendIconValue = ref('')
const menuIconValue = ref('')
const bothIconValue = ref('')
const outlinedIconValue = ref('')

const iconItems = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '杭州市',
    '成都市'
]
</script>