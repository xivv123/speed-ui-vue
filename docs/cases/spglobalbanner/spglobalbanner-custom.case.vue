<text>
自定义内容的全局横幅，包含按钮和图标等复杂元素。
</text>

<template>
  <div>
    <SPGlobalBanner v-model="show" bg-color="primary" variant="tonal">
      <template #left>
        <span style="font-weight: bold;">🎉 限时优惠</span>
      </template>
      <template #center>
        <span>新用户首单立减 50 元，优惠截止至本月底</span>
      </template>
      <template #right>
        <SPBtn size="small" variant="elevated" color="white">
          立即购买
        </SPBtn>
      </template>
    </SPGlobalBanner>

    <div style="padding: 20px;">
      <p>页面内容区域</p>
      <SPBtn @click="show = true" v-if="!show">重新显示横幅</SPBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SPGlobalBanner, SPBtn } from 'speed-ui-vue'

const show = ref(true)
</script>
