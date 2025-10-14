<text>
> 设置最大显示数值，超过时显示 "+""
</text>

<template>
  <div class="demo-container">
    <sp-badge content="5" max="9">
      <sp-btn>未读消息</sp-btn>
    </sp-badge>
    
    <sp-badge content="10" max="9">
      <sp-btn>通知</sp-btn>
    </sp-badge>
    
    <sp-badge content="99" max="99">
      <sp-btn>邮件</sp-btn>
    </sp-badge>
    
    <sp-badge content="100" max="99">
      <sp-btn>系统消息</sp-btn>
    </sp-badge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>