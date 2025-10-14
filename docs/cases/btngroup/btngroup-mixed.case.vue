<text>
混合样式的按钮组,同一个按钮组中使用不同的变体和颜色。
</text>

<template>
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <sp-btn-group>
            <sp-btn variant="elevated" color="primary">主要</sp-btn>
            <sp-btn variant="outlined" color="secondary">次要</sp-btn>
            <sp-btn variant="text" color="error">危险</sp-btn>
        </sp-btn-group>

        <sp-btn-group direction="vertical" divided>
            <sp-btn variant="tonal" color="success" prepend-icon="Checkmark">成功操作</sp-btn>
            <sp-btn variant="outlined" color="warning" prepend-icon="Warning">警告操作</sp-btn>
            <sp-btn variant="text" color="error" prepend-icon="Close">错误操作</sp-btn>
        </sp-btn-group>
    </div>
</template>
