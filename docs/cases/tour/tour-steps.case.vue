<text>
> 使用 sp-tour-step 子组件的方式，提供更直观的声明式写法
</text>

<template>
    <div class="tour-steps-demo">
        <sp-btn type="primary" @click="startTour">
            开始引导
        </sp-btn>

        <sp-divider />

        <sp-space>
            <sp-btn ref="btn1">上传</sp-btn>
            <sp-btn ref="btn2" type="primary">保存</sp-btn>
            <sp-btn ref="btn3" icon>⋯</sp-btn>
        </sp-space>

        <sp-tour v-model="showTour" v-model:current="currentStep" @finish="onTourFinish" @skip="onTourSkip">
            <sp-tour-step title="上传文件" description="点击这里上传您的文件" :target="() => btn1?.$el" placement="bottom" />
            <sp-tour-step title="保存" description="保存您的更改" :target="() => btn2?.$el" placement="bottom" />
            <sp-tour-step title="其他操作" description="点击查看其他操作" :target="() => btn3?.$el" placement="bottom" />
        </sp-tour>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showTour = ref(false)
const currentStep = ref(0)
const btn1 = ref()
const btn2 = ref()
const btn3 = ref()

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
.tour-steps-demo {
    padding: 20px;
}
</style>