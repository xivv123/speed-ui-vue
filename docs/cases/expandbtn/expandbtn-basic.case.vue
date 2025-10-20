<text>
> 基本的展开按钮用法，鼠标悬停时展开显示更多内容
</text>

<template>
  <div class="demo-container">
    <sp-expand-btn>
      <template #collapsed>
        <sp-icon name="mdi-menu" />
      </template>
      <template #expanded>
        <sp-btn variant="text" prepend-icon="mdi-menu">
          菜单
        </sp-btn>
      </template>
    </sp-expand-btn>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 20px;
}
</style>
