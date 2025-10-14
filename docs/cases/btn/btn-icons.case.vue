<text>
> 图标按钮演示，支持纯图标、前置图标、后置图标和双图标
</text>

<template>
  <sp-space direction="horizontal" :size="12" wrap>
    <sp-btn icon="Close"></sp-btn>
    <sp-btn prepend-icon="Close">前置图标</sp-btn>
    <sp-btn append-icon="Refresh">后置图标</sp-btn>
    <sp-btn prepend-icon="Close" append-icon="Refresh">双图标</sp-btn>
  </sp-space>
</template>