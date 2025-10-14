<text>
> 包含图片的卡片样式
</text>

<template>
  <div class="demo-container">
    <sp-card width="300">
      <img src="https://picsum.photos/300/150" alt="示例图片" style="width: 100%; height: 150px; object-fit: cover;">
      <sp-card-title>图片卡片</sp-card-title>
      <sp-card-text>
        这是一个包含图片的卡片示例，图片位于顶部。
      </sp-card-text>
      <sp-card-actions>
        <sp-btn variant="text">分享</sp-btn>
        <sp-btn variant="text">了解更多</sp-btn>
      </sp-card-actions>
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