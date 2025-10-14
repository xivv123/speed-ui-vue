<text>
不同尺寸的按钮组,支持 small、default、large 三种尺寸。
</text>

<template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
        <sp-btn-group size="small">
            <sp-btn>小按钮</sp-btn>
            <sp-btn>小按钮</sp-btn>
            <sp-btn>小按钮</sp-btn>
        </sp-btn-group>

        <sp-btn-group size="default">
            <sp-btn>默认按钮</sp-btn>
            <sp-btn>默认按钮</sp-btn>
            <sp-btn>默认按钮</sp-btn>
        </sp-btn-group>

        <sp-btn-group size="large">
            <sp-btn>大按钮</sp-btn>
            <sp-btn>大按钮</sp-btn>
            <sp-btn>大按钮</sp-btn>
        </sp-btn-group>
    </div>
</template>
