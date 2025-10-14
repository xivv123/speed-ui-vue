<text>
使用 offset 属性设置列的偏移量。
</text>

<template>
    <sp-row gap="16">
        <sp-col :cols="4" :offset="4" style="background: #c5e1a5; padding: 16px; border-radius: 4px;">offset="4"</sp-col>
        <sp-col :cols="3" :offset="2" style="background: #aed581; padding: 16px; border-radius: 4px;">offset="2"</sp-col>
        <sp-col :cols="6" :offset="6" style="background: #9ccc65; padding: 16px; border-radius: 4px;">offset="6"</sp-col>
    </sp-row>
</template>
