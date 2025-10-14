<text>
不确定进度，显示无限循环动画
</text>

<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap; align-items: center;">
    <div style="text-align: center;">
      <sp-prog-cir :indeterminate="true" :size="100" color="primary" :width="6">
        <template #default>
          <div style="font-size: 12px; color: #666;">加载中...</div>
        </template>
      </sp-prog-cir>
    </div>

    <div style="text-align: center;">
      <sp-prog-cir :indeterminate="true" :size="100" color="secondary" :width="6" />
    </div>

    <div style="text-align: center;">
      <sp-prog-cir :indeterminate="true" :size="100" color="success" :width="6" />
    </div>

    <div style="text-align: center;">
      <sp-prog-cir indeterminate="disable-shrink" :size="100" color="warning" :width="6" />
    </div>
  </div>
</template>
