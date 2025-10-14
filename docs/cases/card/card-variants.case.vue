<text>
> 不同变体的卡片样式
</text>

<template>
  <div class="demo-container">
    <sp-card width="280" variant="elevated">
      <sp-card-title>悬浮卡片</sp-card-title>
      <sp-card-text>
        具有阴影效果的悬浮卡片
      </sp-card-text>
    </sp-card>
    
    <sp-card width="280" variant="outlined">
      <sp-card-title>轮廓卡片</sp-card-title>
      <sp-card-text>
        具有边框的轮廓卡片
      </sp-card-text>
    </sp-card>
    
    <sp-card width="280" variant="flat">
      <sp-card-title>扁平卡片</sp-card-title>
      <sp-card-text>
        无阴影的扁平卡片
      </sp-card-text>
    </sp-card>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
</style>