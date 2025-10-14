<text>
自定义分割线的长度、粗细、颜色和透明度。
</text>

<template>
    <sp-space direction="vertical" :size="24">
        <div>
            <p style="margin-bottom: 8px;">自定义粗细</p>
            <sp-divider thickness="3" />
        </div>

        <div>
            <p style="margin-bottom: 8px;">自定义长度</p>
            <sp-divider length="50%" />
        </div>

        <div>
            <p style="margin-bottom: 8px;">自定义颜色</p>
            <sp-divider color="primary" />
        </div>

        <div>
            <p style="margin-bottom: 8px;">自定义透明度</p>
            <sp-divider opacity="0.3" />
        </div>
    </sp-space>
</template>
