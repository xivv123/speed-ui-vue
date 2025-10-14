<text>
> 基本的徽章用法，显示消息数量或状态提示
</text>

<template>
  <sp-space :size="32">
    <sp-badge content="5">
      <sp-btn>消息</sp-btn>
    </sp-badge>

    <sp-badge content="99+">
      <sp-btn>通知</sp-btn>
    </sp-badge>

    <sp-badge dot>
      <sp-btn>新消息</sp-btn>
    </sp-badge>

    <sp-badge content="new">
      <sp-btn>新消息</sp-btn>
    </sp-badge>
  </sp-space>
</template>
