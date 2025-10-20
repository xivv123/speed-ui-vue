<text>
> 禁用状态的展开按钮，不会响应鼠标悬停
</text>

<template>
  <div class="demo-container">
    <sp-expand-btn disabled>
      <template #collapsed>
        <sp-icon name="mdi-lock" />
      </template>
      <template #expanded>
        <sp-btn variant="text" prepend-icon="mdi-lock">
          已锁定
        </sp-btn>
      </template>
    </sp-expand-btn>

    <sp-expand-btn>
      <template #collapsed>
        <sp-icon name="mdi-lock-open" />
      </template>
      <template #expanded>
        <sp-btn variant="text" prepend-icon="mdi-lock-open">
          正常状态
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
