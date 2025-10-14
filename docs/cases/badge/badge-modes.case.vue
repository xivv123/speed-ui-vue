<text>
> 使用浮动和内联模式的徽章
</text>

<template>
  <div class="demo-container">
    <h4>浮动徽章</h4>
    <div class="demo-row">
      <sp-badge content="5" floating>
        <sp-btn>浮动徽章</sp-btn>
      </sp-badge>
      
      <sp-badge dot floating color="success">
        <sp-btn>浮动点状</sp-btn>
      </sp-badge>
    </div>
    
    <h4>内联徽章</h4>
    <div class="demo-row">
      <sp-badge content="8" inline>
        <sp-btn>内联徽章</sp-btn>
      </sp-badge>
      
      <sp-badge dot inline color="warning">
        <sp-btn>内联点状</sp-btn>
      </sp-badge>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

h4 {
  margin: 0;
  color: var(--sp-theme-on-surface);
  font-size: 14px;
  font-weight: 500;
}
</style>