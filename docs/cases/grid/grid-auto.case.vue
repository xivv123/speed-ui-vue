<text>
使用 autoFill 或 autoFit 创建自适应的栅格布局。
</text>

<template>
    <sp-space direction="vertical" :size="24">
        <div>
            <p style="margin-bottom: 8px;">autoFill（自动填充）</p>
            <sp-row auto-fill min-col-width="150px" gap="16">
                <sp-col style="background: #b39ddb; padding: 16px; border-radius: 4px;">项目 1</sp-col>
                <sp-col style="background: #b39ddb; padding: 16px; border-radius: 4px;">项目 2</sp-col>
                <sp-col style="background: #b39ddb; padding: 16px; border-radius: 4px;">项目 3</sp-col>
                <sp-col style="background: #b39ddb; padding: 16px; border-radius: 4px;">项目 4</sp-col>
                <sp-col style="background: #b39ddb; padding: 16px; border-radius: 4px;">项目 5</sp-col>
            </sp-row>
        </div>

        <div>
            <p style="margin-bottom: 8px;">autoFit（自动适应）</p>
            <sp-row auto-fit min-col-width="200px" gap="16">
                <sp-col style="background: #9575cd; padding: 16px; border-radius: 4px;">项目 1</sp-col>
                <sp-col style="background: #9575cd; padding: 16px; border-radius: 4px;">项目 2</sp-col>
                <sp-col style="background: #9575cd; padding: 16px; border-radius: 4px;">项目 3</sp-col>
            </sp-row>
        </div>
    </sp-space>
</template>
