<text>
按钮组的不同状态,包括禁用、加载、激活和只读状态。
</text>

<template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
        <sp-btn-group>
            <sp-btn>正常</sp-btn>
            <sp-btn disabled>禁用</sp-btn>
            <sp-btn loading>加载中</sp-btn>
        </sp-btn-group>

        <sp-btn-group variant="outlined" color="primary">
            <sp-btn active>激活</sp-btn>
            <sp-btn>普通</sp-btn>
            <sp-btn readonly>只读</sp-btn>
        </sp-btn-group>
    </div>
</template>
