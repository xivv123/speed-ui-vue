<text>
设置最大宽度来控制长文本的显示。
</text>

<template>
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <sp-tooltip
            text="这是一个很长的提示文本，用来演示当提示内容较多时的显示效果。提示框会自动换行并调整宽度以适应内容。"
            :max-width="200"
        >
            <template #activator="{ props }">
                <sp-btn v-bind="props">最大宽度 200px</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip
            text="这是另一个长文本提示，但是设置了更大的最大宽度，所以文本会在更宽的区域内显示，减少换行次数。"
            :max-width="300"
        >
            <template #activator="{ props }">
                <sp-btn v-bind="props">最大宽度 300px</sp-btn>
            </template>
        </sp-tooltip>

        <sp-tooltip
            text="无宽度限制的长文本提示，会根据内容自动调整宽度，但通常不建议这样做，因为可能会导致提示框过宽。"
        >
            <template #activator="{ props }">
                <sp-btn v-bind="props">无宽度限制</sp-btn>
            </template>
        </sp-tooltip>
    </div>
</template>
