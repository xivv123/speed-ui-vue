<text>
> 不同形状的展开按钮，支持圆形和矩形两种样式
</text>

<template>
  <div class="demo-container">
    <div class="demo-item">
      <p class="label">圆形 (circle)</p>
      <sp-expand-btn shape="circle">
        <template #collapsed>
          <sp-icon name="mdi-plus" />
        </template>
        <template #expanded>
          <sp-btn variant="text" prepend-icon="mdi-plus">
            添加
          </sp-btn>
        </template>
      </sp-expand-btn>
    </div>

    <div class="demo-item">
      <p class="label">矩形 (rectangle)</p>
      <sp-expand-btn shape="rectangle">
        <template #collapsed>
          <sp-icon name="mdi-heart" />
        </template>
        <template #expanded>
          <sp-btn variant="text" prepend-icon="mdi-heart">
            收藏
          </sp-btn>
        </template>
      </sp-expand-btn>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.label {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>
