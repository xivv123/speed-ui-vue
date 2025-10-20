<text>
> 使用不同插槽自定义横幅内容布局
</text>

<template>
  <div class="demo-container">
    <sp-global-banner v-model="visible1" color="primary">
      <template #left>
        <sp-icon name="mdi-information" class="mr-2" />
        新功能上线通知
      </template>
      <template #center>
        点击查看详情了解更多信息
      </template>
      <template #right>
        <sp-btn variant="text" size="small">查看详情</sp-btn>
      </template>
    </sp-global-banner>

    <sp-global-banner v-model="visible2" color="success" class="mt-2">
      <template #left>
        <div class="banner-content">
          <strong>限时优惠</strong>
          <span class="ml-2">全场商品8折优惠，活动截止至本周日</span>
        </div>
      </template>
      <template #right>
        <sp-btn color="white" variant="outlined" size="small" class="mr-2">
          立即购买
        </sp-btn>
      </template>
    </sp-global-banner>

    <div class="controls">
      <sp-btn @click="showAll" size="small">显示全部</sp-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible1 = ref(true)
const visible2 = ref(true)

const showAll = () => {
  visible1.value = true
  visible2.value = true
}
</script>

<style scoped>
.demo-container {
  min-height: 150px;
}

.mt-2 {
  margin-top: 8px;
}

.mr-2 {
  margin-right: 8px;
}

.ml-2 {
  margin-left: 8px;
}

.banner-content {
  display: flex;
  align-items: center;
}

.controls {
  margin-top: 16px;
}
</style>
