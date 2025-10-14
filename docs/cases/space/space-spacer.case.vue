<text>
> 分隔符演示，通过 spacer 属性设置子元素之间的分隔符
</text>

<template>
    <div class="demo-container">
        <div class="spacer-item">
            <div class="label">竖线分隔符:</div>
            <sp-space spacer="|">
                <span>首页</span>
                <span>产品</span>
                <span>关于我们</span>
            </sp-space>
        </div>
        <div class="spacer-item">
            <div class="label">圆点分隔符:</div>
            <sp-space spacer="•">
                <span>新闻</span>
                <span>博客</span>
                <span>帮助</span>
            </sp-space>
        </div>
        <div class="spacer-item">
            <div class="label">箭头分隔符:</div>
            <sp-space spacer="→">
                <span>步骤一</span>
                <span>步骤二</span>
                <span>步骤三</span>
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

.spacer-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-weight: 500;
    color: #2c3e50;
    font-size: 14px;
}

span {
    color: #555;
    cursor: pointer;
    transition: color 0.2s;
}

span:hover {
    color: #409eff;
}
</style>