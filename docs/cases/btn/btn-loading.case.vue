<text>
> Loading状态演示，展示不同变体和颜色的加载状态
</text>

<template>
  <sp-space direction="vertical" :size="16">
    <!-- 不同变体的Loading状态 -->
    <sp-space direction="horizontal" :size="12" wrap>
      <sp-btn loading>Elevated Loading</sp-btn>
      <sp-btn variant="tonal" loading>Tonal Loading</sp-btn>
      <sp-btn variant="outlined" loading>Outlined Loading</sp-btn>
      <sp-btn variant="text" loading>Text Loading</sp-btn>
    </sp-space>
    
    <!-- 不同颜色的Loading状态 -->
    <sp-space direction="horizontal" :size="12" wrap>
      <sp-btn color="primary" loading>Primary Loading</sp-btn>
      <sp-btn color="success" loading>Success Loading</sp-btn>
      <sp-btn color="warning" loading>Warning Loading</sp-btn>
      <sp-btn color="error" loading>Error Loading</sp-btn>
    </sp-space>
  </sp-space>
</template>