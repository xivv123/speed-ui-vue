<text>
> 基本的卡片用法，包含标题、副标题、内容和操作区域
</text>

<template>
  <div class="demo-container">
    <sp-card width="300">
      <sp-card-title>卡片标题</sp-card-title>
      <sp-card-subtitle>卡片副标题</sp-card-subtitle>
      <sp-card-text>
        这是卡片的内容区域，可以放置任何内容，比如文字、图片、按钮等。
      </sp-card-text>
      <sp-card-actions>
        <sp-btn variant="text">取消</sp-btn>
        <sp-btn>确定</sp-btn>
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