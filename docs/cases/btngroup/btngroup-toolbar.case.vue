<text>
工具栏场景,常用于文本编辑器和操作栏。
</text>

<template>
    <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">文本编辑工具栏</h4>
            <sp-btn-group variant="outlined">
                <sp-btn prepend-icon="Bold">粗体</sp-btn>
                <sp-btn prepend-icon="Italic">斜体</sp-btn>
                <sp-btn prepend-icon="Underline">下划线</sp-btn>
                <sp-btn prepend-icon="Strikethrough">删除线</sp-btn>
            </sp-btn-group>
        </div>

        <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">分页控制</h4>
            <sp-btn-group>
                <sp-btn prepend-icon="ChevronLeft">上一页</sp-btn>
                <sp-btn>1</sp-btn>
                <sp-btn>2</sp-btn>
                <sp-btn>3</sp-btn>
                <sp-btn append-icon="ChevronRight">下一页</sp-btn>
            </sp-btn-group>
        </div>

        <div>
            <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #666;">视图切换</h4>
            <sp-btn-group variant="tonal" color="info">
                <sp-btn prepend-icon="List">列表</sp-btn>
                <sp-btn prepend-icon="Grid">网格</sp-btn>
                <sp-btn prepend-icon="Card">卡片</sp-btn>
            </sp-btn-group>
        </div>
    </div>
</template>
