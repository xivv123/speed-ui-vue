<text>
> 自动换行演示，设置 wrap 属性让子元素在空间不足时自动换行
</text>

<template>
    <div class="demo-container">
        <div class="wrap-demo">
            <sp-space wrap style="width: 250px; border: 1px dashed #ccc; padding: 12px">
                <sp-btn v-for="i in 8" :key="i" size="small">
                    按钮 {{ i }}
                </sp-btn>
            </sp-space>
        </div>
    </div>
</template>

<style scoped>
.demo-container {
    display: flex;
    justify-content: center;
}

.wrap-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}
</style>