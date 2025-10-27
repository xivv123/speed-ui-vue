<text>
使用 on-off 属性显示切换按钮，方便用户控制导航抽屉的显示和隐藏
</text>

<template>
  <div>
    <div style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer
          v-model="drawer"
          on-off
          permanent
          :width="256"
        >
          <sp-list activatable>
            <sp-list-subheader>左侧导航</sp-list-subheader>
            <sp-list-item :prepend-icon="HomeOutline" title="首页" value="home"></sp-list-item>
            <sp-list-item :prepend-icon="BarChartOutline" title="数据" value="data"></sp-list-item>
            <sp-list-item :prepend-icon="SettingsOutline" title="设置" value="settings"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>点击边缘的切换按钮可以控制导航抽屉的显示/隐藏</p>
            <p>导航抽屉状态: {{ drawer ? '打开' : '关闭' }}</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeOutline, BarChartOutline, SettingsOutline } from '@vicons/ionicons5'

const drawer = ref(true)
</script>
