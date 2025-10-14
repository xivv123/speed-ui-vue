<template>
  <DemoContainer title="SPGlobalBanner 全局横幅组件">
    <!-- 基础用法 -->
    <DemoSection title="基础用法" subtitle="顶部全局横幅">
      <sp-btn @click="show1 = true" v-if="!show1" color="primary">
        显示横幅
      </sp-btn>
      <SPGlobalBanner v-model="show1" bg-color="primary">
        <template #center>
          <span>这是一条全局横幅消息</span>
        </template>
      </SPGlobalBanner>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 不同颜色 -->
    <DemoSection title="不同颜色主题" subtitle="多种颜色选择">
      <div class="banner-group">
        <SPGlobalBanner v-model="showPrimary" bg-color="primary">
          <template #center>
            <span>主要色调横幅</span>
          </template>
        </SPGlobalBanner>

        <SPGlobalBanner v-model="showSuccess" bg-color="success">
          <template #center>
            <span>成功提示横幅</span>
          </template>
        </SPGlobalBanner>

        <SPGlobalBanner v-model="showWarning" bg-color="warning">
          <template #center>
            <span>警告信息横幅</span>
          </template>
        </SPGlobalBanner>

        <SPGlobalBanner v-model="showError" bg-color="error">
          <template #center>
            <span>错误提示横幅</span>
          </template>
        </SPGlobalBanner>
      </div>
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <sp-btn @click="showAllColors" size="small" color="primary">显示所有</sp-btn>
        <sp-btn @click="hideAllColors" size="small" variant="outlined">隐藏所有</sp-btn>
      </div>
    </DemoSection>

    <sp-space :size="24" />

    <!-- 自定义内容 -->
    <DemoSection title="自定义内容" subtitle="左中右三栏布局">
      <sp-btn @click="show2 = true" v-if="!show2">显示横幅</sp-btn>
      <SPGlobalBanner v-model="show2" bg-color="primary" variant="tonal">
        <template #left>
          <span style="font-weight: bold;">🎉 限时优惠</span>
        </template>
        <template #center>
          <span>新用户首单立减 50 元</span>
        </template>
        <template #right>
          <sp-btn size="small" variant="elevated" color="white">
            立即购买
          </sp-btn>
        </template>
      </SPGlobalBanner>
    </DemoSection>
  </DemoContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoContainer from '../components/DemoContainer.vue'
import DemoSection from '../components/DemoSection.vue'
import { SPGlobalBanner } from '@speed-ui/ui'

const show1 = ref(true)
const show2 = ref(true)
const showPrimary = ref(true)
const showSuccess = ref(true)
const showWarning = ref(true)
const showError = ref(true)

const showAllColors = () => {
  showPrimary.value = true
  showSuccess.value = true
  showWarning.value = true
  showError.value = true
}

const hideAllColors = () => {
  showPrimary.value = false
  showSuccess.value = false
  showWarning.value = false
  showError.value = false
}
</script>

<style scoped>
.banner-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
