<text>
> 不同颜色主题的卡片
</text>

<template>
  <div class="demo-container">
    <sp-card width="280" color="primary">
      <sp-card-title>主要卡片</sp-card-title>
      <sp-card-text>
        使用主要颜色主题的卡片
      </sp-card-text>
      <sp-card-actions>
        <sp-btn variant="text">操作</sp-btn>
      </sp-card-actions>
    </sp-card>
    
    <sp-card width="280" color="success">
      <sp-card-title>成功卡片</sp-card-title>
      <sp-card-text>
        使用成功颜色主题的卡片
      </sp-card-text>
      <sp-card-actions>
        <sp-btn variant="text">操作</sp-btn>
      </sp-card-actions>
    </sp-card>
    
    <sp-card width="280" color="warning">
      <sp-card-title>警告卡片</sp-card-title>
      <sp-card-text>
        使用警告颜色主题的卡片
      </sp-card-text>
      <sp-card-actions>
        <sp-btn variant="text">操作</sp-btn>
      </sp-card-actions>
    </sp-card>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>