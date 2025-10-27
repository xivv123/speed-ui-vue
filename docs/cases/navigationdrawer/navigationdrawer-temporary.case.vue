<text>
临时抽屉模式，点击遮罩层可关闭，适合移动端或临时显示的场景
</text>

<template>
  <div>
    <sp-btn @click="drawer = true">打开临时抽屉</sp-btn>

    <div style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 16px; overflow: hidden; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer v-model="drawer" temporary absolute>
          <sp-list activatable>
            <sp-list-subheader>临时导航</sp-list-subheader>
            <sp-list-item :prepend-icon="HomeOutline" title="首页" value="home"></sp-list-item>
            <sp-list-item :prepend-icon="CubeOutline" title="产品" value="products"></sp-list-item>
            <sp-list-item :prepend-icon="ConstructOutline" title="服务" value="services"></sp-list-item>
            <sp-list-item :prepend-icon="CloseCircleOutline" title="关闭" value="close" @click="drawer = false"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>点击按钮打开临时抽屉</p>
            <p>点击遮罩层或关闭按钮可关闭抽屉</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeOutline, CubeOutline, ConstructOutline, CloseCircleOutline } from '@vicons/ionicons5'

const drawer = ref(false)
</script>
