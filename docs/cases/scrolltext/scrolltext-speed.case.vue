<text>
> 控制滚动速度，单位为像素/秒
</text>

<template>
  <div class="demo-container">
    <div class="demo-item">
      <p class="label">慢速滚动 (30px/s)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text :speed="30">
          这是一段慢速滚动的文字内容
        </sp-scroll-text>
      </div>
    </div>

    <div class="demo-item">
      <p class="label">默认速度 (50px/s)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text>
          这是一段默认速度滚动的文字内容
        </sp-scroll-text>
      </div>
    </div>

    <div class="demo-item">
      <p class="label">快速滚动 (100px/s)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text :speed="100">
          这是一段快速滚动的文字内容
        </sp-scroll-text>
      </div>
    </div>

    <div class="demo-item">
      <p class="label">极速滚动 (200px/s)</p>
      <div style="width: 100%; height:40px">
        <sp-scroll-text :speed="200">
          这是一段极速滚动的文字内容
        </sp-scroll-text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.scroll-wrapper {
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
