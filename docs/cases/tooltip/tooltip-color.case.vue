<text>
自定义提示框的背景色和文字颜色。
</text>

<template>
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <sp-tooltip text="主色调提示" color="primary">
            <template #activator="{ props }">
                <sp-btn v-bind="props" color="primary">主色调</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="成功提示" color="success">
            <template #activator="{ props }">
                <sp-btn v-bind="props" color="success">成功</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="警告提示" color="warning">
            <template #activator="{ props }">
                <sp-btn v-bind="props" color="warning">警告</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="错误提示" color="error">
            <template #activator="{ props }">
                <sp-btn v-bind="props" color="error">错误</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="自定义颜色" color="#9c27b0" text-color="#fff">
            <template #activator="{ props }">
                <sp-btn v-bind="props" style="background: #9c27b0; color: #fff;">自定义</sp-btn>
            </template>
        </sp-tooltip>
    </div>
</template>
