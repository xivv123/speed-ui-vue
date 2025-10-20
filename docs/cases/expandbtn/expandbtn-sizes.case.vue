<text>
> 自定义展开按钮的宽度和动画时长
</text>

<template>
  <div class="demo-container">
    <div class="demo-item">
      <p class="label">小尺寸 (40px → 120px)</p>
      <sp-expand-btn :collapsed-width="40" :expanded-width="120">
        <template #collapsed>
          <sp-icon name="mdi-email" size="small" />
        </template>
        <template #expanded>
          <sp-btn variant="text" prepend-icon="mdi-email" size="small">
            邮件
          </sp-btn>
        </template>
      </sp-expand-btn>
    </div>

    <div class="demo-item">
      <p class="label">默认尺寸 (48px → 200px)</p>
      <sp-expand-btn>
        <template #collapsed>
          <sp-icon name="mdi-share" />
        </template>
        <template #expanded>
          <sp-btn variant="text" prepend-icon="mdi-share">
            分享
          </sp-btn>
        </template>
      </sp-expand-btn>
    </div>

    <div class="demo-item">
      <p class="label">大尺寸 (56px → 240px)</p>
      <sp-expand-btn :collapsed-width="56" :expanded-width="240">
        <template #collapsed>
          <sp-icon name="mdi-download" size="large" />
        </template>
        <template #expanded>
          <sp-btn variant="text" prepend-icon="mdi-download" size="large">
            下载文件
          </sp-btn>
        </template>
      </sp-expand-btn>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>
