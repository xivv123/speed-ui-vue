<text>
最基本的导航抽屉用法，通过 v-model 控制显示和隐藏
</text>

<template>
  <div>
    <sp-btn @click="drawer = !drawer">切换导航抽屉</sp-btn>

    <div style=" height:400px; position: relative; border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 16px; overflow: hidden; transform: translateZ(0);">
      <sp-layout>
        <sp-navigation-drawer v-model="drawer" temporary>
          <sp-list activatable>
            <sp-list-item :prepend-icon="Home" title="首页" value="home"></sp-list-item>
            <sp-list-item :prepend-icon="InformationCircle" title="关于" value="about"></sp-list-item>
            <sp-list-item :prepend-icon="Settings" title="设置" value="settings"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>导航抽屉状态: {{ drawer ? '打开' : '关闭' }}</p>
            <p>点击按钮或遮罩层切换抽屉显示</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Home, InformationCircle, Settings } from '@vicons/ionicons5'

const drawer = ref(false)
</script>
