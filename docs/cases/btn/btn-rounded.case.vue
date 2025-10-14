<text>
> 圆角按钮演示，展示不同圆角程度的按钮样式
</text>

<template>
  <sp-space direction="horizontal" :size="12" wrap>
    <sp-btn>默认圆角</sp-btn>
    <sp-btn rounded="sm">小圆角</sp-btn>
    <sp-btn rounded="md">中圆角</sp-btn>
    <sp-btn rounded="lg">大圆角</sp-btn>
    <sp-btn rounded="pill">胶囊形</sp-btn>
    <sp-btn icon="Add" rounded="circle"></sp-btn>
  </sp-space>
</template>