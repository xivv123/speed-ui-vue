<text>
> 可点击的交互式卡片
</text>

<template>
  <div class="demo-container">
    <sp-card width="300" :hover="true" class="clickable-card" @click="handleCardClick('card1')">
      <sp-card-title>可点击卡片</sp-card-title>
      <sp-card-text>
        点击这个卡片查看交互效果
      </sp-card-text>
    </sp-card>
    
    <sp-card width="300" :ripple="true" class="clickable-card" @click="handleCardClick('card2')">
      <sp-card-title>涟漪效果卡片</sp-card-title>
      <sp-card-text>
        点击查看涟漪效果
      </sp-card-text>
    </sp-card>
    
    <sp-card width="300" :disabled="true">
      <sp-card-title>禁用卡片</sp-card-title>
      <sp-card-text>
        这是一个禁用状态的卡片
      </sp-card-text>
    </sp-card>
  </div>
</template>

<script setup>
function handleCardClick(cardId) {
  alert(`点击了 ${cardId}`)
}
</script>

<style scoped>
.demo-container {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.clickable-card {
  cursor: pointer;
}
</style>