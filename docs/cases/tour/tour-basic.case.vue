<text>
> 最简单的引导用法，点击开始按钮启动引导流程
</text>

<template>
    <div class="tour-basic-demo">
        <sp-btn type="primary" @click="startTour">
            开始引导
        </sp-btn>

        <sp-divider />

        <sp-space>
            <sp-btn ref="uploadBtn">上传</sp-btn>
            <sp-btn ref="saveBtn" type="primary">保存</sp-btn>
            <sp-btn ref="moreBtn" icon>⋯</sp-btn>
        </sp-space>

        <sp-tour 
            v-model="showTour" 
            v-model:current="currentStep" 
            :steps="tourSteps" 
            :mask="true"
            :highlight-target="true"
            :z-index="9999"
            :append-to="'body'"
            @finish="onTourFinish"
            @skip="onTourSkip" 
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showTour = ref(false)
const currentStep = ref(0)
const uploadBtn = ref()
const saveBtn = ref()
const moreBtn = ref()

const tourSteps = [
    {
        title: '上传文件',
        description: '点击这里上传您的文件',
        target: () => uploadBtn.value?.$el,
        placement: 'bottom'
    },
    {
        title: '保存',
        description: '保存您的更改',
        target: () => saveBtn.value?.$el,
        placement: 'bottom'
    },
    {
        title: '其他操作',
        description: '点击查看其他操作',
        target: () => moreBtn.value?.$el,
        placement: 'bottom'
    }
]

const startTour = () => {
    currentStep.value = 0
    showTour.value = true
}

const onTourFinish = () => {
    // 引导完成
}

const onTourSkip = () => {
    // 跳过引导
}
</script>

<style scoped>
.tour-basic-demo {
    padding: 20px;
}
</style>