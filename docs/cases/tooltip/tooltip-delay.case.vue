<text>
控制提示框的显示延迟。
</text>

<template>
    <div style="display: flex; gap: 16px;">
        <sp-tooltip text="立即显示" :open-delay="0">
            <template #activator="{ props }">
                <sp-btn v-bind="props">立即显示</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="延迟 500ms 显示" :open-delay="500">
            <template #activator="{ props }">
                <sp-btn v-bind="props">延迟显示</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="延迟 1000ms 显示" :open-delay="1000">
            <template #activator="{ props }">
                <sp-btn v-bind="props">长延迟显示</sp-btn>
            </template>
        </sp-tooltip>
    </div>
</template>
