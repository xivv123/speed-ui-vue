<text>
鼠标悬浮时自动展开导航抽屉，离开后自动收起为 Rail 模式
</text>

<template>
  <div>
    <div style="position: relative; border: 1px solid #e0e0e0; border-radius: 4px; transform: translateZ(0);">
      <sp-layout height="400px">
        <sp-navigation-drawer
          v-model="drawer"
          rail
          expand-on-hover
          :rail-width="45"
          :width="256"
          permanent
        >
          <sp-list activatable>
            <sp-list-item :prepend-icon="SpeedometerOutline" title="仪表板" value="dashboard"></sp-list-item>
            <sp-list-item :prepend-icon="PeopleOutline" title="用户" value="users"></sp-list-item>
            <sp-list-item :prepend-icon="SettingsOutline" title="设置" value="settings"></sp-list-item>
            <sp-list-item :prepend-icon="HelpCircleOutline" title="帮助" value="help"></sp-list-item>
          </sp-list>
        </sp-navigation-drawer>

        <sp-layout-main>
          <div style="padding: 24px; background: #fafafa; min-height: 100%;">
            <h3>主要内容区域</h3>
            <p>鼠标悬浮在左侧导航栏上查看展开效果</p>
            <p>这种模式适合需要节省空间同时保持易用性的场景</p>
          </div>
        </sp-layout-main>
      </sp-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SpeedometerOutline, PeopleOutline, SettingsOutline, HelpCircleOutline } from '@vicons/ionicons5'

const drawer = ref(true)
</script>
