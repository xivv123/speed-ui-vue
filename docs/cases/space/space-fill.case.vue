<text>
> 填充容器演示，设置 fill 属性让子元素平均分配容器宽度
</text>

<template>
    <div class="demo-container">
        <div class="fill-demo">
            <div class="label">普通布局:</div>
            <sp-space style="width: 100%; background: #f5f5f5; padding: 12px">
                <sp-btn>按钮 1</sp-btn>
                <sp-btn>按钮 2</sp-btn>
                <sp-btn>按钮 3</sp-btn>
            </sp-space>
        </div>
        <div class="fill-demo">
            <div class="label">填充布局 (fill):</div>
            <sp-space fill style="width: 100%; background: #f5f5f5; padding: 12px">
                <sp-btn>按钮 1</sp-btn>
                <sp-btn>按钮 2</sp-btn>
                <sp-btn>按钮 3</sp-btn>
            </sp-space>
        </div>
    </div>
</template>

<style scoped>
.demo-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

.fill-demo {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-weight: 500;
    color: #2c3e50;
    font-size: 14px;
}
</style>