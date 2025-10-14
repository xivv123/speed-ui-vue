<text>
圆角按钮组,支持不同的圆角大小。
</text>

<template>
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <sp-btn-group rounded="lg">
            <sp-btn>圆角</sp-btn>
            <sp-btn>按钮</sp-btn>
            <sp-btn>组</sp-btn>
        </sp-btn-group>

        <sp-btn-group rounded="xl" variant="outlined" color="primary">
            <sp-btn prepend-icon="Home">首页</sp-btn>
            <sp-btn prepend-icon="Settings">设置</sp-btn>
            <sp-btn prepend-icon="User">用户</sp-btn>
        </sp-btn-group>
    </div>
</template>
