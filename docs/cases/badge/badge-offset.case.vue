<text>
> 使用偏移量调整徽章位置
</text>

<template>
  <div class="demo-container">
    <sp-badge content="5" :offset-x="5" :offset-y="5">
      <sp-btn>偏移徽章</sp-btn>
    </sp-badge>
    
    <sp-badge content="3" :offset-x="-5" :offset-y="0">
      <sp-btn>水平偏移</sp-btn>
    </sp-badge>
    
    <sp-badge content="1" :offset-x="0" :offset-y="-5">
      <sp-btn>垂直偏移</sp-btn>
    </sp-badge>
    
    <sp-badge dot :offset-x="10" :offset-y="10">
      <sp-btn>点状偏移</sp-btn>
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