<text>
按钮组支持统一设置颜色主题。
</text>

<template>
    <sp-space direction="vertical" :size="16">
        <sp-btn-group color="primary">
            <sp-btn>主要</sp-btn>
            <sp-btn>操作</sp-btn>
            <sp-btn>按钮</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="success">
            <sp-btn>成功</sp-btn>
            <sp-btn>操作</sp-btn>
        </sp-btn-group>

        <sp-btn-group color="error">
            <sp-btn>危险</sp-btn>
            <sp-btn>操作</sp-btn>
        </sp-btn-group>
    </sp-space>
</template>
