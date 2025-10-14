<text>
基础用法，悬停显示提示信息，也支持点击和焦点触发。
</text>

<template>
    <div style="display: flex; gap: 16px;">
        <sp-tooltip text="这是一个基础提示">
            <template #activator="{ props }">
                <sp-btn v-bind="props">悬停显示提示</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="点击也可以显示提示" :open-on-click="true" :open-on-hover="false">
            <template #activator="{ props }">
                <sp-btn v-bind="props">点击显示提示</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip text="焦点触发提示" :open-on-focus="true" :open-on-hover="false">
            <template #activator="{ props }">
                <sp-btn v-bind="props">焦点触发</sp-btn>
            </template>
        </sp-tooltip>
    </div>
</template>
