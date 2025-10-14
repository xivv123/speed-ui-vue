<text>
> 对齐方式演示，通过 alignment 属性设置子元素的对齐方式
</text>

<template>
    <div class="demo-container">
        <div class="alignment-item">
            <div class="label">居中对齐 (center):</div>
            <sp-space alignment="center" style="height: 80px; background: #f5f5f5; padding: 12px">
                <sp-btn size="small">小按钮</sp-btn>
                <sp-btn>普通按钮</sp-btn>
                <sp-btn size="large">大按钮</sp-btn>
            </sp-space>
        </div>
        <div class="alignment-item">
            <div class="label">顶部对齐 (start):</div>
            <sp-space alignment="start" style="height: 80px; background: #f5f5f5; padding: 12px">
                <sp-btn size="small">小按钮</sp-btn>
                <sp-btn>普通按钮</sp-btn>
                <sp-btn size="large">大按钮</sp-btn>
            </sp-space>
        </div>
        <div class="alignment-item">
            <div class="label">底部对齐 (end):</div>
            <sp-space alignment="end" style="height: 80px; background: #f5f5f5; padding: 12px">
                <sp-btn size="small">小按钮</sp-btn>
                <sp-btn>普通按钮</sp-btn>
                <sp-btn size="large">大按钮</sp-btn>
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

.alignment-item {
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