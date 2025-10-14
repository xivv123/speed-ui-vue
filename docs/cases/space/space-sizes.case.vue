<text>
> 间距尺寸演示，支持 small、default、large 三种预设尺寸和自定义数值
</text>

<template>
    <div class="demo-container">
        <div class="size-item">
            <div class="label">小间距 (small):</div>
            <sp-space size="small">
                <sp-btn>按钮 1</sp-btn>
                <sp-btn>按钮 2</sp-btn>
                <sp-btn>按钮 3</sp-btn>
            </sp-space>
        </div>
        <div class="size-item">
            <div class="label">默认间距 (default):</div>
            <sp-space size="default">
                <sp-btn>按钮 1</sp-btn>
                <sp-btn>按钮 2</sp-btn>
                <sp-btn>按钮 3</sp-btn>
            </sp-space>
        </div>
        <div class="size-item">
            <div class="label">大间距 (large):</div>
            <sp-space size="large">
                <sp-btn>按钮 1</sp-btn>
                <sp-btn>按钮 2</sp-btn>
                <sp-btn>按钮 3</sp-btn>
            </sp-space>
        </div>
        <div class="size-item">
            <div class="label">自定义间距 (24px):</div>
            <sp-space :size="24">
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
    gap: 16px;
}

.size-item {
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