<text>
提示框可以显示在触发元素的不同位置：上、下、左、右，以及对应的 start、center、end 对齐方式。
</text>

<template>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <!-- 顶部 -->
        <sp-tooltip text="顶部开始" location="top start">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">top start</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="顶部居中" location="top">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">top</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="顶部结束" location="top end">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">top end</sp-btn>
            </template>
        </sp-tooltip>

        <!-- 底部 -->
        <sp-tooltip text="底部开始" location="bottom start">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">bottom start</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="底部居中" location="bottom">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">bottom</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="底部结束" location="bottom end">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">bottom end</sp-btn>
            </template>
        </sp-tooltip>

        <!-- 左侧 -->
        <sp-tooltip text="左侧开始" location="left start">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">left start</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="左侧居中" location="left">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">left</sp-btn>
            </template>
        </sp-tooltip>

        <!-- 右侧 -->
        <sp-tooltip text="右侧开始" location="right start">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">right start</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="右侧居中" location="right">
            <template #activator="{ props }">
                <sp-btn v-bind="props" size="small">right</sp-btn>
            </template>
        </sp-tooltip>
    </div>
</template>
