<text>
基本的栅格布局，默认为 12 列栅格系统。
</text>

<template>
    <sp-row gap="16">
        <sp-col :cols="12" style="background: #e3f2fd; padding: 16px; border-radius: 4px;">cols="12"</sp-col>
        <sp-col :cols="6" style="background: #bbdefb; padding: 16px; border-radius: 4px;">cols="6"</sp-col>
        <sp-col :cols="6" style="background: #bbdefb; padding: 16px; border-radius: 4px;">cols="6"</sp-col>
        <sp-col :cols="4" style="background: #90caf9; padding: 16px; border-radius: 4px;">cols="4"</sp-col>
        <sp-col :cols="4" style="background: #90caf9; padding: 16px; border-radius: 4px;">cols="4"</sp-col>
        <sp-col :cols="4" style="background: #90caf9; padding: 16px; border-radius: 4px;">cols="4"</sp-col>
    </sp-row>
</template>
