<text>
> 混合内容演示，SPSpace 可以包含任意类型的子元素
</text>

<template>
    <div class="demo-container">
        <sp-space :size="16">
            <sp-btn variant="elevated">主要按钮</sp-btn>
            <sp-text-field placeholder="输入框" style="width: 200px" variant="outlined" />
            <span class="text-content">文本内容</span>
            <sp-btn variant="tonal" color="success">成功按钮</sp-btn>
        </sp-space>
    </div>
</template>

<style scoped>
.demo-container {
    display: flex;
    justify-content: center;
    padding: 20px 0;
}

.text-content {
    color: #555;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0 8px;
}
</style>