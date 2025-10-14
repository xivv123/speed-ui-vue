<text>
使用 align 和 justify 属性控制栅格的对齐方式。
</text>

<template>
    <sp-space direction="vertical" :size="24">
        <div>
            <p style="margin-bottom: 8px;">align="center"</p>
            <sp-row gap="16" align="center" style="min-height: 100px; background: #f5f5f5; border-radius: 4px;">
                <sp-col :cols="4" style="background: #ffcc80; padding: 16px; border-radius: 4px;">居中对齐</sp-col>
                <sp-col :cols="4" style="background: #ffcc80; padding: 16px; border-radius: 4px;">居中对齐</sp-col>
            </sp-row>
        </div>

        <div>
            <p style="margin-bottom: 8px;">justify="center"</p>
            <sp-row gap="16" justify="center" style="background: #f5f5f5; border-radius: 4px; padding: 16px;">
                <sp-col :cols="3" style="background: #ffb74d; padding: 16px; border-radius: 4px;">水平居中</sp-col>
                <sp-col :cols="3" style="background: #ffb74d; padding: 16px; border-radius: 4px;">水平居中</sp-col>
            </sp-row>
        </div>
    </sp-space>
</template>
