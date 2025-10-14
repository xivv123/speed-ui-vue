<text>
按钮组支持不同的 variant 样式，如 outlined、text 等。
</text>

<template>
    <sp-space direction="vertical" :size="16">
        <sp-btn-group variant="outlined">
            <sp-btn>保存</sp-btn>
            <sp-btn>取消</sp-btn>
            <sp-btn>删除</sp-btn>
        </sp-btn-group>

        <sp-btn-group variant="text">
            <sp-btn>选项一</sp-btn>
            <sp-btn>选项二</sp-btn>
            <sp-btn>选项三</sp-btn>
        </sp-btn-group>
    </sp-space>
</template>
