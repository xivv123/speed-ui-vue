<text>
> 状态演示，展示按钮的不同交互状态
</text>

<template>
  <sp-space direction="horizontal" :size="12" wrap>
    <sp-btn>正常状态</sp-btn>
    <sp-btn disabled>禁用状态</sp-btn>
    <sp-btn loading>加载状态</sp-btn>
    <sp-btn active>激活状态</sp-btn>
    <sp-btn readonly>只读状态</sp-btn>
  </sp-space>
</template>