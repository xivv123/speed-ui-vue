<text>
使用 gap、columnGap 和 rowGap 控制栅格间距。
</text>

<template>
    <sp-space direction="vertical" :size="24">
        <div>
            <p style="margin-bottom: 8px;">gap="8"</p>
            <sp-row gap="8">
                <sp-col :cols="4" style="background: #e1bee7; padding: 16px; border-radius: 4px;">列1</sp-col>
                <sp-col :cols="4" style="background: #e1bee7; padding: 16px; border-radius: 4px;">列2</sp-col>
                <sp-col :cols="4" style="background: #e1bee7; padding: 16px; border-radius: 4px;">列3</sp-col>
            </sp-row>
        </div>

        <div>
            <p style="margin-bottom: 8px;">gap="24"</p>
            <sp-row gap="24">
                <sp-col :cols="4" style="background: #ce93d8; padding: 16px; border-radius: 4px;">列1</sp-col>
                <sp-col :cols="4" style="background: #ce93d8; padding: 16px; border-radius: 4px;">列2</sp-col>
                <sp-col :cols="4" style="background: #ce93d8; padding: 16px; border-radius: 4px;">列3</sp-col>
            </sp-row>
        </div>
    </sp-space>
</template>
